var path = require('path');
var dbHelper = require('../models/dbHelper');

module.exports = {
    index: function(req, res) {
        dbHelper.findAllInfo(1, function(err, allInfo) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.render('index', {
                    title: allInfo.title,
                    profile: allInfo.profile,
                    employmentList: allInfo.employments,
                    skills: allInfo.skills,
                    educationList: allInfo.educations
                });
            }
        });
    },



    editProfile: function(req, res) {
        var newProfile = {
            name: req.body.username || "",
            phone: req.body.phone || "",
            email: req.body.email || "",
            address: req.body.address || ""
        };
        dbHelper.editProfile(1, newProfile, function(err) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.redirect('/');
            }
        });
    },

    editEducation: function(req, res) {
        var newEducation = getNewEducation(req, res);
        var id = '' || parseInt(req.body.edit_index);
        if (isNaN(id)) {
            //添加
            dbHelper.addEducation(1, newEducation, function(err) {
                if (err) {
                    console.log(err);
                    res.send('Server error!');
                } else {
                    res.redirect('/');
                }
            });
        } else {
            //修改
            dbHelper.editEducation(id, newEducation, function(err) {
                if (err) {
                    console.log(err);
                    res.send('Server error!');
                } else {
                    res.redirect('/');
                }
            });
        }
    },

    deleteEducation: function(req, res) {
        // var index = req.query.index || '';//拼接queryString方法
        var id = req.params.index || ''; //ajax方法
        dbHelper.deleteEducation(id, function(err) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.send('Delete successfully!');
            }
        });
    },


    deleteSkills: function(req, res) {
        var skillType = parseInt(req.params.skillType) || 0;
        var id = req.params.index || '';
        dbHelper.deleteSkills(skillType, id, function(err) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                res.send('Delete successfully!');
            }
        });
    },

    addSkills: function(req, res) {
        var skillType = parseInt(req.params.skillType) || 0;
        var skillName = req.params.skillName || '';
        dbHelper.addSkills(1, skillType, skillName, function(err, newId, exitFlag) {
            if (err) {
                console.log(err);
                res.send('Server error!');
            } else {
                var data = {
                    newId: newId,
                    exitFlag: exitFlag
                };
                if (exitFlag) {
                    data.info = "already existed!";
                } else {
                    data.info = "resume saved successfully!";
                }
                res.send(data);
            }
        });
    },

    resume: function(req, res) {
        res.render('resume', {
            title: 'Bootstrap resume'
        });
    }
}

function saveResumeIntoFile(resumeObj, filePath, res) {
    var newInfoStr = JSON.stringify(resumeObj);
    fs.writeFile(filePath, newInfoStr, function(err) {
        if (err) {
            console.log(err);
            res.send('Failed to save resume.');
        } else {
            res.send('Resume saved successfully.');
        }
    });
}

function getNewEducation(req, res) {
    var university = req.body.edit_university || "";
    var periodFrom = req.body.edit_period_from || "";
    var periodTo = req.body.edit_period_to || "";
    var major = req.body.edit_university_major || "";
    var description = req.body.edit_university_description || "";
    var newEducation = {
        university: university,
        period: periodFrom + "-" + periodTo,
        major: major,
        description: description
    };
    return newEducation;
}
