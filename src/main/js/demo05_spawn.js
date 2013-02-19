// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo05_spawn -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {

	Appjangle.demos = Appjangle.demos || {};

	Appjangle.demos.initDemo05Spawn = function(params) {
		var elem = params.wrapper;
		var postsUrl = params.postsUrl;
		var postsSecret = params.postsSecret;
		var appUrl = "http://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo-collaboration_app.value.html";

		$(".spawnCaesar", elem)
				.attr(
						"href",
						appUrl
								+ "#"
								+ postsUrl
								+ "&"
								+ postsSecret
								+ "&Caesar&http://docs.google.com/drawings/d/1nL9LVuDNjakiFW9YL5t1QOMtUgn2bVIl4OAXpPS6pMw/pub?w=50");

		$(".spawnCleopatra", elem)
				.attr(
						"href",
						appUrl
								+ "#"
								+ postsUrl
								+ "&"
								+ postsSecret
								+ "&Cleopatra&http://docs.google.com/drawings/d/1ITfQfEuslX7P0Mj0ZYhCzKFUNdmU0gUXbJcEI_mz0oE/pub?w=50");

		$(".spawnSocrates", elem)
				.attr(
						"href",
						appUrl
								+ "#"
								+ postsUrl
								+ "&"
								+ postsSecret
								+ "&Socrates&http://docs.google.com/drawings/d/1kqVqej6c6R6PGpox-STQEc9O6fZO9zGicL5S6mmBkdQ/pub?w=50");

		$(".spawnLincoln", elem)
				.attr(
						"href",
						appUrl
								+ "#"
								+ postsUrl
								+ "&"
								+ postsSecret
								+ "&Lincoln&http://docs.google.com/drawings/d/1VyBRCBo2OOOcBVOmiRLP8r-ZPvva-VolSenXdnni4VM/pub?w=50");

		elem.show();

	};

}(Appjangle, jQuery));

// <!-- one.end -->
