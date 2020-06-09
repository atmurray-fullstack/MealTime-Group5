
$(document).ready(function () {


    const form = $("#signup-form");
    const firstName = $("#signup-firstName");
    const lastName = $("#signup-lastName");
    const address = $("#signup-address");
    const email = $("#signup-email");
    const password = $("#signup-password");


    $("#signup-form").on("submit", (event) => {
        event.preventDefault();
        const user = {
            firstName: firstName.val().trim(),
            lastName: lastName.val().trim(),
            address: address.val().trim(),
            email: email.val().trim(),
            password: password.val().trim()
        };

        if (!user.email || !user.password) {
            return;
        }
        createNewUser(user.firstName, user.lastName, user.address, user.email, user.passworfirstName)
        firstName.val("");
        lastName.val("");
        address.val("");
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
        })
    }

});