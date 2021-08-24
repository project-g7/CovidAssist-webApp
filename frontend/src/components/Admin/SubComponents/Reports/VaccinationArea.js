import React from "react";
import "../../../../styles/VaccinationAreas.css";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 5.95492, lng: 80.554955 }}
    />
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));

const VaccinationArea = () => {
  return (
    <div className="App">
      <div className="boxBoady">
        <div className="BoxTitle">
          <h4>Vaccination Areas </h4>
        </div>
        <div className="BoxSubTitle">
          <h4>Vaccination Areas</h4>
        </div>
        <div style={{ width: "75vw", height: "100vh" }}>
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

export default VaccinationArea;
