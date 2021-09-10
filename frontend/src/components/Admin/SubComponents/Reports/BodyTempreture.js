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
  const [bodyTempreture, setBodyTempreture] = useState([]);
  const [bodyTempretureCount, setBodyTempretureCount] = useState([]);
  const [tempreture, setTempreture] = useState(null);
  useEffect(() => {
    fetchData();
    fetData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3002/bodytempreture`, {
      method: "GET",
    });
    const result = await response.json();
    console.log(result);
    setBodyTempreture(result);
  };

  const fetData = async () => {
    const response = await fetch(`http://localhost:3002/bodytempreturecount`, {
      method: "GET",
    });
    const results = await response.json();
    console.log(results);
    setBodyTempretureCount(results);
  };
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 5.95492, lng: 80.554955 }}
      // defaultOptions={{ styles: mapstyles }}
    >
      {bodyTempreture.map((tempreture) => (
        <Marker
          key={tempreture.place_id}
          position={{
            lat: Number(tempreture.latitude),
            lng: Number(tempreture.longitude),
          }}
          onClick={() => {
            var arr1 = new Array(tempreture);
            for (let i = 0; i < bodyTempretureCount.length; i++) {
              if (tempreture.place_id == bodyTempretureCount[i].place_id) {
                var arr = bodyTempretureCount[i];
              }
            }
            var arr2 = new Array(arr);
            const mergedArr = { ...arr1[0], ...arr2[0] };
            setTempreture(mergedArr);
          }}
        />
      ))}
      {tempreture && (
        <InfoWindow
          position={{
            lat: Number(tempreture.latitude),
            lng: Number(tempreture.longitude),
          }}
          onCloseClick={() => {
            setTempreture(null);
          }}
        >
          <div>
            <b>
              <h5>
                <b>Tempreture Details</b>
              </h5>
            </b>

            <h6>
              <b>Place :</b>
              {tempreture.place}
            </h6>

            <h6>
              <b>No.of.People with High Temperature :</b>{" "}
              {tempreture.temperature}
            </h6>
            <h6>
              <b>Total No.of.People :</b> {tempreture.count}
            </h6>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
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
