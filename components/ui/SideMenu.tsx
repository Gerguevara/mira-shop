import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography, useMediaQuery, useTheme } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useContext, useState } from "react";
import { UiContext } from "@/context";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/auth";


export const SideMenu = () => {

    const router = useRouter();

    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

    const [searchTerm, setSearchTerm] = useState('');

    // ways to handle mobile detection
    // const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { user, isLoggedIn, logout } = useContext(AuthContext);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        navigateTo(`/search/${searchTerm}`);
    }


    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    }
    return (
        <Drawer
            open={isMenuOpen}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 0 }}>

                <List>
                    {isMobile ? (<ListItem>
                        <Input
                            autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTerm}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>) :
                        <Box display='flex' alignItems='center' justifyContent={'center'} sx={{ my: 1 }} >
                            <Typography variant='h5' fontWeight={'bold'}>Teslo |</Typography>
                            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                        </Box>
                    }


                    {
                        isLoggedIn && (
                            <>
                                <ListItem sx={{ cursor: 'pointer' }}>
                                    <ListItemIcon>
                                        <AccountCircleOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'} />
                                </ListItem>

                                <ListItem sx={{ cursor: 'pointer' }}>
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'} />
                                </ListItem>
                            </>
                        )
                    }


                    <ListItem
                        sx={{ display: { xs: '', sm: 'none', cursor: 'pointer' } }}
                        onClick={() => navigateTo('/category/men')}
                    >
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem
                        sx={{ display: { xs: '', sm: 'none', cursor: 'pointer' } }}
                        onClick={() => navigateTo('/category/women')}
                    >
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem
                        sx={{ display: { xs: '', sm: 'none', cursor: 'pointer' } }}
                        onClick={() => navigateTo('/category/kid')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItem>



                    {
                        isLoggedIn
                            ? (
                                <ListItem onClick={logout} sx={{ cursor: 'pointer' }}>
                                    <ListItemIcon>
                                        <LoginOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'SignOut'} />
                                </ListItem>
                            )
                            : (
                                <ListItem onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)} sx={{ cursor: 'pointer' }}>
                                    <ListItemIcon>
                                        <VpnKeyOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'SignIn'} />
                                </ListItem>
                            )
                    }



                    {/* Admin */}
                    {
                        user?.role === 'admin' && (
                            <>
                                <Divider />
                                <ListSubheader>Admin Panel</ListSubheader>

                                <ListItem sx={{ cursor: 'pointer' }}>
                                    <ListItemIcon>
                                        <CategoryOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Productos'} />
                                </ListItem>
                                <ListItem sx={{ cursor: 'pointer' }}>
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Ordenes'} />
                                </ListItem>

                                <ListItem sx={{ cursor: 'pointer' }}>
                                    <ListItemIcon>
                                        <AdminPanelSettings />
                                    </ListItemIcon>
                                    <ListItemText primary={'Usuarios'} />
                                </ListItem>
                            </>
                        )
                    }
                </List>
            </Box>
        </Drawer>
    )
}