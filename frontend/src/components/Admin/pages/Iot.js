import React from 'react'
import Sidebar from "../AdminSidebar";
import IotTabScreen from  '../SubComponents/IotTabScreen'


const Iot = () => {
    return (
        <div>
            <div>
                <Sidebar/>
            </div>    
            <div className='container tab-screen'>
                <IotTabScreen/>
            </div>
        </div>
    )
}

export default Iot
