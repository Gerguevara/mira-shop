import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

export const FullScreenLoading = () => {
  return (
    <Box 
        display='flex' 
        flexDirection='column'
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 200px)'
    >
        <Typography sx={{ mb: 3 }} variant="h2" fontWeight={ 200 } fontSize={ 20 }>Cargando...</Typography>
        {/* thickness nes el grosor de la linea dle loading */}
        <CircularProgress thickness={ 2 } />
    </Box>
  )
}