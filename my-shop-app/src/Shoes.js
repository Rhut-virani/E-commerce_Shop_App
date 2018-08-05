import React from 'react';
import Cardsgrid from './Cardsgrid';


export default class Shoes extends React.Component {
    render() {
        // creating a blank array
        let shoesJSX =[];

        // pushing all elements with type of shoe from the state array of shop
        let copyshoes = Array.from(this.props.shop);
        copyshoes.map((element,i) => {
            if(element.type === 'Shoe'){
            shoesJSX.push(<Cardsgrid 
                            title ={element.title} 
                            description={element.description} 
                            price={element.price}
                            id ={element.id} 
                            type={element.type}
                            addToCart={this.props.addToCart}
                            url = {element.url}
                        />)
            }
        });
        return (
            <div className="card-deck animated zoomInDown">
                {shoesJSX}
            </div>
        );
    }
}

