import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  list-style: none;
  height: 80px;
  text-decoration: none;
  font-size: 18px;
  color: #fff;

  &:hover {
    color: #fff;
    background: #00126B;
    border-left: 4px solid #000935;
    cursor: pointer;
    text-decoration: none;

  }

  &:focus{
    text-decoration: none;
    color: #fff;
  }

`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #4049A0;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    color: #fff;
    background: #00126B;
    cursor: pointer;
    text-decoration: none;
  }

    &:focus{
    text-decoration: none;
    color: #fff;
  }

  
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const getItem = (e) => {
    console.log(e);
    // e.target.classList.add("change-background");
  }

  return (
    <>
      <SidebarLink to={item.path} onClick={(item.subNav && showSubnav) || getItem} >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
