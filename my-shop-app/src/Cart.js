import React from 'react';
import './styles/Cart.css';
import Cartitem from './CartItem'


export default class Cart extends React.Component {
    render() {
            // checking the toggleclass value in state of Shop component
            // to do the animation on the cart button
        let addToCartClass= this.props.toggelClass ? 'animated shake' : '';
           //adding items to cart by maping through the entire array
        let cartjsx = this.props.data.map((element, i)=>{
           return(<Cartitem data={element}/>)
        })
          // using reduce to calculate total pricein cart and using tofixed() 
          // to get only 2 decimal points
        let cardTotal = Number(this.props.data.reduce((accumulator,currrentvalue)=>
            accumulator + currrentvalue.price, 0)).toFixed(2);
            
        return (
            <div>
                <button type="button" className={"btn btn-dark nav-fonts " + addToCartClass} data-toggle="modal" data-target="#exampleModalCenter">
                View Cart  
                <span className="badge badge-light ml-4">{this.props.data.length}</span>
                </button>

                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="exampleModalLongTitle">Cart Items</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body scrollbox container">
                    <ul className="list-unstyled">
                        {cartjsx}  {/*passing the JSX in to theelemet */}
                    </ul>
                    </div>
                    <div className="modal-footer">
                        <h3 className= "mr-5">Total Price :    ₿ {cardTotal}</h3>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
