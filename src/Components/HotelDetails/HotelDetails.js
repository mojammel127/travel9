import React from 'react';
import './HotelDetails.css';
import stars from '../../Icon/star_1_.png';
const HotelDetails = ({hotel}) => {
    const {name, img, description,star,price} = hotel;
    let days = Math.floor(Math.random()*17);
    if(days<1){
        days=3;
    }
    return (
        <div className="hotel-details">
            <div className="hotel-img">
                <img src={img} alt=""></img>
            </div>
            <div className="hotel-descriptions">
                <h6>{name}</h6>
                <p><small>{description}</small></p>
                <div className="star-price">
                    <div className="stars">
                        <img className="star" src={stars} alt=""/>
                        <small> {star} ({Math.floor(Math.random() *103)})</small>
                    </div>
                    <div className="price">
                        <p><small>${price}/night</small></p>
                    </div>
                    <div className="total text-info">
                        <p><small>${price*days}/total</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;