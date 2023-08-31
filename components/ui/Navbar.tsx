import { useRouter } from 'next/router';
import { ClearOutlined, MoreVert, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography, useMediaQuery, Theme, ThemeProvider, useTheme, Input, InputAdornment } from '@mui/material'
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { UiContext } from '@/context';
import { CartContext } from '@/context/cart';

const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext(UiContext);
    const { numberOfItems } = useContext( CartContext );
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`);
    }


    const handleCancel = () => {
        setSearchTerm('')
        setIsSearchVisible(false)
    }

    // ways to handle mobile detection
    // const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <AppBar sx={{ borderBottom: { xs: 'none', sm: '1px solid #e0e0e0' } }}>
            <Toolbar>

                <Link style={{ textDecoration: 'none', color: '#01060f' }} href='/'>
                    <Box display='flex' alignItems='center' >
                        <Typography variant='h5' fontWeight={'bold'}>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Box>

                </Link>

                <Box flex={1} />

                {/* 
                 si la caja de texto esta abierta, se oculpan estos enlaces, sino aplica su logica 
                 display condicional css */}
                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}  className='fadeIn'>

                    <Link href='/category/men'>
                        <Button color={asPath === '/category/men' ? 'info' : 'primary'}>Hombres</Button>
                    </Link>


                    <Link href='/category/women'>
                        <Button color={asPath === '/category/women' ? 'info' : 'primary'}>Mujeres</Button>
                    </Link>


                    <Link href='/category/kid'>
                        <Button color={asPath === '/category/kid' ? 'info' : 'primary'}>Niños</Button>
                    </Link>

                </Box>

                <Box flex={1} />
                {/* Pantallas pantallas grandes */}
                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleCancel()}>
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        :
                        (
                            <IconButton
                                onClick={() => setIsSearchVisible(true)}
                                className="fadeIn"
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }


                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>
                <Link href="/cart">
                    <IconButton>
                        <Badge badgeContent={numberOfItems} color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>

                {isMobile ? (
                    <IconButton onClick={toggleSideMenu}>
                        <MoreVert />
                    </IconButton>
                ) : (
                    <Button onClick={toggleSideMenu}>
                        Menu
                    </Button>
                )}

            </Toolbar>
        </AppBar>
    )
}

export default Navbar