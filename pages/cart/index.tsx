import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayout } from '@/components/layout';
import { CartContext } from '@/context/cart';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';


const CartPage = () => {

    const { isLoaded, cart } = useContext(CartContext);
    const router = useRouter();

    // si el carrito esta cargado no tiene productos , redireccionar cart empty page
    useEffect(() => {
        if (isLoaded && cart.length === 0) {
            router.replace('/cart/empty');
        }
    }, [isLoaded, cart, router])

    // si no esta cargado o no hay productos en el carrito, no mostrar nada
    if (!isLoaded || cart.length === 0) {
        return (<></>);
    }

    const handleNavigation = () => {
        // window.location.href = '/checkout/address';
        router.push('/checkout/address');
    }


    return (
        <ShopLayout title='Carrito - 3' pageDescription={'Carrito de compras de la tienda'}>
            <Typography variant='h1' component='h1'>Carrito</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color="secondary" className='circular-btn' fullWidth onClick={handleNavigation}>
                                    Checkout
                                </Button>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </ShopLayout>
    )
}

export default CartPage;