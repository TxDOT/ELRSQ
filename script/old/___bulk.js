
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

const bulkForm = document.getElementById("bulk-form");
const csvFile = document.getElementById("bulk");
const fileInput = document.getElementById("bulk");
const fileContentDiv = document.getElementById('#output_field')

$(document).ready(function () {
    document.getElementById("bulk").addEventListener('change', handleUpload)
});


let rawtext = '';
console.log("rawtext: " + rawtext);

const handleUpload = async (event) => {
    const file = event.target.files[0];
    
    try {
        const fileContents = await readFile(file)
        //fileContentDiv.innerHTML = fileContents
        //$('#output_field').text(fileContents);

        bar(fileContents);

    } catch (e) {
        //fileContentDiv.innerHTML = e.message
        //$('#output_field').text(e.message);
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




async function bar(text) {
    let array = csvToArray(text);
    let outputArray = [];
    console.log(array);
    console.log(JSON.stringify(array));
    console.log(array[1]);

    ////const titleKeys = Object.keys(outputArray[0][0])
    const titleKeys = ["LAT", "LON", "GID", "RTE_DEFN_LN_NM", "RTE_DFO", "ROUTEID", "ROUTENUMBER", "RTE_PRFX_TYPE_DSCR", "RDBD_TYPE_DSCR", "RMRKR_PNT_NBR", "RMRKR_DISPLACEMENT", "CTRL_SECT_LN_NBR", "CTRL_SECT_MPT", "MSG", "distance"]
    titleKeys.unshift("Feature");
    let refinedData = []
    refinedData.push(titleKeys)

    let method = 1;
    let colno_coord1 = 2;
    let colno_coord2 = 1;

    let i = 1; // skipping 0 header row
    while (i < array.length) {
        console.log(i);
        await sleep(2000);
        assemblyQueryByLine(outputArray, refinedData, array, i, method, colno_coord1, colno_coord2);
        i++;
    }

    console.log(outputArray);
    console.log(refinedData);
    console.log(titleKeys);

    let csvContent = ''
    refinedData.forEach(row => { csvContent += row.join(',') + '\n' })

    console.log(csvContent);
    makeDownloadLink(csvContent);
};


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

function assemblyQueryByLine(output1, output2, array, line, method, colno_coord1, colno_coord2, colno_coord3) {
    currentLine = array[line];
    rowhead = currentLine[0];
    coord1 = currentLine[colno_coord1];
    coord2 = currentLine[colno_coord2];
    lrsBulkQuery(output1, output2, method, rowhead, coord1, coord2);
}


async function lrsBulkQuery(output1, output2, method, rowhead, coord1, coord2, coord3) {
    currentPos = 1;

    if (method == 1) {
        lat = coord1;
        lon = coord2;
        url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
    }

    const results = await queryService(url);
    ////resultCount = results.length;

    results.forEach(_result => {
        output1.push(_result);
        out_row = Object.values(_result);
        out_row.unshift(rowhead);
        output2.push(out_row);
    });

    ////showResultsOnMap(results);
}