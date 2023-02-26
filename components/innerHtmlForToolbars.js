const staticFileInputForm = `      
    <form>
    <fieldset id="fieldset-uploadCsv-bulk" class="upload_dropZone text-center mb-3 p-4">
    <legend class="visually-hidden">CSV uploader</legend>
        <p class="small my-2">Drag &amp; Drop CSV inside dashed region<br><i>or</i></p>
        <input data-post-name="csv-bulk" 
        class="position-absolute invisible form-control uploadCsv-bulk" type="file" placeholder="Select file" accept=".csv" />
        <label class="btn btn-upload mb-3" for="uploadCsv-bulk">Choose file(s)</label>
    </fieldset>
    <button class="btn btn-primary bulk-convert" type="button"  title="Convert to other LRS"><i class="fa fa-cog" aria-hidden="true"></i> Convert</button>
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

const staticMap_Controls = `
    <div class="card-body">
    
      <input id="basemap-event"    
      type="checkbox" checked 
      data-toggle="toggle" data-html="true" 
      data-onlabel="<i class='fa fa-camera'     aria-hidden='true'></i> Imagery"     
      data-offlabel="<i class='fa fa-map-signs' aria-hidden='true'></i> TxDOT"       
      data-onstyle="success" 
      data-offstyle="primary">
    
      <input id="refmrkr-event"    
      type="checkbox" 
      data-toggle="toggle" data-html="true" 
      data-onlabel="<i class='fa fa-toggle-off' aria-hidden='true'></i> Ref Mrkr"    
      data-offlabel="<i class='fa fa-toggle-on' aria-hidden='true'></i> Ref Mrkr"    
      data-onstyle="info" 
      data-offstyle="primary" 
      disabled>
    
      <input id="controlsec-event" 
      type="checkbox" 
      data-toggle="toggle" data-html="true" 
      data-onlabel="<i class='fa fa-toggle-off' aria-hidden='true'></i> Ctrl Sec" 
      data-offlabel="<i class='fa fa-toggle-on' aria-hidden='true'></i> Ctrl Sec" 
      data-onstyle="info" 
      data-offstyle="primary" 
      disabled> 
    
    </div>`





