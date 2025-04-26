import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CheckroomIcon from '@mui/icons-material/Checkroom';
import Container from "@mui/material/Container";
import { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";

// I just put the style recommend there so that the web looks more balance, we can delete if want by removing that object
const pages = [
    { name: "Wardrobe", path: "/items" },
    { name: "Outfits", path: "/outfits" },
    { name: "Style Recommend", path: "/template" }
];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ 
            backgroundColor: '#8AA899',
            boxShadow: '0 2px 8px rgba(138, 168, 153, 0.15)'
        }}>
            <Container maxWidth={false} >
                <Toolbar disableGutters sx={{ minHeight: { xs: '56px', sm: '64px' } }}>
                    <Box
                        component="a"
                        href="/#/"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            textDecoration: 'none',
                            '&:hover': {
                                '& .logo-icon, & .logo-text': {
                                    transform: 'scale(1.1)',
                                    color: '#D5B9B2'
                                }
                            }
                        }}
                    >
                        <CheckroomIcon
                            className="logo-icon"
                            sx={{
                                mr: 1,
                                fontSize: '2rem',
                                color: '#F5E6E8',
                                transition: 'transform 0.3s ease, color 0.3s ease'
                            }}
                        />
                        <Typography
                            className="logo-text"
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                                fontWeight: 600,
                                letterSpacing: '0.2rem',
                                fontSize: '1.4rem',
                                color: '#F5E6E8',
                                transition: 'transform 0.3s ease, color 0.3s ease'
                            }}
                        >
                            FitFit
                        </Typography>
                    </Box>

                    {/* Menu for Mobile */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            sx={{
                                color: '#F5E6E8',
                                '&:hover': {
                                    backgroundColor: 'rgba(245, 230, 232, 0.1)'
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="nav-menu"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ 
                                display: { xs: 'block', md: 'none' },
                                '& .MuiPaper-root': {
                                    backgroundColor: '#8AA899',
                                }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem 
                                    key={page.name} 
                                    onClick={() => { handleCloseNavMenu(); window.location.href = `/#${page.path}`; }}
                                    sx={{
                                        color: '#F5E6E8',
                                        '&:hover': {
                                            backgroundColor: 'rgba(245, 230, 232, 0.1)'
                                        }
                                    }}
                                >
                                    <Typography sx={{ 
                                        textAlign: 'center',
                                        fontFamily: '"Helvetica Neue", Arial, sans-serif',
                                        fontWeight: 500,
                                        letterSpacing: '0.1rem',
                                        transition: 'color 0.3s ease',
                                        '&:hover': {
                                            color: '#D5B9B2'
                                        }
                                    }}>
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                            <MenuItem 
                                onClick={() => { handleCloseNavMenu(); window.location.href = '/#/login'; }}
                                sx={{
                                    color: '#F5E6E8',
                                    '&:hover': {
                                        backgroundColor: 'rgba(245, 230, 232, 0.1)'
                                    }
                                }}
                            >
                                <Typography sx={{ 
                                    textAlign: 'center',
                                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                                    fontWeight: 500,
                                    letterSpacing: '0.1rem',
                                    transition: 'color 0.3s ease',
                                    '&:hover': {
                                        color: '#D5B9B2'
                                    }
                                }}>
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    {/* Logo + Fitfit for Mobile */}
                    <Box
                        component="a"
                        href="/#/"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            alignItems: 'center',
                            textDecoration: 'none',
                            flexGrow: 1,
                            justifyContent: 'center',
                            '&:hover': {
                                '& .logo-icon, & .logo-text': {
                                    transform: 'scale(1.1)',
                                    color: '#D5B9B2'
                                }
                            }
                        }}
                    >
                        <CheckroomIcon
                            className="logo-icon"
                            sx={{
                                mr: 1,
                                fontSize: '1.8rem',
                                color: '#F5E6E8',
                                transition: 'transform 0.3s ease, color 0.3s ease'
                            }}
                        />
                        <Typography
                            className="logo-text"
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                                fontWeight: 600,
                                letterSpacing: '0.2rem',
                                fontSize: '1.2rem',
                                color: '#F5E6E8',
                                transition: 'transform 0.3s ease, color 0.3s ease'
                            }}
                        >
                            FitFit
                        </Typography>
                    </Box>

                    {/* Menu for Desktop */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-start' }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                href={`/#${page.path}`}
                                sx={{
                                    mx: 2,
                                    py: 1,
                                    color: '#F5E6E8',
                                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                                    fontWeight: 500,
                                    letterSpacing: '0.1rem',
                                    position: 'relative',
                                    '&:after': {
                                        content: '""',
                                        position: 'absolute',
                                        width: '0%',
                                        height: '2px',
                                        bottom: '5px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: '#D5B9B2',
                                        transition: 'width 0.3s ease-in-out'
                                    },
                                    '&:hover': {
                                        color: '#D5B9B2',
                                        '&:after': {
                                            width: '80%'
                                        }
                                    }
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    
                    {/* Logout Button for Desktop */}
                    {/* would need more code here to handle logout, e.g: clear local storage */}
                    <Button
                        onClick={()=> {
                            axios.put("/api/logout")
                            sessionStorage.setItem("login","False")
                            window.location.assign("/#/login")
                            window.location.reload()
                        }}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: '"Helvetica Neue", Arial, sans-serif',
                            fontWeight: 500,
                            letterSpacing: '0.1rem',
                            backgroundColor: '#D5B9B2',
                            color: '#F5E6E8',
                            px: 3,
                            gap: 1,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                color: '#D5B9B2',
                                backgroundColor: '#F5E6E8',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Logout <LogoutIcon />
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar;
