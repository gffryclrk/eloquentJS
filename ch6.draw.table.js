//Polymorphism

//Laying Out a Table
// example rows = [[{text: [“##”]},{text: [“  ”]}],[{text: [“  ”]},{text: [“##”]}]]
// from http://tomi.io/eloquent-javascript-laying-out-a-table/

function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell){
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

function colWidths(rows) {
  return rows[0].map(function(_, i) {
    return rows.reduce(function(max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

function drawTable(rows) {
  var heights = rowHeights(rows); // [1,1]
  var widths = colWidths(rows); // [2,2]

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block){
      return block[lineNo];
    }).join(" ");
  }
  //drawLine returns [][]

  function drawRow(row, rowNum) { //row = ["##"],["  "] & ["  "],["##"]
    var blocks = row.map(function(cell, colNum){
      return cell.draw(widths[colNum], heights[rowNum]); // ["##"].draw(2,1) = ["##"]; ["  "].draw(2,1) = ["  "]; blocks = [["##"], ["  "]]; 
    });
    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo); // drawLine([["##"], [" "]], 0) = ["##   "]; <-- First iteration of line 43: 2nd will be ["   ##"];
    }).join("\n");
  }

  return rows.map(drawRow).join("\n"); // after running both row elements through drawRow the result is [["   ##"], ["##   "]].join("\n");
}

function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

function TextCell(text) {
  this.text = text.split("\n");
}
TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};
TextCell.prototype.minHeight = function() {
  return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++){
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

var rows = [];
for (var i = 0; i < 5; i++) {
  var row = [];
  for (var j = 0; j < 5; j++) {
    if ((j + i) % 2 == 0)
      row.push(new TextCell("##"));
    else
      row.push(new TextCell(" "));
  }
  rows.push(row);
}
console.log(drawTable(rows));

function UnderlinedCell(inner) {
  this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1).concat([repeat("-", width)]);
};

var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

function dataTable(data) {
  var keys = Object.keys(data[0]); // keys = ["name","height","country"];
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name)); // headers = [{ inner: { text: "name" } }, { inner: { text: "height" } }, { inner: { text: "country" } }]
  });
  var body = data.map(function(row){ // Multi-dimensional array containing all rows in data object
    return keys.map(function(name){ // body = [ { text: "Kilimanjaro" }, { text: "5895" }, { text: "Tanzania" } ]
      var value = row[name];
      if (typeof value == "number") {
        return new RTextCell(String(value));
      }else{
        return new TextCell(String(value));
      }
      // return new TextCell(String(row[name]));  
    });
  });
  return [headers].concat(body);
}


function RTextCell(text) {
  TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++){
    var line = this.text[i] || "";
    result.push(repeat(" ", width - line.length) + line);
  }
  return result;
};

console.log(drawTable(dataTable(MOUNTAINS)));

