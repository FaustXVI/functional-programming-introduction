"use strict";
import chai from "chai";
chai.should();

// (String,String) => Bool
function isInfixOf(whole, title) {
    return whole.includes(title);
}

// (String,Movie) => Bool
function matches(title, movie) {
    return isInfixOf(movie.title, title);
}

// (((String,Movie) => Bool),String,Movie,(Movie=>())) => (Movie=>())
function addIfMatches(predicate, title, movie, add) {
    if (predicate(title, movie)) return add;
    return function doNothing(m) {
    };
}

// (String,[Movie]) => [Movie]
function findByTitle(title, movies) {
    let result = [];
    let predicate = matches;
    // FIXME : avoid duplication of name «add»
    // FIXME : side effects in this function
    let add = function add(movie) {
        result.push(movie);
    };
    for (let movie of movies) {
        // FIXME : modification of result hard to see !
        // FIXME : avoid duplication of parameter movie
        addIfMatches(predicate, title, movie, add)(movie);
    }
    return result;
}

describe('My movie collection search by name', () => {
    let movies = [
        {
            title: "The Matrix",
            year: 1999
        },
        {
            title: "A beautiful mind",
            year: 2001
        },
        {
            title: "Intouchable",
            year: 2011
        },
        {
            title: "Forest Gump",
            year: 1994
        }
    ];

    it('should return empty when none found', () => {
        findByTitle("Interstellar", movies).should.be.empty;
    });

    it('should return a matching movie', () => {
        findByTitle("The Matrix", movies).should.deep.equal([{
            title: "The Matrix",
            year: 1999
        }]);
    });

    it('should return all matching movies', () => {
        findByTitle("o", movies).should.deep.have.members([
            {
                title: "Intouchable",
                year: 2011
            },
            {
                title: "Forest Gump",
                year: 1994
            }]);
    });
});
