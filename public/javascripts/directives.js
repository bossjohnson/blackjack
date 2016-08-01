app.directive('bjCard', function() {
    return {
        templateUrl: 'partials/card.html',
        restrict: 'E',
        scope: {
            rank: '=',
            suit: '=',
            collection: '&'
        }
    };
});

app.directive('cardMiddle', function() {
    return {
        templateUrl: 'partials/card_middle.html',
        restrict: 'E'
    };
});
