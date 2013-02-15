var server = Nextweb.startServer(14142);
var session = Nextweb.createSession();

var seed = session.seed("local");

var aPost = seed.append("A post on a message board, wall or chat room.", "./aPost");

var posts = session.seed("local").append("posts");

posts.append("Salve, Munde.").append(aPost);
posts.append("Salve, Nubes!").append(aPost);

session.commit();
    
posts.selectAll(aPost).get(function(nodelist) {
    console.log(nodelist.values());
    
    session.close().get(function() { 
         server.shutdown().get(function() {});
    });
});