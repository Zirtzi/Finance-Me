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