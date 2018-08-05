import React from 'react';
import Cardsgrid from './Cardsgrid';


export default class Suns extends React.Component {
    render() {
        let sunsJSX = [];
        let copysuns = Array.from(this.props.shop);
        copysuns.map((element,i) => {
            if(element.type === 'sun'){
            sunsJSX.push(<Cardsgrid 
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
            {sunsJSX}
        </div>
        );
    }
}
