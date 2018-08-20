function toggle_panel(id) {
  panel=document.getElementById(id)
  if (panel.style.display=='none'){
    panel.style.display='block';
  }else {
    panel.style.display='none';
  }
}

function sortTable(table_id,column) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(table_id);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

var path = window.location.pathname;
var page = path.split("/").pop();
if (page=='index') {window.onload = sortTable();}

function changeKeyword() {
  document.getElementById('search_a').href = '/search/'+document.getElementById('search_input').value;
}
function search_it(event) {
  var key = event.which || event.keyCode;
  if (key == 13) {
    window.location.href = '/search/'+document.getElementById('search_input').value;
  }
}

function checkUrlInput() {
  var u=$('#url_input');
  if (u.val().slice(0,7)!='http://' && u.val().slice(0,8)!='https://') {
    u.val(u.val().replace(new RegExp(u.val().slice(0,7),"g"), "http://"));
  }
  if (u.val().slice(0,9)=='https:///') {
    u.val(u.val().replace(new RegExp(u.val().slice(0,9),"g"), "http://"));
  }
  if (u.val().slice(0,8)=='http:///') {
    u.val(u.val().replace(new RegExp(u.val().slice(0,8),"g"), "http://"));
  }
}