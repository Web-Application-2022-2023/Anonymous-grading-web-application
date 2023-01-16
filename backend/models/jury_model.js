module.exports = (sequelize, DataTypes) => {
    return sequelize.define('jury', {
        nota: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        data:{
            type: DataTypes.DATE,
            allowNull:true
        }
    });
};

    