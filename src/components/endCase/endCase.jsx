import React from 'react';
import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';

const EndCase = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}
    >
      <h1 style={{ color: 'red' }}>End</h1>
      <div style={{ display: "flex", justifyContent: "space-between", margin: '1rem', width: '100%' }}>
        <Button
          startIcon={<ArrowBackIosNewIcon
            sx={{ color: 'yellow' }}
            fontSize='large' />}

        >Back</Button>

        <Button
          endIcon={<ArrowForwardIosIcon
            sx={{ color: 'yellow' }}
            fontSize='large' />}


        >Next</Button>
      </div>
    </Box>
  );
};

export default EndCase;
