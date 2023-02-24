$(document).ready(function () {
    console.log("doc ready");
  
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
  
    $("wizard_form-component").load("components/html/wizard_form.html", function (response, status, xhr) {
      if (status == "error") { $("wizard_form-component").html(staticWizard_Form); }
      $("#missingControlSection").on('click', function () { noControlSection(); });
      $("#convert3-wizard").on('click', function () { lrsSinglePointQuery(3, 0, 'wizinputControlSection', 'wizinputMilepointMeasure'); });
      $("#missingMilepointMeasure").on('click', function () { noMilepointMeasure(); });
      $("#missingRouteName").on('click', function () { noRouteName(); });
      $("#conver4-wizard").on('click', function () { lrsSinglePointQuery(4, 0, 'wizinputRouteName', 'wizinputDistanceFromOrigin'); });
      $("#missingDistanceFromOrigin").on('click', function () { noDistanceFromOrigin(); });
      $("#convert2-wizard").on('click', function () { lrsSinglePointQuery(2, 0, 'wizinputRouteName', 'wizinputReferenceMarker', 'wizinputDisplacement'); });
      $("#missingReferenceMarker").on('click', function () { noReferenceMarker(); });
      $("#convert1-wizard").on('click', function () { lrsSinglePointQuery(1, 0, 'wizinputLatitude', 'wizinputLongitude'); });
      $("#missingCoordinates").on('click', function () { restartWizard(); });
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