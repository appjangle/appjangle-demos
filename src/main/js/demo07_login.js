// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo07_login1 -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {

	Appjangle.demos = Appjangle.demos || {};

	Appjangle.demos.initLoginDemo = function(params) {
		var wrapper = params.wrapper;
		var posts = params.posts;
		var moderations = params.moderations;
		var wall = params.wall;
		var session = params.posts.getSession();

		var avatarType = "http://slicnet.com/seed1/seed1/3/9/1/3/h/sd/anAvatar";
		var anAvatar = session.node(avatarType);

		var userNameType = "http://slicnet.com/seed1/seed1/3/9/2/3/h/sd/userName";
		var aUserName = session.node(userNameType);

		var login = {};

		login.register = function() {
			var email = $(".registerEmail").val();
			var password = $(".registerPassword").val();
			var avatar = $('.registerForm input[type=radio]:checked').val();

			if (!login.checkInputs(email, password)) {
				return;
			}

			if ($('input[type=checkbox]:checked').size() <= 0) {
				login.reportError("Please agree to the Appjangle Terms of Service to proceed.");
				return;
			}
			
			var request = session.register(email, password, session
					.node(wall));

			request.catchLoginFailures({
				onUserAlreadyRegistered : function() {
					login.reportError("User already registered for application.");
				},
				onInvalidDetails : function() {
					login.reportError("Invalid username/password.")
				},
				onChallenged : function() {
					login.reportError("Unexpected challenge received.");
				}
			});

			request.catchExceptions(function(ex) {
				alert("Unexpected exception during registration: " + JSON.stringify(ex));
			});

			request.get(function(user) {
				login.initUserData(user, avatar, function() {
					login.startClient(user);
				});

			});
			
			$(".forms").hide();
			$(".progressIndicator").show();

		};

		login.initUserData = function(user, avatar, callback) {
			var settings = user.userNode().select("./settings", "settings");

			settings.append(avatar).append(aUserName);
			settings.append(login.getAvatarPic(avatar)).append(anAvatar);

			session.commit().get(function() {
				callback();
			});
		};

		login.login = function() {
			var email = $(".loginEmail").val();
			var password = $(".loginPassword").val();

			if (!login.checkInputs(email, password)) {
				return;
			}

			var request = session
					.login(email, password, session.node(wall));

			
			request.catchLoginFailures({
				onUserNotRegisteredForApplication : function() {
					login.reportError("User not registered for application.");
				},
				onInvalidDetails : function() {
					login.reportError("Invalid username/password.")
				},
				onChallenged : function() {
					login.reportError("Unexpected challenge received.");
				}
			});

			request.catchExceptions(function(ex) {
				alert("Unexpected exception during login: " + ex);
			});

			request.get(function(user) {
				login.startClient(user);
			});
			
			$(".forms").hide();
			$(".progressIndicator").show();

		};

		login.startClient = function(user) {
	
			var dataMissing = function() {
				alert("No avatar for user defined.");
			};
	
			var settings = user.userNode().select("./settings", "settings");
			settings.catchUndefined(dataMissing);
	
			var avatarName = settings.select(aUserName);
			var avatarPic = settings.select(anAvatar);
	
			session.getAll(avatarName, avatarPic, function(avatarName, avatarPic) {
				var appUrl = "http://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo06_app.value.html";
				var assembledAppUrl = appUrl + "#" + posts.uri()
				+ "&" + posts.getSecret()
				+ "&" + moderations.uri() + "&"
				+ moderations.getSecret();
				
				document.location.href = assembledAppUrl + "&" + avatarName.value() +"&" + avatarPic.value();
				$(".forwardLink").attr('href', document.location.href);
				
				$(".progressIndicator").hide();
				$(".forward").show();
				
			});
		};

		login.checkInputs = function(email, password) {
			if (!email) {
				login.reportError("Please specify an email.");
				return false;
			}

			if (!password) {
				login.reportError("Please specify a password.");
				return false;
			}

			var validateEmail = function (email) { 
			    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			    return re.test(email);
			};
			
			if (!validateEmail(email)) {
				login.reportError("Please provide a valid email address.");
				return false;
			}
			
			return true;
		};

		login.getAvatarPic = function(avatar) {

			switch (avatar) {
			case "Caesar":
				return "http://docs.google.com/drawings/d/1nL9LVuDNjakiFW9YL5t1QOMtUgn2bVIl4OAXpPS6pMw/pub?w=50";
			case "Cleopatra":
				return "http://docs.google.com/drawings/d/1ITfQfEuslX7P0Mj0ZYhCzKFUNdmU0gUXbJcEI_mz0oE/pub?w=50";
			case "Socrates":
				return "http://docs.google.com/drawings/d/1kqVqej6c6R6PGpox-STQEc9O6fZO9zGicL5S6mmBkdQ/pub?w=50";
			case "Lincoln":
				return "http://docs.google.com/drawings/d/1VyBRCBo2OOOcBVOmiRLP8r-ZPvva-VolSenXdnni4VM/pub?w=50";
			}

			throw "No avatar picture available for " + avatar;
		};


		login.reportError = function(message) {
			alert(message);
			$(".forms").show();
			$(".progressIndicator").hide();
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
