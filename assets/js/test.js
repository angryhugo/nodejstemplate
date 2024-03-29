$(function() {
    $(".form_datetime").datetimepicker({
        format: 'MM yyyy',
        autoclose: true
    });

    var _editProfile = $('#edit-profile');
    var _editEducation = $('#edit-education');
    var _name = $('#name');
    var _phone = $('#phone');
    var _email = $('#email');
    var _address = $('#address');
    var _editName = $('#edit-name')
    var _editPhone = $('#edit-phone');
    var _editEmail = $('#edit-email');
    var _editAddress = $('#edit-address');
    var _eidtUniversity = $('#edit-university');
    var _editUniversityMajor = $('#edit-university-major');
    var _editUniversityPeriodTo = $('#edit-university-period-to');
    var _editUniversityPeriodFrom = $('#edit-university-period-from');
    var _editUniversityDescription = $('#edit-university-description');
    var _submitEditProfileBtn = $('#btn-edit-profile-submit');
    var _showEditProfileBtn = $('#btn-show-edit-profile');
    var _submitEditProfileBtn = $('#btn-edit-profile-submit');
    var _cancelEditEducationBtn = $('#btn-edit-education-cancle');
    var _submitEditEducationBtn = $('#btn-edit-education-submit');
    var _showAddEducationBtn = $('#btn-show-add-education');
    var _editEducationForm = $('#edit-education-form');
    var _editProfileForm = $('#edit-profile-form');

    var _presentEducationIndex;

    var showEditProfile = function() {
        _editName.val(_name.text());
        _editPhone.val(_phone.text());
        _editEmail.val(_email.text());
        _editAddress.val(_address.text());
    }

    var submitEditProfile = function() {
        if (confirm("确定保存修改吗？")) {
            _editProfileForm.submit();
        }
    }

    var showEditEducation = function(index) {
        var educationPeriod = $('#university-period' + index).text();
        _eidtUniversity.val($('#university' + index).text());
        _editUniversityPeriodFrom.val(educationPeriod.substring(0, educationPeriod.lastIndexOf("-")));
        _editUniversityPeriodTo.val(educationPeriod.substring(educationPeriod.lastIndexOf("-") + 1, educationPeriod.length));
        _editUniversityMajor.val($('#university-major' + index).text());
        _editUniversityDescription.val($('#university-description' + index).text());
        _presentEducationIndex = index;
    }

    //清空输入框
    var emptyEditEducation = function() {
        _eidtUniversity.val("");
        _editUniversityPeriodFrom.val("");
        _editUniversityPeriodTo.val("");
        _editUniversityMajor.val("");
        _editUniversityDescription.val("");
    }

    var submitEditEducation = function() {
        //_editEducation.fadeOut();
        if (confirm("确定保存修改吗？")) {
            if (_presentEducationIndex !== 100) {
                $('#education-list-index').val(_presentEducationIndex);
            }
            _editEducationForm.submit();
            emptyEditEducation();
        }
    }

    var deleteEducation = function(index) {
        if (confirm("确定要删除吗？")) {
            //window.location.href = '/deleteEducation?index=' + index;
            $.ajax({
                url: '/education/' + index,
                type: 'DELETE',
                // data: {
                //     email: $('#input-email').val(),
                //     name: $('#input-name').val(),
                //     description: $('#input-description').val()
                // },
                dataType: 'text',
                success: function(data) {
                    alert(data);
                    $('#education-list' + index).remove();
                },
                error: function(xhr, status, err) {
                    alert(xhr.responseText);
                }
            });
        }
    }

    _showEditProfileBtn.bind('click', showEditProfile);

    _submitEditProfileBtn.bind('click', submitEditProfile);

    $('.btn-show-edit-education').on('click', function() {
        var index = $(this).data("index");
        showEditEducation(index);
    });

    $('.btn-delete-education').on('click', function() {
        var index = $(this).data("index");
        deleteEducation(index);
    });

    _cancelEditEducationBtn.bind('click', function() {
        //_editEducation.fadeOut("slow");
        //清空
        _eidtUniversity.val("");
        $('#edit-university-period').val("");
        _editUniversityMajor.val("");
        _editUniversityDescription.val("");
    });

    _submitEditEducationBtn.bind('click', submitEditEducation);

    _showAddEducationBtn.bind('click', function() {
        //_editEducation.fadeIn("slow");
        _presentEducationIndex = 100; //定义100时 为添加新条目
    });

    var deleteSkills = function() {
        if (confirm("确定删除" + $(this).text() + "吗？")) {
            var thisLi = $(this);
            var index = $(this).data("index");
            var skillType = $(this).parent().data("skilltype");
            $.ajax({
                url: 'skills/' + skillType + '/' + index,
                type: 'DELETE',
                dataType: 'text',
                success: function(data) {
                    alert(data);
                    thisLi.remove();
                },
                error: function(xhr, status, err) {
                    alert(xhr.responseText);
                }
            });
        }
    };

    $(".skill-list ul li").on('click', deleteSkills);

    var addSkills = function() {
        var thisP = $(this);
        var skillType = thisP.next().data('skilltype');
        var skillName = prompt("请输入要添加的项");
        if (!skillName) {
            alert("不允许添加空值！");
            return false;
        } else if (confirm("确定要添加“" + skillName + "”吗？")) {
            $.ajax({
                url: 'skills/' + skillType + '/' + skillName,
                type: 'POST',
                dataType: 'json',
                success: function(data) {
                    if (!data.exitFlag) {
                        alert(data.info);
                        var newIndex = data.newId;
                        var $addItem = $("<li data-index='" + newIndex + "'>" + skillName + "</li>");
                        $addItem.appendTo(thisP.next()).on('click', deleteSkills);
                    } else {
                        alert("already existed!");
                    }
                },
                error: function(xhr, status, err) {
                    alert(xhr.responseText);
                }
            });
        }
    };

    $(".skill-list p").on('click', addSkills);

    _editProfileForm.validate({
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: "required",
            address: "required"
        }
    });


});