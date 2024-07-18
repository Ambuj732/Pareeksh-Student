function init_autocomplete() {
	if (typeof $.fn.autocomplete === "undefined") {
		return;
	}

	var countriesArray = $.map(countries, function (value, key) {
		return {
			value: value,
			data: key,
		};
	});

	// initialize autocomplete with custom append
	$("#custom-append").autocomplete({
		lookup: countriesArray,
	});
}


