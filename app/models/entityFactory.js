var Sequelize = require('sequelize');
var path = require('path');
var sequelize = new Sequelize('resume', 'root', '123', {
    //host: 'my.server.tld',
    port: 3306,
    logging: false,
    define: {
        freezeTableName: true,
        underscored: true,
        timestaps: false,
        charset: 'utf8'
    }
});

var Profile = sequelize.define('profile', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING
});

var Education = sequelize.define('education', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    university: Sequelize.STRING,
    period: Sequelize.STRING,
    major: Sequelize.STRING,
    description: Sequelize.TEXT
});

var Employment = sequelize.define('employment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    company: Sequelize.STRING,
    period: Sequelize.STRING,
    position: Sequelize.STRING,
    description: Sequelize.TEXT
});

var Skills = sequelize.define('skills', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    description: Sequelize.TEXT
});

var Language_list = sequelize.define('language_list', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    language: Sequelize.STRING
});


var Language_skills = sequelize.define('language_skills', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
});

var Software_list = sequelize.define('software_list', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    software: Sequelize.STRING
});

var Software_skills = sequelize.define('software_skills', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
});

Employment.belongsTo(Profile);
Profile.hasMany(Employment);
Education.belongsTo(Profile);
Profile.hasMany(Education);
Skills.belongsTo(Profile);
Profile.hasOne(Skills);
Software_skills.belongsTo(Profile);
Profile.hasMany(Software_skills);
Software_skills.belongsTo(Software_list);
Software_list.hasMany(Software_skills);
Language_skills.belongsTo(Profile);
Profile.hasMany(Language_skills);
Language_skills.belongsTo(Language_list);
Language_list.hasMany(Language_skills);

module.exports = {
    sequelize: sequelize,
    Profile: Profile,
    Education: Education,
    Employment: Employment,
    Skills: Skills,
    Language_list: Language_list,
    Language_skills: Language_skills,
    Software_list: Software_list,
    Software_skills: Software_skills
};