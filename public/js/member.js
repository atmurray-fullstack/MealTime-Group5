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


  $(".saveOrder").click(function (event) {
    let shoppingList = JSON.parse(window.localStorage.getItem("shoppingList"))
    if (window.localStorage.getItem("shoppingList") === null) shoppingList = {};
    const restaurantName = $(event.target).parent().parent().children().first().find('span').html();
    const item = $(event.target).parent().children().first().html();
    if (typeof shoppingList[restaurantName] === "undefined") shoppingList[restaurantName] = []
    shoppingList[restaurantName].push(item)
    window.localStorage.setItem("shoppingList", JSON.stringify(shoppingList))
    const itemList = shoppingList[restaurantName]
    createItemList(shoppingList)

  })


});

$(document).on('click', '.deleteItem', function (e) {
  e.preventDefault();
  let shoppingList = JSON.parse(window.localStorage.getItem("shoppingList"))
  const item = $(event.target).parent().children().first().html();
  Object.keys(shoppingList).forEach((element) => {
    for (let i = 0; i < shoppingList[element].length; i++) {
      if(shoppingList[element][i]=== item) {
        shoppingList[element].splice(i,1)
      }
     }
  })
  window.localStorage.setItem("shoppingList", JSON.stringify(shoppingList))
  createItemList(shoppingList)
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
}


function deleteUser() {
  document.cookie = "mealTime-userName =" + false + ";path=/"
  currentUser = null;
};




function handleRestaurantNameClick(element) {
  $.post('/api/searchForMenu', { apiKey: element.getAttribute('data-apiKey') }, function (data) {
    console.log(data)
  })
}


function createItemList(shoppingList) {

  $('.orderedItem').empty()
  Object.keys(shoppingList).forEach((element) => {
    $(".orderedItem").append(`<div>${element} : </div>`)
    for (let i = 0; i < shoppingList[element].length; i++) {
      $(".orderedItem").append(`<div><span>${shoppingList[element][i]}</span><button class= "deleteItem">delete</button></div>`)
    }
  })

}

function getRestaurants() {



};


function getRecipeCosts() {

}
