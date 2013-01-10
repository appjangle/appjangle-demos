// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo_transparent_cloud_persistence_js -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {
	// constants
	var postWrapper = "<li class='media'></li>",
	    postType;

	Appjangle.demos = Appjangle.demos || {};
	
	Appjangle.demos.initTransparentCloudPersistenceDemo = function(params) {
		var wrapper, Nextweb, server, session, posts, aPost, demo;

		demo =  {};
		
		// jQuery element wrapping all required HTML
		wrapper = params.wrapper;
		Nextweb= params.engine;
		
		// local db server to manage data
		// server = Nextweb.startServer(12322);
		session = Nextweb.createSession();

		// load or request for data node to store all posts
		if (!params.node) {
			// posts = session.seed("local");
			posts = session.seed();
		} else {
			posts = session.node(params.node);
			$(".postButton", wrapper).addClass("disabled");
		}
		
		// load data type for posts
		postType = "http://slicnet.com/seed1/seed1/3/6/5/2/h/sd/aPost1";
		aPost = session.node(postType);
		
		// resolving request for data node
		posts.get(function(posts) {
			// when data node loaded, show ui
			demo.initUi();
			
			if (params.onload) {
				params.onload(posts.uri());
			}
		});

		// submit a new post
		demo.submitPost = function() {
			posts.append($(".postInput", wrapper).val()).append(aPost);
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
			var i, item;
			
			posts.selectAll(aPost).get(function(postsList) {
				$(".postList", wrapper).empty();
				for (i=postsList.values().length-1; i>=0; i--) {
					item = demo.createItem();
					$(".postList", wrapper).append(item);
					
					$(".postText", item).text(postsList.values()[i]);
				}
				
				if (postsList.size() == 0) {
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
			demo.updateTotal();
			demo.updatePosts();
			wrapper.show();
		};
		
		demo.createItem = function() {
			var postContent;
			postContent= $(".postTemplate", wrapper).clone();
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

}(window.Appjangle,  window.jQuery));

// <!-- one.end -->
