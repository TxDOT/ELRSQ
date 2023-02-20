/*const staticMap_Controls = `<div class="card-body">

  <input id="basemap-event"    type="checkbox" checked data-toggle="toggle" data-html="true" data-on="<i class='fa fa-camera'     aria-hidden='true'></i> Imagery"     data-off="<i class='fa fa-map-signs' aria-hidden='true'></i> TxDOT"       data-onstyle="success" data-offstyle="primary">

  <input id="refmrkr-event"    type="checkbox" data-toggle="toggle" data-html="true" data-on="<i class='fa fa-toggle-off' aria-hidden='true'></i> Ref Mrkr"    data-off="<i class='fa fa-toggle-on' aria-hidden='true'></i> Ref Mrkr"    data-onstyle="info" data-offstyle="primary" disabled>

  <input id="controlsec-event" type="checkbox" data-toggle="toggle" data-html="true" data-on="<i class='fa fa-toggle-off' aria-hidden='true'></i> Control Sec" data-off="<i class='fa fa-toggle-on' aria-hidden='true'></i> Control Sec" data-onstyle="info" data-offstyle="primary" disabled> 

</div>`*/

const staticMap_Controls = `<div class="card-body">

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



/*const staticMap_Controls = `<div class="card-body">
  <input 
  id="refmrkr-event"    
  type="checkbox" 
  data-html="true" 
  data-on="data-on"    
  data-off="data-off"    
  data-onstyle="info" 
  data-offstyle="primary" 
  data-size="mini" 
  disabled>
</div>`*/

class Map_Controls extends HTMLElement {

  /*async #getHTML (path) {
    try {
      let request = await fetch(path);
      this.innerHTML = await request.text();
    } catch {
      this.innerHTML = staticMap_Controls;
    }
  }*/

  constructor () {
    super();
    /*let path = '/components/map_controls.html';
    this.#getHTML(path);*/
  }
  
  connectedCallback() {
    this.innerHTML = staticMap_Controls;
  }
}

customElements.define('map_controls-component', Map_Controls);