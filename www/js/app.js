// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
	var adapter = new MemoryAdapter();
	adapter.initialize().done(function () {
		renderHomeView();
	});

    /* --------------------------------- Event Registration -------------------------------- */
	document.addEventListener('deviceready', function () {
		if (navigator.notification) { // Override default HTML alert with native dialog
			window.alert = function (message) {
				navigator.notification.alert(
					message,    // message
					null,       // callback
					"Workshop", // title
					'OK'        // buttonName
				);
			};
		}
	}, false);


    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        adapter.findByName($('.search-key').val()).done(function (employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i = 0; i < l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    }
	
	function renderHomeView() {
		var html =
			"<h1>Directory</h1>" +
			"<input class='search-key' type='search' placeholder='Enter name 2'/>" +
			"<ul class='employee-list'></ul>";
		$('body').html(html);
		$('.search-key').on('keyup', findByName);
	}

}());