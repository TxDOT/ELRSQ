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

// using our functions here instead
/**
  function getInputRefs(element) {
    const zone = element.closest('.upload_dropZone') || false;
    const input = zone.querySelector('input[type="file"]') || false;
    return { input: input };
  }
  
  function handleDrop(event) {
    const dataRefs = getInputRefs(event.target);
    dataRefs.files = event.dataTransfer.files;
    handleFiles(dataRefs);
  }
*/


function dragDropEventHandlers(zone) {

  /**
    const dataRefs = getInputRefs(zone);
    if (!dataRefs.input) return;
  */

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

  // using our functions here instead
  /**
    // Handle dropped files
    zone.addEventListener('drop', handleDrop, false);
  
    // Handle browse selected files
    dataRefs.input.addEventListener('change', event => {
      dataRefs.files = event.target.files;
      handleFiles(dataRefs);
    }, false);
  */

}

  // using our functions here instead
/**
  // Handle both selected and dropped files
  function handleFiles(dataRefs) {
  
    let files = [...dataRefs.files];
    
    if (!files.length) return;
    dataRefs.files = files;
  }
*/
