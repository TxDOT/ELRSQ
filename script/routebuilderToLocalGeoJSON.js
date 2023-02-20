
//FIXME finish writing
//Draws user defined project on the map 
function parseGeometryToGeoJSON(prjGeom) {
    console.log("parseGeometryToGeoJSON");
    for (var a = 0; a < prjGeom.length; a++) {
        console.log("print geom level A: ");
        console.log(prjGeom[a]);
        console.log("Feature: " + a);

        for (var b = 0; b < prjGeom[a].length; b++) {
            let coordinates = '';

            for (var c = 1; c < prjGeom[a][b].length; c++) {
                console.log("print geom level C: ");
                console.log(prjGeom[a][b][c]);
                console.log("RTE_NM: " + prjGeom[a][b][c][0]);
                console.log("BDFO: " + prjGeom[a][b][c][1]);
                console.log("EDFO: " + prjGeom[a][b][c][2]);
                console.log("Color: " + prjGeom[a][b][c][3]);
                console.log("Width: " + prjGeom[a][b][c][4]);
                console.log("Desc: " + prjGeom[a][b][c][5]);



                propertiesText = `"properties": { "RTE_NM": "` + prjGeom[a][b][c][0] + `", "BDFO": ` + prjGeom[a][b][c][1] + `, "EDFO": ` + prjGeom[a][b][c][2] + `,"Color": "` + prjGeom[a][b][c][3] + `", "Width": ` + prjGeom[a][b][c][4] + `,"Desc": "` + prjGeom[a][b][c][5] + `"}`

                console.log(propertiesText);

            }
            for (var d = 0; d < 10; d++) {
                console.log("coordinates: " + d);
                console.log(prjGeom[a][b][0][d]);

                if (d + 1 < 10) {
                    coordinateBracket = `[` + prjGeom[a][b][0][d] + `],`;
                } else {
                    coordinateBracket = `[` + prjGeom[a][b][0][d] + `]`;
                }

                coordinates += coordinateBracket;

            }
            console.log(coordinates);
            geometryText = `"geometry": { ` + `"type": "LineString", "coordinates": [` + coordinates + `]`;

        }


        featureText = `{ "type": "Feature", ` + propertiesText + `,` +  geometryText + `}, "id": "` + a + `" }`;
        console.log(featureText);
    }
    featureCollectionText = `{"type": "FeatureCollection", "metadata": {}, "features": [` + featureText + `]}`;
    console.log(featureCollectionText);
}