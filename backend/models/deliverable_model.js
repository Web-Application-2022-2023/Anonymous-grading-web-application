module.exports = (sequelize, DataTypes) => {
    return sequelize.define('deliverable', {
        DeliverableName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DeliverableDate:{
            type: DataTypes.DATE,
            allowNull:true
        }
    });
};

