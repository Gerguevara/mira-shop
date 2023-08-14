import { useRouter } from 'next/router';
import { MoreVert, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography, useMediaQuery, Theme, ThemeProvider, useTheme } from '@mui/material'
import Link from 'next/link';
import React from 'react'

const Navbar = () => {

    const { asPath, push } = useRouter();

    // ways to handle mobile detection
    // const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <AppBar sx={{ borderBottom: { xs: 'none', sm: '1px solid #e0e0e0' } }}>
            <Toolbar>

                <Link style={{ textDecoration: 'none', color: '#01060f' }} href='/'>
                    <Box display='flex' alignItems='center' >
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Box>

                </Link>

                <Box flex={1} />

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

                    <Link href='/category/men'>
                        <Button color={ asPath === '/category/men' ? 'info':'primary'}>Hombres</Button>
                    </Link>


                    <Link href='/category/women'>
                        <Button color={ asPath === '/category/women' ? 'info':'primary'}>Mujeres</Button>
                    </Link>


                    <Link href='/category/kid'>
                        <Button color={ asPath === '/category/kid' ? 'info':'primary'}>Niños</Button>
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