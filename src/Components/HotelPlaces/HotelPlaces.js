import React, { useContext, useEffect, useState } from 'react';
import sorry from './sorry1.gif';
import './HotelPlaces.css';
import { UserContext } from '../../App';
import fakeData from '../../FakeData/fakeData';
import HotelDetails from '../HotelDetails/HotelDetails';
import Maps from '../Maps/Maps';

const HotelPlaces = () => {
    const [place,setPlace,origin, setOrigin,destination, setDestination,loggedInUser] = useContext(UserContext);

    const [currentPlace, setCurrentPlace] = useState({});
    const [hotels, setHotels] = useState([]);
    useEffect(()=>{
        setCurrentPlace(place);
        setHotels(fakeData[place.key]);
        // setPlace({});
    },[])
    
    const random = Math.floor(Math.random()*103);
    const date = new Date();
    return (
        <>
            {
                !hotels &&<div className="text-center for-select-place">
                    <h1 className='text-center text-warning'>Sorry <span className='text-danger'>{loggedInUser.name}!!!</span> you didn't select your favorite place.</h1>
                    <h4 className='text-center text-info'>Please select your place and enjoy your journey.</h4>
                    <img src={sorry} alt=""/>
                </div>
            }
            <div className='row detail-page'>

                <div className="col-md-8">
                    {
                        hotels && <>
                            <p className='text-left guests'><small>{random} guests staying from {date.toLocaleDateString()}</small></p>
                            <h3 style={{marginLeft: '25px'}} className="text-left">Stay in {currentPlace.name}</h3>
                        </>
                    }
                    {
                        hotels && hotels.map(hotel => <HotelDetails key={hotel.id} hotel={hotel}/>)
                    }
                </div>
                <div className="col-md-4">
                    {
                        hotels && <Maps/>
                    }
                </div>
            </div>
        </>
    );
};

export default HotelPlaces;