/* Bootstrap 5 JS included */

// Drag and drop - single or multiple image files
// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
// https://codepen.io/joezimjs/pen/yPWQbd?editors=1000


// Initialise ALL dropzones
const dropZones = document.querySelectorAll('.upload_dropZone');
for (const zone of dropZones) {
  dragDropEventHandlers(zone);
}

function preventDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
};

function highlight(event) {
  event.target.classList.add('highlight');
}

function unhighlight(event) {
  event.target.classList.remove('highlight');
}


function dragDropEventHandlers(zone) {

  // Prevent default drag behaviors
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
    zone.addEventListener(event, preventDefaults, false);
    document.body.addEventListener(event, preventDefaults, false);
  });

  // Highlighting drop area when item is dragged over it
  ;['dragenter', 'dragover'].forEach(event => {
    zone.addEventListener(event, highlight, false);
  });
  ;['dragleave', 'drop'].forEach(event => {
    zone.addEventListener(event, unhighlight, false);
  });


}

