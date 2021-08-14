import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import "../../styles/AdminDashboard.css";
// import logo from "../images/logo.png";
import logoNew from "../../images/logoNew.png";

const Nav = styled.div`
  z-index: 10;
  background: #7674df;
  height: 80px;
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavIcon = styled(Link)`
  ${"" /* margin-left: 2rem; */}
  ${"" /* font-size: 2rem; */}
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #4049a0;
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
  // const [sidebar, setSidebar] = useState(false);

  // const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <div className="a-nav-start">
            <img className="a-logo" src={logoNew} />

            <h3 className="a-title">Covid Assist</h3>
            {/* <NavIcon to='#' className='a-nav-icon'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon> */}
            <h3 className="a-navbar-title">Admin</h3>
          </div>
          <div className="a-nav-end">
            <NavIcon to="#" className="a-user-icon">
              <FaIcons.FaUserCircle />
            </NavIcon>
          </div>
        </Nav>
        <SidebarNav>
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
