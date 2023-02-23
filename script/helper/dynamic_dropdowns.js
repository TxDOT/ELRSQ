function dropDownPopulator(dropDownId, candidate_fields) {
    for (var aCandidate_field = 0; aCandidate_field < candidate_fields.length; aCandidate_field++) {
      var optn = candidate_fields[aCandidate_field];
      var el = document.createElement("option");
      el.textContent = optn;
      el.value = aCandidate_field;
      $(dropDownId).append(el);
    }
  }
  
  async function confirmFieldChoice(buttonId, dropDownId) {
    result = (await
      new Promise(async function (resolve) {
        $(buttonId).on("click", function (e) {
          //e.preventDefault();
          resolve(document.querySelector(dropDownId).value);
        });
      })
    );
    return result;
  }
  
  