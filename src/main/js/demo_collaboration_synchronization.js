// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo_collaboration_synchronization -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {
	// constants
	var postWrapper = "<li class='media'></li>", postType;

	Appjangle.demos = Appjangle.demos || {};

	Appjangle.demos.initSynchronizationDemo = function(params) {
		var wrapper, avatar, Nextweb, server, session, posts, postType, aPost, avatarType, anAvatar, demo;

		demo = {};

		avatar = params.avatar;
		// jQuery element wrapping all required HTML
		wrapper = params.wrapper;
		Nextweb = params.engine;

		// local db server to manage data
		server = Nextweb.startServer(12322);
		session = Nextweb.createSession();

		// request for data node to store all posts
		posts = session.seed("local");

		// load data type for posts
		postType = "http://slicnet.com/seed1/seed1/3/6/5/2/h/sd/aPost1";
		aPost = session.node(postType);
		aPost.get(); // to reduce latency when displaying first post

		// load type for avatar picture
		avatarType = "http://slicnet.com/seed1/seed1/3/9/1/3/h/sd/anAvatar";
		anAvatar = session.node(avatarType);

		// resolving request for data node
		posts.get(function(posts) {
			// when data node loaded, show ui
			demo.initUi();
		});

		// submit a new post
		demo.submitPost = function() {
			var post = posts.append($(".postInput", wrapper).val());
			post.append(aPost);
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

			posts.selectAll(aPost).get(function(postsList) {
				
				$(".postList", wrapper).empty();
				for (i = postsList.nodes().length - 1; i >= 0; i--) {
					post = postsList.nodes()[i];
					item = demo.createItem();
					
					$(".postList", wrapper).append(item);
					$(".postText", item).text(post.value());
					
					post.select(anAvatar).get(function(avatarPic) {
						$(".media-object", item).attr("src", avatarPic.value());
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
				session.close().get(function() {
					server.shutdown.get(function() {
					});
				});
			}
		};

	};

}(window.Appjangle, window.jQuery));

// <!-- one.end -->
