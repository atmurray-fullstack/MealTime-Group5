let mealTimeCurrentUser = {};
mealTimeCurrentUser.name = getCookie("mealTime-userName");
mealTimeCurrentUser.address = getCookie("mealTime-userAddress");
if (mealTimeCurrentUser.name === "false") {
  document.location.href = '/'
}


const budget = $("#budget").val();
const mealDate = $("#mealDate").val();
const keyWords = $("#key-words").val();

var currYear = (new Date()).getFullYear();

$(document).ready(function () {
  $(".button-collapse").sideNav();
 

  console.log(mealTimeCurrentUser);
  $(".logOutButton").on("click", function (event) {
    deleteUser();
    document.location.href = '/member'

  });

  $("#submitInfor").on("submit", (event) => {
    event.preventDefault();

    
    });



})






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
}


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



function getRestaurants() {



};


function getRecipeCosts() {

}