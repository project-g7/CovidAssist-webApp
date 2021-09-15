import React from "react";
import ProfileTabScreen from '../Profile/ProfileTabScreen'
import Sidebar from "../VaccineSidebar";


const Profile = () => {
  return (
    <div>
      <div>
        <Sidebar />
        <div className="container tab-screen">
          <ProfileTabScreen />
        </div>
      </div>
    </div>
  );
};

export default Profile;
