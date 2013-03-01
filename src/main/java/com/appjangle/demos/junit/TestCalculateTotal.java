package com.appjangle.demos.junit;

import io.nextweb.Query;
import io.nextweb.Session;
import io.nextweb.common.LocalServer;
import io.nextweb.jre.Nextweb;

import org.junit.Assert;
import org.junit.Test;

public class TestCalculateTotal {

    private static String aPost = "http://slicnet.com/seed1/seed1/3/6/5/2/h/sd/aPost1";

    public static int calculateNumberOfPosts(Session session, Query posts) {
        return posts.selectAll(session.node(aPost)).get().size();
    }

    @Test
    public void test_calculate_total_number_of_posts() {
        LocalServer server = Nextweb.startServer(14142);
        Session session = Nextweb.createSession();

        Query posts = session.seed("local").append("posts");

        posts.append("Post 1").append(session.node(aPost));

        Assert.assertEquals(1, calculateNumberOfPosts(session, posts));

        session.close().get();
        server.shutdown().get();
    }

}
