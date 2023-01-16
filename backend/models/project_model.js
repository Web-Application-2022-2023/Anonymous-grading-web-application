module.exports = (sequelize, DataTypes) => {
    return sequelize.define('project', {
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
            set (value) {
                this.setDataValue('projectName', value.toLowerCase())
            },
        },
        studentName:{
            type: DataTypes.STRING,
            allowNull:false,
            set (value) {
                this.setDataValue('studentName', value.toLowerCase())
            },
        },
        c_grade:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        u_grade1:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        u_grade2:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        u_grade3:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        u_grade4:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        finalGrade:{
            type:DataTypes.INTEGER,
            allowNull:true
        },

    });
};

