import React, { useContext } from 'react';
import coxBazar from '../../Image/cox-bazar.png';
import sajek from '../../Image/Sajek.png';
import sreemongal from '../../Image/Sreemongol.png';
import sundorban from '../../Image/sundorbon.png';
import { Carousel } from 'react-bootstrap';
import { UserContext } from '../../App';
import fakePlaces from '../../FakeData/fakePlaces';
import { Link } from 'react-router-dom';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
// import { TrendingFlat } from '@material-ui/icons';
const bgStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${coxBazar})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // backgroundPositionY: '-250px',
    minHeight: '100vh'
}

const Main = () => {
    const places = fakePlaces;
    const [place, setPlace] = useContext(UserContext);
    if(place){
        console.log();
    }
    const handlePlace = (key) =>{
        const curPlace = places.find(p => p.key===key);
        setPlace(curPlace);
    }
    return (
        <div style={bgStyle}>
            <Carousel className="carousel">
                <Carousel.Item interval={3000}>
                <div className="item">
                    <div className="caption">
                        <h1>COX'S BAZAR</h1>
                        <p className='text'><small>Cox's Bazar is a town on the southeast coast of Bangladesh. It's known for its very long sandy beachfront, stretching from Sea Beach in the north to Kolatoli Beach in the south AggamedaKhyang manuscript. South of town the tropical rainforest of Himchari National Park has waterfalls and many birds. North sea turthles bread on nearby Sanaida Island</small></p>
                        <Link onClick={() => handlePlace(1)} to={`/place/cox-bazar`}>
                            <button className='btn btn-warning'>Booking <ArrowRightAltRoundedIcon/></button>
                        </Link>
                    </div>
                    <div className="carousel-img">
                        <Link onClick={() => handlePlace(1)} to={`/place/cox-bazar`}>
                            <img className="img" src={coxBazar} alt="First slide"/>
                        </Link>
                    </div>
                </div>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                <div className="item">
                    <div className="caption">
                        <h1>Sreemongol</h1>
                        <p className='text'><small>It is said the name Sreemangal (or Srimangal) is named after Sri Das and Mangal Das; two brothers who settled on the banks of the Hail Haor. A copper plate of Raja Marundanath from the 11th century was found in Kalapur. During an excavation at Lamua, an ancient statue of Ananta Narayan was dug out. In 1454, the Nirmai Shiva Bari was built and still stands today...</small></p>
                        <Link to={`/place/sreemongal`}>
                            <button onClick={() => handlePlace(2)} className='btn btn-warning'>Booking <ArrowRightAltRoundedIcon/></button>
                        </Link>
                    </div>
                    <div className="carousel-img">
                    <Link to={`/place/sreemongal`}>
                        <img onClick={() => handlePlace(2)} className="img" src={sreemongal} alt=""/>
                    </Link>
                    </div>
                </div> 
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                <div className="item">
                    <div className="caption">
                        <h1>Sondorbon</h1>
                        <p className='text'><small>The Sundarbans is a mangrove area in the delta formed by the confluence of the Ganges, Brahmaputra and Meghna Rivers in the Bay of Bengal. It spans from the Hooghly River in India's state of West Bengal to the Baleswar River in Bangladesh. It comprises closed and open mangrove forests, agriculturally used land, mudflats and barren land, and is intersected by multiple tidal...</small></p>
                        <Link to={`/place/sondorban`}>
                            <button onClick={() => handlePlace(3)} className='btn btn-warning'>Booking <ArrowRightAltRoundedIcon/></button>
                        </Link>
                    </div>
                    <div className="carousel-img">
                    <Link to={`/place/sondorban`}>
                        <img onClick={() => handlePlace(3)} className="img" src={sundorban} alt=""/>
                    </Link>
                    </div>
                </div>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                <div className="item">
                    <div className="caption">
                        <h1>Sajek</h1>
                        <p className='text'><small>Sajek is a union located in the north of Chittagong Hill Tracts. It's under Baghaichori Upazila in Rangamati hill district, it is situated 67 kilometres (42 mi) north-east from Khagrachhari town and 95 kilometres (59 mi) north from Rangamati city.Sajek valley is known for its natural environment and is surrounded by mountains, dense forest, and grassland hill tracks...</small></p>
                        <Link to={`/place/sajek`}>
                            <button onClick={() => handlePlace(4)} className='btn btn-warning'>Booking <ArrowRightAltRoundedIcon/></button>
                        </Link>
                    </div>
                    <div className="carousel-img">
                    <Link to={`/place/sajek`}>
                        <img onClick={() => handlePlace(4)} className="img" src={sajek} alt=""/>
                    <Link></Link></Link>
                    </div>
                </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Main;