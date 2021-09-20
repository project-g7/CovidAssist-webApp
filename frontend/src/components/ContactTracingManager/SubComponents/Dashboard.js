import React from 'react'
import Sidebar from "../ContactTracingSidebar";
import ContactTable from './ContactTable';
import FileReader from "./FileReader";


const Dashboard = () => {
    return (
        <div>
            <div>
                <Sidebar/>
            </div>
            <div></div>
            <div >
                <FileReader/>
            </div>
        </div>
    )
}


export default Dashboard;