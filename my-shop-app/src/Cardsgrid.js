import React from 'react';

export default class Cardsgrid extends React.Component {
    render() {
        return (
            <div className= "col-12 col-md-6 col-lg-4 mt-3">
            <div className="card">
                <img className="card-img-top img-sz" src={this.props.url} alt="Product"/>
                    <div className="card-body dark">
                        <h4 className="card-title">{this.props.title}</h4>
                        <h6 className="card-text mb-3">{this.props.description}</h6>
                        <h5 className="card-text d-inline float-left"><strong>₿</strong> {this.props.price}</h5>
                        <button onClick={()=>{this.props.addToCart(this.props.id, this.props.type)}} className="btn light-bt float-right">Add To Cart</button>
                    </div>
                </div>
            </div>
        );
    }
}
