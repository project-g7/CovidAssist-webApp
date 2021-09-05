import React from 'react'
import Sidebar from "../AdminSidebar";
// import RequestsTabScreen  from '../SubComponents/Requests/RequestsTabScreen'
import ProfileTabScreen from '../SubComponents/Profile/ProfileTabScreen'


const Profile = () => {
    return (
        <div>
            <Sidebar/>
            <div className="container tab-screen"><ProfileTabScreen/></div>

        </div>
    )
}

export default Profile
