import React, { createContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import HotelPlaces from './Components/HotelPlaces/HotelPlaces';
import HotelBook from './Components/HotelBook/HotelBook';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [place,setPlace] = useState({});
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  return (
    <div className="App justify-content-center">
      <UserContext.Provider value={[place,setPlace,origin, setOrigin,destination, setDestination,loggedInUser, setLoggedInUser]}>
        <Router>
          <Header/>
          {/* <HotelPlaces/> */}
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path='/place/:currentPlace'>
              <HotelBook/>
            </Route>
            <PrivateRoute path='/destination'>
              <HotelPlaces/>
            </PrivateRoute>
            <Route exact path='/'>
              <Main/>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
