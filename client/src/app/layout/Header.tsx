import { AppBar, Switch, Toolbar, Typography } from '@mui/material'
import React from 'react'

interface HeaderProps {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const Header = ({darkMode, handleThemeChange}: HeaderProps) => {
  return (
    <AppBar position='static' sx={{mb: 4}}>
    <Toolbar>
        <Typography variant="h6">
            E-STORE
        </Typography>
        <Switch checked={darkMode} onChange={handleThemeChange}  />
    </Toolbar>
</AppBar>
  )
}

export default Header