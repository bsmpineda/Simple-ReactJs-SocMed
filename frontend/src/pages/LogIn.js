import React from "react";
import './LogIn.css';
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

class LogIn extends React.Component{
    constructor(props){
		super(props)

        this.state = {
            signIn: false
        }

		this.login = this.login.bind(this);
	}

    login(e) {
        e.preventDefault();

        const credentials = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }

        //send a POST request
        fetch(
            "http://localhost:3001/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(credentials)
            })
            .then(response => response.json())
            .then(body => {
                if (!body.success) { alert("Failed to log in"); }
                else {
                    // successful log in. store the token as a cookie
        
                    const cookies = new Cookies();
                    cookies.set(
                    "authToken",
                    body.token,
                    {
                        path: "localhost:3001/",
                        age: 60*60,
                        sameSite: "lax"
                    });
                   
                    
                    localStorage.setItem("firstName", body.firstName);
                    localStorage.setItem("lastName", body.lastName)
                    localStorage.setItem("id", body.id)
                    localStorage.setItem("friends", body.friends)
                    this.setState({signIn: true})
                    alert("Successfully Log in")
            }
        })
    }
    
    render(){
        if(this.state.signIn){
            return <Redirect to = '/feed' />
        }

        return(
            <div>
                <form  id = "loginForm" onSubmit={ this.login }>
                    <h1> LOG IN</h1>
                <div>
                        <label name="labels">Email: </label>
                        <input type= "email" id= "email" className="input" required /> 
                        <br/>
                    </div>

                    <div>
                        <label name="labels">Password: </label>
                        <input 
                            type= "password"
                            id= "password"
                            className="input" 
                            required 
                        /> 
                    </div>

                    <input type="submit" value="Sign In" id = "submit" ></input>
                </form>
                <div className="signUp">
                    <p>Don't have an account? <a href="/sign-up">Sign Up</a></p>
                </div>
               
            </div>
        );
    }
}

export default LogIn;