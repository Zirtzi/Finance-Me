  /* TJL Website */
  function website(w,h) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    var targetWin = window.open ("http://www.tjlarrechea.com/index.html", "Taylor'd Tech Home", 
    'toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    return targetWin;
  }

  /* DaTaylorSeries Git */
  function git(w,h) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    var targetWin = window.open ("https://github.com/DaTaylorSeries", "DaTaylorSeries GitHub", 
    'toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    return targetWin;
  }