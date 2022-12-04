const Sequelize = require('sequelize');
const cors = require('cors');
const dotenv = require('dotenv').config();
const Joi = require('joi');
const express = require ('express');
const app = express();

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
});

const Project = sequelize.define('project', {
    projectName: Sequelize.STRING,
    studentName: Sequelize.STRING,
    c_grade: Sequelize.INTEGER,
    u_grade1: Sequelize.INTEGER,
    u_grade2: Sequelize.INTEGER,
    u_grade3: Sequelize.INTEGER,
    u_grade4: Sequelize.INTEGER,
    finalGrade: Sequelize.FLOAT
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.findAll();
        // res.status(200).json(projects);
        res.status(200).send(projects);
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});

app.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
        res.status(200).send(project);
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
    
})

app.post('/projects', async (req, res) => {
    try {
        const {error} = validateProject(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        await Project.create(req.body);
        res.status(200).send('Created successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
   
});

function validateProject(project) {
    const schema = {
        projectName: Joi.string().min(3).required(),
        studentName: Joi.string().min(3).required(),
    };
    return Joi.validate(project, schema);
}

app.put('/projects/changeProjectName/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
    
        const {error} = validateProjectName(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        await project.update(req.body);
        res.send('Modified successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});

function validateProjectName(project) {
    const schema = {
        projectName: Joi.string().min(3).required()
    };
    return Joi.validate(project, schema);
}

app.put('/projects/changeGrades/:id', async (req, res) => {
    try{
        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
    
        const {error} = validateGrades(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        await project.update(req.body);
        res.send('Modified successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});

function validateGrades(project) {
    const schema = {
        c_grade: Joi.number().integer().min(1).max(10).required(),
        u_grade1: Joi.number().integer().min(1).max(10).required(),
        u_grade2: Joi.number().integer().min(1).max(10).required(),
        u_grade3: Joi.number().integer().min(1).max(10).required(),
        u_grade4: Joi.number().integer().min(1).max(10).required()
    };
    return Joi.validate(project, schema);
}

app.put('/projects/changeFinalGrade/:id', async (req, res) => {
    try{
        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
    
        const {error} = validateFinalGrade(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        await project.update(req.body);
        res.send('Modified successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});


function validateFinalGrade(project) {
    const schema = {
        finalGrade: Joi.number().min(1).max(10).required()
    };
    return Joi.validate(project, schema);
}

app.delete('/projects/:id', async (req, res) => {
    try{
        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
    
        await project.destroy();
        res.send('Deleted successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));