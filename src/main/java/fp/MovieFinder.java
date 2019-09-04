package fp;

import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class MovieFinder {

    /**
     * Return function that find movies by matching title inside a movie collection
     * @return
     */
    public Function<String, Function<List<Movie>, List<Movie>>> findByTitle() {

        Function<Predicate<Movie>, Function<List<Movie>, List<Movie>>> filter = moviePredicate -> movies -> movies.stream().filter(moviePredicate).collect(Collectors.toList());

        Function<String, Function<String, Boolean>> isInfixOf = title -> whole -> whole.contains(title);

        Function<Movie, String> getTitle = movie -> movie.getTitle();

        Function<String, Predicate<Movie>> matches = title -> movie -> isInfixOf.apply(title).compose(getTitle).apply(movie);

        return filter.compose(matches);

    }

}
