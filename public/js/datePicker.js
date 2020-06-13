$(document).ready(function () {



    
  $(".datepicker").datepicker({
    // setDefaultDate: new Date(2000,01,31),
    defaultDate: new Date(currYear - 20, 1, 31),
    maxDate: new Date(currYear - 20, 12, 31),
    yearRange: [1928, currYear - 20],
    format: "yyyy/mm/dd"
  });
})