'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.showDetails = false;
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.dishes = menuFactory.getDishes();

        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function () {
            return ($scope.showDetails = !$scope.showDetails);
        };
}])
    .controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function ($scope, $routeParams, menuFactory) {
        var dish = menuFactory.getDish(parseInt($routeParams.id, 10));
        $scope.dish = dish;

        function getDateAsString() {
            return (new Date()).toISOString();
        }

        function getCloneComment(comment) {
            var result = {};

            for (var key in comment) {
                result[key] = comment[key];
            };

            // make rating Integer (there is need to sort by rating without mistakes)
            result.rating = parseInt(result.rating);

            return result;
        };

        $scope.newComment = {
            rating: 5,
            comment: "",
            author: "",
            date: getDateAsString()
        };

        $scope.isShow = function () {
            var isCommentEmpty = (typeof (this.newComment.comment) == "undefined") || (this.newComment.comment == "");

            return !isCommentEmpty;
        };

        $scope.onChangeRating = function (value) {
            this.newComment.rating = value;
        };


        $scope.sendComment = function () {
            this.newComment.date = getDateAsString();
            console.log(this.newComment);

            this.dish.comments.push(getCloneComment(this.newComment));

            this.newComment.rating = 5;
            this.newComment.comment = "";
            this.newComment.author = "";

            this.newCommentForm.$setPristine();
        };
}])

.controller('ContactController', ['$scope', function ($scope) {

    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    $scope.channels = [
        {
            value: "tel",
            label: "Tel."
    },
        {
            value: "Email",
            label: "Email"
    }
  ];

    $scope.invalidChannelSelection = false;
}])

.controller('FeedbackController', ['$scope', function ($scope) {
    $scope.sendFeedback = function () {
        console.log($scope.feedback);

        if ($scope.feedback.agree &&
            ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        } else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };

            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        };
    };
}])

;