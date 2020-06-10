$(document).ready(function () {
    $('.parallax').parallax();




    // $("#submitInfor").on("click", function (event) {
    //     event.preventDefault();
    //     $.post('http://localhost:8080/api/submitMealPlan', { mealBudget: 4.56 }, function(data) {
    //         // console.log(data)
    //     })
    //     const address = '';//will be able to get this information from DB
    //     const userSeach = '';//will be getting from page
    //     const mealBudget = ""//

    //     // $.post('http://localhost:8080/api/submitMealPlan', { likes: burger }, function(data) {
    //     //     // console.log(data)
    //     // })
    // });


});

function handleRestaurantNameClick(element) {
    // alert(element.getAttribute('data-apiKey'));
    $.post('/api/searchForMenu', { apiKey: element.getAttribute('data-apiKey') }, function(data) {
            console.log(data)
    })
}