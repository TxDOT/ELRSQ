// https://wesbos.com/javascript/12-advanced-flow-control/72-async-await-prompt-ui

async function confirmRTENM() {
  console.log(answers);

  result = (await
    new Promise(async function (resolve) {

      const foo = document.createElement('form');

      foo.insertAdjacentHTML(
        'afterbegin',
        `<div class="input-group mb-3">
          <span class="input-group-text">Route Name:</span>
          <select id="candidateRTENMs" class="form-select candidate">
            <option value="SH0080-KG">SH0080-KG</option></select>
          <button class="btn btn-outline-primary" type="submit">Select Route</button>
        </div>`
      );

      foo.addEventListener('submit', function (e) {
        e.preventDefault();
        resolve(document.querySelector("#candidateRTENMs").value);
      },
        { once: true }
      );

      document.body.appendChild(foo);

    })

  );

  answers = result;
  console.log(answers);
}
























// Four objects of interest: drop zones, input elements, gallery elements, and the files.
// dataRefs = {files: [image files], input: element ref, gallery: element ref}

const preventDefaults = event => {
  event.preventDefault();
  event.stopPropagation();
};



const getInputAndGalleryRefs = element => {
  const zone = element.closest('.upload_dropZone') || false;
  const gallery = zone.querySelector('.upload_gallery') || false;
  const input = zone.querySelector('input[type="file"]') || false;
  return { input: input, gallery: gallery };
}

const handleDrop = event => {
  const dataRefs = getInputAndGalleryRefs(event.target);
  dataRefs.files = event.dataTransfer.files;
  handleFiles(dataRefs);
}





const dataRefs = getInputAndGalleryRefs(zone);
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





// No 'image/gif' or PDF or webp allowed here, but it's up to your use case.
// Double checks the input "accept" attribute
const isImageFile = file =>
  ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type);


function previewFiles(dataRefs) {
  if (!dataRefs.gallery) return;
  for (const file of dataRefs.files) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let img = document.createElement('img');
      img.className = 'upload_img mt-2';
      img.setAttribute('alt', file.name);
      img.src = reader.result;
      dataRefs.gallery.appendChild(img);
    }
  }
}

// Based on: https://flaviocopes.com/how-to-upload-files-fetch/
const imageUpload = dataRefs => {

  // Multiple source routes, so double check validity
  if (!dataRefs.files || !dataRefs.input) return;

  const url = dataRefs.input.getAttribute('data-post-url');
  if (!url) return;

  const name = dataRefs.input.getAttribute('data-post-name');
  if (!name) return;

  const formData = new FormData();
  formData.append(name, dataRefs.files);

  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('posted: ', data);
      if (data.success === true) {
        previewFiles(dataRefs);
      } else {
        console.log('URL: ', url, '  name: ', name)
      }
    })
    .catch(error => {
      console.error('errored: ', error);
    });
}


// Handle both selected and dropped files
const handleFiles = dataRefs => {

  let files = [...dataRefs.files];

  // Remove unaccepted file types
  files = files.filter(item => {
    if (!isImageFile(item)) {
      console.log('Not an image, ', item.type);
    }
    return isImageFile(item) ? item : null;
  });

  if (!files.length) return;
  dataRefs.files = files;

  previewFiles(dataRefs);
  imageUpload(dataRefs);
}


