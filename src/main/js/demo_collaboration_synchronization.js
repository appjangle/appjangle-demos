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
			post.append(aPost).get();
			post.append(userName).append(anUserName).get();
			post.append(avatar).append(anAvatar).get();

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
			var post;

			
			
			posts.selectAll(aPost).get(
					function(postsList) {
						var i, item;

						$(".postList", wrapper).empty();
						console.log(userName+" all posts: "+postsList.values());
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
			var item;
			item = demo.createItem();

			$(".postList", wrapper).append(item);
			$(".postText", item).text(post.value());

			
			var userNameNode = post.select(anUserName);

			userNameNode.catchUndefined(function() {
				
			});

			userNameNode.get(function(userNameNode) {
				$(".postAuthor", item).text(
						userNameNode.value());
			});

			var avatarNode = post.select(anAvatar);

			avatarNode.catchUndefined(function() {

			});

			avatarNode.get(function(avatarNode) {
				$(".media-object", item).attr("src",
						avatarNode.value());
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
			return postContent.appendTo($(postWrapper));
		};

		// resolving request for data node
		posts.get(function(posts) {
			// when data node loaded, show ui
			demo.initUi();
			wrapper.append($("<p>Loaded " + posts.uri() + "</p>"));

			// installing monitor to check for updates from other clients
			monitor = posts.monitor("400", function(context) {
				
				demo.updatePosts();
				
			});
			
			setInterval(function() {
				posts.selectAll().get(function(allChildren) {
					var i, reloadRequests = [];
					
					for (i=0;i<allChildren.nodes().length;i++) {
						reloadRequests.push(allChildren.nodes()[i].reload());
					}
					
					session.getAll(reloadRequests, function() {
						demo.updatePosts();
					});
				});
			}, 2000);
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
