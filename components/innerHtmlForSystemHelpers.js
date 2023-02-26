const staticNav_Bar = `
<nav class="navbar navbar-expand-lg navbar-light bg-light"> 
<div class="container-fluid">
    <div id="navbarSupportedContent">  
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item">
          <a class="nav-link " href="index.html">
            <span>Point Builder</span>
          </a>
        </li>
        <!-- End Form View Nav -->

        <li class="nav-item">
          <a class="nav-link " href="bulk-point-wizard.html">
            <span>Bulk Point Wizard</span>
          </a>
        </li>
        <!-- End Bulk Conversion Nav -->

        <li class="nav-item">
          <a class="nav-link collapsed" href="single-route-form.html">
            <span>Route Builder</span>
          </a>
        </li>
        <!-- End Build Routes Page Nav -->

        <li class="nav-item">
          <a class="nav-link collapsed" href="bulk-route-wizard.html">
            <span>Bulk Route Wizard</span>
          </a>
        </li>
        <!-- End Bulk Routes Page Nav -->

        <li class="nav-item">
          <a class="nav-link collapsed" href="single-route-rpm.html">
            <span>Future RPM Replacement</span>
          </a>
        </li>
        <!-- End Build Routes Page Nav -->

      </ul>
    </div>
</div>
</nav>`

const staticIndicator = `
<style>
  .trafficlight {
    background: #222;
    width: 35px;
    height: 35px;
    border-radius: 25%;
    position: relative;
  }

  .lamp {
    background-size: 2px 2px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .red {
    background: red;
    background-image: radial-gradient(brown, transparent);
    animation: 13s red infinite;
    border: dotted 1px red;
    box-shadow:
      0 0 5px #111 inset,
      0 0 3px red;
  }

  .yellow {
    background: yellow;
    background-image: radial-gradient(orange, transparent);
    border: dotted 1px yellow;
    animation: 5s yellow infinite;
    box-shadow:
      0 0 5px #111 inset,
      0 0 3px yellow;
  }

  .green {
    background: green;
    background-image: radial-gradient(lime, transparent);
    border: dotted 1px lime;
    box-shadow:
      0 0 15x #111 inset,
      0 0 3px lime;
    animation: 10s green infinite;
  }

  @keyframes red {
    0% {
      opacity: 1
    }

    20% {
      opacity: 1
    }

    40% {
      opacity: 1
    }

    60% {
      opacity: .1
    }

    80% {
      opacity: .1
    }

    100% {
      opacity: .1
    }
  }

  @keyframes yellow {
    0% {
      opacity: .5
    }

    50% {
      opacity: 1
    }

    100% {
      opacity: .5
    }
  }

  @keyframes green {
    0% {
      opacity: .7
    }

    50% {
      opacity: 1
    }

    100% {
      opacity: .7
    }
  }

  @keyframes greenblink {
    0% {
      opacity: .1
    }

    40% {
      opacity: .1
    }

    60% {
      opacity: 1
    }

    80% {
      opacity: 1
    }

    83% {
      opacity: .1
    }

    100% {
      opacity: .1
    }
  }
</style>



<div class="card">
    <div class="card-body d-flex align-items-center justify-content-center">
      <span class="d-flex align-items-center justify-content-center me-3">System Status</span>
      <div class="d-flex align-items-center justify-content-center me-3">
        <span id="errorBadge" class="badge bg-danger" style="display:none">Error</span>
        <span id="busyBadge" class="badge bg-warning text-dark" style="display:none">Busy</span>
        <span id="readyBadge" class="badge bg-success">Ready</span>
      </div> 
      <div class="d-flex align-items-center justify-content-center me-3">
          <div class="trafficlight">
              <span id="errorIndicator" class="lamp"></span>
          </div> 
          <div class="trafficlight">
              <span id="busyIndicator" class="lamp"></span>
          </div>       
          <div class="trafficlight">
              <span id="readyIndicator" class="green lamp"></span>
          </div>
      </div>
      <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#demoModal"
      title="Demo Mode"><i class="fa fa-user-secret" aria-hidden="true"></i></button>
    </div>
  </div>`


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
                  checked
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
