import React from 'react'
import Sidebar from "../ContactTracingSidebar";
// import ContactTable from './ContactTable';
// import FileReader from "./FileReader";
import ContactTracingChart from "../SubComponents/ContactTracingChart";


const Dashboard = () => {
    return (
        <div>
            <div>
                <Sidebar/>
            </div>
            <div></div>
            <div >
                {/* <FileReader/> */}
                <ContactTracingChart />

            </div>
        </div>
    )
}


export default Dashboard;