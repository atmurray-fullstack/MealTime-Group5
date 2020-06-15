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
  const form = $("form")
  const newInputTag = $("<input>").attr("type", "hidden").attr("name", "address").attr("value", mealTimeCurrentUser.address)
  form.append(newInputTag)

  $(".button-collapse").sideNav();

  $("form").submit((event) => {
    alert(event.keys())
    $(".orderList").append(`<div><i class="material-icons"></i>${date}</div>`)
  })    
  let shoppingList = JSON.parse(window.localStorage.getItem("shoppingList"))
  createItemList(shoppingList)


  $("#submitOrderButton").on("click", event => {
    let userInfo = {
      name: JSON.parse(localStorage.getItem("user")).name,
      orders: localStorage.getItem("shoppingList")

    }

    $.post("/postOrder", userInfo)
      .done(data => {
        alert(data);
      })

  })


  $(".logOutButton").on("click", function (event) {
    deleteUser();
    document.location.href = '/'
  });




  $(document).on('click', '.deleteItem', function (e) {
    // e.preventDefault();
    let shoppingList = JSON.parse(window.localStorage.getItem("shoppingList"))
    const item = $(event.target).parent().children().first().html();
    Object.keys(shoppingList).forEach((element) => {
      for (let i = 0; i < shoppingList[element].length; i++) {
        if (shoppingList[element][i] === item) {
          shoppingList[element].splice(i, 1)
        }

      }
    })
    window.localStorage.setItem("shoppingList", JSON.stringify(shoppingList))
    createItemList(shoppingList)
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
  document.cookie = "mealTime-userName =false;path=/"
  document.cookie = "mealTime-address =false;path=/"
  currentUser = null;
};




function handleRestaurantNameClick(element) {
  $.post('/api/searchForMenu', { apiKey: element.getAttribute('data-apiKey') }, function (data) {
    console.log(data)
  })
}


function createItemList(shoppingList) {
  const allItemLists = []
  let total = 0;
  $('#collapsiblelist').empty()
  Object.keys(shoppingList).forEach((date) => {
    let newListItem = $('<li>');
    const dateHeader = $(`<div class="collapsible-header"><i class="material-icons">filter_drama</i>${date}</div>`)
    $(newListItem).append(dateHeader);
    let dateBody = $(`<div class="collapsible-body"></div>`);
    $(newListItem).append(dateBody);
    let newUnorderedList = $('<ul>');
    $(dateBody).append(newUnorderedList);
    Object.keys(shoppingList[date]).forEach((element) => {
      if (shoppingList[date][element].length != 0) {
        $(newUnorderedList).append(`<div>${element} : </div>`)
        for (let i = 0; i < shoppingList[date][element].length; i++) {
          let deleteButton = $('<button>delete</button>');
          let itemNamePrice = $(`<span>${shoppingList[date][element][i]}</span>`)
          let newItemDiv = $('<div>');
          $(newItemDiv).append(itemNamePrice)
          $(newUnorderedList).append(newItemDiv).append(deleteButton);
          $(deleteButton).on('click', (event) => {
            let shoppingList = JSON.parse(window.localStorage.getItem("shoppingList"));
            console.log(shoppingList[date][element].splice(i, 1))
            if (shoppingList[date][element].length == 0) delete shoppingList[date][element];
            if ((Object.keys(shoppingList[date])).length == 0) delete shoppingList[date];
            window.localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
            createItemList(shoppingList)
          })
          let newArray = shoppingList[date][element][i].split("$")
          // console.log(newArray[newArray.length-1]) 
          allItemLists.push(newArray[newArray.length - 1])
          const itemPrice = parseFloat(newArray[newArray.length - 1]);
          total = total + itemPrice;
        }
      }
    })
    $('#collapsiblelist').append(newListItem)
  })
  if (allItemLists !== null) {
    $(".totalCost").empty()
    // var total = allItemLists.reduce((total, priceString) => total + parseFloat(priceString), 0).toFixed(2);
    $(".totalCost").append(`<p class="left-align">${total.toFixed(2)}</p>`)
  }
}

function save(element, date) {
  const restaurantName = $(element).parent().parent().children().first().find('span').html();
  const item = $(element).parent().children().first().html();
  let shoppingList = JSON.parse(window.localStorage.getItem("shoppingList"))
  if (window.localStorage.getItem("shoppingList") === null) shoppingList = {};
  if (typeof shoppingList[date] === "undefined") shoppingList[date] = {}
  if (typeof shoppingList[date][restaurantName] === "undefined") shoppingList[date][restaurantName] = []
  shoppingList[date][restaurantName].push(item)
  window.localStorage.setItem("shoppingList", JSON.stringify(shoppingList))
  createItemList(shoppingList)
}

