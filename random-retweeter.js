require('dotenv').config();
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

const tweet_id = '1461806934806478858';

console.log('Random retweeter v1.0');
console.log('By @ApeChefNFT');
console.log('-----------------------');
console.log(`https://twitter.com/ApeChefNFT/status/${tweet_id}`);

client.get(`https://api.twitter.com/2/tweets/${tweet_id}/retweeted_by`, function(error, retweets, response) {
  if(error) throw error;
  const randomNumber = Math.floor(Math.random()*retweets.data.length);
  const randomRetweeter = retweets.data[randomNumber];
  console.log('Found', retweets.data.length, 'retweeters');
  console.log('Random number', randomNumber);
  console.log('Winner is', randomRetweeter.username);
});
