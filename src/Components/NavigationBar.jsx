import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { auth } from "../Firebase/firebaseConfig"
import { signOut } from 'firebase/auth';

import { AppBar, Box, Toolbar, ListItemIcon, IconButton, Typography, Container, Avatar, Button, Tooltip, Drawer, List, Divider, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AddchartIcon from '@mui/icons-material/Addchart';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import image from "../Assets/niwe.png"
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';


const Header = ({ currUser }, props) => {
    let navigate = useNavigate();
    const signOutFunction = async () => { 
        try {
            signOut(auth) // Sign out the user
            console.log('Signed Out Successfully !'); 
            navigate("/") // Redirect to the home page
        } catch (error) { 
            console.error(error); // This will print any error that occurred while signing out
        }
    }

    const [navbar, setNavbar] = useState({  
        'left': false, 
        'right': false, 
    })

    const toggleDrawer = (anchor, open) => (event) => {  
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { 
            return;
        }

        setNavbar({ ...navbar, [anchor]: open }); // Set the navbar state
    };

    const list = (anchor) => ( 
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} 
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {
                anchor === 'left' ?
                    <>

                        <List>
                            <ListItem button onClick={() => navigate("/")}>
                                <ListItemIcon> 
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                            <ListItem button onClick={() => navigate("/contactus")}>
                                <ListItemIcon>
                                    <PermContactCalendarIcon />
                                </ListItemIcon>
                                <ListItemText primary="Contact Us" />
                            </ListItem>
                            <ListItem button onClick={() => navigate("/userdashboard")}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="User Dashboard" />
                            </ListItem>
                            <ListItem button onClick={() => navigate("/admindashboard")}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Admin Dashboard" />
                            </ListItem>
                        </List>

                    </> :
                    <>

                        <List>
                            <ListItem button onClick={() => navigate("/profile")}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem button onClick={() => navigate("/studentDashboard")}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={signOutFunction}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </>
            }
        </Box>
    );
    return (
        <>


            <HideOnScroll {...props}>

                <Box>
                    <AppBar position="static" sx={{ background: "white", color: "black" }}>

                        <Container maxWidth="xl" >
                            <Toolbar disableGutters sx={{ paddingY: 2 }}>

                                <img src={image} alt="empowerlogo" style={{ height: "100px", padding: "10px" }} />
                                <Box sx={{ display: "flex", flexFlow: "column", cursor: "pointer" }} onClick={() => window.open("", '_blank')}>
                                    <Typography
                                        variant="h6"
                                        component="h6"
                                        sx={{ flexGrow: 1, display: { xs: 'none', md: "flex" } }}
                                    >
                                       NIWE
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{ textAlign: { xs: "start", md: "center" }, display: { xs: "block", md: "none" } }}
                                        component="h6"
                                    >
                                        NIWE
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ textAlign: { xs: "start", md: "center" } }}
                                        component="p"
                                    >
                                        National Institute of Wind Energy
                                    </Typography>

                                    <Typography variant="h5" component="h5" sx={{ display: { xs: "block", md: "none" }, fontWeight: "bolder", color: "#008336" }}>
                                    PROJECT MANAGEMENT SYSTEM
                                    </Typography>
                                </Box>
                                <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: { xs: "center", md: "start" }, marginLeft: { xs: 0, md: 2 }, alignItems: "center", borderLeft: "2px solid grey" }}>
                                    <Typography variant="h4" component="h4" sx={{ fontWeight: "bolder", padding: 2, color: "#008336" }}>
                                        PROJECT MANAGEMENT SYSTEM
                                    </Typography>

                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    <AppBar position="sticky" sx={{ background: "#008336" }}>

                        <Container maxWidth="xl" >
                            <Toolbar disableGutters>
                                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                        size="large" // small is equivalent to the dense button styling
                                        aria-label="account of current user" 
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={toggleDrawer('left', true)}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Box>

                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'flex', alignItems: "center" }}
                                        onClick={() => navigate("/")}
                                    >
                                        <HomeIcon sx={{ marginRight: 1 }} />
                                        Home
                                    </Button>
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'flex', alignItems: "center" }}
                                        onClick={() => navigate("/addproject")}
                                    >
                                        <AddchartIcon sx={{ marginRight: 1 }} />
                                        Add Project
                                    </Button>
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'flex', alignItems: "center" }}
                                        onClick={() => navigate("/studentdashboard")}
                                    >
                                        <DashboardIcon sx={{ marginRight: 1 }} />
                                        Dashboard
                                    </Button>
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'flex', alignItems: "center" }}
                                        onClick={() => navigate("/contactus")}
                                    >
                                        <PermContactCalendarIcon sx={{ marginRight: 1 }} />
                                        Contact Us
                                    </Button>
                                </Box>


                                <Box sx={{ flexGrow: 0 }}>
                                    {
                                        currUser ?
                                            <>
                                                <Tooltip title="Open settings">
                                                    <IconButton onClick={toggleDrawer('right', true)} sx={{ p: 0 }}>
                                                        <Avatar alt={currUser.displayName} src={currUser.photoURL} />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                            :
                                            <>
                                                <Button
                                                    // variant="outlined"
                                                    color="inherit"
                                                    onClick={() => navigate("/login")}
                                                    startIcon={<LoginIcon />}
                                                >Sign In</Button>
                                            </>
                                    }
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>
                </Box>
            </HideOnScroll>

            {/* left drawer */}
            <Drawer
                anchor={'left'}
                open={navbar['left']}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
            {/* right drawer */}
            <Drawer
                anchor={'right'}
                open={navbar['right']}
                onClose={toggleDrawer('right', false)}
            >
                {list('right')}
            </Drawer>
        </>

    );
};
export default Header;



function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};