(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function () {
    this.towers = [[3, 2, 1], [], []];
    this.$startTower = null;
  };

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.run = function () {
    var game = this;

    READER.question("Enter a starting tower: ",function (start) {
      var startTowerIdx = parseInt(start);
      READER.question("Enter an ending tower: ", function (end) {
        var endTowerIdx = parseInt(end);
        game.takeTurn(startTowerIdx,endTowerIdx);
      });
    });
  };

  Game.prototype.takeTurn = function (start,end){
    var game = this;

    if (game.move(start,end)) {
      console.log(game.towers);
    } else {
      console.log("Invalid move!")
    }

    if (game.isWon()) {
      console.log("You win!");
      READER.close();
    } else {
      game.run();
    }
  }

  Game.prototype.renderMove = function($endTower){
    startDisc = game.$startTower.children().first();
    startDisc = $(startDisc);
    $endTower.prepend(startDisc);
  }

  Game.prototype.handleFirstClick = function (target) {
    console.log(target);
    var game = this;

    var $startTower = $(target);
    var startIdx = $startTower.attr("name");
    if (game.towers[startIdx].length){
      game.$startTower = $(target);
    } else {
      alert("Tower is empty, try again.")
    }
  };

  Game.prototype.handleSecondClick = function (target) {
    var startIdx = game.$startTower.attr('name');
    var $endTower = $(target);
    var endIdx = $endTower.attr('name');

    if (game.isValidMove(startIdx, endIdx)) {
      game.move(startIdx, endIdx);
      game.renderMove($endTower);
      game.$startTower = null;

      if (game.isWon()) {
        alert("Congrats! You did it.");
        game.restartGame($endTower);
      }
    } else {
      alert("Invalid move.");
      game.$startTower = null;
    }
  };

  Game.prototype.restartGame = function ($endTower) {
    discs = $endTower.children(".disc");
    console.log(discs)
    startTower = $("#tower1");
    console.log(startTower)
    startTower.prepend(discs);
    this.towers = [[3, 2, 1], [], []];
  };

  Game.prototype.setUpHandlers = function () {
    var game = this;

    $('.tower').click(function (event) {
      if (game.$startTower){
        game.handleSecondClick(event.currentTarget);
      } else {
        game.handleFirstClick(event.currentTarget);
      }
    });
  };
})(this);

// $(this).click(function () {
//   console.log("clicked2")

// })

// this.Hanoi.Game is a constructor function, so we instantiate a new object, then run it.


