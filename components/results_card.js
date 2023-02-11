const staticResults_Card = `      <div id="results_card" class="card">
  <div class="card-body">
    <h5 class="card-title">Results:</h5> <span id="result-pagination"></span>
    &bull;
    <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#resultsHelpModal" title="Results Help"><i class="fa fa-question" aria-hidden="true"></i> Help</button>    


    <div class="card">
      <div class="card-body">
        <!-- Bordered Table -->
        <table class="table table-sm">
          <thead>
            <tr>
              <td scope="col"></td>
              <td scope="col"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Route Information</td>
              <td scope="row">
                <button type="button" class="btn btn-info" onclick="copyRouteDFO()" title="copy"><i class="fa fa-copy" aria-hidden="true"></i></button>
                <button type="button" class="btn btn-info" onclick="makequeryTxDOT_Roadways_Unsegmented()"><i class="fa fa-link" aria-hidden="true"></i></button>
              </td>
            </tr>
            <tr>
              <td scope="row">RouteID:</td>
              <td id="p_returned_ROUTEID" class="textout table-secondary"></td>
            </tr>
            <tr>
              <td scope="row">Route:</td>
              <td id="p_returned_ROUTENUMBER" class="textout table-secondary"></td>
            </tr>
            <tr>
              <td scope="row">Roadbed Type:</td>
              <td id="p_returned_RDBD_TYPE_DSCR" class="textout table-secondary"></td>
            </tr>
            <tr>
              <td scope="row">DFO:</td>
              <td id="p_returned_RTE_DFO" class="textout table-secondary"></td>
            </tr>
          </tbody>
        </table>

        <table class="table table-sm">
          <thead>
            <tr>
              <td scope="col"></td>
              <td scope="col"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Control Section</td>
              <td scope="row"><button type="button" class="btn btn-info" onclick="copyControlSection()" title="copy"><i class="fa fa-copy" aria-hidden="true"></i></button></td>
            </tr>
            <tr>
              <td scope="row">Control Section:</td>
              <td id="p_returned_CTRL_SECT_LN_NBR" class="textout table-secondary"></td>
            </tr>
            <tr>
              <td scope="row">Mile Point:</td>
              <td id="p_returned_CTRL_SECT_MPT" class="textout table-secondary"></td>
            </tr>
          </tbody>
        </table>

        <table class="table table-sm">
          <thead>
            <tr>
              <td scope="col"></td>
              <td scope="col"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Field Location</td>
              <td scope="row"><button type="button" class="btn btn-info" onclick="copyFieldLocation()" title="copy"><i class="fa fa-copy" aria-hidden="true"></i></button></td>
            </tr>
            <tr>
              <td scope="row">Reference Marker:</td>
              <td id="p_returned_RMRKR_PNT_NBR" class="textout table-secondary"></td>
            </tr>
            <tr>
              <td scope="row">Displacement:</td>
              <td id="p_returned_RMRKR_DISPLACEMENT" class="textout table-secondary"></td>
            </tr>
          </tbody>
        </table>


        <table class="table table-sm">
          <thead>
            <tr>
              <td scope="col"></td>
              <td scope="col"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Coordinates</td>
              <td scope="row"><button type="button" class="btn btn-info" onclick="copyCoordinates()" title="copy"><i class="fa fa-copy" aria-hidden="true"></i></button></td>
            </tr>
            <tr>
              <td scope="row">Latitude:</td>
              <td id="p_returned_LAT" class="textout table-secondary"></td>
            </tr>
            <tr>
              <td scope="row">Longitude:</td>
              <td id="p_returned_LON" class="textout table-secondary"></td>
            </tr>
          </tbody>
        </table>
        <!-- End Bordered Table -->

      </div>
    </div>

  </div>
</div>`
  
  class Results_Card extends HTMLElement {
  
    async #getHTML (path) {
      try {
        let request = await fetch(path);
        this.innerHTML = await request.text();
      } catch {
        this.innerHTML = staticResults_Card;
      }
    }
  
    constructor () {
      super();
      let path = 'results_card.html';
      this.#getHTML(path);
    }
    
    connectedCallback() {
      this.innerHTML = staticResults_Card;
    }
  }
  
  customElements.define('results_card-component', Results_Card);


