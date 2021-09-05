import React, { useEffect, useState } from "react";
import "../../../../styles/BoadyTempreture.css";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import mapstyles from "./mapstyles";
function Map() {
  useEffect(() => {
    // fetchData();
  }, []);
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 5.95492, lng: 80.554955 }}
      defaultOptions={{ styles: mapstyles }}
    ></GoogleMap>
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));
const BodyTempreture = () => {
  return (
    <div className="App">
      <div className="boxBoady1">
        {/* <div className="BoxTitle1">
          <h4>Vaccination Areas </h4>
        </div> */}
        <div className="BoxSubTitle1">
          <h4>BoadyTempreture</h4>
        </div>
        <div style={{ width: "72.3vw", height: "95vh" }}>
          <WrappedMap
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?key=AIzaSyCeVMWSLojEXAAhpku0TCAL17bE73veo3o&libraries=places"
            }
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
        </div>
      </div>
    </div>
  );
};

export default BodyTempreture;
