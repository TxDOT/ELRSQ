// https://wesbos.com/javascript/12-advanced-flow-control/72-async-await-prompt-ui

async function confirmRTENM() {
  console.log(answers);

  GreenToYellow();

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

  YellowToGreen();

  answers = result;
  console.log(answers);
}

