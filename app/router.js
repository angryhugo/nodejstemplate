var controller = require('./controllers/controller');

module.exports = function(app) {
    app.get('/', controller.index);
    app.post('/profile', controller.editProfile);
    app.post('/education', controller.editEducation);
    app.delete('/education/:index', controller.deleteEducation);
    app.delete('/skills/:skillType/:index', controller.deleteSkills);
    app.post('/skills/:skillType/:skillName', controller.addSkills);
    // app.delete('/skills/delete/:skillType/:index(\\[0-9]*)', controller.deleteSkills);
    app.get('/resume', controller.resume);
    // app.get('/deleteEducation', controller.deleteEducation);
}