const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db',
    define: { timestamps: false }
});

const connect = () => {
    sequelize.authenticate()
    .then(() => console.log('Connection to the database successful!'))
    .catch((err) => console.warn(err));
};

const User = require('../models/user_model')(sequelize, Sequelize);
const Deliverable = require('../models/deliverable_model')(sequelize,Sequelize);
const Project = require('../models/project_model')(sequelize, Sequelize);
const Jury = require('../models/jury_model')(sequelize,Sequelize);

Jury.belongsToMany(User, {through:'Jury_User', foreignKey:'jury_id'});
Jury.belongsToMany(Project, {through:'Jury_Project', foreignKey:'jury_id'});


Deliverable.belongsTo(Project, {foreignKey:'project_id'});

Project.hasMany(Deliverable, {as:'deliverables', foreignKey:'project_id'});


//Recreate tables
sequelize.sync({ force: true });

module.exports = { connect, User, Deliverable, Project, Jury };