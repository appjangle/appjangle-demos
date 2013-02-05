// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo06_spawn -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {

	Appjangle.demos = Appjangle.demos || {};

	Appjangle.demos.initDemo06Spawn = function(params) {
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
									"");
							var clientsReadToken = factory.createToken(
									session, "fuehfqd", "read", "");
							var moderatorToken = factory
									.createToken(session, "se4efga",
											"readwrite", "");

							posts.append(clientsReadWriteToken);
							moderations.append(moderatorToken);
							moderations.append(clientsReadToken);

							var postsUrl = params.postsUrl;
							var postsSecret = params.postsSecret;
							var appUrl = "http://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo06_app.value.html";
							var moderationAppUrl = "http://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo06_moderation_app.value.html";
							var assembledAppUrl = appUrl + "#" + posts.uri()
									+ "&" + clientsReadWriteToken.getSecret()
									+ "&" + moderations.uri() + "&"
									+ clientsReadToken.getSecret();

							$(".spawnCaesar", elem)
									.attr(
											"href",
											assembledAppUrl
													+ "&Caesar&http://docs.google.com/drawings/d/1nL9LVuDNjakiFW9YL5t1QOMtUgn2bVIl4OAXpPS6pMw/pub?w=50");

							$(".spawnCleopetra", elem)
									.attr(
											"href",
											assembledAppUrl
													+ "&Cleopetra&http://docs.google.com/drawings/d/1ITfQfEuslX7P0Mj0ZYhCzKFUNdmU0gUXbJcEI_mz0oE/pub?w=50");

							$(".spawnSocrates", elem)
									.attr(
											"href",
											assembledAppUrl
													+ "&Socrates&http://docs.google.com/drawings/d/1kqVqej6c6R6PGpox-STQEc9O6fZO9zGicL5S6mmBkdQ/pub?w=50");

							$(".spawnLincoln", elem)
									.attr(
											"href",
											assembledAppUrl
													+ "&Lincoln&http://docs.google.com/drawings/d/1VyBRCBo2OOOcBVOmiRLP8r-ZPvva-VolSenXdnni4VM/pub?w=50");

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
