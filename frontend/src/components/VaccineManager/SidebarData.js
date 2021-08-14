import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/vaccine",
    icon: <RiIcons.RiDashboardLine />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,

    // subNav: [
    //   {
    //     title: 'Users',
    //     path: '/overview/users',
    //     icon: <IoIcons.IoIosPaper />
    //   },
    //   {
    //     title: 'Revenue',
    //     path: '/overview/revenue',
    //     icon: <IoIcons.IoIosPaper />
    //   }
    // ]
  },
  {
    title: "Reserved Vaccine List",
    path: "/vaccine/vaccinelist",
    icon: <BiIcons.BiFirstAid />,
  },
  {
    title: "Reports",
    // path: '',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Vaccinated Details",
        path: "/vaccine/reports/vaccinateddetails",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Upcoming Bookings",
    path: "/vaccine/upcoming",
    icon: <FaIcons.FaRegListAlt />,
  },
];
