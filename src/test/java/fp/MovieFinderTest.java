package fp;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class MovieFinderTest {

    List<Movie> movies;

    @Before
    public void setup() {
        movies = new ArrayList<>();
        addMovie("The Matrix");
        addMovie("A beautiful mind");
        addMovie("Intouchable");
        addMovie("Forest Gump");
    }


    private void addMovie(String title) {
        Movie movie = new Movie();
        movie.setTitle(title);
        movies.add(movie);
    }


    @Test
    public void findByTitle() {
        MovieFinder movieFinder = new MovieFinder();

        List<Movie> searchResult = movieFinder.findByTitle().apply("XXXXXXX").apply(movies);
        Assert.assertTrue("Should be empty", searchResult.isEmpty());

        searchResult = movieFinder.findByTitle().apply("mind").apply(movies);
        Assert.assertEquals(1, searchResult.size());
        Assert.assertEquals("A beautiful mind", searchResult.get(0).getTitle());


        searchResult = movieFinder.findByTitle().apply("A beautiful mind").apply(movies);
        Assert.assertEquals(1, searchResult.size());
        Assert.assertEquals("A beautiful mind", searchResult.get(0).getTitle());


        searchResult = movieFinder.findByTitle().apply("a").apply(movies);
        Assert.assertEquals(3, searchResult.size());
        Assert.assertEquals("The Matrix", searchResult.get(0).getTitle());
        Assert.assertEquals("A beautiful mind", searchResult.get(1).getTitle());
        Assert.assertEquals("Intouchable", searchResult.get(2).getTitle());
    }


}