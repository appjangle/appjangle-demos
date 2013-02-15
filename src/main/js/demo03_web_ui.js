// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo_instant_data_js -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {
	// constants
	var postWrapper = "<li class='media'></li>",
	    postType;

	Appjangle.demos = Appjangle.demos || {};
	
	Appjangle.demos.initInstantDataDemo = function(params) {
		var wrapper, Nextweb, server, session, seed, posts, aPost, demo;

		demo =  {};
		
		// jQuery element wrapping all required HTML
		wrapper = params.wrapper;
		Nextweb= params.engine;
		
		// local db server to manage data
		server = Nextweb.startServer(12322);
		session = Nextweb.createSession();

		seed = session.seed("local");

		// request for data node to store all posts
		posts = seed.append("local");
		
		// define data type for posts
		aPost = seed.append("A post on a message board, wall or chat room.", "./aPost");
		
		// resolving request for data node
		posts.get(function(posts) {
			// when data node loaded, show ui
			demo.initUi();
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
