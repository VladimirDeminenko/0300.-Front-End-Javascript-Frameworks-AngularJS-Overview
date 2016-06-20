'use strict';
angular.module('confusionApp', [])
    .controller('MenuController', ['$scope', function ($scope) {
        $scope.showDetails = false;
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.dishes = [
            {
                name: 'Uthapizza',
                image: 'images/uthapizza.png',
                category: 'mains',
                label: 'Hot',
                price: '4.99',
                description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                comment: ''
            },

            {
                name: 'Zucchipakoda',
                image: 'images/zucchipakoda.png',
                category: 'appetizer',
                label: '',
                price: '1.99',
                description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
                comment: ''
            },

            {
                name: 'Vadonut',
                image: 'images/vadonut.png',
                category: 'appetizer',
                label: 'New',
                price: '1.99',
                description: 'A quintessential ConFusion experience, is it a vada or is it a donut?',
                comment: ''
            },

            {
                name: 'ElaiCheese Cake',
                image: 'images/elaicheesecake.png',
                category: 'dessert',
                label: '',
                price: '2.99',
                description: 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
                comment: ''
            }
        ];

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

.controller('DishDetailController', ['$scope', function ($scope) {
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
    
    $scope.dish = {
        name: 'Uthapizza',
        image: 'images/uthapizza.png',
        category: 'mains',
        label: 'Hot',
        price: '4.99',
        description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
        comments: [
            {
                rating: 5,
                comment: "Imagine all the eatables, living in conFusion!",
                author: "John Lemon",
                date: "2012-10-16T17:57:28.556094Z"
          },
            {
                rating: 4,
                comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                author: "Paul McVites",
                date: "2014-09-05T17:57:28.556094Z"
          },
            {
                rating: 3,
                comment: "Eat it, just eat it!",
                author: "Michael Jaikishan",
                date: "2015-02-13T17:57:28.556094Z"
          },
            {
                rating: 4,
                comment: "Ultimate, Reaching for the stars!",
                author: "Ringo Starry",
                date: "2013-12-02T17:57:28.556094Z"
          },
            {
                rating: 2,
                comment: "It's your birthday, we're gonna party!",
                author: "25 Cent",
                date: "2011-12-02T17:57:28.556094Z"
          }
        ]
    };

    $scope.newComment = {
        rating: 5,
        comment: "",
        author: "",
        date: getDateAsString()
    };

    $scope.isShow = function () {
        return this.newComment.comment.trim() != "";
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