"use strict";
import chai from "chai";
chai.should();

// (String,[Movie]) => [Movie]
function findByTitle(title, movies) {
    return [];
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
        ]).should.deep.equal([{
            title: "The Matrix",
            year: 1999
        }]);
    });
});
