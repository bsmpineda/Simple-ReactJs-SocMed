import React from "react";
import "./SignUp.css";
import { Redirect } from 'react-router-dom';

class SignUp extends React.Component{

    constructor(props){
        super(props)

        this.state ={
            signIn: false,
            passValue : "",
            repValue : "",
            repDisable: true,  
            passError: "",  //for error message of password
            repPassError: "", //for error message of repeat password
            passMatched: false //for indentifying if the repeat pass and pass matched
        }

        this.handlePassChange = this.handlePassChange.bind(this)
        this.handleRepPassChange = this.handleRepPassChange.bind(this)
        this.checkMatch = this.checkMatch.bind(this)
        this.checkPassValidity = this.checkPassValidity.bind(this)
        this.signup = this.signup.bind(this)
    }



    //this is the changeHandler of password. It also enabled the repeat passworrd
    handlePassChange(e){
        this.setState({passValue: e.target.value, repDisable: false})
    }

    handleRepPassChange(e){
        this.setState({repValue: e.target.value})
    }
    
    //this checks if repeat password and password matched
    checkMatch(){
        const pass = this.state.passValue
        const rep = this.state.repValue


        if(pass === rep){
            this.setState({repPassError: ""})
            this.setState({passMatched: true})
        }
        else if(rep === ""){
            this.setState({repPassError: ""})
            this.setState({passMatched: false})
        }
        else{
            this.setState({repPassError: "Doesn't match password"})
            this.setState({passMatched: false})
        }
    }

    //this check if the format of the password is valid
    checkPassValidity(e){
        const pass = this.state.passValue
        const length = pass.length

        if(length >= 8){
            this.setState({ passError: "" })
            
            //check if the password has an uppercase letter, lowercase letter, and number
            if(pass.match(/[a-z]/) && pass.match(/[A-Z]/) && pass.match(/[0-9]/)){
                this.setState({ passError: "" })
            }
            else{ //else display error
                this.setState({ passError: "It must contain at least one lowercase, uppercase and number." })
            }

        }
        else if (length === 0) {
            this.setState({ passError: "" })
        } 
        else{
            this.setState({ passError: "Password is too short.." })
        }

        this.checkMatch(); //check if repeat pass and pass matched again once password field is changed
    }

    //if the password and repeat password are not yet match, no submission
    signup(event) {
        event.preventDefault();
        if (this.state.passMatched){
            
            const user = {
                firstName: document.getElementById("fname").value,
                lastName: document.getElementById("lname").value,
                email: document.getElementById('email').value,
                password: document.getElementById("password").value
            }

            //send a POST request to localhost:3001/signup
            fetch(
                "http://localhost:3001/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)

                }
            )
            .then(response => response.json())
            .then(body => {
                if (body.success){
                    this.setState({signIn: true})
                    alert("Success saved user!");
                }
                else{
                    alert("Failed to save user!")
                }
            })
        }
    }

    render(){
        if(this.state.signIn){
            return <Redirect to = '/log-in' />
        }

        return(
            <div>
                <form id="signUpform" onSubmit={this.signup}>
                    <h1>CREATE ACCOUNT</h1>
                    <div>
                        <label name="labels">First Name: </label>
                        <input  type= "text" id= "fname" required /> 
                        <br/>
                    </div>
                
                    <div>
                        <label name="labels">Last Name: </label>
                        <input type= "text" id= "lname" required  /> 
                        <br/>
                    </div>
                    
                    <div>
                        <label name="labels">Email: </label>
                        <input type= "email" id= "email" required /> 
                        <br/>
                    </div>

                    <div>
                        <label name="labels">Password: </label>
                        <input 
                            type= "password"
                            id= "password" 
                            value = { this.state.passValue }
                            onChange = { this.handlePassChange }
                            onKeyUp = { this.checkPassValidity }
                            required 
                        /> 
                        <br />
                        <span className = "message" > { this.state.passError } </span>
                        <br/>
                    </div>

                    <div>
                        <label name="labels">Repeat Password: </label>
                        <input 
                            type= "password"
                            id= "repPassword" 
                            value = { this.state.repValue }
                            onChange = { this.handleRepPassChange }
                            onKeyUp = { this.checkMatch }
                            disabled = {this.state.repDisable}
                            required 
                        /> 
                        <span className = "message" id="repMessage"> {this.state.repPassError }</span>
                        <br/>
                    </div>
                    
                    <br/>
                    <input type="submit" value="Sign Up" className = "submit" ></input>
                </form>
                <div className="logIn">
                    <p>Already have an account? <a href="/log-in">Sign In</a></p>
                </div>
            </div>
        );
    }
}

export default SignUp;