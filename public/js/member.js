let mealTimeCurrentUser = {};
mealTimeCurrentUser.name = getCookie("mealTime-userName");
mealTimeCurrentUser.address = getCookie("mealTime-userAddress");
if (mealTimeCurrentUser.name === "false") {
  document.location.href = '/'
}

var currYear = (new Date()).getFullYear();

$(document).ready(function () {
  $('.parallax').parallax();


  console.log(mealTimeCurrentUser);
  $(".logOutButton").on("click", function (event) {
    deleteUser();
    document.location.href = '/member'

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
  document.cookie = "mealTime-userName =" + false + ";path=/"
  document.cookie = "mealTime-userAddress =" + false + ";path=/"
  mealTimeCurrentUser = null;
};




function handleRestaurantNameClick(element) {
  // alert(element.getAttribute('data-apiKey'));
  $.post('/api/searchForMenu', { apiKey: element.getAttribute('data-apiKey') }, function (data) {
    console.log(data)
  })
}

