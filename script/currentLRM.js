let currentLRM = `coordinates-tab`;

$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    currentLRM = $(e.target).attr("id") // activated tab
    console.log(currentLRM);

    if (currentLRM == `referencemarker-tab`) {
        $("#tmpl-latlon").hide();
        $("#tmpl-controlsection").hide();
        $("#tmpl-dfo").hide();
        $("#tmpl-field").show();
    } else if (currentLRM == `controlsection-tab`) {
        $("#tmpl-latlon").hide();
        $("#tmpl-controlsection").show();
        $("#tmpl-dfo").hide();
        $("#tmpl-field").hide();
    } else if (currentLRM == `distancefromorigin-tab`) {
        $("#tmpl-latlon").hide();
        $("#tmpl-controlsection").hide();
        $("#tmpl-dfo").show();
        $("#tmpl-field").hide();
    } else {
        $("#tmpl-latlon").show();
        $("#tmpl-controlsection").hide();
        $("#tmpl-dfo").hide();
        $("#tmpl-field").hide();
    }
	
});