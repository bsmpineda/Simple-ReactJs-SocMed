/*
* This shows the header of the social media
    - logo
    - textbox for searching user
 */

import React from "react";
import "./TopBar.css";
import logo from "../../images/fb_logo.png";
import profilePic from "../../images/blankDp.webp";
import search from '../../images/search.png';
import { Redirect } from "react-router-dom";


class Topbar extends React.Component{
    constructor(props) {
        super(props)

        this.state ={
            searchValue: '',
            redirect: false
        }
        this.searchUser = this.searchUser.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    searchUser(e){
        e.preventDefault();
        this.setState({redirect: true})
    }

    changeHandler(e){
        this.setState({searchValue:e.target.value})
        this.setState({redirect: false})
    }


    render(){

        if(this.state.redirect){
            if(this.props.atSearch){
                window.location.reload();
            }
            
            return <Redirect to= {"/search?name="+ this.state.searchValue} />
        }
        return(
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <a href="/feed">
                        <img src = {logo} id="logo" />
                    </a>
                </div>
                <div className="topbarRight">
                    <form id="searchbar" onSubmit={this.searchUser}>
                            <img src = {search} />
                            <input
                                placeholder="Search for Friend"
                                id="searchInput"
                                value={this.state.searchValue}
                                onChange={this.changeHandler}
                            />
                            <input type="submit" hidden />
                    </form>
                    
                    <div className="user-icon">
                        <img src = {profilePic} id = "userDp"/>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Topbar;