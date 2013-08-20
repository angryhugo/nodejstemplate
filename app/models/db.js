/* ==========================================================
 * 创建表
 * ========================================================== */
sequelize.sync({
    force: true
}).success(function() {
    console.log('ok');
}).error(function(err) {
    console.log(err);
});

/* ==========================================================
 * 插入数据
 * ========================================================== */
Profile.create({
    id: 1,
    name: 'hugo',
    phone: '+86-13816027534',
    email: 'hanchun.yin@leediancn.com',
    address: '宜山路900号A#306'
}).success(function(profile) {
    console.log("profile created successfully!");
    Education.bulkCreate([{
        id: 1,
        profile_id: profile.id,
        university: 'University of Awesome',
        period: 'January 2008-October 2013',
        major: 'MAJORED IN AWESOME',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec lobortis varius turpis sit amet commodo. Aenean a diam id nisl dodales ultrices. Proin id leo ut turpis placerat pharetra. Nunc et lacus sed arcu lobortis pharetra. Mauris sagittis consectetur sapien pretium aliquet.'
    }, {
        id: 2,
        profile_id: profile.id,
        university: 'University of Technology, Sydney',
        period: 'April 2005-September 2007',
        major: 'BACHELOR OF ARTS',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec lobortis varius turpis sit amet commodo. Aenean a diam id nisl dodales ultrices. Proin id leo ut turpis placerat pharetra. Nunc et lacus sed arcu lobortis pharetra. Mauris sagittis consectetur sapien pretium aliquet.'
    }]).success(function(education) {
        console.log("education created successfully!");
    }).error(function(err) {
        console.log(err);
    });
    Employment.bulkCreate([
        {
            id: 1,
            profile_id: profile.id,
            company: 'LEEDIAN CN',
            period: 'July 2013-PRESENT',
            position: 'WEB DESIGNER',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec lobortis varius turpis sit amet commodo. Aenean a diam id nisl dodales ultrices. Proin id leo ut turpis placerat pharetra. Nunc et lacus sed arcu lobortis pharetra. Mauris sagittis consectetur sapien pretium aliquet.'
    }, {
            id: 2,
            profile_id: profile.id,
            company: 'GOOGLE HK',
            period: 'July 2012-JUNE 2013',
            position: 'FREELANCE WEB DESIGN',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec lobortis varius turpis sit amet commodo. Aenean a diam id nisl dodales ultrices. Proin id leo ut turpis placerat pharetra. Nunc et lacus sed arcu lobortis pharetra. Mauris sagittis consectetur sapien pretium aliquet.'
    }]).success(function(employment) {
        console.log("employment created successfully!")
    }).error(function(err) {
        console.log(err);
    });
    Skills.create({
        id: 1,
        profile_id: profile.id,
        description: 'Nunc et lacus sed arcu lobortis pharetra. Mauris sagittis consectetur sapien pretium aliquet. Nunc et lucas sed arcu lobortis pharetra. Mauris sagittis consectetur sapien pretium aliquet.'
    }).success(function(skills) {
        console.log("skills created successfully!");
    }).error(function(err) {
        console.log(err);
    });
    Software_list.bulkCreate([{
        id: 1,
        software: 'Eclipse'
    }, {
        id: 2,
        software: 'SQL Server'
    }, {
        id: 3,
        software: 'Visual Studio'
    }, {
        id: 4,
        software: 'Dreamweaver'
    }, {
        id: 5,
        software: 'MySQL'
    }, {
        id: 6,
        software: 'Matlab'
    }, {
        id: 7,
        software: 'AutoCAD'
    }, {
        id: 8,
        software: 'PhotoShop'
    }]).success(function(software_list) {
        console.log("software_list created successfully!");
        Software_skills.bulkCreate([{
            id: 1,
            profile_id: profile.id,
            software_list_id: 1
        }, {
            id: 2,
            profile_id: profile.id,
            software_list_id: 2
        }, {
            id: 3,
            profile_id: profile.id,
            software_list_id: 3
        }, {
            id: 4,
            profile_id: profile.id,
            software_list_id: 4
        }]).success(function(software_skills) {
            console.log("software_skills created successfully!");
        }).error(function(err) {
            console.log(err);
        });
    }).error(function(err) {
        console.log(err);
    });
    Language_list.bulkCreate([{
        id: 1,
        language: 'ASP'
    }, {
        id: 2,
        language: 'JSP'
    }, {
        id: 3,
        language: 'HTML/CSS'
    }, {
        id: 4,
        language: 'JAVASCRIPT'
    }, {
        id: 5,
        language: 'JAVA'
    }, {
        id: 6,
        language: 'C'
    }, {
        id: 7,
        language: 'C++'
    }, {
        id: 8,
        language: 'C#'
    }]).success(function(software_list) {
        console.log("language_list created successfully!");
        Language_skills.bulkCreate([{
            id: 1,
            profile_id: profile.id,
            language_list_id: 1
        }, {
            id: 2,
            profile_id: profile.id,
            language_list_id: 2
        }, {
            id: 3,
            profile_id: profile.id,
            language_list_id: 3
        }, {
            id: 4,
            profile_id: profile.id,
            language_list_id: 4
        }]).success(function(language_skills) {
            console.log("language_skills created successfully!");
        }).error(function(err) {
            console.log(err);
        });
    }).error(function(err) {
        console.log(err);
    });
}).error(function(err) {
    console.log(err);
});