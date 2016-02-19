const chai = require('chai');
const assert = chai.assert;
const Round = require('../lib/round');


describe('Round', function() {
  context('start with default attributes', function() {
    it('should assign a snake instance', function() {
      var round = new Round({});
      assert(round.snake);
    });

    it('should assign the snake an interval based on options', function(){
      var round = new Round({interval: 50});
      assert.equal(round.snake.interval, 50);
    });

    it('should assign a unique snake instance', function() {
      var round_one = new Round({});
      var round_two = new Round({});

      assert(round_one.snake !== round_two.snake);
    });

    it('should assign a pellet instance', function() {
      var round = new Round({});
      assert(round.pellet);
    });

    it('should assign a score of 0', function() {
      var round = new Round({});
      assert.equal(round.score, 0);
    });
  });

  describe('detects snake and pellet intersection', function(){
    it('should return true if snake "eats" pellet', function(){
      var round = new Round({});
      round.snake.positions = [[1,1], [12,12]];
      round.pellet.x = 1;
      round.pellet.y = 1;

      assert(round.snakeIntersectsPellet());
    });

    it('should return true if snake intersects pellet indirectly', function(){
      var round = new Round({});
      round.snake.positions = [[1,1], [12,12]];
      round.pellet.x = 1;
      round.pellet.y = 9;

      assert(round.snakeIntersectsPellet());
    });

    it('should return false if snake does not pellet', function(){
      var round = new Round({});
      round.snake.positions = [[1,1], [12,12]];
      round.pellet.x = 24;
      round.pellet.y = 24;

      assert(!round.snakeIntersectsPellet());
    });
  });

  describe('detects intersection with wall', function(){
    it('should return true if snake runs into left wall', function(){
      var round = new Round({});
      round.snake.positions = [[-1,1], [10,10]];

      assert(round.snakeIntersectsWall());
    });

    it('should return true if snake runs into right wall', function(){
      var round = new Round({});
      round.snake.positions = [[500,1], [490,1]];

      assert(round.snakeIntersectsWall());
    });

    it('should return true if snake runs into top wall', function(){
      var round = new Round({});
      round.snake.positions = [[10,-1], [19,1]];

      assert(round.snakeIntersectsWall());
    });

    it('should return true if snake runs into down wall', function(){
      var round = new Round({});
      round.snake.positions = [[10, 410], [10,400]];

      assert(round.snakeIntersectsWall());
    });

    it('should return false if snake is within canvas', function(){
      var round = new Round({});
      round.snake.positions = [[10,10], [19,10]];

      assert(!round.snakeIntersectsWall());
    });
  });

  describe('prevents pellet from overlapping with snake on reset', function(){
    it('should not exit method if pellet landed on snake', function(){
      var round = new Round({});

      round.snake.positions = [[1,1], [12,12]];
      round.pellet.x = 10;
      round.pellet.y = 9;

      round.doesPelletOverlapWithSnake();

      assert(round.pellet.x !== 10 && round.pellet.y !== 9);

    });
  });
});
