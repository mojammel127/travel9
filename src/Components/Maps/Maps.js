import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { Component } from 'react';

class Maps extends Component {
    render() {
        return (
            <>
                <Map google={this.props.google} zoom={10}>
 
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
                </Map>
            </>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCkm6XqW3MGZE3ZTNHZ-R-fPfhMR4BM98o')
})(Maps)