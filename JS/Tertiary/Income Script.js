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
      case "Hawaii":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 2400)) {
              stateIncomeTax = 1.40;
            }
            else if ((gross >= 2401) && (gross <= 4800)) {
              stateIncomeTax = 3.20;
            }
            else if ((gross >= 4801) && (gross <= 9600)) {
              stateIncomeTax = 5.50;
            }
            else if ((gross >= 9601) && (gross <= 14400)) {
              stateIncomeTax = 6.40;
            }
            else if ((gross >= 14401) && (gross <= 19200)) {
              stateIncomeTax = 6.80;
            }
            else if ((gross >= 19201) && (gross <= 24000)) {
              stateIncomeTax = 7.20;
            }
            else if ((gross >= 24001) && (gross <= 36000)) {
              stateIncomeTax = 7.60;
            }
            else if ((gross >= 36001) && (gross <= 48000)) {
              stateIncomeTax = 7.90;
            }
            else if ((gross >= 48001) && (gross <= 150000)) {
              stateIncomeTax = 8.25;
            }
            else if ((gross >= 150001) && (gross <= 175000)) {
              stateIncomeTax = 9.00;
            }
            else if ((gross >= 175001) && (gross <= 200000)) {
              stateIncomeTax = 10.00;
            }
            else if (gross >= 200001) {
              stateIncomeTax = 11.00;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 4800)) {
              stateIncomeTax = 1.40;
            }
            else if ((gross >= 4801) && (gross <= 9600)) {
              stateIncomeTax = 3.20;
            }
            else if ((gross >= 9601) && (gross <= 19200)) {
              stateIncomeTax = 5.50;
            }
            else if ((gross >= 19201) && (gross <= 28800)) {
              stateIncomeTax = 6.40;
            }
            else if ((gross >= 28801) && (gross <= 38400)) {
              stateIncomeTax = 6.80;
            }
            else if ((gross >= 38401) && (gross <= 48000)) {
              stateIncomeTax = 7.20;
            }
            else if ((gross >= 48001) && (gross <= 72000)) {
              stateIncomeTax = 7.60;
            }
            else if ((gross >= 72001) && (gross <= 96000)) {
              stateIncomeTax = 7.90;
            }
            else if ((gross >= 96001) && (gross <= 300000)) {
              stateIncomeTax = 8.25;
            }
            else if ((gross >= 300001) && (gross <= 350000)) {
              stateIncomeTax = 9.00;
            }
            else if ((gross >= 350001) && (gross <= 400000)) {
              stateIncomeTax = 10.00;
            }
            else if (gross >= 400001) {
              stateIncomeTax = 11.00;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Idaho":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 1568)) {
              stateIncomeTax = 1.125;
            }
            else if ((gross >= 1569) && (gross <= 3136)) {
              stateIncomeTax = 3.125;
            }
            else if ((gross >= 3137) && (gross <= 4704)) {
              stateIncomeTax = 3.625;
            }
            else if ((gross >= 4705) && (gross <= 6272)) {
              stateIncomeTax = 4.625;
            }
            else if ((gross >= 6273) && (gross <= 7840)) {
              stateIncomeTax = 5.625;
            }
            else if ((gross >= 7841) && (gross <= 11760)) {
              stateIncomeTax = 6.625;
            }
            else if (gross >= 11761) {
              stateIncomeTax = 6.925;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >=0) && gross <= 3136) {
              stateIncomeTax = 1.125;
            }
            else if ((gross >= 3137) && (gross <= 6272)) {
              stateIncomeTax = 3.125;
            }
            else if ((gross >= 6273) && (gross <= 9408)) {
              stateIncomeTax = 3.625;
            }
            else if ((gross >= 9409) && (gross <= 12544)) {
              stateIncomeTax = 4.625;
            }
            else if ((gross >= 12545) && (gross <= 15680)) {
              stateIncomeTax = 5.625;
            }
            else if ((gross >= 15681) && (gross <= 23520)) {
              stateIncomeTax = 6.625;
            } 
            else if (gross >= 23521) {
              stateIncomeTax = 6.925;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Illinois":
        stateIncomeTax = 4.95;
        break;
      case "Indiana":
        stateIncomeTax = 3.23;
      case "Iowa":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) (gross <= 1676)) {
              stateIncomeTax = 0.33;
            }
            else if ((gross >= 1677) && (gross <= 3352)) {
              stateIncomeTax = 0.67;
            }
            else if ((gross >= 3353) && (gross <= 6704)) {
              stateIncomeTax = 2.25;
            }
            else if ((gross >= 6705) && (gross <= 15084)) {
              stateIncomeTax = 4.14;
            }
            else if ((gross >= 15085) && (gross <= 25140)) {
              stateIncomeTax = 5.63;
            }
            else if ((gross >= 25141) && (gross <= 33520)) {
              stateIncomeTax = 5.96;
            }
            else if ((gross >= 33521) && (gross <= 50280)) {
              stateIncomeTax = 6.25;
            }
            else if ((gross >= 50281) && (gross <= 75420)) {
              stateIncomeTax = 7.44;
            }
            else if (gross >= 75421) {
              stateIncomeTax = 8.53;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) (gross <= 1676)) {
              stateIncomeTax = 0.33;
            }
            else if ((gross >= 1677) && (gross <= 3352)) {
              stateIncomeTax = 0.67;
            }
            else if ((gross >= 3353) && (gross <= 6704)) {
              stateIncomeTax = 2.25;
            }
            else if ((gross >= 6705) && (gross <= 15084)) {
              stateIncomeTax = 4.14;
            }
            else if ((gross >= 15085) && (gross <= 25140)) {
              stateIncomeTax = 5.63;
            }
            else if ((gross >= 25141) && (gross <= 33520)) {
              stateIncomeTax = 5.96;
            }
            else if ((gross >= 33521) && (gross <= 50280)) {
              stateIncomeTax = 6.25;
            }
            else if ((gross >= 50281) && (gross <= 75420)) {
              stateIncomeTax = 7.44;
            }
            else if (gross >= 75421) {
              stateIncomeTax = 8.53;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Kansas":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 15000)) {
              stateIncomeTax = 3.10;
            }
            else if ((gross >= 15001) && (gross <= 30000)) {
              stateIncomeTax = 5.25;
            }
            else if (gross >= 30001) {
              stateIncomeTax = 5.70;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 30000)) {
              stateIncomeTax = 3.10;
            }
            else if ((gross >= 30001) && (gross <= 60000)) {
              stateIncomeTax = 5.25;
            }
            else if (gross >= 60001) {
              stateIncomeTax = 5.75;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Kentucky": 
        stateIncomeTax = 5.00;
        break;
      case "Louisiana": 
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 12500)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 12501) && (gross <= 50000)) {
              stateIncomeTax = 4.00;
            }
            else if (gross >= 50001) {
              stateIncomeTax = 6.00;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 25000)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 25001) && (gross <= 100000)) {
              stateIncomeTax = 4.00;
            }
            else if (gross >= 100001) {
              stateIncomeTax = 6.00;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Maine": 
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 22450)) {
              stateIncomeTax = 5.80;
            }
            else if ((gross >= 22451) && (gross <= 53150)) {
              stateIncomeTax = 6.75;
            }
            else if (gross >= 53151) {
              stateIncomeTax = 7.15;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 44950)) {
              stateIncomeTax = 5.80;
            }
            else if ((gross >= 44951) && (gross <= 106350)) {
              stateIncomeTax = 6.75;
            }
            else if (gross >= 106351) {
              stateIncomeTax = 7.15;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Maryland": 
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 1000)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 1001) && (gross <= 2000)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 2001) && (gross <= 3000)) {
              stateIncomeTax = 4.00;
            }
            else if ((gross >= 3001) && (gross <= 100000)) {
              stateIncomeTax = 4.75;
            }
            else if ((gross >= 100001) && (gross <= 125000)) {
              stateIncomeTax = 5.00;
            }
            else if ((gross >= 125001) && (gross <= 150000)) {
              stateIncomeTax = 5.25;
            }
            else if ((gross >= 150001) && (gross <= 250000)) {
              stateIncomeTax = 5.50;
            }
            else if (gross >= 250001) {
              stateIncomeTax = 5.75;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 1000)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 1001) && (gross <= 2000)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 2001) && (gross <= 3000)) {
              stateIncomeTax = 4.00;
            }
            else if ((gross >= 3001) && (gross <= 150000)) {
              stateIncomeTax = 4.75;
            }
            else if ((gross >= 150001) && (gross <= 175000)) {
              stateIncomeTax = 5.00;
            }
            else if ((gross >= 175001) && (gross <= 225000)) {
              stateIncomeTax = 5.25;
            }
            else if ((gross >= 225001) && (gross <= 300000)) {
              stateIncomeTax = 5.50;
            }
            else if (gross >= 300001) {
              stateIncomeTax = 5.75;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Massachusetts":
        stateIncomeTax = 5.00;
        break;
      case "Michigan":
        stateIncomeTax = 4.25;
      case "Minnesota":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 27230)) {
              stateIncomeTax = 5.35;
            }
            else if ((gross >= 27231) && (gross <= 89440)) {
              stateIncomeTax = 6.80;
            }
            else if ((gross >= 89441) && (gross <= 166040)) {
              stateIncomeTax = 7.85;
            }
            else if (gross >= 166041) {
              stateIncomeTax = 9.85;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 39810)) {
              stateIncomeTax = 5.35;
            }
            else if ((gross >= 39811) && (gross <= 158140)) {
              stateIncomeTax = 6.80;
            }
            else if ((gross >= 158141) && (gross <= 276200)) {
              stateIncomeTax = 7.85;
            }
            else if (gross >= 276201) {
              stateIncomeTax = 9.85;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Mississippi":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 4000)) {
              stateIncomeTax = 0;
            }
            else if ((gross >= 4001) && (gross <= 5000)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 5001) && (gross <= 10000)) {
              stateIncomeTax = 4.00;
            }
            else if (gross >= 10001) {
              stateIncomeTax = 5.00;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 4000)) {
              stateIncomeTax = 0;
            }
            else if ((gross >= 4001) && (gross <= 5000)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 5001) && (gross <= 10000)) {
              stateIncomeTax = 4.00;
            }
            else if (gross >= 10001) {
              stateIncomeTax = 5.00;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Missouri":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 107)) {
              stateIncomeTax = 0;
            }
            else if ((gross >= 108) && (gross <= 1073)) {
              stateIncomeTax = 1.50;
            }
            else if ((gross >= 1074) && (gross <= 2146)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 2147) && (gross <= 3219)) {
              stateIncomeTax = 2.50;
            }
            else if ((gross >= 3220) && (gross <= 4292)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 4293) && (gross <= 5365)) {
              stateIncomeTax = 3.50;
            }
            else if ((gross >= 5366) && (gross <= 6438)) {
              stateIncomeTax = 4.00;
            }
            else if ((gross >= 6439) && (gross <= 7511)) {
              stateIncomeTax = 4.50;
            }
            else if ((gross >= 7512) && (gross <= 8584)) {
              stateIncomeTax = 5.00;
            }
            else if (gross >= 8585) {
              stateIncomeTax = 5.50;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 107)) {
              stateIncomeTax = 0;
            }
            else if ((gross >= 108) && (gross <= 1073)) {
              stateIncomeTax = 1.50;
            }
            else if ((gross >= 1074) && (gross <= 2146)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 2147) && (gross <= 3219)) {
              stateIncomeTax = 2.50;
            }
            else if ((gross >= 3220) && (gross <= 4292)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 4293) && (gross <= 5365)) {
              stateIncomeTax = 3.50;
            }
            else if ((gross >= 5366) && (gross <= 6438)) {
              stateIncomeTax = 4.00;
            }
            else if ((gross >= 6439) && (gross <= 7511)) {
              stateIncomeTax = 4.50;
            }
            else if ((gross >= 7512) && (gross <= 8584)) {
              stateIncomeTax = 5.00;
            }
            else if (gross >= 8585) {
              stateIncomeTax = 5.50;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Montana":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((gross >= 0) && (gross <= 3100)) {
              stateIncomeTax = 1.00;
            }
            else if ((gross >= 3101) && (gross <= 5500)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 5501) && (gross <= 8400)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 8401) && (gross <= 11300)) {
              stateIncomeTax = 4.00;
            }
            else if ((gross >= 11301) && (gross <= 14500)) {
              stateIncomeTax = 5.00;
            }
            else if ((gross >= 14501) && (gross <= 18700)) {
              stateIncomeTax = 6.00;
            }
            else if (gross >= 18701) {
              stateIncomeTax = 6.90;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((gross >= 0) && (gross <= 3100)) {
              stateIncomeTax = 1.00;
            }
            else if ((gross >= 3101) && (gross <= 5500)) {
              stateIncomeTax = 2.00;
            }
            else if ((gross >= 5501) && (gross <= 8400)) {
              stateIncomeTax = 3.00;
            }
            else if ((gross >= 8401) && (gross <= 11300)) {
              stateIncomeTax = 4.00;
            }
            else if ((gross >= 11301) && (gross <= 14500)) {
              stateIncomeTax = 5.00;
            }
            else if ((gross >= 14501) && (gross <= 18700)) {
              stateIncomeTax = 6.00;
            }
            else if (gross >= 18701) {
              stateIncomeTax = 6.90;
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