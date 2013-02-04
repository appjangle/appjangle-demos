// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo05_spawn -->

/*global window: false */

window.Appjangle = window.Appjangle || {};



(function(Appjangle, $) {

	window.Appjangle.demos = window.Appjangle.demos || {};
	
	Appjangle.demos.initDemo05Spawn = function(params) {
		var elem = params.wrapper;
		var postsUrl = params.postsUrl;
		var appUrl = "http://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo-collaboration_app.value.html";

		$(".spawnCaesar", elem)
				.attr(
						"href",
						appUrl
								+ "#"
								+ postsUrl
								+ "&Caesar&http://docs.google.com/drawings/d/1nL9LVuDNjakiFW9YL5t1QOMtUgn2bVIl4OAXpPS6pMw/pub?w=50");

		$(".spawnCleopetra", elem)
				.attr(
						"href",
						appUrl
								+ "#"
								+ postsUrl
								+ "&Cleopetra&http://docs.google.com/drawings/d/1ITfQfEuslX7P0Mj0ZYhCzKFUNdmU0gUXbJcEI_mz0oE/pub?w=50");
		
		

	};

}());

// <!-- one.end -->
