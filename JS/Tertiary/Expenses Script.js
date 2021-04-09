 /* Function to calculate expenses */
 function Add() {
  // Variables from input field
  var table = document.getElementById("Expenses");
  var name = document.getElementById("Name").value;
  var price = document.getElementById("Price").value;
  if (name == '' || price == '') {
    alert("Please fill out all fields!");
    document.getElementById("Name").value = "";
    document.getElementById("Price").value = "";
  }
  else {
    // Insert a default row from here:
    var Entry = table.insertRow(-1);
    var col0 = Entry.insertCell(0);
    var col1 = Entry.insertCell(1);
    col0.innerHTML = name;
    col1.innerHTML = "$" + parseFloat(price).toFixed(2);
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
  for (var i = 1; i < table.rows.length-1; i++) {
    sumVal += parseFloat(table.rows[i].cells[1].innerHTML.replace('$',''));
  }
  col0.innerHTML = "All Expenses";
  col1.innerHTML = "$" + sumVal.toFixed(2);
}

/* Function to clear row */
 function Remove() {
  var table = document.getElementById("Expenses");
  var rowCount = table.rows.length;
  if (rowCount > 1) {
    table.deleteRow(rowCount - 1);
  }
  else {
    alert("You cannot delete anymore rows!");
  }
}

/* Clear Page Function */
function Clear() {
  location.reload();
}

/* Enter press detection */
$(document).keypress(function(e) {
  if(e.which == 13) {
    document.getElementById("Add").click();
  }
});

/* CMD or CTRL + Enter detection */
$(document).keydown(function(e) {
  if((e.metaKey || e.ctrlKey) && e.keyCode == 13) {
    document.getElementById("Calculate").click();
  }
});

/* CMD or CTRL + Backspace detection */
$(document).keydown(function(e) {
  if((e.metaKey || e.ctrlKey) && e.keyCode == 8) {
    document.getElementById("Remove").click();
  }
});

/* CMD or CTRL + Delete detection */
$(document).keydown(function(e) {
  if((e.metaKey || e.ctrlKey) && e.keyCode == 46) {
    document.getElementById("Clear").click();
  }
});
  
/* CMD or CTRL + P detection */
$(document).keydown(function(e) {
  if((e.metaKey || e.ctrlKey) && e.key === 'p') {
    document.getElementById("Print").click();
  }
});
