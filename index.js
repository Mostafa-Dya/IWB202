// Captcha Functiong to randomize values 
function Captcha() {
  var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var i;
  for (i = 0; i < 6; i++) {
    var a = alpha[Math.floor(Math.random() * alpha.length)];
    var b = alpha[Math.floor(Math.random() * alpha.length)];
    var c = alpha[Math.floor(Math.random() * alpha.length)];
    var d = alpha[Math.floor(Math.random() * alpha.length)];
    var e = alpha[Math.floor(Math.random() * alpha.length)];
    var f = alpha[Math.floor(Math.random() * alpha.length)];
    var g = alpha[Math.floor(Math.random() * alpha.length)];
  }
  var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
  document.getElementById("mainCaptcha").value = code
}
//  Captcha Validation function
function ValidCaptcha() {
  var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
  var string2 = removeSpaces(document.getElementById('txtInput').value);
  if (string1 == string2) {
    return true;
  }
  else {
    return false;
  }
}
function removeSpaces(string) {
  return string.split(' ').join('');
}

//  custome Error when validation is accured
document.addEventListener("DOMContentLoaded", function () {
  var elements = document.getElementsByTagName("INPUT");

  for (var i = 0; i < elements.length; i++) {
    elements[i].oninvalid = function (e) {
      e.target.setCustomValidity("");
      if (!e.target.validity.valid) {
        e.target.setCustomValidity("هناك خطأ في هذا الحقل");
      }
    };
    elements[i].oninput = function (e) {
      e.target.setCustomValidity("");
    };
  }
})






// Excite addrow funtion
function myFunction() {
  addRow()
}
// saving value element
function save() {
  document.getElementById("Button2").value;
}


// prevent submit from refreshing page
var form = document.getElementById("form1");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);


// adding values from input to table rows
rowNumber = 4;
function addRow() {
  "use strict";
  var row = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var td6 = document.createElement("td");
  td1.innerHTML = rowNumber;
  td2.innerHTML = document.getElementById("username").value;
  td3.innerHTML = document.getElementById("studentname").value;
  td4.innerHTML = document.getElementById("selection").value;
  td5.innerHTML = document.getElementById("Pnumber").value;
  td6.innerHTML = document.getElementById("date").value;

  if (form.checkValidity() == true) {
    if (rowNumber) {
      rowNumber++;
    }
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    document.getElementById('form1').reset();
    Captcha();

  }
  table.children[1].appendChild(row);
};

// implement jquery table funtion
$(document).ready(function () {
  $('#table').DataTable({
    "ordering": false
  });
  $('.dataTables_length').addClass('bs-select');
});
var newArray = [];

(function ($) {
  'use strict';
  $.fn.tableToJSON = function (opts) {
    // Set options
    var defaults = {
      ignoreColumns: [],
      onlyColumns: null,
      ignoreHiddenRows: true,
      headings: null,
      allowHTML: false
    };
    opts = $.extend(defaults, opts);

    var notNull = function (value) {
      return value !== undefined && value !== null;
    };

    var ignoredColumn = function (index) {
      if (notNull(opts.onlyColumns)) {
        return $.inArray(index, opts.onlyColumns) === -1;
      }
      return $.inArray(index, opts.ignoreColumns) !== -1;
    };

    var arraysToHash = function (keys, values) {
      var result = {}, index = 0;
      $.each(values, function (i, value) {
        // when ignoring columns, the header option still starts
        // with the first defined column
        if (index < keys.length && notNull(value)) {
          result[keys[index]] = value;
          index++;
        }
      });
      return result;
    };

    var cellValues = function (cellIndex, cell) {
      var value, result;
      var override = $(cell).data('override');
      if (opts.allowHTML) {
        value = $.trim($(cell).html());
      } else {
        value = $.trim($(cell).text());
      }
      result = notNull(override) ? override : value;
      return result;
    };

    var rowValues = function (row) {
      var result = [];
      $(row).children('td,th').each(function (cellIndex, cell) {
        result.push(cellValues(cellIndex, cell));
      });
      return result;
    };

    var getHeadings = function (table) {
      var firstRow = table.find('tr:first').first();
      return notNull(opts.headings) ? opts.headings : rowValues(firstRow);
    };

    var construct = function (table, headings) {
      var i, j, len, len2, txt, $row, $cell,
        tmpArray = [], cellIndex = 0, result = [];
      table.children('tbody,*').children('tr').each(function (rowIndex, row) {
        if (rowIndex > 0 || notNull(opts.headings)) {
          $row = $(row);
          if ($row.is(':visible') || !opts.ignoreHiddenRows) {
            if (!tmpArray[rowIndex]) {
              tmpArray[rowIndex] = [];
            }
            cellIndex = 0;
            $row.children().each(function () {
              $cell = $(this);

              // process rowspans
              if ($cell.filter('[rowspan]').length) {
                len = parseInt($cell.attr('rowspan'), 10) - 1;
                txt = cellValues(cellIndex, $cell, []);
                for (i = 1; i <= len; i++) {
                  if (!tmpArray[rowIndex + i]) { tmpArray[rowIndex + i] = []; }
                  tmpArray[rowIndex + i][cellIndex] = txt;
                }
              }
              // process colspans
              if ($cell.filter('[colspan]').length) {
                len = parseInt($cell.attr('colspan'), 10) - 1;
                txt = cellValues(cellIndex, $cell, []);
                for (i = 1; i <= len; i++) {
                  // cell has both col and row spans
                  if ($cell.filter('[rowspan]').length) {
                    len2 = parseInt($cell.attr('rowspan'), 10);
                    for (j = 0; j < len2; j++) {
                      tmpArray[rowIndex + j][cellIndex + i] = txt;
                    }
                  } else {
                    tmpArray[rowIndex][cellIndex + i] = txt;
                  }
                }
              }
              // skip column if already defined
              while (tmpArray[rowIndex][cellIndex]) { cellIndex++; }
              txt = tmpArray[rowIndex][cellIndex] || cellValues(cellIndex, $cell, []);
              if (notNull(txt)) {
                tmpArray[rowIndex][cellIndex] = txt;
              }
              cellIndex++;
            });
          }
        }
      });
      $.each(tmpArray, function (i, row) {
        if (notNull(row)) {
          // remove ignoredColumns / add onlyColumns
          var newRow = notNull(opts.onlyColumns) || opts.ignoreColumns.length ?
            $.grep(row, function (v, index) { return !ignoredColumn(index); }) : row,

            // remove ignoredColumns / add onlyColumns if headings is not defined
            newHeadings = notNull(opts.headings) ? headings :
              $.grep(headings, function (v, index) { return !ignoredColumn(index); });

          txt = arraysToHash(newHeadings, newRow);
          result[result.length] = txt;
        }
      });
      return result;
    };

    // Run
    var headings = getHeadings(this);
    return construct(this, headings);
  };
})(jQuery);

$('#convert-table').click(function () {
  var $table = $('#table'),
    column = parseInt($('select').val(), 10),
    // Convert the table into a javascript object
    table = $table.tableToJSON({
      ignoreColumns: column >= 0 ? [column] : []
    });

  var json = JSON.stringify(table);
  var res = document.getElementById("res");
  res.value = json;
  for (let k in json) {
    newArray.push({'value': json[k]});
}
});

// filter table with select
function table_filtered() {
  // declaring varibles
    let
     select_value,
     filter,
      table,
      table_row,
       td,
        selected_value;
        // declaring ID`s
    select_value = document.getElementById("program");
    filter = select_value.value.toUpperCase();
    table = document.getElementById("table");
    table_row = table.getElementsByTagName("tr");
    // putting for to loop to check table values
    for (let i = 0; i < table_row.length; i++) {
        td = table_row[i].getElementsByTagName("td")[3];
        if (select_value=="all"){
          table_row[i].style.display = "";
        }
        if (td) {
            selected_value = td.textContent || td.innerText;
  
          // if value true show the table values else none because there is no value
            if (selected_value.toUpperCase().indexOf(filter) > -1) {
              table_row[i].style.display = "";
            }else if(selected_value.toUpperCase().indexOf(filter)=="all"){
              table_row[i].style.display = "";
            }
             else {
              table_row[i].style.display = "none";
            }
        }
  
  
    }
  }