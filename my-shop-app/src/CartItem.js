import React from 'react';
import './styles/Cartitem.css';


export default class CartItem extends React.Component {
    render() {
        
        return (
                <li className="media mt-3">
                    <img className="mr-3 align-self-center img-size" src={this.props.data.url} alt='Product pic missing'/>
                    <div className="media-body mt-3">
                        <h4 className="mt-0 mb-1">{this.props.data.title}</h4>
                        <h5>price :{this.props.data.price}</h5>
                    </div>
                </li>
        );
    }
}