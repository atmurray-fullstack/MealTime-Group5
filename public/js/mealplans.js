$(document).ready(function () {
    $(".logOutButton").on("click", function (event) {
        deleteUser();
        document.location.href = '/member'
    
      });


}