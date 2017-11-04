var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var friendNew = {};
        friendNew.name = req.body.name;
        friendNew.photo = req.body.photo;
        friendNew.scores = req.body['scores[]'];

        getFriendMatch(friendNew, function(friendMatch) {
            friends.push(friendNew);
            res.json(friendMatch);
        });
    });

    function getFriendMatch (targetFriend, callback) {
    
        var bestMatch;
        var bestCompatibilityIndex;
    
        for (var i = 0; i < friends.length; i++) {
            var friend = friends[i];
            var compatibilityIndex = 0;
      
            for (var j = 0; j < friend.scores.length; j++) {
                var score = friend.scores[j];
                var targetFriendScore = targetFriend.scores[j];
                compatibilityIndex += Math.abs(score - targetFriendScore);
            }

            if (bestCompatibilityIndex == undefined || compatibilityIndex < bestCompatibilityIndex) {
                bestCompatibilityIndex = compatibilityIndex;
                bestMatch = friend;
            }
        }

        callback(bestMatch);
    };

};
