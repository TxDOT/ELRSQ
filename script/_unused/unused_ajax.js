$(document).ready(function () {
  
    $("nav_bar-component").load("components/html/nav_bar.html", function (response, status, xhr) {
      if (status == "error") { $("nav_bar-component").html(staticNav_Bar); }
    });
  
    $("indicator-component").load("components/html/indicator.html", function (response, status, xhr) {
      if (status == "error") { $("indicator-component").html(staticIndicator); }
    });
  
    // $("bulk_modal-component").load("components/html/bulk_modal.html", function (response, status, xhr) {
    //   if (status == "error") { $("bulk_modal-component").html(staticBulk_Modal); }
    // });
  
    $("results_card-component").load("components/html/results_card.html", function (response, status, xhr) {
      if (status == "error") { $("results_card-component").html(staticResults_Card); }
      $("#copyRouteDFO").on('click', function () { copyRouteDFO(); });
      $("#makequeryTxDOT_Roadways_Unsegmented").on('click', function () { makequeryTxDOT_Roadways_Unsegmented(); });
      $("#copyControlSection").on('click', function () { copyControlSection(); });
      $("#copyFieldLocation").on('click', function () { copyFieldLocation(); });
      $("#copyCoordinates").on('click', function () { copyCoordinates(); });
    });
  

  
  
    // help modals with no actions
  
    $("form_help_modal-component").load("components/html/form_help_modal.html", function (response, status, xhr) {
      if (status == "error") { $("form_help_modal-component").html(staticForm_Help_Modal); }
    });
  
    $("cursor_help_modal-component").load("components/html/cursor_help_modal.html", function (response, status, xhr) {
      if (status == "error") { $("cursor_help_modal-component").html(staticCursor_Help_Modal); }
    });
  
    $("results_help_modal-component").load("components/html/results_help_modal.html", function (response, status, xhr) {
      if (status == "error") { $("results_help_modal-component").html(staticResults_Help_Modal); }
    });
  
    $("route_help_modal-component").load("components/html/route_help_modal.html", function (response, status, xhr) {
      if (status == "error") { $("route_help_modal-component").html(staticRoute_Help_Modal); }
    });
  
    $("route_style_help_modal-component").load("components/html/route_style_help_modal.html", function (response, status, xhr) {
      if (status == "error") { $("route_style_help_modal-component").html(staticRoute_Style_Help_Modal); }
    });
  
  
  
  });