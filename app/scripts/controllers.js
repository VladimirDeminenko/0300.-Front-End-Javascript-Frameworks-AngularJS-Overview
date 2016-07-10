'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = true;
            $scope.message = "Loading...";

            $scope.dishes = menuFactory.getDishes().query();
            /** /
                        menuFactory.getDishes()
                            .then(
                                function (response) {
                                    $scope.dishes = response.data;
                                    $scope.showMenu = true;
                                },
                                function (response) {
                                    $scope.message = "Error: " + response.status + " " + response.statusText;
                                }
                            );
            /**/


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

.controller('ContactController', ['$scope', function ($scope) {

    $scope.feedback = {
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

.controller('FeedbackController', ['$scope', function ($scope) {

    $scope.sendFeedback = function () {

        console.log($scope.feedback);

        if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
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
        }
    };
        }])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

    $scope.dish = {};
    $scope.showDish = true;
    $scope.message = "Loading...";
    $scope.dish = menuFactory.getDishes().get({
        id: parseInt($stateParams.id, 10)
    });

    /** /    
        menuFactory.getDish(parseInt($stateParams.id, 10))
            .then(
                function (response) {
                    $scope.dish = response.data;
                    $scope.showDish = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
    /**/
            }])

.controller('DishCommentController', ['$scope', function ($scope) {
        function createComment() {
            return {
                rating: 5,
                date: new Date().toISOString()
            };
        }

        function getCloneComment(comment) {
            var result = {};

            for (var key in comment) {
                result[key] = comment[key];
            }

            // make rating Integer (there is need to sort by rating without mistakes)
            result.rating = parseInt(result.rating);

            return result;
        }

        $scope.isShow = function () {
            var isCommentEmpty = (typeof ($scope.mycomment.comment) === "undefined") || ($scope.mycomment.comment === "");

            return !isCommentEmpty;
        };

        $scope.submitComment = function () {
            console.log(this.mycomment);
            $scope.dish.comments.push(getCloneComment(this.mycomment));
            $scope.mycomment = createComment();
            $scope.commentForm.$setPristine();
        };

        $scope.mycomment = createComment();
}
])

// implement the IndexController and About Controller here
.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
        $scope.promotion = menuFactory.getPromotion(0);
        $scope.leader = corporateFactory.getLeader(3);
        $scope.showDish = true;
        $scope.message = "Loading...";
        $scope.dish = menuFactory.getDishes().get({
            id: 0
        });

        /** /
                menuFactory.getDish(0)
                    .then(
                        function (response) {
                            $scope.dish = response.data;
                            $scope.showDish = true;
                        },
                        function (response) {
                            $scope.message = "Error: " + response.status + " " + response.statusText;
                        }
                    );
        /**/
}

])

.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
        $scope.leaders = corporateFactory.getLeaders();
}

])

;