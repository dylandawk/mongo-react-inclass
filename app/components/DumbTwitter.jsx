const React = require("react");
const ClockFace = require("./ClockFace");
const TwitterList = require("./TwitterList");
const TwitterForm = require("./TwitterForm");

/* the main page for the index route of this app */
const DumbTwitter = function() {

  const [tweets, setTweets] = React.useState([]);
  
  const doFetchTweets = async () => {
    //fetch the data
    const response = await fetch("/api/tweets");
    const data = await response.json();
    setTweets(data);
  }
  
  React.useEffect(() => {
    doFetchTweets();
  }, []);

  return (
    <div>
      <h1>Hello!</h1>

      <p>Your app here</p>

      <ClockFace language="en" />
      <TwitterForm onTweeted = {doFetchTweets}/>
      <TwitterList tweets ={tweets}/>
    </div>
  );
}

module.exports = DumbTwitter;