"use strict";
import chai from "chai";
chai.should();

// String => String => Bool
let isInfixOf = whole => title => {
    return whole.includes(title);
};

// String => Movie => Bool
let matches = title => movie => {
    return isInfixOf(movie.title)(title);
};

// (Movie => Bool) => Movie => (Movie=>[Movie]=>[Movie]) => ([Movie]=>[Movie])
let addIfMatches = predicate => movie => add => {
    if (predicate(movie)) return add(movie);
    return (ms) => {
        return ms;
    };
};

// String => [Movie] => [Movie]
let findByTitle = title => movies => {
    let result = [];
    let predicate = matches(title);
    let add = (movie) => (ms) => {
        return ms.concat(movie);
    };
    for (let movie of movies) {
        result = addIfMatches(predicate)(movie)(add)(result);
    }
    return result;
};

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
        findByTitle("Interstellar")(movies).should.be.empty;
    });

    it('should return a matching movie', () => {
        findByTitle("The Matrix")(movies).should.deep.equal([{
            title: "The Matrix",
            year: 1999
        }]);
    });

    it('should return all matching movies', () => {
        findByTitle("o")(movies).should.deep.have.members([
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
