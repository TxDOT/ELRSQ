/* Bootstrap 5 JS included */

// Drag and drop - single or multiple image files
// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
// https://codepen.io/joezimjs/pen/yPWQbd?editors=1000


// Initialise ALL dropzones
const dropZones = document.querySelectorAll('.upload_dropZone');
for (const zone of dropZones) {
  eventHandlers(zone);
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

function getInputRefs(element) {
  console.log("getInputRefs");
  const zone = element.closest('.upload_dropZone') || false;
  const input = zone.querySelector('input[type="file"]') || false;
  return { input: input };
}

function handleDrop(event) {
  console.log("handleDrop");
  const dataRefs = getInputRefs(event.target);
  console.log("dataRefs");
  console.log(dataRefs);
  dataRefs.files = event.dataTransfer.files;
  handleFiles(dataRefs);
  console.log("dataRefs.files");
  console.log(dataRefs.files);
  handleUpload2(dataRefs.files[0]); //experimental
}


function eventHandlers(zone) {

  const dataRefs = getInputRefs(zone);
  if (!dataRefs.input) return;

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

  // Handle dropped files
  zone.addEventListener('drop', handleDrop, false);

  // Handle browse selected files
  dataRefs.input.addEventListener('change', event => {
    dataRefs.files = event.target.files;
    handleFiles(dataRefs);
  }, false);

}


// Handle both selected and dropped files
function handleFiles(dataRefs) {
  console.log("handleFiles");

  let files = [...dataRefs.files];
  console.log(files);
  
  if (!files.length) return;
  dataRefs.files = files;
}


/*
// this starts converting before Convert button is pressed
const handleFiles = async (event) => {
  const file = event.target.files[0];

  try {
      const fileContents = await readFile(file)
      ////$('#output_field').text(fileContents);

      //set method parameter depending on tab
      if (currentLRM == `referencemarker-tab`) {
          method = 2;
          csvinToCsvout(fileContents, method, 1, 2, 3); // need to determine template
      } else if (currentLRM == `controlsection-tab`) {
          method = 3;
          csvinToCsvout(fileContents, method, 1, 2); // need to determine template
      } else if (currentLRM == `distancefromorigin-tab`) {
          method = 4;
          csvinToCsvout(fileContents, method, 1, 2); // need to determine template
      } else {
          method = 1;
          csvinToCsvout(fileContents, method, 2, 1);
      }

  } catch (e) {
      ////$('#output_field').text(e.message);
  }
}*/