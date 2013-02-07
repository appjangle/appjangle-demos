// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo07_login1 -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {
	

	Appjangle.demos = Appjangle.demos || {};

	Appjangle.demos.initLoginDemo = function(params) {
		var wrapper = params.wrapper;
		var posts = params.posts;
		var Nextweb = params.engine;

		// init ui
		(function() {
			$(".showRegistration").click(function(evt) {
				evt.preventDefault();
				$(".registerPanel").show();
				$(".loginPanel").hide();
			})
			
			$(".showLogin").click(function(evt) {
				evt.preventDefault();
				$(".loginPanel").show();
				$(".registerPanel").hide();
			});
			
		}());
		
		return {
			wrapper : wrapper,
			shutdown : function() {
				
			}
		};

	};

}(window.Appjangle, window.jQuery));
// <!-- one.end -->
