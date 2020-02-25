const React = require("react");
const qs = require("qs");

const TwitterForm = function(props)
{
    const [user, setUser] = React.useState("");
    const [message, setMessage] = React.useState("");
    //const [s_user, setS_User] = React.useState("");

    const updateUser = (event) => {
        setUser(event.target.value);
    }

    const updateMessage = (event) => {
        setMessage(event.target.value);
    }

    const asyncSubmit = async () => {
        const response = await fetch('/api/tweet',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(({user, message})),
        });
        if (response.status === 200) {
            setUser("");
            setMessage("");
            if (props.onTweeted) props.onTweeted();
        }
    }
    
    const asyncSearch = async() = {

    }

    const handleSubmit = (event) => {
        asyncSubmit();
        event.preventDefault();
    }

    // const handleSearch = (event) => {
    //     asyncSearch();
    //     event.preventDefault();
    // }

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <label>
                    User:
                    <input type="text" value = {user} onChange = {updateUser}/>
                </label>
                <label>
                    Message:
                    <input type="text" value = {message} onChange = {updateMessage}/>
                </label>
                <input type="submit" value = "Submit"/>          
            </form>
        </div>
        // <div>
        //     <form onSumbit {handleSearch}>
        //         <label>
        //             Search user:
        //             <input type="text" value = {s_user}/>
        //         </label>  
        //             <input type="submit" value = "Search"/> 
        //     </form>
        // </div>

    );
}
module.exports = TwitterForm;