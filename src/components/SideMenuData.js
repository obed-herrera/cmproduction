import React from 'react'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';

export const SideMenuData = [
    {
        title: 'Inicio',
        path: '/home',
        icon: <HomeWorkIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Clientes',
        path: '/client',
        icon: <AssignmentIndIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Préstamos',
        path: '/loan',
        icon: <AttachMoneyIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Empleados',
        path: '/Employee',
        icon: <SupervisedUserCircleIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Reportes',
        path: '/Reports',
        icon: <AssessmentIcon />,
        cName: 'nav-text'
    },
    {
        title: 'Configuración',
        path: '/Configuration',
        icon: <SettingsIcon />,
        cName: 'nav-text'
    },
]