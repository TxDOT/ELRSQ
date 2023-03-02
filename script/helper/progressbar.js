function updateProgressBar (current, total) {

  let current = 1;
  let total = 10;
  let progress = Math.round(current / total);
  let widthstring = progress.toString() + "%";

  $("#bulkMegaModal .progress-bar").css("width", widthstring);

}