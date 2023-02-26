const staticFileInputForm = `      
    <form id="bulk-form">
    <fieldset id="fieldset-uploadCsv-bulk" class="upload_dropZone text-center mb-3 p-4">
    <legend class="visually-hidden">CSV uploader</legend>
        <p class="small my-2">Drag &amp; Drop CSV inside dashed region<br><i>or</i></p>
        <input id="uploadCsv-bulk" data-post-name="csv-bulk" 
        class="position-absolute invisible form-control" type="file" placeholder="Select file" accept=".csv" />
        <label class="btn btn-upload mb-3" for="uploadCsv-bulk">Choose file(s)</label>
    </fieldset>
    <button id="bulk-convert-button" class="btn btn-primary" type="button"  title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
    </form>`


const staticDownload_Bar = `      
    <div class="btn-toolbar mb-3 justify-content-center" role="toolbar"
        aria-label="Toolbar with button groups">
        <div class="btn-group me-2 mb-2" role="group" aria-label="download group">
            <a id="CSVdownload" type="button" href=" " download=" " class="btn btn-primary"
                title="Export a CSV file of all points"><i class="fa fa-download"></i> CSV</button>

            <a id="JSONdownload" type="button" href=" " download=" " class="btn btn-primary"
                title="Export a JSON file of all points"><i class="fa fa-download"></i> JSON</a>

            <a id="KMLdownload" type="button" href=" " download=" " class="btn btn-primary"
                title="Export a KML file of all points"><i class="fa fa-download"></i> KML</a>
        </div>
        <div class="btn-group mb-2" role="group" aria-label="download group">
            <button type="button" class="btn btn-info" data-bs-toggle="modal"
                data-bs-target="#resultsHelpModal" title="Results Help"><i class="fa fa-question"
                    aria-hidden="true"></i> Help</button>
        </div>
    </div>`





