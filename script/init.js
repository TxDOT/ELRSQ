let currentSelection = [];
let allResults = [];
let currentPos = 1;
let graphics = [];
let projects = [];
var projectLines = [];


function resetGraphics() {
  graphics = []; //this is an experiment
}

function resetcurrentPos() {
  currentPos = 1;
}



/*let projects = [
    [
        "IH0035-KG",
        "121.243",
        "149.576",
        "#ff8000",
        4,
        "35"
    ],
    [
        "IH0045-KG",
        "1.243",
        "9.576",
        "#ff8000",
        4,
        "45"
    ],
    [
        "IH0010-KG",
        "500",
        "600",
        "#ff8000",
        4,
        "10"
    ]
]*/


if (screen.width >= 768) {
  const GUTTER_SIZE = 30;
  Split(['#split-0', '#split-1'], {
    sizes: [33, 66],
    minSize: [300, 400],
    expandToMin: false
  });
}





$(document).ready(function () {
  $("#test").load("components/map_controls.html", function (responseTxt, statusTxt, jqXHR) {
    if (statusTxt == "success") {
      alert("New content loaded successfully!");
    }
    if (statusTxt == "error") {
      alert("Error: " + jqXHR.status + " " + jqXHR.statusText);
    }
  });
});

