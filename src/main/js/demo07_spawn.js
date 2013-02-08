// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo07_spawn -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {

	Appjangle.demos = Appjangle.demos || {};

	Appjangle.demos.initDemo07Spawn = function(params) {
		var elem = params.wrapper;
		var seed = params.seed;
		var factory = params.seed.getSession().getEngine().getFactory();

		// pereparing app data
		var posts = seed.append("posts");
		var moderations = seed.append("moderations");
		var session = seed.getSession();

		session
				.getAll(
						posts,
						moderations,
						function(posts, moderations) {

							var clientsReadWriteToken = factory.createToken(
									session, "adf34fsf", "readwrite",
									posts.uri());
							var clientsReadToken = factory.createToken(
									session, "fuehfqd", "read", "");
							var moderatorToken = factory
									.createToken(session, "se4efga",
											"readwrite", "");

							posts.appendValue(clientsReadWriteToken);
							moderations.appendValue(moderatorToken);
							moderations.appendValue(clientsReadToken);
							
							var postsUrl = params.postsUrl;
							var postsSecret = params.postsSecret;
							var appUrl = "http://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo07_login.value.html";
							var moderationAppUrl = "http://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo06_moderation_app.value.html";
							var assembledAppUrl = appUrl + "#" + posts.uri()
									+ "&" + clientsReadWriteToken.getSecret()
									+ "&" + moderations.uri() + "&"
									+ clientsReadToken.getSecret() + "&"+seed.uri()+"&"+seed.secret();

							$(".spawnUserClient", elem)
									.attr(
											"href",
											assembledAppUrl);

							

							$(".spawnModerator", elem).attr(
									"href",
									moderationAppUrl + "#" + posts.uri() + "&"
											+ clientsReadWriteToken.getSecret()
											+ "&" + moderations.uri() + "&"
											+ moderatorToken.getSecret());
							
							session.commit().get(function(success) {
								elem.show();
							});

						});

		

	};

}(Appjangle, jQuery));

// <!-- one.end -->
