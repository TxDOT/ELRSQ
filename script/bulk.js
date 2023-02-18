
//const bulkForm = document.getElementById("bulk-form");
//const fileContentDiv = document.getElementById('#output_field')

$(document).ready(function () {
    document.getElementById("upload_csv-bulk").addEventListener('change', handleUpload)
    document.getElementById("bulk-convert-button").addEventListener('click', handleUpload2)
});


let rawtext = '';
console.log("rawtext: " + rawtext);

// this starts converting before Convert button is pressed
const handleUpload = async (event) => {
    console.log("handleUpload");
    const file = event.target.files[0];

    try {
        const fileContents = await readFile(file)
        ////$('#output_field').text(fileContents);

        //set method parameter depending on tab
        if (currentLRM == `referencemarker-tab`) {
            method = 2;
            csvinToCsvout(fileContents, method, 1, 2, 3); // need to determine template
        } else if (currentLRM == `controlsection-tab`) {
            method = 3;
            csvinToCsvout(fileContents, method, 1, 2); // need to determine template
        } else if (currentLRM == `distancefromorigin-tab`) {
            method = 4;
            csvinToCsvout(fileContents, method, 1, 2); // need to determine template
        } else {
            method = 1;
            csvinToCsvout(fileContents, method, 2, 1);
        }

    } catch (e) {
        ////$('#output_field').text(e.message);
    }
}


//experimental
async function handleUpload2(file){
console.log("handleUpload2");
    try {
        const fileContents = await readFile(file)
        ////$('#output_field').text(fileContents);

        //set method parameter depending on tab
        if (currentLRM == `referencemarker-tab`) {
            method = 2;
            csvinToCsvout(fileContents, method, 1, 2, 3); // need to determine template
        } else if (currentLRM == `controlsection-tab`) {
            method = 3;
            csvinToCsvout(fileContents, method, 1, 2); // need to determine template
        } else if (currentLRM == `distancefromorigin-tab`) {
            method = 4;
            csvinToCsvout(fileContents, method, 1, 2); // need to determine template
        } else {
            method = 1;
            csvinToCsvout(fileContents, method, 2, 1);
        }

    } catch (e) {
        ////$('#output_field').text(e.message);
    }
}


function readFile(file) {
    console.log("reader load");
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsText(file);
    });
};

// this needs the functionality to export geoJSON and KML as well
// should probably be split into two functions - one to do the query, another to make the outputs
async function csvinToCsvout(text, method, ...index_coord) {
    let array = csvToArray(text);
    let outputArray = [];
    let useLoadIndicator = 1;

    if (useLoadIndicator == 1) {
        GreenToYellow();
        console.log("busy");
    }

    ////const titleKeys = Object.keys(outputArray[0][0])
    const titleKeys = ["LAT", "LON", "GID", "RTE_DEFN_LN_NM", "RTE_DFO", "ROUTEID", "ROUTENUMBER", "RTE_PRFX_TYPE_DSCR", "RDBD_TYPE_DSCR", "RMRKR_PNT_NBR", "RMRKR_DISPLACEMENT", "CTRL_SECT_LN_NBR", "CTRL_SECT_MPT", "MSG", "distance"]
    titleKeys.unshift("Feature");
    let refinedData = []
    refinedData.push(titleKeys)

    // skipping 0 header row
    for (let i = 1; i < array.length; i++) {
        console.log(i);
        results = await queryByLine(array, i, method, ...index_coord);
        breakMultipleResults(outputArray, refinedData, array, i, results)
    }

    // see if there is a function in papa parser to replace this
    let csvContent = ''
    refinedData.forEach(row => { csvContent += row.join(',') + '\n' })

    if (useLoadIndicator == 1) {
        YellowToGreen();
    }

    console.log(csvContent);
    alert("Ready to Download");
    makeDownloadLink(csvContent);
};


async function queryByLine(array, line, method, ...index_coord) {
    console.log("queryByLine");
    currentLine = array[line];

    url = makeLrsQueryUrlFromIndex(method, currentLine, index_coord)
    console.log(url);
    const results = await queryService(url);
    return results;
}


function makeLrsQueryUrlFromIndex(method, vector, index_coord) {
    console.log(vector);

    if (method == 1) {
        const lat = vector[index_coord[0]];
        const lon = vector[index_coord[1]];
        url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
    }

    else if (method == 2) {
        const routeName = vector[index_coord[0]];
        const refMarker = vector[index_coord[1]];
        const displacement = vector[index_coord[2]];
        url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
    }

    else if (method == 3) {
        const controlSecNum = vector[index_coord[0]];
        const milePointMeasure = vector[index_coord[1]];
        url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
    }

    else if (method == 4) {
        const routeName = vector[index_coord[0]];
        const dfo = vector[index_coord[1]];
        url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
    }

    return url;
}

// if result has multiple rows, write each row individually
function breakMultipleResults(output1, output2, array, line, results) {
    rowhead = (array[line])[0];

    results.forEach(_result => {
        output1.push(_result);
        out_row = Object.values(_result);
        out_row.unshift(rowhead);
        output2.push(out_row);
    });
}


function makeDownloadLink(csvContent) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
    const objUrl = URL.createObjectURL(blob)

    let exportFileDefaultName = 'christian_bale.csv';

    let linkElement = document.getElementById('CSVdownload');
    linkElement.setAttribute('href', objUrl);
    linkElement.setAttribute('download', exportFileDefaultName);

}

// look for papa parse alternative
function csvToArray(str, delimiter = ",") {
    console.log("csv to array");
    let array = str.split("\r\n").map(function (line) { return line.split(delimiter); });
    return array;
}
