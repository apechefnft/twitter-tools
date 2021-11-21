require('dotenv').config();
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

const tweet_id = '1462177618938286089';

console.log('Random replier v1.0');
console.log('By @ApeChefNFT');
console.log('-----------------------');
console.log(`https://twitter.com/ApeChefNFT/status/${tweet_id}`);

const getWinner = async () => {
  const tweets = await client.get(`https://api.twitter.com/2/tweets?ids=${tweet_id}&tweet.fields=conversation_id`, {});
  const conversation_id = tweets.data[0].conversation_id;
  let replies = await client.get(`https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${conversation_id}&expansions=author_id&max_results=100`, {});
  let allReplies = replies.data;
  while (replies.meta.next_token) {
    console.log('loading another page of 100 replies...');
    replies = await client.get(`https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${conversation_id}&expansions=author_id&max_results=100&next_token=${replies.meta.next_token}`, {});
    allReplies.push.apply(allReplies, replies.data);
  }
  const randomNumber = Math.floor(Math.random()*allReplies.length);
  const randomReplier = allReplies[randomNumber];
  const replier = await client.get(`https://api.twitter.com/2/users/${randomReplier.author_id}`, {});
  console.log('Found', allReplies.length, 'repliers');
  console.log('Random number', randomNumber);
  console.log('Winner is', replier.data.username);
}

getWinner();