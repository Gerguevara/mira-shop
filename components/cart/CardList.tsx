import { FC, useContext } from 'react';
import { Box, Button, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';

import { initialData } from '@/db/seed-product';

import { ItemCounter } from '../ui';
import Link from 'next/link';
import { CartContext } from '@/context/cart';
import { ICartProduct } from '@/interfaces';


interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }


    return (
        <>
            {
                cart.map(product => (
                    <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            {/* TODO: llevar a la página del producto */}
                         
                                <Link href="/product/slug">
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.image}`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                    
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Talla: <strong>M</strong></Typography>

                                {
                                    editable
                                        ? <ItemCounter currentValue={0} maxValue={0} updatedQuantity={function (newValue: number): void {
                                            throw new Error('Function not implemented.');
                                        } } />
                                        : <Typography variant='h5'>3 items</Typography>
                                }

                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>

                            {
                                editable && (
                                    <Button variant='text' color='secondary' >
                                        Remover
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}