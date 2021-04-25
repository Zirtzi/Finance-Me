  /* Cascading drop down selection */
  var frequencyObject = {
    "Annually": {
      "Single": [],
      "Married, Jointly": [],
      "Married, Separately": [],
      "Head of Household": [],
    },
    "Semi-Annually": {
      "Single": [],
      "Married, Jointly": [],
      "Married, Separately": [],
      "Head of Household": [],
    },
    "Quarterly": {
      "Single": [],
      "Married, Jointly": [],
      "Married, Separately": [],
      "Head of Household": [], 
    },
    "Monthly": {
      "Single": [],
      "Married, Jointly": [],
      "Married, Separately": [],
      "Head of Household": [], 
    },
    "Bi-Monthly": {
      "Single": [],
      "Married, Jointly": [],
      "Married, Separately": [],
      "Head of Household": [],
    },
    "Weekly": {
      "Single": [],
      "Married, Jointly": [],
      "Married, Separately": [],
      "Head of Household": [], 
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

  // Long Number Formatting
  function Format(num) {
  return (
    num
      .toFixed(2) // always two decimal digits
      .replace(',', '.') // replace decimal point character with ,
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') // use , as a separator
    ) 
  }

  /* Federa Income Rates */
  // Federal rate source: https://www.nerdwallet.com/article/taxes/federal-income-tax-brackets
  // Fica rate source: https://www.nerdwallet.com/article/taxes/fica-tax-withholding
  var federalTaxRates = [10, 12, 22, 24, 32, 35, 37];

  /* Individual Taxes Function */
  function individualTaxes(grossIncome, rate) {
    var grossIncome;
    var rate;
    var indRate = rate / 100;
    var indTax = parseFloat(grossIncome) * (parseFloat(indRate));
    return indTax.toFixed(2);
  }

  /* Total Taxes function */
  function totalTaxes(federal, state, fica) {
    var federal;
    var state;
    var fica;
    var total = parseFloat(federal) + parseFloat(state) + parseFloat(fica);
    var totalFinal = total / 100;
    return totalFinal.toFixed(4);
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
    return net;
  }

  var federalIncomeTax;
  var ficaTax = 7.65;
  
  /* Detect me Function */
  function DetectMe() {
    var rate = document.getElementById("Rate");
    var hoursPer = document.getElementById("HoursPer");
    var overtimePer = document.getElementById("OvertimePer");
    var status = document.getElementById("status");
    var gross = (grossIncome(hoursPer.value, overtimePer.value, rate.value))*52;
    switch (status.value) {
      case "Single":
        if (gross <= 9950) {
          federalIncomeTax = federalTaxRates[0];
        }
        else if ((gross >= 9951) && (gross <= 40525)) {
          federalIncomeTax = federalTaxRates[1];
        }
        else if ((gross >= 40526) && (gross <= 86375)) {
          federalIncomeTax = federalTaxRates[2];
        }
        else if ((gross >= 86376) && (gross <= 164925)) {
          federalIncomeTax = federalTaxRates[3];
        }
        else if ((gross >= 164926) && (gross <= 209425)) {
          federalIncomeTax = federalTaxRates[4];
        }
        else if ((gross >= 209426) && (gross <= 523600)) {
          federalIncomeTax = federalTaxRates[5];
        }
        else if ((gross >= 523601)) {
          federalIncomeTax = federalTaxRates[6];
        }
      break;
      case "Married, Jointly":
        if (gross <= 19900) {
          federalIncomeTax = federalTaxRates[0];
        }
        else if ((gross >= 19901) && (gross <= 81050)) {
          federalIncomeTax = federalTaxRates[1];
        }
        else if ((gross >= 81501) && (gross <= 172750)) {
          federalIncomeTax = federalTaxRates[2];
        }
        else if ((gross >= 172751) && (gross <= 329850)) {
          federalIncomeTax = federalTaxRates[3];
        }
        else if ((gross >= 329851) && (gross <= 418850)) {
          federalIncomeTax = federalTaxRates[4];
        }
        else if ((gross >= 418851) && (gross <= 628300)) {
          federalIncomeTax = federalTaxRates[5];
        }
        else if ((gross >= 628300)) {
          federalIncomeTax = federalTaxRates[6];
        }
      break;
      case "Married, Separately":
        if (gross <= 9950) {
          federalIncomeTax = federalTaxRates[0];
        }
        else if ((gross >= 9951) && (gross <= 40525)) {
          federalIncomeTax = federalTaxRates[1];
        }
        else if ((gross >= 40526) && (gross <= 86375)) {
          federalIncomeTax = federalTaxRates[2];
        }
        else if ((gross >= 86376) && (gross <= 164925)) {
          federalIncomeTax = federalTaxRates[3];
        }
        else if ((gross >= 164926) && (gross <= 209425)) {
          federalIncomeTax = federalTaxRates[4];
        }
        else if ((gross >= 209426) && (gross <= 314150)) {
          federalIncomeTax = federalTaxRates[5];
        }
        else if (gross >= 314151) {
          federalIncomeTax = federalTaxRates[6];
        }
      break;
      case "Head of Household":
        if (gross <= 14200) {
          federalIncomeTax = federalTaxRates[0];
        }
        else if ((gross >= 14201) && (gross <= 54200)) {
          federalIncomeTax = federalTaxRates[1];
        }
        else if ((gross >= 54201) && (gross <= 86350)) {
          federalIncomeTax = federalTaxRates[2];
        }
        else if ((gross >= 86351) && (gross <= 164900)) {
          federalIncomeTax = federalTaxRates[3];
        }
        else if ((gross >= 164901) && (gross <= 209400)) {
          federalIncomeTax = federalTaxRates[4];
        }
        else if ((gross >= 209401) && (gross <= 523600)) {
          federalIncomeTax = federalTaxRates[5];
        }
        else if (gross >= 523601) {
          federalIncomeTax = federalTaxRates[6];
        }
      break;
      default:
        federalIncomeTax = federalIncomeTax;
    }
  }
  
  /* Function to calculate income */
  function Calculate() {
      // Disable Button so it can only be clicked once
      document.getElementById("Calculate").disabled = true;
      document.getElementById("Calculate").style.visibility = "hidden";
      // Get info from selection and input fields
      var freq = document.getElementById("frequency").value;
      var status = document.getElementById("status").value;
      var state = document.getElementById("State").value;
      var hoursPer = document.getElementById("HoursPer").value;
      var overtimePer = document.getElementById("OvertimePer").value;
      var rate = document.getElementById("Rate").value;
      var gross;
      var net;
      var table = document.getElementById("Income");
      console.log(federalIncomeTax);
      // Frequency switch statement
      switch (freq) {
        case "Annually":
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 52);
            var fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            var taxesTotal = parseFloat(totalTaxes(federalIncomeTax, state, ficaTax));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + Format(grossTotal);
            fed = "$" + Format(fedTaxes);
            state = "$" + Format(stateTaxes);
            fica = "$" + Format(ficaTaxes);
            net = "$" + Format(netTotal);
          break;
        case "Semi-Annually":
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 26);
            var fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            var taxesTotal = parseFloat(totalTaxes(federalIncomeTax, state, ficaTax));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + Format(grossTotal);
            fed = "$" + Format(fedTaxes);
            state = "$" + Format(stateTaxes);
            fica = "$" + Format(ficaTaxes);
            net = "$" + Format(netTotal);
          break;
        case "Quarterly":
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 13);
            var fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            var taxesTotal = parseFloat(totalTaxes(federalIncomeTax, state, ficaTax));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + Format(grossTotal);
            fed = "$" + Format(fedTaxes);
            state = "$" + Format(stateTaxes);
            fica = "$" + Format(ficaTaxes);
            net = "$" + Format(netTotal);
          break;
        case "Monthly":
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 4.33);
            var fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            var taxesTotal = parseFloat(totalTaxes(federalIncomeTax, state, ficaTax));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + Format(grossTotal);
            fed = "$" + Format(fedTaxes);
            state = "$" + Format(stateTaxes);
            fica = "$" + Format(ficaTaxes);
            net = "$" + Format(netTotal);
          break;
        case "Bi-Monthly":
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate) * 2);
            var fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            var taxesTotal = parseFloat(totalTaxes(federalIncomeTax, state, ficaTax));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + Format(grossTotal);
            fed = "$" + Format(fedTaxes);
            state = "$" + Format(stateTaxes);
            fica = "$" + Format(ficaTaxes);
            net = "$" + Format(netTotal);
          break;
        case "Weekly":
            var grossTotal = parseFloat(grossIncome(hoursPer, overtimePer, rate));
            var fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            var stateTaxes = parseFloat(individualTaxes(grossTotal, state));
            var ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            var taxesTotal = parseFloat(totalTaxes(federalIncomeTax, state, ficaTax));
            var netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + Format(grossTotal);
            fed = "$" + Format(fedTaxes);
            state = "$" + Format(stateTaxes);
            fica = "$" + Format(ficaTaxes);
            net = "$" + Format(netTotal);
          break;
        default:
          freq = "N/A";
          gross = "";
          fed = "";
          state = "";
          fica = "";
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
      col4.innerHTML = fica;
      col5.innerHTML = net;  
    }

    /* Add Info To Paragraph Field */
    function info() {
      var state = document.getElementById("State").value;
      var hoursPer = document.getElementById("HoursPer").value;
      var overtimePer = document.getElementById("OvertimePer").value;
      var rate = document.getElementById("Rate").value;
      document.getElementById("FedO").innerHTML +=  federalIncomeTax + "%";
      document.getElementById("StateO").innerHTML += state + "%";
      document.getElementById("FicaO").innerHTML += ficaTax + "%";
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