import React from 'react'
import Sidebar from './VaccineSidebar';
import Dashboard from "./pages/Dashboard.js";


const WelcomeVaccine = () => {
    return (
        <div className='d-full'>
        <div className='d-bar'>
          <Sidebar />
        </div>
          <Dashboard/>
          {/* <Switch component={App}>
          <Route exact path="/admin" component={Dashboard}></Route>
          <Route exact path="/admin/vaccinemanage" component={AdminVaccineManage}></Route>
          <Route exact path="/admin/requests" component={Requests}></Route>
          <Route exact path="/admin/iot" component={Iot}></Route>
          </Switch> */}
            
        {/* </div> */}
      </div>
    )
}

export default WelcomeVaccine
