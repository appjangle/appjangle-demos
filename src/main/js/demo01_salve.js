var server = Nextweb.startServer(14142);
var session = Nextweb.createSession();

var posts = session.seed("local").append("posts");

posts.append("Salve, Munde.");
posts.append("Salve, Nubes!");

session.commit();

posts.selectAll().get(function(posts) {
    console.log("Posts defined: "+posts.values());
    
    session.close().get(function() {
         server.shutdown().get(function() {});
     });
});