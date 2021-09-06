import React, { useEffect, useState } from "react";
import "../../../../styles/VaccinationAreas.css";
import mapstyles from "./mapstyles";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

function Map() {
  const [mapset, setMap] = useState([]);
  const [selectedCenter, setselectedCenter] = useState(null);
  const [totalVaccinated, setTotalVaccinated] = useState(0);
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    fetchData();
    fetcData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3002/mapMarkerCenters`, {
      method: "GET",
    });
    const result = await response.json();
    console.log(result);
    setMap(result);
  };
  const fetcData = async () => {
    const response = await fetch(`http://localhost:3002/TotalVaccinated`, {
      method: "GET",
    });
    const results = await response.json();
    console.log(results);
    setTotalVaccinated(results);
  };
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 5.95492, lng: 80.554955 }}
      defaultOptions={{ styles: mapstyles }}
    >
      {mapset.map((centers) => (
        <Marker
          key={centers.center_id}
          position={{
            lat: Number(centers.latitude),
            lng: Number(centers.longitude),
          }}
          onClick={() => {
            // setselectedCenter(centers);
            setBooking(centers, totalVaccinated);
          }}
          // icon={{
          //   url: "../../../../images/outline_maps_home_work_black_24dp.PNG",
          //   // scaledSize: new window.google.maps.Size(25, 25),
          // }}
        />
      ))}
      {booking && (
        <InfoWindow
          position={{
            lat: Number(booking.latitude),
            lng: Number(booking.longitude),
          }}
          onCloseClick={() => {
            // setselectedCenter(null);
            setBooking(null);
          }}
        >
          <div>
            <b>
              <h5>Ceneter Details</h5>
            </b>

            <h6>
              <b>CenterName :</b> {booking.name}
            </h6>

            <h6>
              <b>VaccineName : </b>
              {booking.vaccine_name}
            </h6>

            <h6>
              <b>StartDate :</b> {booking.start_date}
            </h6>

            <h6>
              <b>EndDate : </b>
              {booking.end_date}
            </h6>

            <h6>
              <b>Total Bookings : {booking.total}</b>
            </h6>

            <h6>
              <b>Total Vaccinations : {booking.TotalVaccinated}</b>
            </h6>

            <h6>
              <b>Pending Vaccinations : </b>
            </h6>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
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
