import React from 'react';
import './HotelBook.css'
import coxBazar from '../../Image/cox-bazar.png';
import sajek from '../../Image/Sajek.png';
import sreemongal from '../../Image/Sreemongol.png';
import sundorban from '../../Image/sundorbon.png';
import { useParams } from 'react-router-dom';
import places from '../../FakeData/fakePlaces';
import BookForm from '../BookForm/BookForm';
let placeImg;
const HotelBook = () => {
    const currentPlace = useParams();
    const placeName = currentPlace.currentPlace;
    let bgStyle;
    let key;
    if(placeName === "cox-bazar"){
        key=1;
        placeImg = coxBazar;
        bgStyle = {
            backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7) ), url(${placeImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            // backgroundPositionY: '-250px',
            minHeight: '100vh'
        }
    }else if(placeName === "sreemongal"){
        key=2;
        placeImg = sreemongal;
        bgStyle = {
            backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${placeImg})`,
            backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            backgroundPositionY: '-150px',
            minHeight: '100vh'
        }
    }else if(placeName === "sondorban"){
        key=3;
        placeImg = sundorban;
        bgStyle = {
            backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${placeImg})`,
            backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            backgroundPositionY: '-130px',
            minHeight: '100vh'
        }
    }else{
        key=4;
        placeImg = sajek;
        bgStyle = {
            backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${placeImg})`,
            backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            backgroundPositionY: '-80px',
            minHeight: '100vh'
        }
    }
    // bgStyle.display = 'flex';
    // bgStyle.justifyContent = 'space-evenly';
    const place = places.find(p => p.key === key);
    return (
        <div style={bgStyle} className="booking">
            <div className="text-light text-justify des">
                <br/><br/><h1>{place.name}</h1>
                <p><small>{place.description}</small></p>
            </div>
            <div className="text-justify jumbotron form text-dark">
                <BookForm placeName={placeName}></BookForm>
            </div>
        </div>
    );
};

export default HotelBook;