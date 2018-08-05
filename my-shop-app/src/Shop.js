import React from 'react';
import './styles/Shop.css';
import {Switch, Link, Route} from 'react-router-dom';
import Shoes from './Shoes';
import Sun from './Sun';
import Cart from './Cart';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


export default class Shop extends React.Component {
    constructor(){
        super();
        this.state = {
            shop:{},
            shoppingcart: [],
            toggelClass : false
        }
      }

    componentWillMount(){

    // axios to hit the backend to get the shop data 
    axios.get('http://localhost:8080/shop/shopData')
        .then((results)=>{
            this.setState({
            shop: results.data
            })
        })
        .catch((error)=>{
            console.log(error);
        })

    // getting the cart data before page loads if there is any in
    // the server from previous use by the same user
    axios.get('http://localhost:8080/cart')
        .then((response) => {
        let responsejson = response.data;
        this.setState({ shoppingcart : responsejson });
        })
        .catch((error) => {
        console.log(error);
        });
    };

    // adding clicked item to backend first and then getting the cart data from backend
    // and adding it to the state to show the updated cart
    addToCart = (index,type) => {
    let addcart = [];
        this.setState({
            toggelClass : false
        });
        this.state.shop.map((element, i) => {
            if (element.id === index){
                    addcart.push(element);
            }
        })
        
    axios.post('http://localhost:8080/cart', addcart[0])
        .then((response) => {
            let responsejson = response.data;
            this.setState({
                shoppingcart : responsejson,
                toggelClass : true
            });
        })
        .catch((error) => {
            console.log(error);
        });
    };
    
        // using this function to remove username from local history
        // and also remove all the items from the cart from backend
    logout = () =>{
        localStorage.removeItem('username');
        axios.post('http://localhost:8080/logout')
        .then((response) => {
            this.setState({
                shoppingcart: []
            });
            window.alert('you are logged out');
        })
        .catch((error) => {
            console.log(error);
        });
    }
        // using axios.post again to remove only cart items without logging-out user
    clearcart = () =>{
        axios.post('http://localhost:8080/logout')
        .then((response) => {
            this.setState({
                shoppingcart: []
            });
            window.alert('Cart is clear, Lets Start Shopping Fresh');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
            // getting the username from local storage 
            var username = localStorage.getItem ('username');
            let ImgPathVar = this.props.url.shopBgUrl;            
            // if username is not there in localstorage then directing the user to home page 
            // otherwise to the shop page
            // thus mocking a pseudo login

        if(!username){
            return ( <Redirect to="/"/> )
            }
        else{
            return (
            <div className="shop">
                <img src={ImgPathVar} alt="bg" className="bg" />

                <div className="shop-h1 animated slideInDown">
                    <button onClick={this.clearcart} className="btn btn-secondary float-left clearcart">Clear Cart</button>
                    <h1 className= "d-inline">Welcome, {username}</h1>
                    <button onClick={this.logout} className="btn btn-secondary float-right logout">Logout</button>
                </div>

                <div className="container">

                    <ul className="nav nav-pills nav-fill mt-5 mb-5">
                        <li className="nav-item">                    
                            <Link to="/shop/shoes"><button type="button" className="btn nav-fonts shoes-button-bg"><div className='text-overlay'>   Shoes  </div></button></Link>
                        </li>
                        <li className="nav-item">
                                <Cart  data={this.state.shoppingcart} toggelClass={this.state.toggelClass}/>
                        </li>
                        <li className="nav-item">                    
                            <Link to="/shop/sunglasses"><button type="button" className="btn nav-fonts sun-button-bg"><div className='text-overlay'>Sunglasses</div></button></Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route exact path="/shop/shoes" render={()=>{return <Shoes shop={this.state.shop} addToCart={this.addToCart} />}} />
                        <Route path="/shop/sunglasses" render= {()=>{return <Sun shop={this.state.shop} addToCart={this.addToCart}/>}} />
                    </Switch>

                </div>
            </div>
        );
}
}
}

