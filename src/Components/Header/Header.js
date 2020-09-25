import React, { useContext } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import facebook from '../../Icon/fb.png';
import google from '../../Icon/google.png';
import logo from '../../Logo.png';
import { FormControl, Nav, Navbar,Card, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
    const [place,setPlace,origin, setOrigin,destination, setDestination,loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {signedIn,name} = loggedInUser;
    // console.log(loggedInUser);
    return (
        <div className='bg-light'>
            <Navbar className='' collapseOnSelect expand="lg" bg="light" variant="light">
            <Link className='logo-link' to='/'>
                <Card.Img src={logo} className='logo-img'></Card.Img>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Form inline>
                            <InputGroup className='search-form'>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl placeholder="Search Your Destination..." aria-label="search" aria-describedby="basic-addon1"/>
                            </InputGroup>
                        </Form>
                    </Nav>
                    <Nav className="Link">
                        <Link className='link' to='/'>Home</Link>
                        <Link className='link' to='/destination'>Destination</Link>
                        <Link className='link' to='/blog'>Blog</Link>
                        <Link className='link' to='/contact'>Contact</Link>
                        {
                            name
                            ? <>
                                <div className="name">
                                    <img className='signedIn-img' src={ signedIn==='facebook'? facebook : google } alt=""/>
                                    <p>{name}</p>
                                </div>
                                <Link onClick={() => setLoggedInUser({})} to='/' className='btn btn-outline-info sign-out'>Sign Out</Link>
                            </>
                            : <Link className='button btn-link' to="/login"><button  className='btn btn-warning'>Log in</button></Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;