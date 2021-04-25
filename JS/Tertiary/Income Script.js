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
  // State rate source: https://taxfoundation.org/publications/state-individual-income-tax-rates-and-brackets/
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
  var stateIncomeTax;
  var ficaTax = 7.65;
  
  /* Detect me Function */
  function DetectMe() {
    var rate = document.getElementById("Rate");
    var hoursPer = document.getElementById("HoursPer");
    var overtimePer = document.getElementById("OvertimePer");
    var status = document.getElementById("status");
    var state = document.getElementById("StateIncome");
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
    switch (state.value) {
      case "Alabama":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 500)) {
              stateIncomeTax = 2.0;
            }
            else if ((gross >= 501) && (gross <= 3000)) {
              stateIncomeTax = 4.0;
            }
            else if (gross >= 3001) {
              stateIncomeTax = 5.0;
            }
          break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 1000)) {
              stateIncomeTax = 2.0;
            }
            else if ((gross >= 1001) && (gross <= 6000)) {
              stateIncomeTax = 4.0;
            }
            else if (gross >= 6001) {
              stateIncomeTax = 5.0;
            }
          break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Alaska":
        stateIncomeTax = 0;
        break;
      case "Arizona":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 27272)) {
              stateIncomeTax = 2.59;
            }
            else if ((gross >= 27273) && (gross <= 54544)) {
              stateIncomeTax = 3.34;
            }
            else if ((gross >= 54545) && (gross <= 163632)) {
              stateIncomeTax = 4.17;
            }
            else if ((gross >= 163633) && (gross <= 250000)) {
              stateIncomeTax = 4.50;
            }
            else if (gross >= 250001) {
              stateIncomeTax = 8.00;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 54544)) {
              stateIncomeTax = 2.59;
            }
            else if ((gross >= 54545) && (gross <= 109088)) {
              stateIncomeTax = 4.17;
            }
            else if ((gross >= 108089) && (gross <= 327263)) {
              stateIncomeTax = 4.50;
            }
            else if (gross >= 327264) {
              stateIncomeTax = 8.00;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Arkansas":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 4000)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 4001) && (gross <= 8000)) {
              stateIncomeTax = 4.00;
            }
            else if (gross >= 8001) {
              stateIncomeTax = 5.90;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 4000)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 4001) && (gross <= 8000)) {
              stateIncomeTax = 4.00;
            }
            else if (gross >= 8001) {
              stateIncomeTax = 5.90;            
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "California":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 8932)) {
              stateIncomeTax = 1.00;
            }
            else if ((gross >= 8933) && (gross <= 21175)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 21176) && (gross <= 33421)) {
              stateIncomeTax = 4.00;
            }
            else if ((gross >= 33422) && (gross <= 46394)) {
              stateIncomeTax = 6.00;
            }
            else if ((gross >= 46395) && (gross <= 59634)) {
              stateIncomeTax = 8.00;
            }
            else if ((gross >= 59635) && (gross <= 299508)) {
              stateIncomeTax = 9.30;
            }
            else if ((gross >= 299509) && (gross <= 359407)) {
              stateIncomeTax = 10.30;
            }
            else if ((gross >= 359408) && (gross <= 599012)) {
              stateIncomeTax = 11.30;
            }
            else if ((gross >= 599013) && (gross <= 1000000)) {
              stateIncomeTax = 12.30;
            }
            else if (gross >= 1000001) {
              stateIncomeTax = 13.30;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 17864)) {
              stateIncomeTax = 1.00;
            }
            else if ((gross >= 17865) && (gross <= 42350)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 42351) && (gross <= 66842)) {
              stateIncomeTax = 4.00;
            }
            else if ((gross >= 66843) && (gross <= 92788)) {
              stateIncomeTax = 6.00;
            }
            else if ((gross >= 92789) && (gross <= 117268)) {
              stateIncomeTax = 8.00;
            }
            else if ((gross >= 117269) && (gross <= 599016)) {
              stateIncomeTax = 9.30;
            }
            else if ((gross >= 599017) && (gross <= 718814)) {
              stateIncomeTax = 10.30;
            }
            else if ((gross >= 718815) && (gross <= 1000000)) {
              stateIncomeTax = 11.30;
            }
            else if ((gross >= 1000001) && (gross <= 1198024)) {
              stateIncomeTax = 12.30;
            }
            else if (gross >= 1198025) {
              stateIncomeTax = 13.30;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Colorado":
        stateIncomeTax = 4.55;
        break;
      case "Connecticut":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 10000)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 10001) && (gross <= 50000)) {
              stateIncomeTax = 5.00;
            }
            else if ((gross >= 50001) && (gross <= 100000)) {
              stateIncomeTax = 5.50;
            }
            else if ((gross >= 100001) && (gross <= 200000)) {
              stateIncomeTax = 6.00;
            }
            else if ((gross >= 200001) && (gross <= 250000)) {
              stateIncomeTax = 6.50;
            }
            else if ((gross >= 250001) && (gross <= 500000)) {
              stateIncomeTax = 6.90;
            }
            else if (gross >= 500000) {
              stateIncomeTax = 6.99;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 20000)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 20001) && (gross <= 100000)) {
              stateIncomeTax = 5.00;
            }
            else if ((gross >= 100001) && (gross <= 200000)) {
              stateIncomeTax = 5.50;
            }
            else if ((gross >= 200001) && (gross <= 400000)) {
              stateIncomeTax = 6.00;
            }
            else if ((gross >= 400001) && (gross <= 500000)) {
              stateIncomeTax = 6.50;
            }
            else if ((gross >= 500001) && (gross <= 1000000)) {
              stateIncomeTax = 6.90;
            }
            else if (gross >= 1000001) {
              stateIncomeTax = 6.99;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Delaware":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 2000)) {
              stateIncomeTax = 0;
            }
            else if ((gross >= 2001) && (gross <= 5000)) {
              stateIncomeTax = 2.20;
            }
            else if ((gross >= 5001) && (gross <= 10000)) {
              stateIncomeTax = 3.90;
            }
            else if ((gross >= 10001) && (gross <= 20000)) {
              stateIncomeTax = 4.80;
            }
            else if ((gross >= 20001) && (gross <= 25000)) {
              stateIncomeTax = 5.20;
            }
            else if ((gross >= 25001) && (gross <= 60000)) {
              stateIncomeTax = 5.55;
            }
            else if (gross >= 60001) {
              stateIncomeTax = 6.60;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 2000)) {
              stateIncomeTax = 0;
            }
            else if ((gross >= 2001) && (gross <= 5000)) {
              stateIncomeTax = 2.20;
            }
            else if ((gross >= 5001) && (gross <= 10000)) {
              stateIncomeTax = 3.90;
            }
            else if ((gross >= 10001) && (gross <= 20000)) {
              stateIncomeTax = 4.80;
            }
            else if ((gross >= 20001) && (gross <= 25000)) {
              stateIncomeTax = 5.20;
            }
            else if ((gross >= 25001) && (gross <= 60000)) {
              stateIncomeTax = 5.55;
            }
            else if (gross >= 60001) {
              stateIncomeTax = 6.60;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Florida":
        stateIncomeTax = 0;
        break;
      case "Georgia":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 750)) {
              stateIncomeTax = 1.00;
            }
            else if ((gross >= 751) && (gross <= 2250)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 2251) && (gross <= 3750)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 3751) && (gross <= 5250)) {
              stateIncomeTax = 4.00;
            }
            else if ((gross >= 5251) && (gross <= 7000)) {
              stateIncomeTax = 5.00;
            }
            else if (gross >= 7001) {
              stateIncomeTax = 5.75;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 1000)) {
              stateIncomeTax = 1.00;
            }
            else if ((gross >= 1001) && (gross <= 3000)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 3001) && (gross <= 5000)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 5001) && (gross <= 7000)) {
              stateIncomeTax = 4.00;
            }
            else if ((gross >= 7001) && (gross <= 10000)) {
              stateIncomeTax = 5.00;
            }
            else if (gross >= 10001) {
              stateIncomeTax = 5.75;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
        
      }
    console.log(state.value);
    console.log(stateIncomeTax);
    console.log(status.value);
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