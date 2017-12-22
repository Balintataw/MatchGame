var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function () {
  var $game = $('#game');
  MatchGame.renderCards(MatchGame.generateCardValues(), $game);
});


/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  //debugger;
  var array = [];
  var cardValues = [];
  for (i = 0; i < 8; i++) {
    array.push(i + 1);
    array.push(i + 1);
  };
  while (array.length > 0) {
    var arrayIndex = Math.floor(Math.random() * array.length);
    cardValues.push(array[arrayIndex]);
    array.splice(arrayIndex, 1);
  };
  console.log(cardValues);
  return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colorValues = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'
  ];

  $game.empty();
  $game.data('flippedCards', []);

  for (i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="col-sm-3 card"></div>');
    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', colorValues[cardValues[i] - 1]);
    $game.append($card);
  };

    $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  if ($card.data('flipped')) {
    return;
  }

  $card.css('background-color', $card.data('color'));
  $card.text($card.data('value'));
  $card.data('flipped', true);
  //$flippedCards.push($card);

  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  var $card1 = flippedCards[0];
  var $card2 = flippedCards[1];

  if (flippedCards.length == 2) {

      if ($card1.data('value') == $card2.data('value')) {
        $card1.css('background-color', 'rgb(153, 153, 153)', 'color', 'rgb(204, 204, 204)');
        $card2.css('background-color', 'rgb(153, 153, 153)', 'color', 'rgb(204, 204, 204)');
      } else {
        $('.card').off('click');
        setTimeout(function () {
          $card1.text('').css('background-color', 'rgb(32, 64, 86)').data('flipped', false).html('');
          $card2.text('').css('background-color', 'rgb(32, 64, 86)').data('flipped', false).html('');
          //$flippedCards.length = 0;
        }, 1000);
      }
      $game.data('flippedCards', []);
    }
};
