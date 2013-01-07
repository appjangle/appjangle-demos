// <!-- one.upload https://u1.linnk.it/qc8sbw/usr/apps/textsync/files/demo_instant_data_js -->

/*global window: false */

window.Appjangle = window.Appjangle || {};

(function(Appjangle, $) {
	// constants
	var postWrapper = $("<li class='media'></li>"),
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
				var updateUi = function() {
					var i, item;
					posts.selectAll(aPost).get(function(postsList) {
						for (i=0; i<=postLists.nodes().length; i++) {
							item = $(".postTemplate", wrapper).clone();
							postList
						}
					});
				};
				
				$(".postButton", wrapper).click(function(evt) {
					evt.preventDefault();
					posts.append($(".postInput", wrapper).val()).append(aPost);
					
					session.commit().get(function() {
						updateUi();
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
