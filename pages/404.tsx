import { Box, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layout';

//la pagina 404 no necesita configuracion next la toma automaticamente si hay un error de ruta
const Custom404 = () => {
    return (
        <ShopLayout title='Page not found' pageDescription='No hay nada que mostrar aquí'>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>404 |</Typography>
                <Typography marginLeft={2}>Page not found</Typography>
            </Box>
        </ShopLayout>
    )
}

export default Custom404;