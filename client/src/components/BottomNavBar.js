import React from 'react';
import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';

const BottomNavBar = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '800px',
        bgcolor: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        py: 1,
        px: 2,
        borderTop: 1,
        borderColor: 'divider',
        boxSizing: 'border-box',
        boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.05)',
      }}
    >
      <IconButton size="small" sx={{ color: '#389bb2' }}>
        <HomeIcon />
      </IconButton>
      <IconButton size="small" sx={{ color: '#389bb2' }}>
        <CalendarTodayIcon />
      </IconButton>
      <Box sx={{ width: 56 }} /> {/* Spacer for FAB */}
      <IconButton size="small" sx={{ color: '#389bb2' }}>
        <FolderIcon />
      </IconButton>
      <IconButton size="small" sx={{ color: '#389bb2' }}>
        <PersonIcon />
      </IconButton>
    </Box>
  );
};

export default BottomNavBar; 