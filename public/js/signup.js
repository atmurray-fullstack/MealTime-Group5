
$(document).ready(function () {
    $(".button-collapse").sideNav();

    const form = $("#signup-form");
    const firstName = $("#signup-firstName");
    const lastName = $("#signup-lastName");
    const addressStreet = $("#signup-addressStreet");
    const addressCity = $("#signup-addressCity");
    const addressState = $("#signup-addressState");
    const addressZip = $("#signup-addressZip");
    const email = $("#signup-email");
    const password = $("#signup-password");


    $("#signup-form").on("submit", (event) => {
        event.preventDefault();

        const user = {
            firstName: firstName.val().trim(),
            lastName: lastName.val().trim(),
            address: addressStreet.val().trim() + "," + addressCity.val().trim() + "," + addressState.val().trim() + ".," + addressZip.val().trim(),
            email: email.val().trim(),
            password: password.val().trim()
        };

        if (!user.email || !user.password) {
            return;
        }

        createNewUser(user.firstName, user.lastName, user.address, user.email, user.password)
        firstName.val("");
        lastName.val("");
        addressStreet.val("");
        addressCity.val("");
        addressState.val("");
        addressZip.val("");

        email.val("");
        password.val("");
    })

    function createNewUser(fName, lName, address, email, password) {
        $.post("/api/createUser", {
            first_name: fName,
            last_name: lName,
            userName: email,
            passWord: password,
            address: address
        }).then(data => {
            if (data.value) {
                alert("Username already taken. Try another one");
                $("#signup-firstName").val(data.user.first_name)
                $("#signup-lastName").val(data.user.last_name)
            } else if (!data.value) {
                window.location.href = "/"
            }
        })
    }

});

