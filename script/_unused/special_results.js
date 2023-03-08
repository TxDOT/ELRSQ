// this is from RPM and needs to be edited
function exportKML() {

    var headerTags = "<?xml version='1.0' encoding='UTF-8'?><kml xmlns='http://www.opengis.net/kml/2.2'><Document id='Projects'><visibility>1</visibility><open>1</open>";
    var closingTags = "</Document></kml>";

    //Loop of projects on map
    var kmlContent = "data:text/kml;charset=utf-8,";
    kmlContent += headerTags;

    for (var i = 0; i < PROJECTLINES.length; i++) {
        var theProjectFrom = PROJECTLINES[i][1][0];
        var theProjectTo = PROJECTLINES[i][1][1];
        var theProjectRTE = PROJECTLINES[i][1][2];
        var theProjectWidth = PROJECTLINES[i][1][3];
        var theProjectColor = PROJECTLINES[i][1][4];
        var theProjectDesc = PROJECTLINES[i][1][5];

        var newKMLColor = getRightCharacters(theProjectColor, 6);
        var newKMLRR = getLeftCharacters(newKMLColor, 2);
        var newKMLBB = getRightCharacters(newKMLColor, 2);
        var newKMLGG = getMiddleCharacters(newKMLColor, 2, 2);

        kmlContent += addTags("Placemark id='" + theProjectRTE + "'", "Open");
        kmlContent += addTags("name", "Open");
        kmlContent += theProjectRTE;
        kmlContent += addTags("name", "Close");
        kmlContent += addTags("description", "Open");
        kmlContent += "<![CDATA[" + theProjectRTE + "<br>";
        kmlContent += "From: " + theProjectFrom + "<br>";
        kmlContent += "To: " + theProjectTo + "<br>";
        kmlContent += "Description: " + theProjectDesc + "]]>";
        kmlContent += addTags("description", "Close");
        kmlContent += addTags("Style", "Open");
        kmlContent += addTags("LineStyle", "Open");
        kmlContent += addTags("color", "Open");
        kmlContent += "7f" + newKMLBB + newKMLGG + newKMLRR;
        kmlContent += addTags("color", "Close");
        kmlContent += addTags("width", "Open");
        kmlContent += theProjectWidth;
        kmlContent += addTags("width", "Close");
        kmlContent += addTags("LineStyle", "Close");
        kmlContent += addTags("Style", "Close");
        kmlContent += addTags("LineString", "Open");
        kmlContent += addTags("coordinates", "Open");
        kmlContent += kmlGeom(PROJECTLINES[i][0]);
        kmlContent += addTags("coordinates", "Close");
        kmlContent += addTags("LineString", "Close");
        kmlContent += addTags("Placemark", "Close");
    }

    kmlContent += closingTags;

    var encodedUri = encodeURI(kmlContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "projects.kml");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
}






