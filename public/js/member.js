let currentUser = getCookie("mealTime-userName");
if (currentUser === "false") {
  document.location.href = '/'
}

var currYear = (new Date()).getFullYear();

$(document).ready(function () {
  $('.parallax').parallax();
console.log(currentUser);
  $(".logOutButton").on("click", function (event) {
    deleteUser();
    document.location.href = '/member'

  });



  $(".datepicker").datepicker({
    // setDefaultDate: new Date(2000,01,31),
    defaultDate: new Date(currYear - 20, 1, 31),
    maxDate: new Date(currYear - 20, 12, 31),
    yearRange: [1928, currYear - 20],
    format: "yyyy/mm/dd"
  });

});




function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};


  function deleteUser() {
    document.cookie = "mealTime-userName ="+false+";path=/"
    currentUser = null;
  };




function handleRestaurantNameClick(element) {
    // alert(element.getAttribute('data-apiKey'));
    $.post('/api/searchForMenu', { apiKey: element.getAttribute('data-apiKey') }, function(data) {
            console.log(data)
    })
}

