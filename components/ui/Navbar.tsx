import { MoreVert, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography, useMediaQuery, Theme, ThemeProvider, useTheme } from '@mui/material'
import React from 'react'

const Navbar = () => {

    // ways to handle mobile detection
    // const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <AppBar sx={{ borderBottom: { xs: 'none', sm: '1px solid #e0e0e0' } }}>
            <Toolbar>

                <Link display='flex' alignItems='center' href='/'>
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                </Link>


                <Box flex={1} />

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

                    <Link href='/category/men'>
                        <Button>Hombres</Button>
                    </Link>


                    <Link href='/category/women'>
                        <Button>Mujeres</Button>
                    </Link>


                    <Link href='/category/kid'>
                        <Button>Niños</Button>
                    </Link>

                </Box>

                <Box flex={1} />

                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <Link href="/cart">
                    <IconButton>
                        <Badge badgeContent={2} color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
                
                {isMobile ? (
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                ) : (
                    <Button>
                        Menu
                    </Button>
                )}

            </Toolbar>
        </AppBar>
    )
}

export default Navbar