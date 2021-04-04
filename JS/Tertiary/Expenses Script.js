 /* Function to calculate income */
 function Add() {
  // Variables from input field
  var table = document.getElementById("Expenses");
  var name = document.getElementById("Name").value;
  var price = document.getElementById("Price").value;
  if (price == "" && name == "") {
    alert("Please enter in values.");
  }
  else {
    // Insert a default row from here:
    var Entry = table.insertRow(-1);
    var col0 = Entry.insertCell(0);
    var col1 = Entry.insertCell(1);
    col0.innerHTML = name;
    col1.innerHTML = "$" + price;
    document.getElementById("Name").value = "";
    document.getElementById("Price").value = "";
  }
}

/* Function to add up last column */
function Calculate() {
  var table = document.getElementById("Expenses");
  var sumVal = 0;
  var Entry = table.insertRow(-1);
  var col0 = Entry.insertCell(0);
  var col1 = Entry.insertCell(1);
  for(var i = 1; i < table.rows.length; i++) {
    sumVal += parseInt(table.rows[i].cells[1]);
  }
  col0.innerHTML = "All Expenses";
  col1.innerHTML = sumVal;
}

/* Function to clear row */
 function Remove() {
  var table = document.getElementById("Expenses");
  var rowCount = table.rows.length;
  if (rowCount > 1) {
    table.deleteRow(rowCount - 1);
  }
  else {
    alert("You cannot delete anymore rows.");
  }
}

/* Enter press detection */
$(document).keypress(function(e) {
  if(e.which == 13) {
    document.getElementById("Add").click();
  }
});

/* CMD or CTRL + Backspace detection */
$(document).keydown(function(e) {
  if((e.metaKey || e.ctrlKey) && e.keyCode == 8) {
    document.getElementById("Remove").click();
  }
});
  
/* CMD or CTRL + P detection */
$(document).keydown(function(e) {
  if((e.metaKey || e.ctrlKey) && e.key === 'p') {
    document.getElementById("Print").click();
  }
});
