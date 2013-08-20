var entityFactory = require('./entityFactory');

var sequelize = entityFactory.sequelize;
var Profile = entityFactory.Profile;
var Education = entityFactory.Education;
var Employment = entityFactory.Employment;
var Skills = entityFactory.Skills;
var Language_list = entityFactory.Language_list;
var Language_skills = entityFactory.Language_skills;
var Software_list = entityFactory.Software_list;
var Software_skills = entityFactory.Software_skills;

exports.findAllInfo = function(id, callback) {
	var allInfo = {};
	var skillsInfo = {};
	Profile.find(id).success(function(profile) {
		Employment.findAll({
			where: ["profile_id = ?", profile.id]
		}).success(function(employments) {
			Education.findAll({
				where: {
					profile_id: profile.id
				}
			}).success(function(educations) {
				Skills.findAll({
					where: {
						profile_id: profile.id
					}
				}).success(function(skills) {
					skillsInfo.description = skills[0].description;
					sequelize.query("SELECT language,language_skills.id FROM language_list,language_skills where language_skills.profile_id=? and language_skills.language_list_id=language_list.id", null, {
						raw: true
					}, [profile.id]).success(function(languageSkills) {
						skillsInfo.languageList = [];
						for (var i = 0; i < languageSkills.length; i++) {
							skillsInfo.languageList.push(languageSkills[i]);
						}
						sequelize.query("SELECT software,software_skills.id FROM software_list,software_skills where software_skills.profile_id=? and software_skills.software_list_id=software_list.id", null, {
							raw: true
						}, [profile.id]).success(function(softwareSkills) {
							skillsInfo.softwareList = [];
							for (var i = 0; i < softwareSkills.length; i++) {
								skillsInfo.softwareList.push(softwareSkills[i]);
							}
							allInfo.title = 'Express+Jade+Less';
							allInfo.profile = profile;
							allInfo.employments = employments;
							allInfo.educations = educations;
							allInfo.skills = skillsInfo;
							callback(null, allInfo);
						}).error(function(err) {
							callback(err);
						});
					}).error(function(err) {
						callback(err);
					});
				}).error(function(err) {
					callback(err);
				});
			}).error(function(err) {
				callback(err);
			});
		}).error(function(err) {
			callback(err);
		});
	}).error(function(err) {
		callback(err);
	})
};


exports.editProfile = function(id, newProfile, callback) {
	Profile.find(id).success(function(profile) {
		profile.name = newProfile.name;
		profile.phone = newProfile.phone;
		profile.email = newProfile.email;
		profile.address = newProfile.address;
		profile.save().success(function(profile) {
			callback(null);
		}).error(function(err) {
			callback(err);
		});
	}).error(function(err) {
		callback(err);
	})
};

exports.addEducation = function(profile_id, newEducation, callback) {
	var theNewEducation = Education.build({
		profile_id: profile_id,
		university: newEducation.university,
		period: newEducation.period,
		major: newEducation.major,
		description: newEducation.description
	}).save().success(function(education) {
		callback(null);
	}).error(function(err) {
		callback(err);
	});
};


exports.editEducation = function(education_id, newEducation, callback) {
	Education.find(education_id).success(function(education) {
		education.university = newEducation.university;
		education.period = newEducation.period;
		education.major = newEducation.major;
		education.description = newEducation.description;
		education.save().success(function(edu) {
			callback(null);
		}).error(function(err) {
			callback(err);
		});
	}).error(function(err) {
		callback(err);
	});
};

exports.deleteEducation = function(education_id, callback) {
	Education.find(education_id).success(function(education) {
		education.destroy().success(function(edu) {
			callback(null);
		}).error(function(err) {
			callback(err);
		});
	}).error(function(err) {
		callback(err);
	});
};

exports.deleteSkills = function(skillType, skills_id, callback) {
	if (parseInt(skillType) === 0) {
		Software_skills.find(skills_id).success(function(skill) {
			skill.destroy().success(function(skl) {
				callback(null);
			}).error(function(err) {
				callback(err);
			});
		}).error(function(err) {
			callback(err);
		});
	} else {
		Language_skills.find(skills_id).success(function(language) {
			language.destroy().success(function(lan) {
				callback(null);
			}).error(function(err) {
				callback(err);
			});
		}).error(function(err) {
			callback(err);
		});
	}
};

exports.addSkills = function(profile_id, skillType, skills_name, callback) {
	//skillType=0 添加software_skills
	if (parseInt(skillType) === 0) {
		sequelize.query("SELECT * FROM software_list where software=?", null, {
			raw: true
		}, [skills_name]).success(function(software_lists) {
			//software_list中是否存在要添加的项目
			if (!software_lists.length) {
				var theNewList = Software_list.build({
					software: skills_name
				}).save().success(function(newList) {
					var theNewSkill = Software_skills.build({
						profile_id: profile_id,
						software_list_id: newList.id
					}).save().success(function(newSkill) {
						callback(null, newSkill.id);
					}).error(function(err) {
						callback(err);
					});
				}).error(function(err) {
					callback(err);
				});
			} else { //若software_list中存在要添加的项目，判断software_skills中是否已存在
				sequelize.query("SELECT * FROM software_skills where profile_id=? and software_list_id=?", null, {
					raw: true
				}, [profile_id, software_lists[0].id]).success(function(software_list_exist) {
					//不存在，添加项
					if (!software_list_exist.length) {
						var theNewSkill = Software_skills.build({
							profile_id: profile_id,
							software_list_id: software_lists[0].id
						}).save().success(function(newSkill) {
							callback(null, newSkill.id, 0);
						}).error(function(err) {
							callback(err);
						});
					} else {
						callback(null, software_list_exist[0].id, 1);
					}
				}).error(function(err) {
					callback(err);
				});
			}
		}).error(function(err) {
			callback(err);
		});
	} else {
		sequelize.query("SELECT * FROM language_list where language=?", null, {
			raw: true
		}, [skills_name]).success(function(language_lists) {
			if (!language_lists.length) {
				var theNewList = Language_list.build({
					language: skills_name
				}).save().success(function(newList) {
					var theNewSkill = Language_skills.build({
						profile_id: profile_id,
						language_list_id: newList.id
					}).save().success(function(newSkill) {
						callback(null, newSkill.id);
					}).error(function(err) {
						callback(err);
					});
				}).error(function(err) {
					callback(err);
				});
			} else {
				sequelize.query("SELECT * FROM language_skills where profile_id=? and language_list_id=?", null, {
					raw: true
				}, [profile_id, language_lists[0].id]).success(function(language_list_exist) {
					if (!language_list_exist.length) {
						var theNewSkill = Language_skills.build({
							profile_id: profile_id,
							language_list_id: language_lists[0].id
						}).save().success(function(newSkill) {
							callback(null, newSkill.id, 0);
						}).error(function(err) {
							callback(err);
						});
					} else {
						callback(null, language_list_exist[0].id, 1);
					}
				}).error(function(err) {
					callback(err);
				});
			}
		}).error(function(err) {
			callback(err);
		});
	}
};