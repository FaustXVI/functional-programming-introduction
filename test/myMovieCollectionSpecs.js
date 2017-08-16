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

// (String,Movie,[Movie]) => ()
// FIXME : side effects on result
function addIfMatches(title, movie, result) {
    if (matches(title, movie)) result.push(movie);
}

// (String,[Movie]) => [Movie]
function findByTitle(title, movies) {
    let result = [];
    let predicate = matches;
    for (let movie of movies) {
        addIfMatches(title, movie, result);
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
