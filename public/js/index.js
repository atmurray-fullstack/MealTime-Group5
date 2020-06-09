$(document).ready(function () {

    $(".parallax").parallax();

    $("#loginSubmit").on("click", event => {
        event.preventDefault();

        const userName = $("#userName");
        const userPassword = $("#userPassword");

        const user = {
            userName: userName.val().trim(),
            passWord: userPassword.val().trim()
        };

        loginUser(user.userName, user.passWord);
        userName.val("");
        userPassword.val("");
    })

    const loginUser = (userName, passWord) => {
        $.post("/login", {
            userName: userName,
            passWord: passWord
        })
            .done((data => {
                console.log(data);
                if (data) {
                    document.location.href = '/member'
                } else {
                    alert("Incorrect Login")
                }
            }))
    }
});



