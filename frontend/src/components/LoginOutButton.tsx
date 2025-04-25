//Made by Iain Gore 4/25/25

import { Button } from "@mui/material"
import axios from "axios"
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';


export default function LoginOutButton() {
    if (sessionStorage.getItem("login")=="True") {
        return (
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
        )
    }
    else {
        return (
            <Button
                        onClick={()=> {
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
                        Login <LoginIcon />
                    </Button>
        )
    }
}

