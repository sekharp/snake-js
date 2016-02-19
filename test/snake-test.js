const chai = require('chai');
const assert = chai.assert;

const Snake = require('../lib/snake');

describe('Snake', function() {
  context('with default attributes', function() {
    var snake = new Snake({});
    it('should assign an x coordinate', function() {
      assert.equal(snake.x, 300);
    });
    it('should assign a y coordinate', function() {
      assert.equal(snake.y, 150);
    });
    it('should assign a height', function(){
      assert.equal(snake.height, 10);
    });
    it('should assign a width', function(){
      assert.equal(snake.width, 10);
    });
    it('should assign an interval speed', function(){
      assert.equal(snake.interval, 100);
    });
  });

  context('can be created with assigned attributes', function(){
    var snake = new Snake({x: 1, y: 10, interval: 50});

    it('should assign an x coordinate', function() {
      assert.equal(snake.x, 1);
    });
    it('should assign a y coordinate', function() {
      assert.equal(snake.y, 10);
    });
    it('should assign an interval speed', function(){
      assert.equal(snake.interval, 50);
    });
  });

  describe('Snake moves up', function() {
    it('should increase y coordinate value', function() {
      var snake = new Snake({});
      assert.equal(snake.x, 300);
      assert.equal(snake.y, 150);

      snake.moveUp();

      assert.equal(snake.x, 300);
      assert.equal(snake.y, 160);
    });
  });

  describe('Snake moves down', function() {
    var snake = new Snake({});
    it('should decrease y coordinate value', function() {
      assert.equal(snake.x, 300);
      assert.equal(snake.y, 150);

      snake.moveDown();

      assert.equal(snake.x, 300);
      assert.equal(snake.y, 140);
    });
  });

  describe('Snake moves right', function() {
    var snake = new Snake({});
    it('should increase x coordinate value', function() {
      assert.equal(snake.x, 300);
      assert.equal(snake.y, 150);

      snake.moveRight();
      assert.equal(snake.x, 310);
      assert.equal(snake.y, 150);
    });
  });

  describe('Snake moves left', function() {
    var snake = new Snake({});
    it('should decrease x coordinate value', function() {
      assert.equal(snake.x, 300);
      assert.equal(snake.y, 150);

      snake.moveLeft();
      assert.equal(snake.x, 290);
      assert.equal(snake.y, 150);
    });
  });

  describe('Snake grows', function(){
    it('should increase the size of its positions array', function(){
      var snake = new Snake({});
      assert.equal(snake.positions.length, 1);
      snake.grow();
      assert.equal(snake.positions.length, 2);
    });
  });

  describe('Snake intersects itself', function(){
    it('should return true if snake is overlapping with itself', function(){
      var snake = new Snake({positions: [[1,1], [11,11], [22,22], [1,2]]});
      assert(snake.snakeIntersectsItself());
    });

    it('should return false if snake is not overlapping with itself', function(){
      var snake = new Snake({positions: [[1,1], [11,11], [22,22]]});
      assert(!snake.snakeIntersectsItself());
    });
  });

});
