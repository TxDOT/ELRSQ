const staticDemo_Modal = `
<!-- Modal -->
<div class="modal fade" id="demoModal" tabindex="-1" aria-labelledby="demoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" >Demo Mode</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
          <div class="modal-body">
              <div class="card-body">
                  <input id="demo-mode-toggle"    
                  type="checkbox" 
                  unchecked
                  data-toggle="toggle" data-html="true" 
                  data-onlabel="<i class='fa fa-toggle-off' aria-hidden='true'></i> Demo Mode"    
                  data-offlabel="<i class='fa fa-toggle-on' aria-hidden='true'></i> Demo Mode"    
                  data-onstyle="info" 
                  data-offstyle="primary">
              </div>
          </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!--End Modal -->
`
