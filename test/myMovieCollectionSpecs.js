"use strict";
import chai from "chai";

chai.should();

function findByTitle(query, collection) {
    let result = [];
    let movie;
    while (movie = collection.shift()) {
        if (movie.title.includes(query)) {
            result.push(movie);
        }
    }
    return result;
}

describe('My movie collection search by name', () => {
    it('should return empty when none found', () => {
        findByTitle("Interstellar", [
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
        ]).should.be.empty;
    });

    it('should return a matching movie', () => {
        findByTitle("The Matrix", [
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
        ]).should.be.deep.equal([{
            title: "The Matrix",
            year: 1999
        }]);
    });

    it('should return all matching movies', () => {
        findByTitle("o", [
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
        ]).should.be.deep.equal([{
            title: "Intouchable",
            year: 2011
        }, {
            title: "Forest Gump",
            year: 1994
        }]);
    });
});
