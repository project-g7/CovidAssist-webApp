import React from 'react'
import Sidebar from "../AdminSidebar";
// import RequestsTabScreen  from '../SubComponents/Requests/RequestsTabScreen'
import RequestsTabScreen from '../SubComponents/Requests/RequestsTabScreen'


const Requests = () => {
    return (
        <div>
            <Sidebar/>
            <div className="container tab-screen"><RequestsTabScreen /></div>

        </div>
    )
}

export default Requests
