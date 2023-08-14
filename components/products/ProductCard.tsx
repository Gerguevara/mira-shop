import { FC, useMemo, useState } from 'react';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link } from '@mui/material'
import { IProduct } from '../interfaces/product';

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {

    //para garantizar que la el texto se muestre hasta que la imagen este completamente cargada
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const [isHovered, setIsHovered] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
            ? `/products/${product.images[1]}`
            : `/products/${product.images[0]}`;

    }, [isHovered, product.images])

    return (
        <Grid item
            xs={6}
            sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card>
                <Link href="/product/slug">
                    {/* card media ayuda a cargar bajo demanda */}
                    <CardActionArea>
                        <CardMedia
                            component='img'
                            className='fadeIn'
                            image={productImage}
                            alt={product.title}
                            // exclusivo de card media, evento que se dispara al cargar el recurso
                            onLoad={ () => setIsImageLoaded(true)}
                        />

                    </CardActionArea>
                </Link>
            </Card>

            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>{`$${product.price}`}</Typography>
            </Box>
        </Grid>
    )
}