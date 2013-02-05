// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo_authorization -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {
	// constants
	var postWrapper = "<li class='media'></li>", postType, ignore = function() {
	};

	Appjangle.demos = Appjangle.demos || {};

	Appjangle.demos.initAuthorizationDemo = function(params) {
		var wrapper, avatar, userName, Nextweb, server, session, posts, postType, aPost, avatarType, anAvatar, userNameType,
		remarkableType, remarkable, /*moderationType, moderation,*/
		aUserName, demo, monitor;

		demo = {};

		avatar = params.avatar;
		userName = params.userName;
		// jQuery element wrapping all required HTML
		wrapper = params.wrapper;
		Nextweb = params.engine;
		session = params.posts.getSession();
		posts = params.posts;
		moderations = params.moderations;
		
		monitor = null;

		postType = "http://slicnet.com/seed1/seed1/3/6/5/2/h/sd/aPost1";
		aPost = session.node(postType);
		aPost.get();

		avatarType = "http://slicnet.com/seed1/seed1/3/9/1/3/h/sd/anAvatar";
		anAvatar = session.node(avatarType);

		userNameType = "http://slicnet.com/seed1/seed1/3/9/2/3/h/sd/userName";
		aUserName = session.node(userNameType);

		remarkableType = "http://slicnet.com/seed1/seed1/4/5/0/2/h/sd/remarkable";
		aRemarkablePost = session.node(remarkableType);
		
		//moderationType= "http://slicnet.com/seed1/seed1/4/5/0/2/h/sd/moderation";
		//aModeration = session.node(moderationType); 
		
		// submit a new post
		demo.submitPost = function() {
			var postText = $(".postInput", wrapper).val();
			$(".postInput", wrapper).val("");

			var post = posts.append(postText);
			post.append(aPost);
			post.append(userName).append(aUserName);
			post.append(avatar).append(anAvatar);

			session.commit().get(function() {
			});

			demo.update();

		};

		var updatePending = false;
		demo.update = function() {
			if (updatePending) {
				return;
			}
			updatePending = true;
			demo.updatePosts();
			demo.updateTotal();
			updatePending = false;
		};

		demo.updateTotal = function() {
			posts.selectAll(aPost).get(function(postsList) {
				$(".totalPosts", wrapper).text(postsList.size());
			});
		};

		demo.updatePosts = function() {
			var post;

			posts.selectAll(aPost).get(function(postsList) {
				var i, item;

				$(".postList", wrapper).empty();

				for (i = postsList.nodes().length - 1; i >= 0; i--) {
					post = postsList.nodes()[i];

					demo.renderPost(post);
				}

				if (postsList.size() === 0) {
					$(".noPostsYet", wrapper).show();
				} else {
					$(".noPostsYet", wrapper).hide();
				}

			});
		};

		demo.renderPost = function(post) {
			var item, userNameNode, avatarNode;
			item = demo.createItem();

			$(".postList", wrapper).append(item);
			$(".postText", item).text(post.value());

			userNameNode = post.select(aUserName);
			userNameNode.catchUndefined(ignore);
			userNameNode.get(function(userNameNode) {
				$(".postAuthor", item).text(userNameNode.value());
			});
			
			avatarNode = post.select(anAvatar);
			avatarNode.catchUndefined(ignore);
			avatarNode.get(function(avatarNode) {
				$(".media-object", item).attr("src", avatarNode.value());
			});
			
			moderation = moderations.select(session.node(post));
			moderation.catchUndefined(ignore);
			moderation.get(function(moderationNode) {
				moderationNode.selectAllLinks().get(function(linklist) {
					if (linklist.contains(aRemarkablePost)) {
						$(".remarkablePostMarker", item).show();
					}
				});
			});

		};

		demo.initUi = function() {

			$(".postButton", wrapper).click(function(evt) {
				evt.preventDefault();

				demo.submitPost();

			});

			$(".postInput", wrapper).attr("placeholder",
					"What's up, " + userName + "?");

			demo.update();

			wrapper.show();
		};

		demo.createItem = function() {
			var postContent;
			postContent = $(".postTemplate", wrapper).clone();
			postContent.removeClass("hide");
			postContent.removeClass("postTemplate");
			return postContent.appendTo($(postWrapper));
		};

		// resolving request for data node
		posts.get(function(posts) {
			// when data node loaded, show ui
			demo.initUi();
			wrapper.append($("<p>Loaded " + posts.uri() + "</p>"));

			// installing monitor to check for updates from other clients
			monitor = posts.monitor().setInterval("1000").setDepth(2)
					.addListener(function(context) {
						demo.update();
					});

			monitor.get(function(monitor) {

			});

		});

		return {
			wrapper : wrapper,
			shutdown : function() {
				if (monitor !== null && monitor.get() !== null) {
					monitor.get().stop();
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
