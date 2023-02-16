
//const bulkForm = document.getElementById("bulk-form");
//const fileContentDiv = document.getElementById('#output_field')

$(document).ready(function () {
    document.getElementById("bulk").addEventListener('change', handleUpload)
});


let rawtext = '';
console.log("rawtext: " + rawtext);

const handleUpload = async (event) => {
    const file = event.target.files[0];

    try {
        const fileContents = await readFile(file)
        ////$('#output_field').text(fileContents);

        //set method parameter depending on tab
        let method = 1;
        csvinToCsvout(fileContents, method, 2, 1);

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

async function csvinToCsvout(text, method, ...index_coord) {
    let array = csvToArray(text);
    let outputArray = [];
    /*console.log(array);
    console.log(JSON.stringify(array));
    console.log(array[1]);*/

    ////const titleKeys = Object.keys(outputArray[0][0])
    const titleKeys = ["LAT", "LON", "GID", "RTE_DEFN_LN_NM", "RTE_DFO", "ROUTEID", "ROUTENUMBER", "RTE_PRFX_TYPE_DSCR", "RDBD_TYPE_DSCR", "RMRKR_PNT_NBR", "RMRKR_DISPLACEMENT", "CTRL_SECT_LN_NBR", "CTRL_SECT_MPT", "MSG", "distance"]
    titleKeys.unshift("Feature");
    let refinedData = []
    refinedData.push(titleKeys)

    /*let method = 1;
    let colno_coord1 = 2;
    let colno_coord2 = 1;*/

    // skipping 0 header row
    for (let i = 1; i < array.length; i++) {
        console.log(i);
        results = await queryByLine(array, i, method, ...index_coord);
        breakMultipleResults(outputArray, refinedData, array, i, results)
    }

    /*console.log(outputArray);
    console.log(refinedData);
    console.log(titleKeys);*/

    let csvContent = ''
    refinedData.forEach(row => { csvContent += row.join(',') + '\n' })

    console.log(csvContent);
    makeDownloadLink(csvContent);
};

//add other 3 methods
async function queryByLine(array, line, method, ...index_coord) {
    currentLine = array[line];
    //rowhead = currentLine[0];
    /*coord1 = currentLine[colno_coord1];
    coord2 = currentLine[colno_coord2];*/

    url = makeLrsQueryUrlFromIndex(method, currentLine, index_coord) 

    const results = await queryService(url);
    return results;
}


function makeLrsQueryUrlFromIndex(method, vector, index_coord) {

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




function breakMultipleResults(output1, output2, array, line, results) {
    rowhead = (array[line])[0];

    results.forEach(_result => {
        output1.push(_result);
        out_row = Object.values(_result);
        out_row.unshift(rowhead);
        output2.push(out_row);
    });
}

//change this to go somewhere else
function makeDownloadLink(csvContent) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
    const objUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', objUrl)
    link.setAttribute('download', 'christian_bale.csv')
    link.textContent = 'Click to Download'
    document.querySelector("#bulk-justified").append(link)
}

function csvToArray(str, delimiter = ",") {
    console.log("csv to array");
    let array = str.split("\r\n").map(function (line) { return line.split(delimiter); });
    return array;
}
