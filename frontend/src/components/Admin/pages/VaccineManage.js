import React from 'react'
import Sidebar from "../AdminSidebar";
import TabScreen from '../SubComponents/VaccineManage/TabScreen'


const VaccineManage = () => {
    return (
        <div>
            <div>
                <Sidebar/>
            </div>
            <div className='container tab-screen'>
                <TabScreen/>
            </div>
        </div>
    )
}

export default VaccineManage
