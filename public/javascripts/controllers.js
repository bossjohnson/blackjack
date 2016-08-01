app.controller('blackjackController', blackjackController);

function blackjackController($scope, cardService) {

    $scope.view = {};

    $scope.buildDeck = cardService.buildDeck;
    $scope.test = function() {
        var deck = cardService.buildDeck();
        deck.shuffle();
        $scope.view.deck = deck;
    }

    $scope.collect = function(rank) {
        var array = [];
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
