import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const heatmapData = {    
    positions: [
      {                lat: 1.3521,
        lng: 103.8198},
      {lat: 34.7, lng: 28.4}
    ],
    options: {   
      radius: 20,   
      opacity: 0.6
  }
}
export default class SimpleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 1.3521,
                lng: 103.8198
            },
            zoom: 11.5
        };
    }

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCi_Io_PnIis5JMPqHK-miIR5BZnqtxMMI' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    heatmapLibrary={true}
                    heatmap={heatmapData}
                >
                    <AnyReactComponent
                        lat={this.state.center.lat}
                        lng={this.state.center.lng}
                        text="Center of Singapore"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}