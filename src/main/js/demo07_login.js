// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo07_login1 -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {
	

	Appjangle.demos = Appjangle.demos || {};

	Appjangle.demos.initLoginDemo = function(params) {
		var wrapper = params.wrapper;
		var posts = params.posts;
		var modeations = params.moderations;
		var wall = params.wall;
		var session = params.posts.getSession();

		var login = {};
		
		login.register = function() {
			var email = $(".registerEmail").value();
			var password = $(".registerPassword").value();
			
			if (!checkInputs(email, password)) {
				return;
			}
			
			var request = session.registerUser(email, password, session.node(wall));
			
			request.catchLoginFailures({
				triggerUserAlreadyRegistered: function() {
					alert("User already registered for application.")
				},
				onInvalidDetails: function() {
					alert("Invalid username/password.")
				},
				onChallenged: function() {
					alert("Unexpected challenge received.");
				}
			});
			
			request.catchExceptions(function(ex) {
				alert("Unexpected exception during registration: "+ex);
			});
			
			request.get(function(user) {
				
			});
			
		};
		
		login.login = function() {
			
		};
		
		login.checkInput= function(email, password) {
			if (!email) {
				alert("Please specify an email.");
				return false;
			}
			
			if (!password) {
				alert("Please specify a password.");
				return false;
			}
			
			return true;
		};
		
		// init ui
		(function() {
			
			$(".registerButton").click(function(evt) {
				evt.preventDefault();
				login.register();
			});
			
			$(".loginButton").click(function(evt) {
				evt.preventDefault();
				login.login();
			});
			
			$(".showRegistration").click(function(evt) {
				evt.preventDefault();
				$(".registerPanel").show();
				$(".loginPanel").hide();
				$(".showRegistration").addClass("btn-inverse");
				$(".showLogin").removeClass("btn-inverse");
			})
			
			$(".showLogin").click(function(evt) {
				evt.preventDefault();
				$(".loginPanel").show();
				$(".registerPanel").hide();
				$(".showRegistration").removeClass("btn-inverse");
				$(".showLogin").addClass("btn-inverse");
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
