import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import * as GoIcons from "react-icons/go";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/admin",
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
    title: "Vaccine Manage",
    path: "/admin/vaccinemanage",
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
        title: "Vaccine Booking",
        path: "/admin/reports/vaccinebooking",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Vaccination Areas",
        path: "/admin/reports/vaccinationareas",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Health Measures",
        path: "/admin/reports/healthmeasures",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Users",
    path: "/admin/requests",
    icon: <FaIcons.FaUserCheck />,
  },
  {
    title: "IoT Devices",
    path: "/admin/iot",
    icon: <GoIcons.GoCircuitBoard />,
  },
];
