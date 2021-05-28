//LOGIN page

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function displayNotification(div, message, status, options = '{}') {
    let randId = getRandomInt(10000)
    let html = `<div id='notif-` + randId + `' class="vitta-notif status-` + status + `" data-i18n="` + message + `" data-i18n-options=` + options + `><div class="vitta-notif-exit-btn"><i class="fa fa-times-circle"></i></div></div>`
    $(div).append(html)
    $(div).localize()
    setTimeout(function () {
        $('#notif-' + randId).remove()
    }, 15000);
}
$('body').on('click', '.vitta-notif-exit-btn', function () {
    $(this).parent().remove()
})

$('#home-connexion').click(function () {
    $('#home-container').toggle();
    $('#classroom-login-container').toggle();
})
$('#class-connexion').click(function () {
    findClassroomToConnect($('#class-code').val())
})
if ($_GET('panel') == "login") {
    $('#home-container').toggle();
    $('#classroom-login-container').toggle();
}
if ($_GET('warn') == 'notester') {
    let html = `<div class="alert alert-warning"> ` + i18next.t('login_popup.errorBeta') + `</div>`
    $('#interactive-elements-container').append(html)
}

if ($_GET('afterconfirm')) {
    $('#info-div').append(`<div id='info-box' class='alert alert-success'>` + i18next.t('login-page.successConfirm') + "</div>")
}
if ($_GET('mailchanged')) {
    $('#info-div').append(`<div id='info-box' class='alert alert-success'>` + i18next.t('login-page.successMail') + "</div>")
}
if ($_GET('denied')) {
    $('#info-div').append(`<div id='info-box' class='alert alert-warning'>` + i18next.t('login-page.notConnect') + "</div>")
}

function loginFaq() {
    let html = ''
    let index = [8, 8, 4]
    for (let i = 1; i < 4; i++) {
        html += "<h3 data-i18n='[html]faqInfo." + i + ".section_title'></h3>";
        for (let j = 1; j < index[i - 1]; j++) {
            html += `<div class="kit-faq-box">
            <div class="faq-box-header" style="transform: rotate(0deg); transform-origin: 50% 50% 0px;">
                <div class="faq-box-dropdown">
                    <span class="fa fa-chevron-right" style="line-height:40px; font-size:16px;"></span>
                </div>
                <p style="font-size:16px; margin:0; padding:0;">
                    <b data-i18n='[html]faqInfo.` + i + `.question_list.` + j + `.title'></b>
                </p>
            </div>
            <div class="faq-box-content">
            <p data-i18n='[html]faqInfo.` + i + `.question_list.` + j + `.answer'></p>
            </div>
        </div>`

        }
    }
    $('#classroom-faq div h2').after(html)
    if ($("#classroom-faq").localize){
        $("#classroom-faq").localize();
    }
}

$('#create-user').click(function () {
    let pseudo = $('#new-user-pseudo-form').val()
    let link = $_GET('link')
    Main.getClassroomManager().createAccount(pseudo, link).then(function (result) {
        if (result != false) {
            console.log("ezfused")
            if(!result.isUsersAdded){
                displayNotification('#notif-div', "classroom.notif.cantLoginLimitLearners", "error");
            }else{
                window.open('/classroom/login.php', "_self");
            }
        } else {
            $('#warning-pseudo-used').toggle()
            setTimeout(function () {
                $('#warning-pseudo-used').toggle()
            }, 10000)
        }
    })
})

$(document).on('keydown', function (e) {
    if (e.keyCode === 13 && ($("#create-user").is(":focus") || $("#new-user-pseudo-form").is(":focus"))) {
        let pseudo = $('#new-user-pseudo-form').val()
        let link = $_GET('link')
        Main.getClassroomManager().createAccount(pseudo, link).then(function () {
            window.open('/classroom/login.php', "_self")
        })
    }
});

$('#connect-nongar-user').click(function () {
    let pseudo = $('#user-pseudo-form').val()
    let password = $('#user-password-form').val()
    let link = $_GET('link')
    Main.getClassroomManager().connectAccount(pseudo, password, link).then(function (response) {
        if (response == true) {
            window.open('/classroom/login.php', "_self")
        } else {
            console.log("error")
            $('.mismatched-login').show()
        }
    }).catch(error => {});
})


$(document).on('keydown', function (e) {
    if (e.keyCode === 13 && ($("#connect-nongar-user").is(":focus") || $("#user-password-form").is(":focus"))) {
        let pseudo = $('#user-pseudo-form').val()
        let password = $('#user-password-form').val()
        let link = $_GET('link')
        Main.getClassroomManager().connectAccount(pseudo, password, link).then(function (response) {
            if (response == true) {
                window.open('/classroom/login.php', "_self")
            } else {
                console.log("error")
                $('.mismatched-login').show()
            }
        }).catch(error => {});
    }
});

$('#login-vittascience').click(function () {
    $('#classroom-login-container').toggle();
    $('#login-container').toggle();
})


$('.navbar-brand').click(function () {
    window.location.href = window.location.origin + window.location.pathname
})