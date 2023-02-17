// determine pagination and fill in HTML table results
function specialResults(results) {
    jsonData = results;
    //resultCount = allResults.length; // use this somewhere
    //currentResult = allResults[index];
  

  
    // fill in HTML results
    /*document.getElementById("p_returned_ROUTEID").innerHTML = currentResult['ROUTEID'];
    document.getElementById("p_returned_RTE_DEFN_LN_NM").innerHTML = currentResult['RTE_DEFN_LN_NM'];
    document.getElementById("p_returned_RDBD_TYPE_DSCR").innerHTML = currentResult['RDBD_TYPE_DSCR'];
    document.getElementById("p_returned_RTE_DFO").innerHTML = currentResult['RTE_DFO'];
  
    document.getElementById("p_returned_CTRL_SECT_LN_NBR").innerHTML = currentResult['CTRL_SECT_LN_NBR'];
    document.getElementById("p_returned_CTRL_SECT_MPT").innerHTML = currentResult['CTRL_SECT_MPT'];
  
    document.getElementById("p_returned_RMRKR_PNT_NBR").innerHTML = currentResult['RMRKR_PNT_NBR'];
    document.getElementById("p_returned_RMRKR_DISPLACEMENT").innerHTML = currentResult['RMRKR_DISPLACEMENT'];
  
    document.getElementById("p_returned_LAT").innerHTML = currentResult['LAT'];
    document.getElementById("p_returned_LON").innerHTML = currentResult['LON'];*/
    }



function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'results.json';

    let linkElement = document.getElementById('#JSONdownload');
    console.log(linkElement);
    //linkElement.setAttribute('href', dataUri);
    //linkElement.setAttribute('download', exportFileDefaultName);
}

// this is from RPM and needs to be edited
function exportKML() {

    var headerTags = "<?xml version='1.0' encoding='UTF-8'?><kml xmlns='http://www.opengis.net/kml/2.2'><Document id='Projects'><visibility>1</visibility><open>1</open>";
    var closingTags = "</Document></kml>";

    //Loop of projects on map
    var kmlContent = "data:text/kml;charset=utf-8,";
    kmlContent += headerTags;

    for (var i = 0; i < projectLines.length; i++) {
        var theProjectFrom = projectLines[i][1][0];
        var theProjectTo = projectLines[i][1][1];
        var theProjectRTE = projectLines[i][1][2];
        var theProjectWidth = projectLines[i][1][3];
        var theProjectColor = projectLines[i][1][4];
        var theProjectDesc = projectLines[i][1][5];

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
        kmlContent += kmlGeom(projectLines[i][0]);
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

function addTags(theData, theTagType) {
    var taggedData = "";

    if (theTagType == "Open") {
        taggedData = "<" + theData + ">";
    }
    else {
        taggedData = "</" + theData + ">";
    }

    return taggedData;
}

function kmlGeom(theData) {
    // console.log(theData);
    var kmlCoords = "";
    var calcCoord = [];
    for (var i = 0; i < theData.length; i++) {
        calcCoord = metersToLatLong(theData[i]);

        if (i == theData.length - 1) {
            kmlCoords += calcCoord.toString();
        } else {
            kmlCoords += calcCoord.toString() + " ";
        }
    }

    return kmlCoords;
}

function metersToLatLong(metersCoord) {
    //https://pubs.usgs.gov/pp/1395/report.pdf - Mercator to WGS 84 conversion on pages 44 and 267
    var latLongCoord = [];

    //Mercator Sphere Radius
    var sphRadius = 6378137;

    //Calculate Longitude
    latLongCoord.push(roundToDecimalPlace(((metersCoord[0] / sphRadius) * 180) / Math.PI, 6));

    //Calculate Latitude
    var latStepOne = 90;
    var latStepTwo = (metersCoord[1] / sphRadius) * -1;
    var latStepThree = Math.pow(Math.E, latStepTwo);
    var latStepFour = Math.atan(latStepThree);
    var latStepFive = latStepFour * (180 / Math.PI);
    var latStepSix = (2 * latStepFive) * -1;
    var latStepSeven = latStepOne + latStepSix;

    latLongCoord.push(roundToDecimalPlace(latStepSeven, 6));
    latLongCoord.push(metersCoord[2]);

    return latLongCoord;
}







