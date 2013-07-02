$(document).ready(function(){

  var tiles = $('.tile');
  var player_x = [[],[]];
  var player_y =[[],[]];
  var turn = "player_x";
  var turn_array = player_x;

  var next_turn = function() {
    if (turn === "player_x") {
      turn = "player_y";
      turn_array = player_y;
    }else {
      turn = "player_x";
      turn_array = player_x;
    }
  };

  var find_indices = function(id_position) {
    var indices = [];
    switch(id_position)
    {
    case "top-left":
      indices = [1,7];
      break;
    case "top-center":
      indices = [2,4];
      break;
    case "top-right":
      indices = [3,1];
      break;
    case "middle-left":
      indices = [4,8];
      break;
    case "middle-center":
      indices = [5,5];
      break;
    case "middle-right":
      indices = [6,2];
      break;
    case "bottom-left":
      indices = [7,9];
      break;
    case "bottom-center":
      indices = [8,6];
      break;
    case "bottom-right":
      indices = [9,3];
      break;
    }
    return indices;
  };

  var add_indices_to_players = function(indices) {
    turn_array[0].push(indices[0]);
    turn_array[0].sort(function(a,b){return a-b;});
    turn_array[1].push(indices[1]);
    turn_array[1].sort(function(a,b){return a-b;});
  };

  var check_tile = function(tile) {
    tile.addClass('selected');
    if (turn == "player_x") {
      tile.append("<div class='check' id='x'><p><b>&times;</b></p></div>");
    }else {
      tile.append("<div class='check' id='o'><p><b>&#9711;</b></p></div>");
    }
  };

  var is_game_over = function() {
    for (var i = 0; i < turn_array.length; i++) {
      var first_index = turn_array[i][0];
      if (turn_array[i].indexOf(first_index+3) != -1 && turn_array[i].indexOf(first_index+6) != -1) {
        return true;
      }else if (turn_array[i].indexOf(first_index+4) != -1 && turn_array[i].indexOf(first_index+8) != -1) {
        return true;
      }
    }
    var total_checks = player_x[0].length + player_y[0].length;
    if (total_checks == 9) {
      alert("Cat's game, play again!!");
      window.location.href = window.location.href;
    }
    return false;
  };

  var handle_win = function() {
    alert('Yay! ' + turn + ' won!');
    window.location.href = window.location.href;
  };

  var handle_click = function() {
    var tile = $(this);
    if (tile.hasClass('selected')) {
      return false;
    }
    check_tile(tile);
    var indices = find_indices(tile.attr('id'));
    add_indices_to_players(indices);
    if (is_game_over()) {
      handle_win();
    }
    next_turn();
  };

  $.each(tiles, function(index, tile) {
    var jtile = $(tile);
    jtile.on('click', handle_click);
  });

});
