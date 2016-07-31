app.controller('blackjackController', blackjackController);

function blackjackController($scope, cardService) {
    $scope.buildDeck = cardService.buildDeck;
    $scope.shuffle = cardService.shuffle;
}
blackjackController.$inject = ['$scope', 'cardService'];
