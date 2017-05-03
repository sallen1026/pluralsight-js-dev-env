import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', () => {
    it('should pass', () => {
        expect(true).to.equal(true);
    });
});

describe('index.html', () => {
    it('should have h1 that says Users', (done) => {                    // "it" takes a parameter that tells it when the asynchronous call is "done"
        const index = fs.readFileSync('./src/index.html', "utf-8");
        jsdom.env(index, function(err, window){                         // this is an asynchronous callback function, so you have to tell it when it's done
            const h1 = window.document.getElementsByTagName('h1')[0];
            expect(h1.innerHTML).to.equal("Users");
            done();                                                     // this tells Mocha that our test is "done", and it will then run the expect to say whether it's true or false
            window.close();
        });
    })
})
