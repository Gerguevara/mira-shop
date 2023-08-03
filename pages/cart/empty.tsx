import { ShopLayout } from '@/components/layout'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const empty = () => {
    return (
        <ShopLayout title="Carrito vació" pageDescription="No hay artículos en el carrito de compras">
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography>Your cart is empty</Typography>
                    <Link href='/'>
                        <Typography  typography="h4" color='secondary'>
                            Back to shopping
                        </Typography>
                    </Link>

                </Box>


            </Box>
        </ShopLayout>
    )
}

export default empty