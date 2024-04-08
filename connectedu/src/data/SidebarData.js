import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import BarChartIcon from '@mui/icons-material/BarChart';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export const SidebarData =[
    {
        title: "ProfilePage",
        icon: <HomeIcon />,
        link: "/profilePage"
    },
    {
        title: "Dashboard",
        icon: <MailIcon />,
        link: "/dashboard"
    },
    {
        title: "Notification",
        icon: <BarChartIcon />,
        link: "/notification"
    },
    {
        title: "Course",
        icon: <SpaceDashboardIcon />,
        link: "/course"
    },
    {
        title: "Invoices",
        icon: <AccountTreeIcon />,
        link: "/invoices"
    }
]