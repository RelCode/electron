// Navbar.js
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Root = styled('div')`
  flex-grow: 1;
  height: 48px !important;
`;

const TBar = styled(Toolbar)`
    min-height: 48px !important;
`;

const MenuButton = styled(IconButton)`
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

const Title = styled(Typography)`
  flex-grow: 1;
`;

const NavButton = styled(Button)`
  margin-left: ${({ theme }) => theme.spacing(2)};
`;

const Navbar = ({ cookies, removeCookie }) => {
    let userData = null;
    if (cookies?.sessionToken) {
        userData = jwtDecode(cookies.sessionToken);
    }
    const [username] = useState(userData === null ? 'Cashier' : `${userData.firstName} ${userData.lastName}` );
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleLogout = () => {
        removeCookie('sessionToken')
    }

    return (
        <Root>
            <AppBar position="static">
                <TBar>
                    {/* <MenuButton edge="start" color="inherit" aria-label="menu" theme={theme}>
                        <MenuIcon />
                    </MenuButton> */}
                    <Title variant="h6" theme={theme}>
                        {username}
                    </Title>
                    {!isMobile && (
                        <>
                            <NavButton 
                                color="inherit" 
                                theme={theme}
                                href='/'
                            >Home</NavButton>
                            <NavButton 
                                color="inherit" 
                                theme={theme}
                                onClick={handleLogout}
                            >Logout</NavButton>
                        </>
                    )}
                </TBar>
            </AppBar>
        </Root>
    );
};

export default Navbar;
