app.controller('blackjackController', blackjackController);

function blackjackController($scope, cardService) {

    $scope.buildDeck = cardService.buildDeck;

    $scope.view = {
        deck: $scope.buildDeck(),
        playerHand: {},
        playerBust: false,
        playerBlackjack: false,
        dealerHand: {},
        dealerBust: false,
        dealerBlackjack: false,
        showDealerHand: false,
        push: false
    };

    $scope.view.deck.shuffle();

    $scope.deal = function() {
        $scope.view.playerBust = false;
        $scope.view.dealerBust = false;
        $scope.view.showDealerHand = false;
        $scope.view.disableControls = false;
        $scope.view.push = false;

        var deck = $scope.view.deck;

        // Player's Hand
        $scope.view.playerBlackjack = false;
        $scope.view.playerHand.cards = [deck.cards.pop(), deck.cards.pop()];
        $scope.view.playerHand.value = handValue($scope.view.playerHand);
        if ($scope.view.playerHand.value === 21) {
            $scope.view.playerBlackjack = true;
            console.log('player wins!');
        }

        // Dealer's Hand
        $scope.view.dealerBlackjack = false;
        $scope.view.dealerHand.cards = [deck.cards.pop(), deck.cards.pop()];
        $scope.view.dealerHand.value = partialHandValue($scope.view.dealerHand);
        if ($scope.view.dealerHand.value === 21 && !$scope.view.playerBlackjack) {
            $scope.view.dealerBlackjack = true;
            console.log('dealer wins!');
        }
    };

    $scope.hit = function() {
        var deck = $scope.view.deck;
        $scope.view.playerBust = false;
        $scope.view.playerHand.cards.push(deck.cards.pop());
        $scope.view.playerHand.value = handValue($scope.view.playerHand);
        if ($scope.view.playerHand.value > 21) {
            $scope.view.playerBust = true;
        }
    };

    $scope.stand = function() {
        var deck = $scope.view.deck;
        var dealerHand = $scope.view.dealerHand;
        $scope.view.disableControls = true;
        $scope.view.showDealerHand = true;
        dealerHand.value = handValue(dealerHand);

        // dealer must hit soft 17
        while (dealerHand.value <= 17) {
            dealerHand.cards.push(deck.cards.pop());
            dealerHand.value = handValue(dealerHand);
            if (dealerHand.value > 21) {
                $scope.view.dealerBust = true;
                break;
            }
        }

        var winner = checkForWinner();
        console.log(winner, 'wins!');
    };

    function checkForWinner() {
        // console.log('the winner is...');
        if ($scope.view.playerBust) {
            return 'dealer';
        }
        if ($scope.view.dealerBust) {
            return 'player';
        }
        if ($scope.view.playerHand.value === $scope.view.dealerHand.value) {
            $scope.view.push = true;
            return 'push';
        }
        if ($scope.view.playerHand.value > $scope.view.dealerHand.value) {
            return 'player';
        }
        return 'dealer';

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
    var score = hand.cards.reduce(sumCards);
    for (var i = 0; i < hand.cards.length; i++) {
        if (hand.cards[i].rank === 'A' && score > 21) { // correct for aces
            score -= 10;
        }
    }
    return score;
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
    return card.value || card; // with more than two cards, total is passed back in as a number
}
