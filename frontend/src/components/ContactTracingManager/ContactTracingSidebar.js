import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import * as FiIcons from "react-icons/fi";
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import '../../styles/ContactDashboard.css'
// import logo from "../images/logo.png";
import logoNew from "../../images/logoNew.png";


const Nav = styled.div`
  background: #7674DF;
  height: 80px;
  width: 100%;
  position:fixed;
  display: flex;
  justify-content: space-between;
  align-items: center; 
`;

const NavIcon = styled(Link)`
  ${'' /* margin-left: 2rem; */}
  ${'' /* font-size: 2rem; */}
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #4049A0;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 80px;
  left: 0;
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <div className='c-nav-start'>
          <img className="c-logo" src={logoNew} />

            <h3 className='c-title'>Covid Assist</h3>
            <h3 className='c-navbar-title'>Contact Tracing Manager</h3>
          </div>
          <div className='c-nav-end'>

           <div className="user-icon">
              <div className="drop-icon">
                <FaIcons.FaUserCircle />
              </div>

              <div className="menu">
                <Link to="/ct/profile" className="profile-text">
                <FaIcons.FaUserCircle style={{color:'balck'}} />
                  My Profile
                  <br />
                </Link>
                <Link to="/" className="profile-text">
                <FiIcons.FiLogOut style={{color:'balck'}} /> 
                  Log Out
                </Link>
              </div>
            </div>
          </div>

        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            {/* <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon> */}
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
