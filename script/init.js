//screen pane slider

if (useMap == 1) {

  if (screen.width >= 768) {
    const GUTTER_SIZE = 30;
    Split(['#split-0', '#split-1'], {
      sizes: [33, 66],
      minSize: [300, 400],
      expandToMin: false
    });
  }

}



const useLoadIndicator = 1;


let allResults = [];
function resetAllResults() {
  allResults = [];
}

let currentPagination = 1;
function resetCurrentPagination() {
  currentPagination = 1;
}

let graphics = [];
function resetGraphics() {
  graphics = [];
}

let projectsArr = [];
function resetProjects() {
  projectsArr = [];
}

var projectLines = [];
function resetProjectLines() {
  projectLines = [];
}



// add nav bar and status indicator
$(document).ready(function () {
  console.log("doc ready");

  $("nav_bar-component").load("components/html/nav_bar.html", function (response, status, xhr) {
    if (status == "error") { $("nav_bar-component").html(staticNav_Bar); }
  });

  $("indicator-component").load("components/html/indicator.html", function (response, status, xhr) {
    if (status == "error") { $("indicator-component").html(staticIndicator); }
  });

  var url = window.location;
  $('a[href="' + url + '"]').parent().addClass("active");
  $('a').filter(function () {
    return this.href == url;
  }).parent().addClass('active');

});


// status indicator functions

function GreenToYellow() {
  $('#readyIndicator').removeClass('green');
  $('#busyIndicator').addClass('yellow');
  $('#readyBadge').hide();
  $('#busyBadge').show();
}

function YellowToGreen() {
  $('#busyIndicator').removeClass('yellow');
  $('#readyIndicator').addClass('green');
  $('#busyBadge').hide();
  $('#readyBadge').show();
}

function ToRed() {
  $('#busyIndicator').removeClass('yellow');
  $('#readyIndicator').removeClass('green');
  $('#busyBadge').hide();
  $('#readyBadge').hide();
  $('#errorIndicator').addClass('red');
  $('#errorBadge').show();
}

function ToGreen() {
  $('#busyIndicator').removeClass('yellow');
  $('#errorIndicator').removeClass('red');
  $('#readyIndicator').addClass('green');
  $('#busyBadge').hide();
  $('#errorBadge').hide();
  $('#readyBadge').show();
}

// end status indicator functions



// add results card
$(document).ready(function () {
  $("results_card-component").load("components/html/results_card.html", function (response, status, xhr) {
    if (status == "error") { $("results_card-component").html(staticResults_Card); }

  });

});