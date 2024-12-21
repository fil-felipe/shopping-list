import React from 'react';
import {Backdrop, Box, CircularProgress, Typography} from '@mui/material';

interface LoadingSpinnerProps {
    isOpen: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({isOpen}) => {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isOpen}
        >
            <Box mt={4} display="flex" flexDirection="column" alignItems="center">
                <CircularProgress />
                <Typography mt={2}>Ładowanie danych...</Typography>
            </Box>
        </Backdrop>
    )
}

export default LoadingSpinner;