import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { ISize } from '../interfaces/product';



interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
}

// TODO: probar mejor con un Grid para que sea responsive

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
    return (
        <Box display='flex' flexDirection={'row'} marginY={2}> 
            {
                sizes.map(size => (
                    <Box key={size} mr={1} >
                        <Button
                            size='small'
                            color={selectedSize === size ? 'primary' : 'info'}
                        >
                            {size}
                        </Button>
                    </Box>
                ))
            }
        </Box>
    )
}