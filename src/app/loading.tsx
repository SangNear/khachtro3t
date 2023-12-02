import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'

const Loading = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress color="success" />
        </Box>
    )
}

export default Loading