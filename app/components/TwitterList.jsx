const React = require("react");

function TwitterList(props)
{
    const listComponents = props.tweets.map( (tweet, idx) =>{
        return <li key = {idx}>{tweet.user} : {tweet.message}</li>
    });

    return (
        <div>
            <ul>
                {listComponents}
            </ul>
        </div>
    );
}
module.exports = TwitterList;