$(document).ready(function () {
  $(".button-collapse").sideNav();
    $(".logOutButton").on("click", function (event) {
        deleteUser();
        document.location.href = '/member'
    
      });

      
})