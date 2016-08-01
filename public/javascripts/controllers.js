app.controller('blackjackController', blackjackController);

function blackjackController($scope, cardService) {

    $scope.view = {};

    $scope.buildDeck = cardService.buildDeck;
    $scope.test = function() {
        var deck = cardService.buildDeck();
        deck.shuffle();
        $scope.view.deck = deck;
    }

}
blackjackController.$inject = ['$scope', 'cardService'];
