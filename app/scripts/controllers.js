'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading...";

            $scope.dishes = menuFactory.getDishes().query(
                function (response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

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
                $scope.showDetails = !$scope.showDetails;
            };
    }
    ])

.controller('ContactController', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $rootScope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
  }, {
        value: "Email",
        label: "Email"
  }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

        }])

.controller('FeedbackController', ['$scope', '$rootScope', 'feedbackFactory', function ($scope, $rootScope, feedbackFactory) {
    
    $scope.feedbacks = feedbackFactory.getFeedbacks().query(
        function (response) {
            $scope.feedbacks = response;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.sendFeedback = function () {
        if ($rootScope.feedback.agree && ($rootScope.feedback.mychannel === "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        } else {
            console.log($rootScope.feedback);    
            $scope.feedbacks.push($rootScope.feedback);
            feedbackFactory.getFeedbacks().add($rootScope.feedback);

            $scope.invalidChannelSelection = false;
            $rootScope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };

            $scope.feedbackForm.$setPristine();
        }
    };
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading...";
    $scope.dish = menuFactory.getDishes().get({
        id: parseInt($stateParams.id, 10)
    }).$promise.then(
        function (response) {
            $scope.dish = response;
            $scope.showDish = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
}])

.controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    function createComment() {
        return {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };
    }

    $scope.isShow = function () {
        var isCommentEmpty = (typeof ($scope.mycomment.comment) === "undefined") || ($scope.mycomment.comment === "");

        return !isCommentEmpty;
    };

    $scope.submitComment = function () {
        // the type of rating must be Integer (try to sort comments by rating)
        $scope.mycomment.rating = parseInt($scope.mycomment.rating);
        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);
        $scope.dish.comments.push($scope.mycomment);

        menuFactory.getDishes()
            .update({
                id: $scope.dish.id
            }, $scope.dish);

        $scope.mycomment = createComment();
        $scope.mycommentForm.$setPristine();
    };

    $scope.mycomment = createComment();
}])

// implement the IndexController and About Controller here
.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
    $scope.showDish = false;
    $scope.dishMessage = "Loading...";

    $scope.dish = menuFactory.getDishes().get({
        id: 0
    }).$promise.then(
        function (response) {
            $scope.dish = response;
            $scope.showDish = true;
        },
        function (response) {
            $scope.dishMessage = "Error: " + response.status + " " + response.statusText;
        });

    $scope.showPromotion = false;
    $scope.promotionMessage = "Loading...";
    $scope.promotion = menuFactory.getPromotion().get({
        id: 0
    }).$promise.then(
        function (response) {
            $scope.promotion = response;
            $scope.showPromotion = true;
        },
        function (response) {
            $scope.promotionMessage = "Error: " + response.status + " " + response.statusText;
        });

    $scope.showLeader = false;
    $scope.leaderMessage = "Loading...";
    $scope.leader = corporateFactory.getLeaders().get({
        id: 3
    }).$promise.then(
        function (response) {
            $scope.leader = response;
            $scope.showLeader = true;
        },
        function (response) {
            $scope.leaderMessage = "Error: " + response.status + " " + response.statusText;
        });
}])

.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
        $scope.showLeadership = false;
        $scope.message = "Loading...";

        $scope.leaders = corporateFactory.getLeaders().query(
            function (response) {
                $scope.leaders = response;
                $scope.showLeadership = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });
}

])

;