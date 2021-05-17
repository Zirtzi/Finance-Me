  /* Federa Income Rates */
  // Federal rate source: https://www.nerdwallet.com/article/taxes/federal-income-tax-brackets
  // Fica rate source: https://www.nerdwallet.com/article/taxes/fica-tax-withholding
  // State rate source: https://taxfoundation.org/publications/state-individual-income-tax-rates-and-brackets/
  
  // Long Number Formatting
  function Format(num) {
  return (
    num
      .toFixed(2) // always two decimal digits
      .replace(',', '.') // replace decimal point character with ,
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') // use , as a separator
    ) 
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
  function totalTaxes(federal, state, fica) {
    var federal;
    var state;
    var fica;
    var total = parseFloat(federal) + parseFloat(state) + parseFloat(fica);
    var totalFinal = total / 100;
    return totalFinal.toFixed(4);
  }

  /* Gross Income Function */
  function GrossIncome(weeklyHours, overtimeHours, rate) {
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

  // Global Variables
  var federalIncomeTax;
  var stateIncomeTax;
  var grossIncome;
  var ficaTax = 7.65;
  var federalTaxRates = [10, 12, 22, 24, 32, 35, 37];

  /* On Load Function */
  function OnLoad() {
    var salary = document.getElementById("Salary");
    var rate = document.getElementById("Rate");
    var weeklyHours = document.getElementById("HoursPer");
    var overtimeHours = document.getElementById("OvertimePer");
    var stateSelection = document.getElementById("StateSelection");
    var payFrequency = document.getElementById("PayFrequency");
    var filingStatus = document.getElementById("FilingStatus");
    salary.disabled = true;
    rate.disabled = true;
    weeklyHours.disabled = true;
    overtimeHours.disabled = true;
    stateSelection.style.display = "none";
    payFrequency.style.display = "none";
    filingStatus.style.display = "none";
  }

  /* Pay Frequency on Change Function */
  function PayFreqOnChange() {
    var payType = document.getElementById("PayType");
    var salary = document.getElementById("Salary");
    var rate = document.getElementById("Rate");
    var hourlyRate = document.getElementById("HourlyRate");
    var weeklyHours = document.getElementById("HoursPer");
    var hoursWeek = document.getElementById("HoursWeek");
    var overtimeHours = document.getElementById("OvertimePer");
    var overtimeWeek = document.getElementById("OvertimeWeek");
    var grossSalary = document.getElementById("GrossSalary");
    switch (payType.value) {
      case "Hourly":
        if ((hourlyRate.style.display === "none") && (hoursWeek.style.display === "none") && (overtimeWeek.style.display === "none"))
        {
          hourlyRate.style.display = "";
          hoursWeek.style.display = "";
          overtimeWeek.style.display = "";
        }
        grossSalary.style.display = "none";
        rate.disabled = false;
        weeklyHours.disabled = false;
        overtimeHours.disabled = false;
      break;
      case "Salaried":
        if (grossSalary.style.display === "none") {
          grossSalary.style.display = "";
        }
        salary.disabled = false;
        hourlyRate.style.display = "none";
        hoursWeek.style.display = "none";
        overtimeWeek.style.display = "none";
      break;
      default:
        rate.disabled = true;
        salary.disabled = true;
        weeklyHours.disabled = true;
        overtimeHours.disabled = true;
        grossSalary.style.display = "";
        hourlyRate.style.display = "";
        hoursWeek.style.display = "";
        overtimeWeek.style.display = "";
    }
  }

  /* Gross Calculation Function */
  function GrossCalculation() {
    var payType = document.getElementById("PayType");
    var salary = document.getElementById("Salary");
    var rate = document.getElementById("Rate");
    var hoursPer = document.getElementById("HoursPer");
    var weeklyHours = document.getElementById("HoursPer");
    var overtimePer = document.getElementById("OvertimePer");
    var overtimeHours = document.getElementById("OvertimePer");
    var stateSelection = document.getElementById("StateSelection");
    var state = document.getElementById("StateIncome");
    switch (payType.value) {
      case "Hourly":
        grossIncome = (GrossIncome(weeklyHours.value, overtimeHours.value, rate.value))*52;
      break;
      case "Salaried":
        grossIncome = salary.value;
      break;
      default:
    }
    if ((salary.value > 0) || ((rate.value > 0) && (hoursPer.value > 0) && (overtimePer.value > 0))) {
      stateSelection.style.display = "";
      state.disabled = false;
    }
  }

  /* State on Change Function */
  function StateOnChange() {
    var payFrequency = document.getElementById("PayFrequency");
    var filingStatus = document.getElementById("FilingStatus");
    var freq = document.getElementById("frequency");
    var status = document.getElementById("status");
    var state = document.getElementById("StateIncome");
    var typeOfPay = document.getElementById("TypeOfPay");
    var grossSalary = document.getElementById("GrossSalary");
    var hourlyRate = document.getElementById("HourlyRate");
    var hourlyWeek = document.getElementById("HoursWeek");
    var overtimeWeek = document.getElementById("OvertimeWeek");
    if (state.value != "selected") {
      payFrequency.style.display = "";
      filingStatus.style.display = "";
      freq.disabled = false;
      status.disabled = false;
      typeOfPay.style.display = "none";
      grossSalary.style.display = "none";
      hourlyRate.style.display = "none";
      hourlyWeek.style.display = "none";
      overtimeWeek.style.display = "none";
    }
  }
  
  /* Tax Bracket Function */
  function TaxBracket() {
    var status = document.getElementById("status");
    var state = document.getElementById("StateIncome");
    // Federal Income Tax Rate Detection
    switch (status.value) {
      case "Single":
        if (grossIncome <= 9950) {
          federalIncomeTax = federalTaxRates[0];
        }
        else if ((grossIncome >= 9951) && (grossIncome <= 40525)) {
          federalIncomeTax = federalTaxRates[1];
        }
        else if ((grossIncome >= 40526) && (grossIncome <= 86375)) {
          federalIncomeTax = federalTaxRates[2];
        }
        else if ((grossIncome >= 86376) && (grossIncome <= 164925)) {
          federalIncomeTax = federalTaxRates[3];
        }
        else if ((grossIncome >= 164926) && (grossIncome <= 209425)) {
          federalIncomeTax = federalTaxRates[4];
        }
        else if ((grossIncome >= 209426) && (grossIncome <= 523600)) {
          federalIncomeTax = federalTaxRates[5];
        }
        else if ((grossIncome >= 523601)) {
          federalIncomeTax = federalTaxRates[6];
        }
      break;
      case "Married, Jointly":
        if (grossIncome <= 19900) {
          federalIncomeTax = federalTaxRates[0];
        }
        else if ((grossIncome >= 19901) && (grossIncome <= 81050)) {
          federalIncomeTax = federalTaxRates[1];
        }
        else if ((grossIncome >= 81501) && (grossIncome <= 172750)) {
          federalIncomeTax = federalTaxRates[2];
        }
        else if ((grossIncome >= 172751) && (grossIncome <= 329850)) {
          federalIncomeTax = federalTaxRates[3];
        }
        else if ((grossIncome >= 329851) && (grossIncome <= 418850)) {
          federalIncomeTax = federalTaxRates[4];
        }
        else if ((grossIncome >= 418851) && (grossIncome <= 628300)) {
          federalIncomeTax = federalTaxRates[5];
        }
        else if ((grossIncome >= 628300)) {
          federalIncomeTax = federalTaxRates[6];
        }
      break;
      case "Married, Separately":
        if (grossIncome <= 9950) {
          federalIncomeTax = federalTaxRates[0];
        }
        else if ((grossIncome >= 9951) && (grossIncome <= 40525)) {
          federalIncomeTax = federalTaxRates[1];
        }
        else if ((grossIncome >= 40526) && (grossIncome <= 86375)) {
          federalIncomeTax = federalTaxRates[2];
        }
        else if ((grossIncome >= 86376) && (grossIncome <= 164925)) {
          federalIncomeTax = federalTaxRates[3];
        }
        else if ((grossIncome >= 164926) && (grossIncome <= 209425)) {
          federalIncomeTax = federalTaxRates[4];
        }
        else if ((grossIncome >= 209426) && (grossIncome <= 314150)) {
          federalIncomeTax = federalTaxRates[5];
        }
        else if (grossIncome >= 314151) {
          federalIncomeTax = federalTaxRates[6];
        }
      break;
      case "Head of Household":
        if (grossIncome <= 14200) {
          federalIncomeTax = federalTaxRates[0];
        }
        else if ((grossIncome >= 14201) && (grossIncome <= 54200)) {
          federalIncomeTax = federalTaxRates[1];
        }
        else if ((grossIncome >= 54201) && (grossIncome <= 86350)) {
          federalIncomeTax = federalTaxRates[2];
        }
        else if ((grossIncome >= 86351) && (grossIncome <= 164900)) {
          federalIncomeTax = federalTaxRates[3];
        }
        else if ((grossIncome >= 164901) && (grossIncome <= 209400)) {
          federalIncomeTax = federalTaxRates[4];
        }
        else if ((grossIncome >= 209401) && (grossIncome <= 523600)) {
          federalIncomeTax = federalTaxRates[5];
        }
        else if (grossIncome >= 523601) {
          federalIncomeTax = federalTaxRates[6];
        }
      break;
      default:
        federalIncomeTax = federalIncomeTax;
    }
    // State Income Tax Detection
    switch (state.value) {
      case "Alabama":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 500)) {
              stateIncomeTax = 2.0;
            }
            else if ((grossIncome >= 501) && (grossIncome <= 3000)) {
              stateIncomeTax = 4.0;
            }
            else if (grossIncome >= 3001) {
              stateIncomeTax = 5.0;
            }
          break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 1000)) {
              stateIncomeTax = 2.0;
            }
            else if ((grossIncome >= 1001) && (grossIncome <= 6000)) {
              stateIncomeTax = 4.0;
            }
            else if (grossIncome >= 6001) {
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
            if ((grossIncome >= 0) && (grossIncome <= 27272)) {
              stateIncomeTax = 2.59;
            }
            else if ((grossIncome >= 27273) && (grossIncome <= 54544)) {
              stateIncomeTax = 3.34;
            }
            else if ((grossIncome >= 54545) && (grossIncome <= 163632)) {
              stateIncomeTax = 4.17;
            }
            else if ((grossIncome >= 163633) && (grossIncome <= 250000)) {
              stateIncomeTax = 4.50;
            }
            else if (grossIncome >= 250001) {
              stateIncomeTax = 8.00;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 54544)) {
              stateIncomeTax = 2.59;
            }
            else if ((grossIncome >= 54545) && (grossIncome <= 109088)) {
              stateIncomeTax = 4.17;
            }
            else if ((grossIncome >= 108089) && (grossIncome <= 327263)) {
              stateIncomeTax = 4.50;
            }
            else if (grossIncome >= 327264) {
              stateIncomeTax = 8.00;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Arkansas":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 4000)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 4001) && (grossIncome <= 8000)) {
              stateIncomeTax = 4.00;
            }
            else if (grossIncome >= 8001) {
              stateIncomeTax = 5.90;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 4000)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 4001) && (grossIncome <= 8000)) {
              stateIncomeTax = 4.00;
            }
            else if (grossIncome >= 8001) {
              stateIncomeTax = 5.90;            
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "California":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 8932)) {
              stateIncomeTax = 1.00;
            }
            else if ((grossIncome >= 8933) && (grossIncome <= 21175)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 21176) && (grossIncome <= 33421)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 33422) && (grossIncome <= 46394)) {
              stateIncomeTax = 6.00;
            }
            else if ((grossIncome >= 46395) && (grossIncome <= 59634)) {
              stateIncomeTax = 8.00;
            }
            else if ((grossIncome >= 59635) && (grossIncome <= 299508)) {
              stateIncomeTax = 9.30;
            }
            else if ((grossIncome >= 299509) && (grossIncome <= 359407)) {
              stateIncomeTax = 10.30;
            }
            else if ((grossIncome >= 359408) && (grossIncome <= 599012)) {
              stateIncomeTax = 11.30;
            }
            else if ((grossIncome >= 599013) && (grossIncome <= 1000000)) {
              stateIncomeTax = 12.30;
            }
            else if (grossIncome >= 1000001) {
              stateIncomeTax = 13.30;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 17864)) {
              stateIncomeTax = 1.00;
            }
            else if ((grossIncome >= 17865) && (grossIncome <= 42350)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 42351) && (grossIncome <= 66842)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 66843) && (grossIncome <= 92788)) {
              stateIncomeTax = 6.00;
            }
            else if ((grossIncome >= 92789) && (grossIncome <= 117268)) {
              stateIncomeTax = 8.00;
            }
            else if ((grossIncome >= 117269) && (grossIncome <= 599016)) {
              stateIncomeTax = 9.30;
            }
            else if ((grossIncome >= 599017) && (grossIncome <= 718814)) {
              stateIncomeTax = 10.30;
            }
            else if ((grossIncome >= 718815) && (grossIncome <= 1000000)) {
              stateIncomeTax = 11.30;
            }
            else if ((grossIncome >= 1000001) && (grossIncome <= 1198024)) {
              stateIncomeTax = 12.30;
            }
            else if (grossIncome >= 1198025) {
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
            if ((grossIncome >= 0) && (grossIncome <= 10000)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 10001) && (grossIncome <= 50000)) {
              stateIncomeTax = 5.00;
            }
            else if ((grossIncome >= 50001) && (grossIncome <= 100000)) {
              stateIncomeTax = 5.50;
            }
            else if ((grossIncome >= 100001) && (grossIncome <= 200000)) {
              stateIncomeTax = 6.00;
            }
            else if ((grossIncome >= 200001) && (grossIncome <= 250000)) {
              stateIncomeTax = 6.50;
            }
            else if ((grossIncome >= 250001) && (grossIncome <= 500000)) {
              stateIncomeTax = 6.90;
            }
            else if (grossIncome >= 500000) {
              stateIncomeTax = 6.99;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 20000)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 20001) && (grossIncome <= 100000)) {
              stateIncomeTax = 5.00;
            }
            else if ((grossIncome >= 100001) && (grossIncome <= 200000)) {
              stateIncomeTax = 5.50;
            }
            else if ((grossIncome >= 200001) && (grossIncome <= 400000)) {
              stateIncomeTax = 6.00;
            }
            else if ((grossIncome >= 400001) && (grossIncome <= 500000)) {
              stateIncomeTax = 6.50;
            }
            else if ((grossIncome >= 500001) && (grossIncome <= 1000000)) {
              stateIncomeTax = 6.90;
            }
            else if (grossIncome >= 1000001) {
              stateIncomeTax = 6.99;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Delaware":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 2000)) {
              stateIncomeTax = 0;
            }
            else if ((grossIncome >= 2001) && (grossIncome <= 5000)) {
              stateIncomeTax = 2.20;
            }
            else if ((grossIncome >= 5001) && (grossIncome <= 10000)) {
              stateIncomeTax = 3.90;
            }
            else if ((grossIncome >= 10001) && (grossIncome <= 20000)) {
              stateIncomeTax = 4.80;
            }
            else if ((grossIncome >= 20001) && (grossIncome <= 25000)) {
              stateIncomeTax = 5.20;
            }
            else if ((grossIncome >= 25001) && (grossIncome <= 60000)) {
              stateIncomeTax = 5.55;
            }
            else if (grossIncome >= 60001) {
              stateIncomeTax = 6.60;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 2000)) {
              stateIncomeTax = 0;
            }
            else if ((grossIncome >= 2001) && (grossIncome <= 5000)) {
              stateIncomeTax = 2.20;
            }
            else if ((grossIncome >= 5001) && (grossIncome <= 10000)) {
              stateIncomeTax = 3.90;
            }
            else if ((grossIncome >= 10001) && (grossIncome <= 20000)) {
              stateIncomeTax = 4.80;
            }
            else if ((grossIncome >= 20001) && (grossIncome <= 25000)) {
              stateIncomeTax = 5.20;
            }
            else if ((grossIncome >= 25001) && (grossIncome <= 60000)) {
              stateIncomeTax = 5.55;
            }
            else if (grossIncome >= 60001) {
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
            if ((grossIncome >= 0) && (grossIncome <= 750)) {
              stateIncomeTax = 1.00;
            }
            else if ((grossIncome >= 751) && (grossIncome <= 2250)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 2251) && (grossIncome <= 3750)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 3751) && (grossIncome <= 5250)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 5251) && (grossIncome <= 7000)) {
              stateIncomeTax = 5.00;
            }
            else if (grossIncome >= 7001) {
              stateIncomeTax = 5.75;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 1000)) {
              stateIncomeTax = 1.00;
            }
            else if ((grossIncome >= 1001) && (grossIncome <= 3000)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 3001) && (grossIncome <= 5000)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 5001) && (grossIncome <= 7000)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 7001) && (grossIncome <= 10000)) {
              stateIncomeTax = 5.00;
            }
            else if (grossIncome >= 10001) {
              stateIncomeTax = 5.75;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Hawaii":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 2400)) {
              stateIncomeTax = 1.40;
            }
            else if ((grossIncome >= 2401) && (grossIncome <= 4800)) {
              stateIncomeTax = 3.20;
            }
            else if ((grossIncome >= 4801) && (grossIncome <= 9600)) {
              stateIncomeTax = 5.50;
            }
            else if ((grossIncome >= 9601) && (grossIncome <= 14400)) {
              stateIncomeTax = 6.40;
            }
            else if ((grossIncome >= 14401) && (grossIncome <= 19200)) {
              stateIncomeTax = 6.80;
            }
            else if ((grossIncome >= 19201) && (grossIncome <= 24000)) {
              stateIncomeTax = 7.20;
            }
            else if ((grossIncome >= 24001) && (grossIncome <= 36000)) {
              stateIncomeTax = 7.60;
            }
            else if ((grossIncome >= 36001) && (grossIncome <= 48000)) {
              stateIncomeTax = 7.90;
            }
            else if ((grossIncome >= 48001) && (grossIncome <= 150000)) {
              stateIncomeTax = 8.25;
            }
            else if ((grossIncome >= 150001) && (grossIncome <= 175000)) {
              stateIncomeTax = 9.00;
            }
            else if ((grossIncome >= 175001) && (grossIncome <= 200000)) {
              stateIncomeTax = 10.00;
            }
            else if (grossIncome >= 200001) {
              stateIncomeTax = 11.00;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 4800)) {
              stateIncomeTax = 1.40;
            }
            else if ((grossIncome >= 4801) && (grossIncome <= 9600)) {
              stateIncomeTax = 3.20;
            }
            else if ((grossIncome >= 9601) && (grossIncome <= 19200)) {
              stateIncomeTax = 5.50;
            }
            else if ((grossIncome >= 19201) && (grossIncome <= 28800)) {
              stateIncomeTax = 6.40;
            }
            else if ((grossIncome >= 28801) && (grossIncome <= 38400)) {
              stateIncomeTax = 6.80;
            }
            else if ((grossIncome >= 38401) && (grossIncome <= 48000)) {
              stateIncomeTax = 7.20;
            }
            else if ((grossIncome >= 48001) && (grossIncome <= 72000)) {
              stateIncomeTax = 7.60;
            }
            else if ((grossIncome >= 72001) && (grossIncome <= 96000)) {
              stateIncomeTax = 7.90;
            }
            else if ((grossIncome >= 96001) && (grossIncome <= 300000)) {
              stateIncomeTax = 8.25;
            }
            else if ((grossIncome >= 300001) && (grossIncome <= 350000)) {
              stateIncomeTax = 9.00;
            }
            else if ((grossIncome >= 350001) && (grossIncome <= 400000)) {
              stateIncomeTax = 10.00;
            }
            else if (grossIncome >= 400001) {
              stateIncomeTax = 11.00;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Idaho":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 1568)) {
              stateIncomeTax = 1.125;
            }
            else if ((grossIncome >= 1569) && (grossIncome <= 3136)) {
              stateIncomeTax = 3.125;
            }
            else if ((grossIncome >= 3137) && (grossIncome <= 4704)) {
              stateIncomeTax = 3.625;
            }
            else if ((grossIncome >= 4705) && (grossIncome <= 6272)) {
              stateIncomeTax = 4.625;
            }
            else if ((grossIncome >= 6273) && (grossIncome <= 7840)) {
              stateIncomeTax = 5.625;
            }
            else if ((grossIncome >= 7841) && (grossIncome <= 11760)) {
              stateIncomeTax = 6.625;
            }
            else if (grossIncome >= 11761) {
              stateIncomeTax = 6.925;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >=0) && grossIncome <= 3136) {
              stateIncomeTax = 1.125;
            }
            else if ((grossIncome >= 3137) && (grossIncome <= 6272)) {
              stateIncomeTax = 3.125;
            }
            else if ((grossIncome >= 6273) && (grossIncome <= 9408)) {
              stateIncomeTax = 3.625;
            }
            else if ((grossIncome >= 9409) && (grossIncome <= 12544)) {
              stateIncomeTax = 4.625;
            }
            else if ((grossIncome >= 12545) && (grossIncome <= 15680)) {
              stateIncomeTax = 5.625;
            }
            else if ((grossIncome >= 15681) && (grossIncome <= 23520)) {
              stateIncomeTax = 6.625;
            } 
            else if (grossIncome >= 23521) {
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
            if ((grossIncome >= 0) && (grossIncome <= 1676)) {
              stateIncomeTax = 0.33;
            }
            else if ((grossIncome >= 1677) && (grossIncome <= 3352)) {
              stateIncomeTax = 0.67;
            }
            else if ((grossIncome >= 3353) && (grossIncome <= 6704)) {
              stateIncomeTax = 2.25;
            }
            else if ((grossIncome >= 6705) && (grossIncome <= 15084)) {
              stateIncomeTax = 4.14;
            }
            else if ((grossIncome >= 15085) && (grossIncome <= 25140)) {
              stateIncomeTax = 5.63;
            }
            else if ((grossIncome >= 25141) && (grossIncome <= 33520)) {
              stateIncomeTax = 5.96;
            }
            else if ((grossIncome >= 33521) && (grossIncome <= 50280)) {
              stateIncomeTax = 6.25;
            }
            else if ((grossIncome >= 50281) && (grossIncome <= 75420)) {
              stateIncomeTax = 7.44;
            }
            else if (grossIncome >= 75421) {
              stateIncomeTax = 8.53;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) (grossIncome <= 1676)) {
              stateIncomeTax = 0.33;
            }
            else if ((grossIncome >= 1677) && (grossIncome <= 3352)) {
              stateIncomeTax = 0.67;
            }
            else if ((grossIncome >= 3353) && (grossIncome <= 6704)) {
              stateIncomeTax = 2.25;
            }
            else if ((grossIncome >= 6705) && (grossIncome <= 15084)) {
              stateIncomeTax = 4.14;
            }
            else if ((grossIncome >= 15085) && (grossIncome <= 25140)) {
              stateIncomeTax = 5.63;
            }
            else if ((grossIncome >= 25141) && (grossIncome <= 33520)) {
              stateIncomeTax = 5.96;
            }
            else if ((grossIncome >= 33521) && (grossIncome <= 50280)) {
              stateIncomeTax = 6.25;
            }
            else if ((grossIncome >= 50281) && (grossIncome <= 75420)) {
              stateIncomeTax = 7.44;
            }
            else if (grossIncome >= 75421) {
              stateIncomeTax = 8.53;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Kansas":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 15000)) {
              stateIncomeTax = 3.10;
            }
            else if ((grossIncome >= 15001) && (grossIncome <= 30000)) {
              stateIncomeTax = 5.25;
            }
            else if (grossIncome >= 30001) {
              stateIncomeTax = 5.70;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 30000)) {
              stateIncomeTax = 3.10;
            }
            else if ((grossIncome >= 30001) && (grossIncome <= 60000)) {
              stateIncomeTax = 5.25;
            }
            else if (grossIncome >= 60001) {
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
            if ((grossIncome >= 0) && (grossIncome <= 12500)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 12501) && (grossIncome <= 50000)) {
              stateIncomeTax = 4.00;
            }
            else if (grossIncome >= 50001) {
              stateIncomeTax = 6.00;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 25000)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 25001) && (grossIncome <= 100000)) {
              stateIncomeTax = 4.00;
            }
            else if (grossIncome >= 100001) {
              stateIncomeTax = 6.00;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Maine": 
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 22450)) {
              stateIncomeTax = 5.80;
            }
            else if ((grossIncome >= 22451) && (grossIncome <= 53150)) {
              stateIncomeTax = 6.75;
            }
            else if (grossIncome >= 53151) {
              stateIncomeTax = 7.15;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 44950)) {
              stateIncomeTax = 5.80;
            }
            else if ((grossIncome >= 44951) && (grossIncome <= 106350)) {
              stateIncomeTax = 6.75;
            }
            else if (grossIncome >= 106351) {
              stateIncomeTax = 7.15;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Maryland": 
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 1000)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 1001) && (grossIncome <= 2000)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 2001) && (grossIncome <= 3000)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 3001) && (grossIncome <= 100000)) {
              stateIncomeTax = 4.75;
            }
            else if ((grossIncome >= 100001) && (grossIncome <= 125000)) {
              stateIncomeTax = 5.00;
            }
            else if ((grossIncome >= 125001) && (grossIncome <= 150000)) {
              stateIncomeTax = 5.25;
            }
            else if ((grossIncome >= 150001) && (grossIncome <= 250000)) {
              stateIncomeTax = 5.50;
            }
            else if (grossIncome >= 250001) {
              stateIncomeTax = 5.75;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 1000)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 1001) && (grossIncome <= 2000)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 2001) && (grossIncome <= 3000)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 3001) && (grossIncome <= 150000)) {
              stateIncomeTax = 4.75;
            }
            else if ((grossIncome >= 150001) && (grossIncome <= 175000)) {
              stateIncomeTax = 5.00;
            }
            else if ((grossIncome >= 175001) && (grossIncome <= 225000)) {
              stateIncomeTax = 5.25;
            }
            else if ((grossIncome >= 225001) && (grossIncome <= 300000)) {
              stateIncomeTax = 5.50;
            }
            else if (grossIncome >= 300001) {
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
            if ((grossIncome >= 0) && (grossIncome <= 27230)) {
              stateIncomeTax = 5.35;
            }
            else if ((grossIncome >= 27231) && (grossIncome <= 89440)) {
              stateIncomeTax = 6.80;
            }
            else if ((grossIncome >= 89441) && (grossIncome <= 166040)) {
              stateIncomeTax = 7.85;
            }
            else if (grossIncome >= 166041) {
              stateIncomeTax = 9.85;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 39810)) {
              stateIncomeTax = 5.35;
            }
            else if ((grossIncome >= 39811) && (grossIncome <= 158140)) {
              stateIncomeTax = 6.80;
            }
            else if ((grossIncome >= 158141) && (grossIncome <= 276200)) {
              stateIncomeTax = 7.85;
            }
            else if (grossIncome >= 276201) {
              stateIncomeTax = 9.85;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Mississippi":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 4000)) {
              stateIncomeTax = 0;
            }
            else if ((grossIncome >= 4001) && (grossIncome <= 5000)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 5001) && (grossIncome <= 10000)) {
              stateIncomeTax = 4.00;
            }
            else if (grossIncome >= 10001) {
              stateIncomeTax = 5.00;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 4000)) {
              stateIncomeTax = 0;
            }
            else if ((grossIncome >= 4001) && (grossIncome <= 5000)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 5001) && (grossIncome <= 10000)) {
              stateIncomeTax = 4.00;
            }
            else if (grossIncome >= 10001) {
              stateIncomeTax = 5.00;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Missouri":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 107)) {
              stateIncomeTax = 0;
            }
            else if ((grossIncome >= 108) && (grossIncome <= 1073)) {
              stateIncomeTax = 1.50;
            }
            else if ((grossIncome >= 1074) && (grossIncome <= 2146)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 2147) && (grossIncome <= 3219)) {
              stateIncomeTax = 2.50;
            }
            else if ((grossIncome >= 3220) && (grossIncome <= 4292)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 4293) && (grossIncome <= 5365)) {
              stateIncomeTax = 3.50;
            }
            else if ((grossIncome >= 5366) && (grossIncome <= 6438)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 6439) && (grossIncome <= 7511)) {
              stateIncomeTax = 4.50;
            }
            else if ((grossIncome >= 7512) && (grossIncome <= 8584)) {
              stateIncomeTax = 5.00;
            }
            else if (grossIncome >= 8585) {
              stateIncomeTax = 5.50;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 107)) {
              stateIncomeTax = 0;
            }
            else if ((grossIncome >= 108) && (grossIncome <= 1073)) {
              stateIncomeTax = 1.50;
            }
            else if ((grossIncome >= 1074) && (grossIncome <= 2146)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 2147) && (grossIncome <= 3219)) {
              stateIncomeTax = 2.50;
            }
            else if ((grossIncome >= 3220) && (grossIncome <= 4292)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 4293) && (grossIncome <= 5365)) {
              stateIncomeTax = 3.50;
            }
            else if ((grossIncome >= 5366) && (grossIncome <= 6438)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 6439) && (grossIncome <= 7511)) {
              stateIncomeTax = 4.50;
            }
            else if ((grossIncome >= 7512) && (grossIncome <= 8584)) {
              stateIncomeTax = 5.00;
            }
            else if (grossIncome >= 8585) {
              stateIncomeTax = 5.50;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Montana":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 3100)) {
              stateIncomeTax = 1.00;
            }
            else if ((grossIncome >= 3101) && (grossIncome <= 5500)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 5501) && (grossIncome <= 8400)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 8401) && (grossIncome <= 11300)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 11301) && (grossIncome <= 14500)) {
              stateIncomeTax = 5.00;
            }
            else if ((grossIncome >= 14501) && (grossIncome <= 18700)) {
              stateIncomeTax = 6.00;
            }
            else if (grossIncome >= 18701) {
              stateIncomeTax = 6.90;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 3100)) {
              stateIncomeTax = 1.00;
            }
            else if ((grossIncome >= 3101) && (grossIncome <= 5500)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 5501) && (grossIncome <= 8400)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 8401) && (grossIncome <= 11300)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 11301) && (grossIncome <= 14500)) {
              stateIncomeTax = 5.00;
            }
            else if ((grossIncome >= 14501) && (grossIncome <= 18700)) {
              stateIncomeTax = 6.00;
            }
            else if (grossIncome >= 18701) {
              stateIncomeTax = 6.90;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Nebraska":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 3340)) {
              stateIncomeTax = 2.46;
            }
            else if ((grossIncome >= 3341) && (grossIncome <= 19990)) {
              stateIncomeTax = 3.51;
            }
            else if ((grossIncome >= 19991) && (grossIncome <= 31210)) {
              stateIncomeTax = 5.10;
            }
            else if (grossIncome >= 31211) {
              stateIncomeTax = 6.84;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 6660)) {
              stateIncomeTax = 2.46;
            }
            else if ((grossIncome >= 6661) && (grossIncome <= 39990)) {
              stateIncomeTax = 3.51;
            }
            else if ((grossIncome >= 39991) && (grossIncome <= 64430)) {
              stateIncomeTax = 5.01;
            }
            else if (grossIncome >= 64430) {
              stateIncomeTax = 6.84;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Nevada":
        stateIncomeTax = 0;
        break;
      case "New Hampshire":
        stateIncomeTax = 5.00;
        break;
      case "New Jersey":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 20000)) {
              stateIncomeTax = 1.40;
            }
            else if ((grossIncome >= 20001) && (grossIncome <= 35000)) {
              stateIncomeTax = 1.750;
            }
            else if ((grossIncome >= 35001) && (grossIncome <= 40000)) {
              stateIncomeTax = 3.500;
            }
            else if ((grossIncome >= 40001) && (grossIncome <= 75000)) {
              stateIncomeTax = 5.525;
            }
            else if ((grossIncome >= 75001) && (grossIncome <= 500000)) {
              stateIncomeTax = 6.370;
            }
            else if ((grossIncome >= 500001) && (grossIncome <= 1000000)) {
              stateIncomeTax = 8.970;
            }
            else if (grossIncome >= 1000001) {
              stateIncomeTax = 10.750;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 20000)) {
              stateIncomeTax = 1.40;
            }
            else if ((grossIncome >= 20001) && (grossIncome <= 50000)) {
              stateIncomeTax = 1.750;
            }
            else if ((grossIncome >= 50001) && (grossIncome <= 70000)) {
              stateIncomeTax = 2.450;
            }
            else if ((grossIncome >= 70001) && (grossIncome <= 80000)) {
              stateIncomeTax = 3.500;
            }
            else if ((grossIncome >= 80001) && (grossIncome <= 150000)) {
              stateIncomeTax = 5.525;
            }
            else if ((grossIncome >= 150001) && (grossIncome <= 500000)) {
              stateIncomeTax = 6.370;
            }
            else if ((grossIncome >= 500001) && (grossIncome <= 1000000)) {
              stateIncomeTax = 8.970;
            }
            else if (grossIncome >= 1000001) {
              stateIncomeTax = 10.750;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "New Mexico":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 5500)) {
              stateIncomeTax = 1.70;
            }
            else if ((grossIncome >= 5501) && (grossIncome <= 11000)) {
              stateIncomeTax = 3.20;
            }
            else if ((grossIncome >= 11001) && (grossIncome <= 16000)) {
              stateIncomeTax = 4.70;
            }
            else if ((grossIncome >= 16001) && (grossIncome <= 210000)) {
              stateIncomeTax = 4.90;
            }
            else if (grossIncome >= 210001) {
              stateIncomeTax = 5.90;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 8000)) {
              stateIncomeTax = 1.70;
            }
            else if ((grossIncome >= 8001) && (grossIncome <= 16000)) {
              stateIncomeTax = 3.20;
            }
            else if ((grossIncome >= 16001) && (grossIncome <= 24000)) {
              stateIncomeTax = 4.70;
            }
            else if ((grossIncome >= 24001) && (grossIncome <= 315000)) {
              stateIncomeTax = 4.90;
            }
            else if (grossIncome >= 315001) {
              stateIncomeTax = 5.90;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "New York":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 8500)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 8501) && (grossIncome <= 11700)) {
              stateIncomeTax = 4.50;
            }
            else if ((grossIncome >= 11701) && (grossIncome <= 13900)) {
              stateIncomeTax = 5.25;
            }
            else if ((grossIncome >= 13901) && (grossIncome <= 21400)) {
              stateIncomeTax = 5.90;
            }
            else if ((grossIncome >= 21401) && (grossIncome <= 80650)) {
              stateIncomeTax = 5.97;
            }
            else if ((grossIncome >= 80651) && (grossIncome <= 215400)) {
              stateIncomeTax = 6.33;
            }
            else if ((grossIncome >= 215401) && (grossIncome <= 1077550)) {
              stateIncomeTax = 6.85;
            }
            else if (grossIncome >= 1077551) {
              stateIncomeTax = 8.82;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 17150)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 17151) && (grossIncome <= 23600)) {
              stateIncomeTax = 4.50;
            }
            else if ((grossIncome >= 23601) && (grossIncome <= 27900)) {
              stateIncomeTax = 5.25;
            }
            else if ((grossIncome >= 27901) && (grossIncome <= 43000)) {
              stateIncomeTax = 5.90;
            }
            else if ((grossIncome >= 43001) && (grossIncome <= 161500)) {
              stateIncomeTax = 5.97;
            }
            else if ((grossIncome >= 161501) && (grossIncome <= 323200)) {
              stateIncomeTax = 6.33;
            }
            else if ((grossIncome >= 323201) && (grossIncome <= 2155350)) {
              stateIncomeTax = 6.85;
            }
            else if (grossIncome >= 2155351) {
              stateIncomeTax = 8.82;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "North Carolina":
        stateIncomeTax = 5.25;
        break;
      case "North Dakota":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 1.10) && (grossIncome <= 40125)) {
              stateIncomeTax = 1.10;
            }
            else if ((grossIncome >= 40126) && (grossIncome <= 97150)) {
              stateIncomeTax = 2.04;
            }
            else if ((grossIncome >= 97151) && (grossIncome <= 202650)) {
              stateIncomeTax = 2.27;
            }
            else if ((grossIncome >= 202651) && (grossIncome <= 440600)) {
              stateIncomeTax = 2.64;
            }
            else if (sgross >= 440601) {
              stateIncomeTax = 2.90;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 67050)) {
              stateIncomeTax = 1.10;
            }
            else if ((grossIncome >= 67051) && (grossIncome <= 161950)) {
              stateIncomeTax = 2.04;
            }
            else if ((grossIncome >= 161951) && (grossIncome <= 246700)) {
              stateIncomeTax = 2.27;
            }
            else if ((grossIncome >= 246701) && (grossIncome <= 440600)) {
              stateIncomeTax = 2.64;
            }
            else if (grossIncome >= 440601) {
              stateIncomeTax = 2.90;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Ohio":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 22150)) {
              stateIncomeTax = 0;
            }
            else if ((grossIncome >= 22151) && (grossIncome <= 44250)) {
              stateIncomeTax = 2.850;
            }
            else if ((grossIncome >= 44251) && (grossIncome <= 88450)) {
              stateIncomeTax = 3.326;
            }
            else if ((grossIncome >= 88451) && (grossIncome <= 110650)) {
              stateIncomeTax = 3.802;
            }
            else if ((grossIncome >= 110651) && (grossIncome <= 221300)) {
              stateIncomeTax = 4.413;
            }
            else if (grossIncome >= 221301) {
              stateIncomeTax = 4.797;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 22150)) {
              stateIncomeTax = 0;
            }
            else if ((grossIncome >= 22151) && (grossIncome <= 44250)) {
              stateIncomeTax = 2.850;
            }
            else if ((grossIncome >= 44251) && (grossIncome <= 88450)) {
              stateIncomeTax = 3.326;
            }
            else if ((grossIncome >= 88451) && (grossIncome <= 110650)) {
              stateIncomeTax = 3.802;
            }
            else if ((grossIncome >= 110651) && (grossIncome <= 221300)) {
              stateIncomeTax = 4.413;
            }
            else if (grossIncome >= 221301) {
              stateIncomeTax = 4.797;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Oklahoma":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 1000)) {
              stateIncomeTax = 0.50;
            }
            else if ((grossIncome >= 1001) && (grossIncome <= 2500)) {
              stateIncomeTax = 1.00;
            }
            else if ((grossIncome >= 2501) && (grossIncome <= 3750)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 3751) && (grossIncome <= 4900)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 4900) && (grossIncome <= 7200)) {
              stateIncomeTax = 4.00;
            }
            else if (grossIncome >= 7201) {
              stateIncomeTax = 5.00;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 2000)) {
              stateIncomeTax = 0.50;
            }
            else if ((grossIncome >= 2001) && (grossIncome <= 5000)) {
              stateIncomeTax = 1.00;
            }
            else if ((grossIncome >= 5001) && (grossIncome <= 7500)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 7501) && (grossIncome <= 9800)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 9801) && (grossIncome <= 12200)) {
              stateIncomeTax = 4.00;
            }
            else if (grossIncome >= 12201) {
              stateIncomeTax = 5.00;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Oregon":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 3650)) {
              stateIncomeTax = 4.75;
            }
            else if ((grossIncome >= 3651) && (grossIncome <= 9200)) {
              stateIncomeTax = 6.75;
            }
            else if ((grossIncome >= 9201) && (grossIncome <= 125000)) {
              stateIncomeTax = 8.75;
            }
            else if (grossIncome >= 125001) {
              stateIncomeTax = 9.90;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 7300)) {
              stateIncomeTax = 4.75;
            }
            else if ((grossIncome >= 7301) && (grossIncome <= 18400)) {
              stateIncomeTax = 6.75;
            }
            else if ((grossIncome >= 18401) && (grossIncome <= 250000)) {
              stateIncomeTax = 8.75;
            }
            else if (grossIncome >= 250001) {
              stateIncomeTax = 9.90;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Pennsylvania":
        stateIncomeTax = 3.07;
        break;
      case "Rhode Island":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 66200)) {
              stateIncomeTax = 3.75;
            }
            else if ((grossIncome >= 66201) && (grossIncome <= 150550)) {
              stateIncomeTax = 4.75;
            }
            else if (grossIncome >= 150551) {
              stateIncomeTax = 5.99;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 66200)) {
              stateIncomeTax = 3.75;
            }
            else if ((grossIncome >= 66201) && (grossIncome <= 150550)) {
              stateIncomeTax = 4.75;
            }
            else if (grossIncome >= 150551) {
              stateIncomeTax = 5.99;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "South Carolina":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 3070)) {
              stateIncomeTax = 0.00;
            }
            else if ((grossIncome >= 3071) && (grossIncome <= 6150)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 6151) && (grossIncome <= 9230)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 9231) && (grossIncome <= 12310)) {
              stateIncomeTax = 5.00;
            }
            else if ((grossIncome >= 12311) && (grossIncome <= 15400)) {
              stateIncomeTax = 6.00;
            }
            else if (grossIncome >= 15401) {
              stateIncomeTax = 7.00;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 3070)) {
              stateIncomeTax = 0.00;
            }
            else if ((grossIncome >= 3071) && (grossIncome <= 6150)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 6151) && (grossIncome <= 9230)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 9231) && (grossIncome <= 12310)) {
              stateIncomeTax = 5.00;
            }
            else if ((grossIncome >= 12311) && (grossIncome <= 15400)) {
              stateIncomeTax = 6.00;
            }
            else if (grossIncome >= 15401) {
              stateIncomeTax = 7.00;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "South Dakota":
        stateIncomeTax = 0.00;
        break;
      case "Tennessee":
        stateIncomeTax = 0.00;
        break;
      case "Texas":
        stateIncomeTax = 0.00;
        break;
      case "Utah":
        stateIncomeTax = 4.95;
        break;
      case "Vermont":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 40350)) {
              stateIncomeTax = 3.35;
            }
            else if ((grossIncome >= 40351) && (grossIncome <= 97800)) {
              stateIncomeTax = 6.60;
            }
            else if ((grossIncome >= 97801) && (grossIncome <= 204000)) {
              stateIncomeTax = 7.60;
            }
            else if (grossIncome >= 204001) {
              stateIncomeTax = 8.75;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 67450)) {
              stateIncomeTax = 3.35;
            }
            else if ((grossIncome >= 67451) && (grossIncome <= 163000)) {
              stateIncomeTax = 6.60;
            }
            else if ((grossIncome >= 163001) && (grossIncome <= 248350)) {
              stateIncomeTax = 7.60;
            }
            else if (grossIncome >= 248351) {
              stateIncomeTax = 8.75;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Virginia":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 3000)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 3001) && (grossIncome <= 5000)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 5001) && (grossIncome <= 17000)) {
              stateIncomeTax = 5.00;
            }
            else if (grossIncome >= 17001) {
              stateIncomeTax = 5.75;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 3000)) {
              stateIncomeTax = 2.00;
            }
            else if ((grossIncome >= 3001) && (grossIncome <= 5000)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 5001) && (grossIncome <= 17000)) {
              stateIncomeTax = 5.00;
            }
            else if (grossIncome >= 17001) {
              stateIncomeTax = 5.75;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Washington":
        stateIncomeTax = 0.00;
        break;
      case "Washington D.C":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 10000)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 10001) && (grossIncome <= 40000)) {
              stateIncomeTax = 6.00;
            }
            else if ((grossIncome >= 40001) && (grossIncome <= 60000)) {
              stateIncomeTax = 6.50;
            }
            else if ((grossIncome >= 60001) && (grossIncome <= 350000)) {
              stateIncomeTax = 8.50;
            }
            else if ((grossIncome >= 350001) && (grossIncome <= 1000000)) {
              stateIncomeTax = 8.75;
            }
            else if (grossIncome >= 1000001) {
              stateIncomeTax = 8.95;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 10000)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 10001) && (grossIncome <= 40000)) {
              stateIncomeTax = 6.00;
            }
            else if ((grossIncome >= 40001) && (grossIncome <= 60000)) {
              stateIncomeTax = 6.50;
            }
            else if ((grossIncome >= 60001) && (grossIncome <= 350000)) {
              stateIncomeTax = 8.50;
            }
            else if ((grossIncome >= 350001) && (grossIncome <= 1000000)) {
              stateIncomeTax = 8.75;
            }
            else if (grossIncome >= 1000001) {
              stateIncomeTax = 8.95;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "West Virginia":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 10000)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 10001) && (grossIncome <= 25000)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 25001) && (grossIncome <= 40000)) {
              stateIncomeTax = 4.50;
            }
            else if ((grossIncome >= 40001) && (grossIncome <= 60000)) {
              stateIncomeTax = 6.00;
            }
            else if (grossIncome >= 60001) {
              stateIncomeTax = 6.50;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 10000)) {
              stateIncomeTax = 3.00;
            }
            else if ((grossIncome >= 10001) && (grossIncome <= 25000)) {
              stateIncomeTax = 4.00;
            }
            else if ((grossIncome >= 25001) && (grossIncome <= 40000)) {
              stateIncomeTax = 4.50;
            }
            else if ((grossIncome >= 40001) && (grossIncome <= 60000)) {
              stateIncomeTax = 6.00;
            }
            else if (grossIncome >= 60001) {
              stateIncomeTax = 6.50;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Wisconsin":
        switch (status.value) {
          case "Single": case "Head of Household":
            if ((grossIncome >= 0) && (grossIncome <= 12120)) {
              stateIncomeTax = 3.54;
            }
            else if ((grossIncome >= 12121) && (grossIncome <= 24250)) {
              stateIncomeTax = 4.65;
            }
            else if ((grossIncome >= 24251) && (grossIncome <= 266930)) {
              stateIncomeTax = 6.27;
            }
            else if (grossIncome >= 266931) {
              stateIncomeTax = 7.65;
            }
            break;
          case "Married, Jointly": case "Married, Separately":
            if ((grossIncome >= 0) && (grossIncome <= 16160)) {
              stateIncomeTax = 3.54;
            }
            else if ((grossIncome >= 16161) && (grossIncome <= 32330)) {
              stateIncomeTax = 4.65;
            }
            else if ((grossIncome >= 32331) && (grossIncome <= 355910)) {
              stateIncomeTax = 6.27;
            }
            else if (grossIncome >= 355911) {
              stateIncomeTax = 7.65;
            }
            break;
          default:
            stateIncomeTax = stateIncomeTax;
        }
      case "Wyoming":
        stateIncomeTax = 0.00;
        break;
    }
  }
  
  /* Function to calculate income */
  function Calculate() {
      // Disable Button so it can only be clicked once
      document.getElementById("Calculate").disabled = true;
      document.getElementById("Calculate").style.visibility = "hidden";
      // Get info from selection and input fields
      var typeOfPay = document.getElementById("PayType").value;
      var salary = document.getElementById("Salary").value;
      var freq = document.getElementById("frequency").value;
      var hoursPer = document.getElementById("HoursPer").value;
      var overtimePer = document.getElementById("OvertimePer").value;
      var rate = document.getElementById("Rate").value;
      var gross;
      var net;
      var grossTotal;
      var fedTaxes;
      var stateTaxes;
      var ficaTaxes;
      var taxesTotal;
      var netTotal;
      var table = document.getElementById("Income");
      // Frequency switch statement
      switch (freq) {
        case "Annually":
          switch (typeOfPay) {
            case "Hourly":
              grossTotal = parseFloat(GrossIncome(hoursPer, overtimePer, rate) * 52);
              break;
            case "Salaried":
              grossTotal = parseFloat(salary);
              break;
            default:
              grossTotal = grossTotal;
          }
            fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            stateTaxes = parseFloat(individualTaxes(grossTotal, stateIncomeTax));
            ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            taxesTotal = parseFloat(totalTaxes(federalIncomeTax, stateIncomeTax, ficaTax));
            netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + Format(grossTotal);
            fed = "$" + Format(fedTaxes);
            state = "$" + Format(stateTaxes);
            fica = "$" + Format(ficaTaxes);
            net = "$" + Format(netTotal);
          break;
        case "Semi-Annually":
          switch (typeOfPay) {
            case "Hourly":
              grossTotal = parseFloat(GrossIncome(hoursPer, overtimePer, rate) * 26);
              break;
            case "Salaried":
              grossTotal = parseFloat(salary) / 2;
              break;
            default:
              grossTotal = grossTotal;
          }
            fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            stateTaxes = parseFloat(individualTaxes(grossTotal, stateIncomeTax));
            ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            taxesTotal = parseFloat(totalTaxes(federalIncomeTax, stateIncomeTax, ficaTax));
            netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + Format(grossTotal);
            fed = "$" + Format(fedTaxes);
            state = "$" + Format(stateTaxes);
            fica = "$" + Format(ficaTaxes);
            net = "$" + Format(netTotal);
          break;
        case "Quarterly":
          switch (typeOfPay) {
            case "Hourly":
              grossTotal = parseFloat(GrossIncome(hoursPer, overtimePer, rate) * 13);
              break;
            case "Salaried":
              grossTotal = parseFloat(salary) / 4;
              break;
            default:
              grossTotal = grossTotal;
          }
            fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            stateTaxes = parseFloat(individualTaxes(grossTotal, stateIncomeTax));
            ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            taxesTotal = parseFloat(totalTaxes(federalIncomeTax, stateIncomeTax, ficaTax));
            netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + Format(grossTotal);
            fed = "$" + Format(fedTaxes);
            state = "$" + Format(stateTaxes);
            fica = "$" + Format(ficaTaxes);
            net = "$" + Format(netTotal);
          break;
        case "Monthly":
          switch (typeOfPay) {
            case "Hourly":
              grossTotal = parseFloat(GrossIncome(hoursPer, overtimePer, rate) * 4.33);
              break;
            case "Salaried":
              grossTotal = parseFloat(salary) / 12;
              break;
            default:
              grossTotal = grossTotal;
          }
            fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            stateTaxes = parseFloat(individualTaxes(grossTotal, stateIncomeTax));
            ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            taxesTotal = parseFloat(totalTaxes(federalIncomeTax, stateIncomeTax, ficaTax));
            netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + Format(grossTotal);
            fed = "$" + Format(fedTaxes);
            state = "$" + Format(stateTaxes);
            fica = "$" + Format(ficaTaxes);
            net = "$" + Format(netTotal);
          break;
        case "Bi-Monthly":
          switch (typeOfPay) {
            case "Hourly":
              grossTotal = parseFloat(GrossIncome(hoursPer, overtimePer, rate) * 2);
              break;
            case "Salaried":
              grossTotal = parseFloat(salary) / 26;
              break;
            default:
              grossTotal = grossTotal;
          }
            fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            stateTaxes = parseFloat(individualTaxes(grossTotal, stateIncomeTax));
            ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            taxesTotal = parseFloat(totalTaxes(federalIncomeTax, stateIncomeTax, ficaTax));
            netTotal = netIncome(grossTotal, taxesTotal);
            gross = "$" + Format(grossTotal);
            fed = "$" + Format(fedTaxes);
            state = "$" + Format(stateTaxes);
            fica = "$" + Format(ficaTaxes);
            net = "$" + Format(netTotal);
          break;
        case "Weekly":
          switch (typeOfPay) {
            case "Hourly":
              grossTotal = parseFloat(GrossIncome(hoursPer, overtimePer, rate));
              break;
            case "Salaried":
              grossTotal = parseFloat(salary) / 52;
              break;
            default:
              grossTotal = grossTotal;
          }
            fedTaxes = parseFloat(individualTaxes(grossTotal, federalIncomeTax));
            stateTaxes = parseFloat(individualTaxes(grossTotal, stateIncomeTax));
            ficaTaxes = parseFloat(individualTaxes(grossTotal, ficaTax));
            taxesTotal = parseFloat(totalTaxes(federalIncomeTax, stateIncomeTax, ficaTax));
            netTotal = netIncome(grossTotal, taxesTotal);
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
      var hoursPer = document.getElementById("HoursPer").value;
      var overtimePer = document.getElementById("OvertimePer").value;
      var rate = document.getElementById("Rate").value;
      document.getElementById("FedO").innerHTML +=  federalIncomeTax + "%";
      document.getElementById("StateO").innerHTML += stateIncomeTax + "%";
      document.getElementById("FicaO").innerHTML += ficaTax + "%";
      document.getElementById("HoursPerO").innerHTML += hoursPer;
      document.getElementById("OvertimePerO").innerHTML += overtimePer;
      document.getElementById("RateO").innerHTML += "$" + rate + " / Hour";
  }
  
  /* Function to clear table */
  function Clear() {
    location.reload();
  }

  /* Fed Taxes Resource */
  function fedTaxes(w,h) {
      var left = (screen.width/2)-(w/2);
      var top = (screen.height/2)-(h/2);
      var targetWin = window.open ("https://www.nerdwallet.com/article/taxes/federal-income-tax-brackets", "Federal Taxes Resource", 
      'toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
      return targetWin;
  }

  /* State Taxes Resource */
  function stateTaxes(w,h) {
      var left = (screen.width/2)-(w/2);
      var top = (screen.height/2)-(h/2);
      var targetWin = window.open ("https://taxfoundation.org/publications/state-individual-income-tax-rates-and-brackets/", "State Taxes Resource", 
      'toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
      return targetWin;
  }

  /* Fica Taxes Resource */
  function ficaTaxes(w,h) {
      var left = (screen.width/2)-(w/2);
      var top = (screen.height/2)-(h/2);
      var targetWin = window.open ("https://www.nerdwallet.com/article/taxes/fica-tax-withholding", "Fica Taxes Resource", 
      'toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
      return targetWin;
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