/* This code is for a twitter bot baby who is very sad he can't study at university, 
 * so he's learning through the incredible abyss of Twitter. He's working on sharing 
 * his views as well. Stay tuned.
 *
 * This bot runs using Twitter's API, Twitter NPM and node.js
 * To run control this bot through the command line, simply type
 * node gisbot.js
 * and the bot will seek his education through Twitter's hashtagging.
 */

//Set up. This bot runs off Twitter's API and Twitter NPM.
var
    Twitter = require('twitter'),
    config = require('./config'),
    T = new Twitter(config);

/*=== This section is for following other accounts ===*/

// Set up search parameters
var params = {
  q: '#gis, #GIS', //These are the hastags we're seeking
  count: 1, //This is the amount per run that the bot is allocated to learn from
  result_type: 'popular', //This is the search filter for where the bot is looking
  lang: 'en' //En, or English, is the language this bot is searching from 
}

T.get('search/tweets', params, function(err, data) {
    if (!err) {
      for (let i = 0; i < data.statuses.length; i++){
        let rtid = { id: data.statuses[i].id_str }
        T.post('statuses/create/:id', rtid, function(err, response) {
        if (err) {
          console.log(err[0].message);
        } else {
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Retweeted: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
  } else {
    console.log(err);
  }
})

/*=== End of section ===*/

/*=== This section is for retweeting ===*/

// find latest tweet according the query 'q' in params
var retweet = function() {
    var params = {
        q: '#gis, #GIS',
        result_type: 'recent',
        lang: 'en'
    }
    T.get('search/tweets', params, function(err, data) {
      if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell to retweet
            T.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                if (err) {
                    console.log('Unfortunately could not retweet...');
                }
            });
        } else {
        console.log('Something went wrong while searching content...');
        }
    });
}

retweet();
retweet();
retweet();

/*=== End of section ===*/

/*=== This section is for liking other tweets ===*/

var params = {
  q: '#gis, #GIS',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

T.get('search/tweets', params, function(err, data, response) {

  if (!err) {
    for (let i = 0; i < data.statuses.length; i++) {
      let id = { id: data.statuses[i].id_str }
      T.post('favorites/create', id, function(err, response) {
        if (err) {
          console.log(err[0].message);
        } else {
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
  } else {
    console.log(err);
  }
})

/*
=== to be used if not just searching popular tweets===
//Generate a random tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};
*/

/*=== End of section ===*/