  /* Cascading drop down selection */
  var frequencyObject = {
    "Annually": {
      "Tax-Exempt": ["Charity"],
      "Non Tax-Exempt": ["Self-Employed", "Employed",], 
    },
    "Semi-Annually": {
      "Tax-Exempt": ["Charity"],
      "Non Tax-Exempt": ["Self-Employed", "Employed",], 
    },
    "Quarterly": {
      "Tax-Exempt": ["Charity"],
      "Non Tax-Exempt": ["Self-Employed", "Employed",], 
    },
    "Monthly": {
      "Tax-Exempt": ["Charity"],
      "Non Tax-Exempt": ["Self-Employed", "Employed",], 
    },
    "Bi-Monthly": {
      "Tax-Exempt": ["Charity"],
      "Non Tax-Exempt": ["Self-Employed", "Employed",], 
    },
    "Weekly": {
      "Tax-Exempt": ["Charity"],
      "Non Tax-Exempt": ["Self-Employed", "Employed",], 
    }
  }
  window.onload = function() {
    var frequencySel = document.getElementById("frequency");
    var statusSel = document.getElementById("status");
    var employmentSel = document.getElementById("employment");
    var paidbySel = document.getElementById()
    for (var x in frequencyObject) {
      frequencySel.options[frequencySel.options.length] = new Option(x, x);
    }
    frequencySel.onchange = function() {
      //empty employments- and status- dropdowns
      employmentSel.length = 1;
      statusSel.length = 1;
      //display correct values
      for (var y in frequencyObject[this.value]) {
        statusSel.options[statusSel.options.length] = new Option(y, y);
      }
    }
    statusSel.onchange = function() {
      //empty employments dropdown
      employmentSel.length = 1;
      //display correct values
      var z = frequencyObject[frequencySel.value][this.value];
      for (var i = 0; i < z.length; i++) {
        employmentSel.options[employmentSel.options.length] = new Option(z[i], z[i]);
      }
    }
  }

  
  /* Function to calculate income */
  function Calculate() {
    }
  
    /* Function to clear table */
    function Remove() {
      document.getElementById("Calculate").disabled = false;
      document.getElementById("Calculate").style.visibility = "";
      document.getElementById("Amount").value = '';
      document.getElementById("Rate").value = '';
      document.getElementById("Months").value = '';
      var table = document.getElementById("Amortization");
      var rowCount = table.rows.length;
      while (table.rows.length >= 1) {
        table.deleteRow(1);
      }
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