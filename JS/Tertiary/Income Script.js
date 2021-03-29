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
      // Disable Button so it can only be clicked once
      document.getElementById("Calculate").disabled = true;
      document.getElementById("Calculate").style.visibility = "hidden";
      // Get info from selection and input fields
      var freq = document.getElementById("frequency").value;
      var fed = document.getElementById("Federal").value;
      var state = document.getElementById("State").value;
      var other = document.getElementById("Other").value;
      var hoursPer = document.getElementById("HoursPer").value;
      var overtimePer = document.getElementById("OvertimePer").value;
      var gross = '-';
      var net = '-';
      var table = document.getElementById("Income");
      // Switch statement
      switch (freq) {
        case "Annually":
          gross = "Hello";
          net = "Good Bye";
          break;
        case "Semi-Annually":
          gross = "Yo";
          net = "C-ya";
          break;
        case "Quarterly":
          gross = "Heya";
          net = "Bye";
          break;
        case "Monthly":
          gross = "Hi";
          net = "Buh-Bye";
          break;
        case "Bi-Monthly":
          gross = "Whats Up";
          net = "Later";
          break;
        case "Weekly":
          gross = "Heyyyy";
          net = "Bye Fucker";
          break;
        default:
          freq = "N/A";
          gross = "You Didn't";
          net = "Choose Anything";
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