const router = require('express').Router();
const {Project } = require('../config/database');
const {Jury} = require('../config/database')
const {Deliverable} = require('../config/database')
const Joi = require('joi');


const validateGrades = (project) => {
    const schema = {
        c_grade: Joi.number().integer().min(1).max(10).required(),
        u_grade1: Joi.number().integer().min(1).max(10).required(),
        u_grade2: Joi.number().integer().min(1).max(10).required(),
        u_grade3: Joi.number().integer().min(1).max(10).required(),
        u_grade4: Joi.number().integer().min(1).max(10).required()
    };
    return Joi.validate(project, schema);
};

const validateFinalGrade = (project) => {
    const schema = {
        finalGrade: Joi.number().min(1).max(10).required()
    };
    return Joi.validate(project, schema);
};

const validateProjectName = (project) => {
    const schema = {
        projectName: Joi.string().min(3).required()
    };
    return Joi.validate(project, schema);
};

const validateProject = (project) => {
    const schema = {
        projectName: Joi.string().min(3).required(),
    };
    return Joi.validate(project, schema);
}



router.get('/', async (req, res) => {
    try {
        const projects = await Project.findAll();
        // res.status(200).json(projects);
        res.status(200).send(projects);
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});

router.post('/', async (req, res) => {
    try {
        //const {error} = validateProject(req.body);
        //if (error) return res.status(400).send(error.details[0].message);
        console.log("a intrat in post");
        await Project.create(req.body);
        res.status(200).send('Created successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
   
});


router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
        res.status(200).send(project);
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
    
})



router.put('/changeProjectName/:id', async (req, res) => {
    try {

        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
    
        await project.update(req.body);
        res.send('Modified successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});



router.put('/changeGrades/:id', async (req, res) => {
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



router.put('/changeFinalGrade/:id', async (req, res) => {
    try{
        console.log(req.body);

        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
        //const {error} = validateFinalGrade(req.body);
        //if (error) return res.status(400).send(error.details[0].message);
    
        await project.update(req.body);
        res.send('Modified successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});




router.delete('/:id', async (req, res) => {
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

module.exports = router;