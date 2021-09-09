import React from 'react'
import Sidebar from "../VaccineSidebar";
// import RequestsTabScreen  from '../SubComponents/Requests/RequestsTabScreen'
import UpcomingbookingsTabScreen from '../SubComponenets/Upcomingbookings/UpcomingbookingsTabScreen'


const Upcomingbookings = () => {
    return (
        <div>
            <Sidebar/>
            <div className="container tab-screen"><UpcomingbookingsTabScreen /></div>

        </div>
    )
}

export default Upcomingbookings