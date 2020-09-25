import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [place,setPlace,origin, setOrigin,destination, setDestination,loggedInUser] = useContext(UserContext);
    const {name} = loggedInUser;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                name ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
        />
    );
};

export default PrivateRoute;