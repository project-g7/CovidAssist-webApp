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
  const [facemask, setFacemask] = useState([]);
  const [notfacemask, setNotFacemask] = useState([]);
  const [selecteFacemMask, setselecteFacemMask] = useState(null);
  useEffect(() => {
    fetchData();
    fethData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3002/facemasks`, {
      method: "GET",
    });
    const result = await response.json();
    console.log(result);
    setFacemask(result);
  };

  const fethData = async () => {
    const response = await fetch(`http://localhost:3002/notfacemasks`, {
      method: "GET",
    });
    const results = await response.json();
    console.log(results);
    setNotFacemask(results);
  };

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 5.95492, lng: 80.554955 }}
      // defaultOptions={{ styles: mapstyles }}
    >
      {facemask.map((masks) => (
        <Marker
          key={masks.place_id}
          position={{
            lat: Number(masks.latitude),
            lng: Number(masks.longitude),
          }}
          onClick={() => {
            var arr1 = new Array(masks);
            for (let i = 0; i < notfacemask.length; i++) {
              if (masks.place_id == notfacemask[i].place_id) {
                var arr = notfacemask[i];
              }
            }
            var arr2 = new Array(arr);

            const mergedArr = { ...arr1[0], ...arr2[0] };
            console.log(mergedArr);
            setselecteFacemMask(mergedArr);
            // setselecteFacemMask(masks);
          }}
        />
      ))}
      {selecteFacemMask && (
        <InfoWindow
          position={{
            lat: Number(selecteFacemMask.latitude),
            lng: Number(selecteFacemMask.longitude),
          }}
          onCloseClick={() => {
            setselecteFacemMask(null);
          }}
        >
          <div>
            <b>
              <h5>FaceMasks Details</h5>
            </b>

            <h6>
              <b>Place :</b> {selecteFacemMask.place}
            </h6>

            <h6>
              <b>Total No.of.Entrance People : </b>
              {Number(selecteFacemMask.facemask)}
            </h6>

            <h6>
              <b>No.of.People Not Wearing Mask Properly : </b>
              {
                (selecteFacemMask.Notmask =
                  Number(selecteFacemMask.Notmask) || 0)
              }
            </h6>

            <h6>
              <b>No.of.People Wearing Mask Properly : </b>
              {selecteFacemMask.facemask - Number(selecteFacemMask.Notmask)}
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
