app.controller('blackjackController', blackjackController);

function blackjackController($scope, cardService) {

    $scope.buildDeck = cardService.buildDeck;

    $scope.view = {
        deck: $scope.buildDeck(),
        playerHand: {}
    };

    $scope.view.deck.shuffle();

    $scope.deal = function() {
        var deck = $scope.view.deck
        $scope.view.playerHand.cards = [deck.cards.pop(), deck.cards.pop()];
        $scope.view.playerHand.value = handValue($scope.view.playerHand);
    }

    $scope.collect = function(rank) {
        var array = [];
        if (rank === 'A') {
            return [null];
        }
        if (typeof rank !== 'number') {
            return array;
        }
        for (var i = 0; i < rank; i++) {
            array.push(null);
        }
        return array;
    };


}
blackjackController.$inject = ['$scope', 'cardService'];

// ================
// Helper Functions
// ================
function handValue(hand) {
    console.log(hand.cards);
    return hand.cards.reduce(sumCards);
}

function sumCards(a, b) {

    if (typeof a.rank === 'number') { // handle non-face cards
        a.value = a.rank;
    } else if (a.rank === 'J' || a.rank === 'Q' || a.rank === 'K') { // handle face cards
        a.value = 10;
    } else { // handle aces
        a.value = 11;
    }

    if (typeof b.rank === 'number') { // handle non-face cards
        b.value = b.rank;
    } else if (b.rank === 'J' || b.rank === 'Q' || b.rank === 'K') { // handle face cards
        b.value = 10;
    } else { // handle aces
        b.value = 11;
    }

    return a.value + b.value;
}
