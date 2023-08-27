import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { ISize } from '../../interfaces/product';



interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
    // Method
    onSelectedSize: (size: ISize) => void;
}

// TODO: probar mejor con un Grid para que sea responsive

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
    return (
        <Box   sx={{ my: 1 }}>
            {
                sizes.map(size => (
                    <Button
                        sx={{ m:0.5}}
                        key={size}
                        size='small'
                        color={selectedSize === size ? 'info' : 'inherit'}
                        onClick={() => onSelectedSize(size)}
                    >
                        {size}
                    </Button>
                ))
            }
        </Box>
    )
}