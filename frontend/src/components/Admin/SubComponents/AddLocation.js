import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
// import { Marker } from "react-google-maps";
Geocode.setApiKey("AIzaSyCeVMWSLojEXAAhpku0TCAL17bE73veo3o");
Geocode.enableDebug();

// class AddLocation extends Component {

//   render() {
//     return (
//       <div>
//         <Map
//           google={this.props.google}
//           center={{ lat: parseFloat(this.props.lat) , lng: parseFloat(this.props.lng) }}
//           height="450px"
//           zoom={15}
//         />
//       </div>
//     );
//   }
// }

class Map extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      address: "",
      city: "",
      area: "",
      state: "",
      mapPosition: {
        lat: 6.9022108,
        lng: 79.8589642,
      },
      markerPosition: {
        lat: 6.9022108,
        lng: 79.8589642,
      },
    };
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(this.props.lat);
    if (this.state.markerPosition.lat !== 6.9022108) {
      return true;
    } else if (6.9022108 === nextProps.lat) {
      return false;
    }
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = (event) => {};

  onMarkerDragEnd = (event) => {
    console.log("event", event);
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng(),
      addressArray = [];
      this.props.updateLocation(newLat,newLng);
      // this.setState({lat: newLat, lng: newLng});
      console.log(newLat,newLng);
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components;
        
      },
      (error) => {
        console.error(error);
      }
    );
  };
  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={15}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />
          <Marker />
        </GoogleMap>
      ))
    );
    let map;
    if (6.9022108 !== undefined) {
      map = (
        <div>
          <div></div>

          <AsyncMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeVMWSLojEXAAhpku0TCAL17bE73veo3o&libraries=places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: '550px', width: '450px'}} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: "450px" }} />;
    }
    return map;
  }
}

export default Map;
