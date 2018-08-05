import React, { Component } from 'react';
import './styles/Home.css';
import { Redirect } from 'react-router-dom'



export default class Home extends Component {
    constructor(){
        super();
        this.state={
            submited : false
        }
    }
    // to get value from form on submittion
    // also using state value of submitted to trigger a route redirect

    submit= (e)=>{
    e.preventDefault();
    let name = e.target.username.value;
    this.props.setUserName(name);
    this.setState({
        submited:true
    })
    }
    render() {
        // getting the username from local storage 
        // if username is there in localstorage then directing the user to shop page 
        // otherwise giving user the chance to enter the username
        
        // thus mocking a pseudo login

        if (localStorage.getItem('username') || this.state.submitted) {
            return (
              <Redirect to="/shop"/>
            )
        } 
        else{
            let ImgPathVar = this.props.url.homeBgUrl;
            return (
                <div className="home">
                <img src={ImgPathVar} className="bg" alt='bg'/>
                <div className="al-md">
                    <h1 className="animated fadeInDown">WelCome To the shopping world</h1>
                    <form onSubmit = {this.submit}>
                        <div className="input-group input-group-lg wd30">
                            <input type="text" name = "username" className="form-control text-center animated fadeInDown" placeholder="Enter Your Alias" />
                        </div>
                    </form>
                </div>
                </div>
            );
        }
    }
}
