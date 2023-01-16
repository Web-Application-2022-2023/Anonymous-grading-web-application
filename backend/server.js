const Sequelize = require('sequelize');
const cors = require('cors');
const dotenv = require('dotenv').config();
const Joi = require('joi');
const {connect} = require('./config/database');
const projects_route = require('./routes/projects_route');
const user_route = require('./routes/user_route');
const express = require ('express');
const bodyParser = require('body-parser');
const app = express();

// Db connection
connect();

//MW
app.use(bodyParser.json())
app.use(cors());


//Routes
app.use('/projects', projects_route);
app.use('/users', user_route);


const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Listening on port ${port}...`));