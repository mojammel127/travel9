import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../../App';
import DatePick from '../DatePicker/DatePick';
import './BookForm.css';
const BookForm = ({placeName}) => {
    const [place,setPlace,origin, setOrigin,destination, setDestination]=useContext(UserContext);
    // const [isValidField, setValidField] = useState(false);
    const handleBlur = (e) =>{
        // console.log(e.target.name,":",e.target.value);
        const value = e.target.value;
        const name = e.target.name;
        if(name === 'submit'){
            return;
        }
        if(name === 'origin' && value){
            setOrigin(value)
        }else if(name === 'destination' && value){
            setDestination(value);
        }
    }
    // console.log(origin, 'and', destination)
    const re = /^([^0-9]*)$/;
    let isValidField=false;
    if(origin && destination){
        isValidField = re.test(origin) && re.test(destination);
    }
    const path = isValidField ? `/destination` : `/place/${placeName}`;
    // console.log(path)
    return (
        <form>
            <label htmlFor="origin">Origin</label>
            <input name='origin' onBlur={handleBlur} className='form-control' type="text" placeholder='write your place' required/>
            <br/>
            <label htmlFor="Destination">Destination</label>
            <input name='destination' onBlur={handleBlur} className="form-control" type="text" placeholder='write your destination' required/>
            <br/>
            <div className="stay-duration">
                <div className="from">
                    <label htmlFor="from">From</label>
                    <DatePick className='date-1'/>
                </div>
                <div className="to">
                    <label htmlFor="to">To</label>
                    <DatePick className='date-2'/>
                </div>
            </div>
            <Link to={path}><input name="submit" className="btn btn-warning create-btn" type="submit" value="Start Booking"/></Link>
        </form>
    );
};

export default BookForm;