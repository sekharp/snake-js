const chai = require('chai');
const assert = chai.assert;

const Pellet = require('../lib/pellet');

describe('Pellet', function() {
  context('with default attributes', function() {
    var pellet = new Pellet({});
    it('should assign an x coordinate', function() {
      assert(pellet.x);
    });
    it('should assign a y coordinate', function() {
      assert(pellet.y);
    });
    it('should assign a height', function(){
      assert.equal(pellet.height, 10);
    });
    it('should assign a width', function(){
      assert.equal(pellet.width, 10);
    });
  });

  describe('Pellet can reset to new position', function(){
    var pellet = new Pellet({});
    it('should have attributes when reset is called', function(){
      while((pellet.x === 150) && (pellet.y === 150)){
        pellet.reset();
      }
      assert((pellet.x !== 150) && (pellet.y !== 150));
      assert.equal(pellet.height, 10);
      assert.equal(pellet.width, 10);
    });
  });
});
