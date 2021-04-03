  /* Cascading drop down selection */
  var frequencyObject = {
    "Annually": {
      "Tax-Exempt": [],
      "Non Tax-Exempt": [], 
    },
    "Semi-Annually": {
      "Tax-Exempt": [],
      "Non Tax-Exempt": [], 
    },
    "Quarterly": {
      "Tax-Exempt": [],
      "Non Tax-Exempt": [], 
    },
    "Monthly": {
      "Tax-Exempt": [],
      "Non Tax-Exempt": [], 
    },
    "Bi-Monthly": {
      "Tax-Exempt": [],
      "Non Tax-Exempt": [], 
    },
    "Weekly": {
      "Tax-Exempt": [],
      "Non Tax-Exempt": [], 
    }
  }
  window.onload = function() {
    var frequencySel = document.getElementById("frequency");
    var statusSel = document.getElementById("status");
    for (var x in frequencyObject) {
      frequencySel.options[frequencySel.options.length] = new Option(x, x);
    }
    frequencySel.onchange = function() {
      //empty employments- and status- dropdowns
      statusSel.length = 1;
      //display correct values
      for (var y in frequencyObject[this.value]) {
        statusSel.options[statusSel.options.length] = new Option(y, y);
      }
    }
  }

  /* Individual Taxes Function */
  function individualTaxes(grossIncome, rate) {
    var grossIncome;
    var rate;
    var indRate = rate / 100;
    var indTax = parseFloat(grossIncome) * (parseFloat(indRate));
    return indTax.toFixed(2);
  }

  /* Total Taxes function */
  function totalTaxes(federal, state, other) {
    var federal;
    var state;
    var other;
    var total = parseFloat(federal) + parseFloat(state) + parseFloat(other);
    var totalFinal = total / 100;
    return totalFinal.toFixed(2);
  }

  /* Gross Income Function */
  function grossIncome(weeklyHours, overtimeHours, rate) {
    var weeklyHours;
    var overtimeHours;
    var rate;
    var overtimeRate = rate * 1.5;
    var gross = (weeklyHours * rate) + (overtimeRate * overtimeHours);
    return gross.toFixed(2);
  }

  /* Net Income Function */
  function netIncome(gross, taxes) {
    var gross;
    var taxes;
    var net = parseFloat(gross) * (1 - parseFloat(taxes));
    var totalNet = net.toFixed(2);
    return totalNet;
  }
  
  
  /* Function to calculate income */
  function Calculate() {
      // Disable Button so it can only be clicked once
      document.getElementById("Calculate").disabled = true;
      document.getElementById("Calculate").style.visibility = "hidden";
      // Get info from selection and input fields
      var freq = document.getElementById("frequency").value;
      var status = document.getElementById("status").value;
      var fed = document.getElementById("Federal").value;
      var state = document.getElementById("State").value;
      var other = document.getElementById("Other").value;
      var hoursPer = document.getElementById("HoursPer").value;
      var overtimePer = document.getElementById("OvertimePer").value;
      var rate = document.getElementById("Rate").value;
      var gross;
      var net;
      var table = document.getElementById("Income");
      // Frequency switch statement
      switch (freq) {
        case "Annually":
          if (status == "Tax-Exempt") {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 52);
            var netTotal = grossTotal;
            gross = "$" + grossTotal;
            fed = "$0";
            state = "$0";
            other = "$0";
            net = "$" + netTotal;
          }
          else {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 52);
            var fedTaxes = parseFloat(individualTaxes(grossTotal, fed));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var otherTaxes = parseFloat(individualTaxes(grossTotal, other));
            var taxesTotal = parseFloat(totalTaxes(fed, state, other));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + grossTotal.toFixed(2);
            fed = "$" + fedTaxes.toFixed(2);
            state = "$" + stateTaxes.toFixed(2);
            other = "$" + otherTaxes.toFixed(2);
            net = "$" + netTotal;
          }
          break;
        case "Semi-Annually":
          if (status == "Tax-Exempt") {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 26);
            var netTotal = grossTotal;
            gross = "$" + grossTotal;
            fed = "$0";
            state = "$0";
            other = "$0";
            net = "$" + netTotal;
          }
          else {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 26);
            var fedTaxes = parseFloat(individualTaxes(grossTotal, fed));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var otherTaxes = parseFloat(individualTaxes(grossTotal, other));
            var taxesTotal = parseFloat(totalTaxes(fed, state, other));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + grossTotal.toFixed(2);
            fed = "$" + fedTaxes.toFixed(2);
            state = "$" + stateTaxes.toFixed(2);
            other = "$" + otherTaxes.toFixed(2);
            net = "$" + netTotal;
          }
          break;
        case "Quarterly":
          if (status == "Tax-Exempt") {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 13);
            var netTotal = grossTotal;
            gross = "$" + grossTotal;
            fed = "$0";
            state = "$0";
            other = "$0";
            net = "$" + netTotal;
          }
          else {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 13);
            var fedTaxes = parseFloat(individualTaxes(grossTotal, fed));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var otherTaxes = parseFloat(individualTaxes(grossTotal, other));
            var taxesTotal = parseFloat(totalTaxes(fed, state, other));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + grossTotal.toFixed(2);
            fed = "$" + fedTaxes.toFixed(2);
            state = "$" + stateTaxes.toFixed(2);
            other = "$" + otherTaxes.toFixed(2);
            net = "$" + netTotal;
          }
          break;
        case "Monthly":
          if (status == "Tax-Exempt") {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 4.33);
            var netTotal = grossTotal;
            gross = "$" + grossTotal;
            fed = "$0";
            state = "$0";
            other = "$0";
            net = "$" + netTotal;
          }
          else {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 4.33);
            var fedTaxes = parseFloat(individualTaxes(grossTotal, fed));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var otherTaxes = parseFloat(individualTaxes(grossTotal, other));
            var taxesTotal = parseFloat(totalTaxes(fed, state, other));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + grossTotal.toFixed(2);
            fed = "$" + fedTaxes.toFixed(2);
            state = "$" + stateTaxes.toFixed(2);
            other = "$" + otherTaxes.toFixed(2);
            net = "$" + netTotal;
          }
          break;
        case "Bi-Monthly":
          if (status == "Tax-Exempt") {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 2);
            var netTotal = grossTotal;
            gross = "$" + grossTotal;
            fed = "$0";
            state = "$0";
            other = "$0";
            net = "$" + netTotal;
          }
          else {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 2);
            var fedTaxes = parseFloat(individualTaxes(grossTotal, fed));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var otherTaxes = parseFloat(individualTaxes(grossTotal, other));
            var taxesTotal = parseFloat(totalTaxes(fed, state, other));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + grossTotal.toFixed(2);
            fed = "$" + fedTaxes.toFixed(2);
            state = "$" + stateTaxes.toFixed(2);
            other = "$" + otherTaxes.toFixed(2);
            net = "$" + netTotal;
          }
          break;
        case "Weekly":
          if (status == "Tax-Exempt") {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate));
            var netTotal = grossTotal;
            gross = "$" + grossTotal;
            fed = "$0";
            state = "$0";
            other = "$0";
            net = "$" + netTotal;
          }
          else {
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate));
            var fedTaxes = parseFloat(individualTaxes(grossTotal, fed));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var otherTaxes = parseFloat(individualTaxes(grossTotal, other));
            var taxesTotal = parseFloat(totalTaxes(fed, state, other));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + grossTotal.toFixed(2);
            fed = "$" + fedTaxes.toFixed(2);
            state = "$" + stateTaxes.toFixed(2);
            other = "$" + otherTaxes.toFixed(2);
            net = "$" + netTotal;
          }
          break;
        default:
          freq = "N/A";
          gross = "";
          fed = "";
          state = "";
          other = "";
          net = "";
      }
      // Insert a default row from here:
      var Entry = table.insertRow(1);
      var col0 = Entry.insertCell(0);
      var col1 = Entry.insertCell(1);
      var col2 = Entry.insertCell(2);
      var col3 = Entry.insertCell(3);
      var col4 = Entry.insertCell(4);    
      var col5 = Entry.insertCell(5);
      col0.innerHTML = freq;
      col1.innerHTML = gross;
      col2.innerHTML = fed;
      col3.innerHTML = state;
      col4.innerHTML = other;
      col5.innerHTML = net;  
    }

    /* Disable Taxes on Tax-Exempt */
    function disableMe() {
      var status = document.getElementById("status").value;
      if (status == "Tax-Exempt") {
        document.getElementById("Federal").disabled = true;
        document.getElementById("State").disabled = true;
        document.getElementById("Other").disabled = true;
      }
      else {
        document.getElementById("Federal").disabled = false;
        document.getElementById("State").disabled = false;
        document.getElementById("Other").disabled = false;
      }
    }

    /* Add Info To Paragraph Field */
    function info() {
      var federal = document.getElementById("Federal").value;
      var state = document.getElementById("State").value;
      var other = document.getElementById("Other").value;
      var hoursPer = document.getElementById("HoursPer").value;
      var overtimePer = document.getElementById("OvertimePer").value;
      var rate = document.getElementById("Rate").value;
      document.getElementById("FedO").innerHTML +=  federal + "%";
      document.getElementById("StateO").innerHTML += state + "%";
      document.getElementById("OtherO").innerHTML += other + "%";
      document.getElementById("HoursPerO").innerHTML += hoursPer;
      document.getElementById("OvertimePerO").innerHTML += overtimePer;
      document.getElementById("RateO").innerHTML += "$" + rate + " / Hour";
    }
  
    /* Function to clear table */
    function Clear() {
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
        document.getElementById("Clear").click();
    }
    });