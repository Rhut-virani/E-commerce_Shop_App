import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./Home";
import Shop from "./Shop";
import axios from 'axios';
import 'animate.css'

class App extends React.Component {
    constructor(){
      super();
      this.state={
        url: '',
      }
    }

    //checking if component is mounted and if so to get any stored data 
componentWillMount(){
    axios.get('http://localhost:8080/shop/urldata')
      .then((results)=> {
        this.setState({
          url : results.data,
        })
      })
      .catch((error)=>{
        console.log(error);
      })
};

    // setting username to localstorage
  setUserName = (name) => {
    localStorage.setItem ('username', name);
  }
  render() {
    return (
      <div className="App">
        <Router>
              <div>
              <Switch>
                <Route exact path="/" render={()=>{return <Home url = {this.state.url} setUserName= {this.setUserName}/>}} />
                <Route path="/shop" render={()=>{return <Shop url = {this.state.url} />}} />
              </Switch>
              </div>
        </Router>
      </div>
    );
  }
}

export default App;
