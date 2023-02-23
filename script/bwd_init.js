
// add certain page elements and event handlers on page load
$(document).ready(function () {

    $("nav_bar-component").load("components/html/nav_bar.html", function (response, status, xhr) {
      if (status == "error") { $("nav_bar-component").html(staticNav_Bar); }
    });
  
    $("indicator-component").load("components/html/indicator.html", function (response, status, xhr) {
      if (status == "error") { $("indicator-component").html(staticIndicator); }
    });
  
    // FIXME Bulk Upload: change to use Convert button instead of automatic
    document.getElementById("upload_csv-bulk").addEventListener('change', async function (e) {
      GreenToYellow();
      const fileContents = await readFile(e.target.files[0])
      YellowToGreen();
      //thenConvertCSVByMethod(fileContents);
      setMethodAndFields(fileContents);
    });
  
  });
  