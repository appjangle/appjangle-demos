// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo_collaboration_synchronization -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {
	// constants
	var postWrapper = "<li class='media'></li>", postType;

	Appjangle.demos = Appjangle.demos || {};

	Appjangle.demos.initSynchronizationDemo = function(params) {
		var wrapper, avatar, userName, Nextweb, server, session, posts, postType, aPost, avatarType, anAvatar, userNameType, anUserName, demo, monitor;

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

		// load type for avatar picture
		avatarType = "http://slicnet.com/seed1/seed1/3/9/1/3/h/sd/anAvatar";
		anAvatar = session.node(avatarType);

		// load type for user name
		userNameType = "http://slicnet.com/seed1/seed1/3/9/2/3/h/sd/userName";
		anUserName = session.node(userNameType);
		session.getAll(aPost, anAvatar, anUserName, function() {
		}); // to reduce latency when displaying first post

		// resolving request for data node
		posts.get(function(posts) {
			// when data node loaded, show ui
			demo.initUi();
		});

		// installing monitor to check for updates from other clients
		monitor = posts.monitor("400", function(context) {
			demo.updatePosts();
			demo.updateTotal();
		});

		// submit a new post
		demo.submitPost = function() {
			var post = posts.append($(".postInput", wrapper).val());
			post.append(aPost);
			post.append(userName).append(anUserName);
			post.append(avatar).append(anAvatar);

			$(".postInput", wrapper).val("");
			session.commit().get(function() {

				demo.updatePosts();
				demo.updateTotal();

			});
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

							post.select(anUserName).get(
									function(userNameNode) {
										$(".postAuthor", item).text(
												userNameNode.value());
									});

							post.select(anAvatar).get(
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

		demo.initUi = function() {
			var createItem, updatePosts, updateTotal;

			$(".postButton", wrapper).click(function(evt) {
				evt.preventDefault();

				demo.submitPost();

			});

			wrapper.show();
		};

		demo.createItem = function() {
			var postContent;
			postContent = $(".postTemplate", wrapper).clone();
			postContent.removeClass("hide");
			postContent.removeClass("postTemplate");
			return $(postWrapper).append(postContent);
		};

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
