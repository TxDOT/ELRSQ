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

  $("nav_bar").load("components/html/nav_bar.html");
  $("map_controls").load("components/html/map_controls.html");
  $("indicator").load("components/html/indicator.html");
  $("demo_modal").load("components/html/demo_modal.html");
  $("bulk_modal_B").load("components/html/bulk_modal_B.html");
  $("form_help_modal").load("components/html/form_help_modal.html");
  $("cursor_help_modal").load("components/html/cursor_help_modal.html");
  $("results_help_modal").load("components/html/results_help_modal.html");
  $("results_card").load("components/html/results_card.html");
  $("wizard_form").load("components/html/wizard_form.html");

  $("route_help_modal").load("components/html/route_help_modal.html");
  $("route_style_help_modal").load("components/html/route_style_help_modal.html");

});



