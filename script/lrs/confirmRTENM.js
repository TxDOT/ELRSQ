// https://wesbos.com/javascript/12-advanced-flow-control/72-async-await-prompt-ui


async function confirmRTENM() {
  result = (await new Promise(async function (resolve) {

    $("#btn-candidateRTENMs").on("click", function (e) {
      //e.preventDefault();
      resolve(document.querySelector("#candidateRTENMs").value);
    });
  })
  );

  return result;
}

async function confirmRTENM_2() {
  result = (await new Promise(async function (resolve) {

    $("#btn-candidateRTENMs_2").on("click", function (e) {
      //e.preventDefault();
      resolve(document.querySelector("#candidateRTENMs_2").value);
    });
  })
  );

  return result;
}
