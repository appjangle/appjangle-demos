// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo_instant_data_js -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {
	// constants
	var postWrapper = "<li class='media'></li>",
	    postType = "http://slicnet.com/seed1/seed1/3/6/5/2/h/sd/aPost1";

	Appjangle.demos = Appjangle.demos || {};
	
	Appjangle.demos.initInstantDataDemo = function(params) {
		var wrapper, Nextweb, server, session, posts, aPost;

		// jQuery element wrapping all required HTML
		wrapper = params.wrapper;
		Nextweb= params.engine;
		
		// local db server to manage data
		server = Nextweb.startServer(12322);
		session = Nextweb.createSession();

		// request for data node to store all posts
		posts = session.seed("local");
		
		// define data type for posts
		aPost = session.node(postType);
		
		// resolving request for data node
		posts.get(function(posts) {
			
			// init UI
			(function() {
				var createItem = function() {
					var postContent;
					postContent= $(".postTemplate", wrapper).clone();
					postContent.removeClass("hide");
					postContent.removeClass("postTemplate");
					return $(postWrapper).append(postContent);
				};
				
				var updatePosts = function() {
					var i, item;
					
					posts.selectAll(aPost).get(function(postsList) {
						$(".postList", wrapper).empty();
						for (i=postsList.values().length-1; i>=0; i--) {
							item = createItem();
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
				
				var updateTotal = function() {
					posts.selectAll(aPost).get(function(postsList) {
						$(".totalPosts", wrapper).text(postsList.size());
					});
				};
				
				$(".postButton", wrapper).click(function(evt) {
					evt.preventDefault();
					posts.append($(".postInput", wrapper).val()).append(aPost);
					
					session.commit().get(function() {
						updatePosts();
						updateTotal();
					});
					
				});
			}());
		});

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
