app.controller('blackjackController', blackjackController);

function blackjackController($scope, cardService) {

    $scope.buildDeck = cardService.buildDeck;

    $scope.view = {
        deck: $scope.buildDeck(),
        playerHand: {},
        dealerHand: {}
    };

    $scope.view.deck.shuffle();

    $scope.deal = function() {
        var deck = $scope.view.deck

        // Player's Hand
        $scope.view.playerHand.cards = [deck.cards.pop(), deck.cards.pop()];
        $scope.view.playerHand.value = handValue($scope.view.playerHand);

        // Dealer's Hand
        $scope.view.dealerHand.cards = [deck.cards.pop(), deck.cards.pop()];
        $scope.view.dealerHand.value = partialHandValue($scope.view.dealerHand);
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
    return hand.cards.reduce(sumCards);
}

function partialHandValue(hand) {
    return cardValue(hand.cards[0]);
}

function sumCards(a, b) {
    return cardValue(a) + cardValue(b);
}

function cardValue(card) {
    if (typeof card.rank === 'number') { // handle non-face cards
        card.value = card.rank;
    } else if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') { // handle face cards
        card.value = 10;
    } else { // handle aces
        card.value = 11;
    }
    return card.value;
}
