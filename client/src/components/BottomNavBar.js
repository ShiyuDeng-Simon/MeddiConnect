import React from 'react';
import { Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
      <IconButton 
        onClick={() => navigate('/')}
        sx={{ 
          bgcolor: isActive('/') ? 'rgba(56, 155, 178, 0.1)' : 'transparent',
          color: isActive('/') ? '#389bb2' : '#9BA3AF',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { 
            bgcolor: 'rgba(56, 155, 178, 0.1)',
            color: '#389bb2',
            transform: 'translateY(-2px)'
          },
          padding: 1.5,
        }}
      >
        <HomeIcon sx={{ fontSize: 28 }} />
      </IconButton>
      <IconButton 
        onClick={() => navigate('/prescriptions')}
        sx={{ 
          bgcolor: isActive('/prescriptions') ? 'rgba(56, 155, 178, 0.1)' : 'transparent',
          color: isActive('/prescriptions') ? '#389bb2' : '#9BA3AF',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { 
            bgcolor: 'rgba(56, 155, 178, 0.1)',
            color: '#389bb2',
            transform: 'translateY(-2px)'
          },
          padding: 1.5,
        }}
      >
        <LocalPharmacyIcon sx={{ fontSize: 28 }} />
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