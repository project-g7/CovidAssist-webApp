import React from 'react'
import Sidebar from "../VaccineSidebar";
// import RequestsTabScreen  from '../SubComponents/Requests/RequestsTabScreen'
import ReservedVaccineListTabScreen from '../SubComponenets/ReservedVaccineList/ReservedVaccineListTabScreen'


const ReservedVaccineList = () => {
    return (
        <div>
            <Sidebar/>
            <div className="container tab-screen"><ReservedVaccineListTabScreen /></div>

        </div>
    )
}

export default ReservedVaccineList
