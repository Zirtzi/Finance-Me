// Interest rate function
function Rate() {
  // Get interest rate from user
  var rate = document.getElementById("Rate").value;
  var monthly = 1.0 / 12.0;
  rate /= 100;
  rate = Math.pow(1 + rate, monthly) - 1.0;
  return rate;
}
// Monthly payment
function MonthPay() {
  // Get remaining loan amount from user
  var amount = document.getElementById("Amount").value;
  // Get remaining months from user
  var months = document.getElementById("Months").value;
  // Monthly Rate
  var monthRate = Rate();
  // Montly pay amount
  var monthPay = amount * monthRate / (1 - Math.pow(1 + monthRate, -months));
  return monthPay;
}
// Long Number Formatting
function Format(num) {
  return (
    num
      .toFixed(2) // always two decimal digits
      .replace(',', '.') // replace decimal point character with ,
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') // use , as a separator
  ) 
}
/* Function that actually ammortizes the loan */
function Calculate() {
   // Disable Button so it can only be clicked once
   document.getElementById("Calculate").disabled = true;
   document.getElementById("Calculate").style.visibility = "hidden";
   // Collect Months Remaining from user for the for loop to end
   var months = document.getElementById("Months").value;
   // Collect Amount Remaining from user to be put in table
   var remaining = document.getElementById("Amount").value;
   // Get ID for table from HTML file
   var table = document.getElementById("Amortization");
   // Insert a default row from here:
   var Entry = table.insertRow(1);
   var col0 = Entry.insertCell(0);
   var col1 = Entry.insertCell(1);
   var col2 = Entry.insertCell(2);
   var col3 = Entry.insertCell(3);
   var col4 = Entry.insertCell(4);
   col0.innerHTML = months;
   col1.innerHTML = "-";
   col2.innerHTML = "-";
   col3.innerHTML = "-";
   col4.innerHTML = "$" + Format(Math.abs(remaining));
   // -----> to here
   // For loop that will do the calculating for each additional row and column
   for (i = 1; i <= months; i++) {
     // Interest that is paid monthly
     var interest = remaining*Rate();
     // Principal paid monthly
     var principal = Math.abs(MonthPay()) - interest;
     // Remaining Payment
     remaining -= principal;
     var Entry = table.insertRow(i + 1);
     var col0 = Entry.insertCell(0);
     var col1 = Entry.insertCell(1);
     var col2 = Entry.insertCell(2);
     var col3 = Entry.insertCell(3);
     var col4 = Entry.insertCell(4);
     col0.innerHTML = (months - i);
     col1.innerHTML = "$" + Format(Math.abs(MonthPay()));
     col2.innerHTML = "$" + Format(principal);
     col3.innerHTML = "$" + Format(interest);
     col4.innerHTML = "$" + Format(Math.abs(remaining));
    }
    // Final Row Entry
    var finalEntry = table.insertRow(-1);
    var col0Final = finalEntry.insertCell(0);
    var col1Final = finalEntry.insertCell(1);
    var col2Final = finalEntry.insertCell(2);
    var col3Final = finalEntry.insertCell(3);
    var col4Final = finalEntry.insertCell(4);
    // Final Row Totals
    var monthsFinal = 0;
    var paymentFinal = 0;
    var principalPaid = 0;
    var interestPaid = 0;
    var totalPaid = 0;
    for (var i = 2; i < table.rows.length-1; i++) {
      principalPaid += parseFloat(table.rows[i].cells[2].innerHTML.replace('$','').replace(',',''));
      interestPaid += parseFloat(table.rows[i].cells[3].innerHTML.replace('$','').replace(',',''));
    } 
    // Final Row Columns
    col0Final.innerHTML = "Total Months: " + months;
    col1Final.innerHTML = "Monthly Payment: $" + Format(Math.abs(MonthPay()));
    col2Final.innerHTML = "Total Principal Paid: $" + Format(Math.round(principalPaid));
    col3Final.innerHTML = "Total Interest Paid: $" + Format(interestPaid);
    col4Final.innerHTML = "Total Amount Paid: $" + Format(Math.round(principalPaid) + interestPaid);
    var loanTotal = document.getElementById("Amount").value;
    var monthsTotal = document.getElementById("Months").value;
    var interestTotal = document.getElementById("Rate").value;
    document.getElementById("Loan").innerHTML += "$" + loanTotal;
    document.getElementById("MonthsTotal").innerHTML += monthsTotal + " Months";
    document.getElementById("RateTotal").innerHTML += interestTotal + "%";
  }

  /* Function to clear table */
  function Remove() {
    location.reload();
  }

  /* Enter press detection */
  $(document).keypress(function(e) {
    if(e.which == 13) {
      document.getElementById("Calculate").click();
    }
  });

  /* CMD or CTRL + P detection */
  $(document).keydown(function(e) {
    if((e.metaKey || e.ctrlKey) && e.key === 'p') {
      document.getElementById("Print").click();
  }
  });

  /* CMD or CTRL + Backspace detection */
  $(document).keydown(function(e) {
    if((e.metaKey || e.ctrlKey) && e.keyCode == 8) {
      document.getElementById("Remove").click();
  }
  });