// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo_collaboration_synchronization -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {
	// constants
	var postWrapper = "<li class='media'></li>", postType;

	Appjangle.demos = Appjangle.demos || {};

	Appjangle.demos.initSynchronizationDemo = function(params) {
		var wrapper, avatar, userName, Nextweb, server, session, posts, postType, aPost, avatarType, anAvatar, userNameType, anUserName, demo, monitor, lastPostCount;

		demo = {};

		avatar = params.avatar;
		userName = params.userName;
		// jQuery element wrapping all required HTML
		wrapper = params.wrapper;
		Nextweb = params.engine;
		session = params.posts.getSession();
		posts = params.posts;
		monitor = null;

		// load data type for posts
		postType = "http://slicnet.com/seed1/seed1/3/6/5/2/h/sd/aPost1";
		aPost = session.node(postType);
		aPost.get();

		// load type for avatar picture
		avatarType = "http://slicnet.com/seed1/seed1/3/9/1/3/h/sd/anAvatar";
		anAvatar = session.node(avatarType);

		// load type for user name
		userNameType = "http://slicnet.com/seed1/seed1/3/9/2/3/h/sd/userName";
		anUserName = session.node(userNameType);

		// submit a new post
		demo.submitPost = function() {
			var post = posts.append($(".postInput", wrapper).val());
			post.append(aPost);
			post.append(userName).append(anUserName);
			post.append(avatar).append(anAvatar);

			$(".postInput", wrapper).val("");

			session.commit().get(function() {

			});

			demo.updatePosts();
			demo.updateTotal();
		};

		demo.updateTotal = function() {
			posts.selectAll(aPost).get(function(postsList) {
				$(".totalPosts", wrapper).text(postsList.size());
			});
		};

		
		demo.updatePosts = function() {
			var i, post, item;

			posts.selectAll(aPost).get(
					function(postsList) {
						
						$(".postList", wrapper).empty();
						for (i = postsList.nodes().length - 1; i >= 0; i--) {
							post = postsList.nodes()[i];
							item = demo.createItem();

							$(".postList", wrapper).append(item);
							$(".postText", item).text(post.value());

							var userNameNode = post.select(anUserName);
							
							userNameNode.catchUndefined(function() { });
							
							userNameNode.get(
									function(userNameNode) {
										$(".postAuthor", item).text(
												userNameNode.value());
									});

							var avatarNode = post.select(anAvatar);
							
							avatarNode.catchUndefined(function() { });
							
							avatarNode.get(
									function(avatarNode) {
										$(".media-object", item).attr("src",
												avatarNode.value());
									});

						}

						if (postsList.size() === 0) {
							$(".noPostsYet", wrapper).show();
						} else {
							$(".noPostsYet", wrapper).hide();
						}
					});
		};

		
		demo.reloadPosts = function() {
			
			posts.selectAll(aPost).get(
					function(postsList) {
						if (lastPostCount !== null) {
							if (lastPostCount === postsList.size()) {
								return;
							}
						} else {
							lastPostCount = 1;
						}
						$(".loadIndicator", wrapper).show();
						for (i = postsList.nodes().length - 1; i >= lastPostCount - 1; i--) {
							post = postsList.nodes()[i];
							post.reload(1).get(function(loadedPost) {
								$(".loadIndicator", wrapper).hide();
								demo.updatePosts();
							});
						}
						
						lastPostCount = postsList.size();
						
						demo.updateTotal();
					});
			
			
		};
		
		demo.initUi = function() {

			$(".postButton", wrapper).click(function(evt) {
				evt.preventDefault();

				demo.submitPost();

			});

			$(".postInput", wrapper).attr("placeholder",
					"What's up, " + userName + "?");

			wrapper.show();
		};

		demo.createItem = function() {
			var postContent;
			postContent = $(".postTemplate", wrapper).clone();
			postContent.removeClass("hide");
			postContent.removeClass("postTemplate");
			return $(postWrapper).append(postContent);
		};

		// resolving request for data node
		posts.get(function(posts) {
			// when data node loaded, show ui
			demo.initUi();
			wrapper.append($("<p>Loaded " + posts.uri() + "</p>"));

			// installing monitor to check for updates from other clients
			monitor = posts.monitor("400", function(context) {
				
				demo.reloadPosts();
			});
			monitor.get(function(monitor) {

			});

		});

		return {
			wrapper : wrapper,
			shutdown : function() {
				if (monitor !== null && monitor.get() !== null) {
					monitor.stop();
				}
				session.close().get(function() {
					server.shutdown.get(function() {
					});
				});
			}
		};

	};

}(window.Appjangle, window.jQuery));

// <!-- one.end -->
