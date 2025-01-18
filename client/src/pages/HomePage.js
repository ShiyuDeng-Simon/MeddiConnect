import React from 'react';
import { Box, Typography, Stack, IconButton, Avatar, Button } from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import BottomNavBar from '../components/BottomNavBar';
import TaskCard from '../components/AppointmentCard';

const TabButton = styled(Typography)(({ active }) => ({
  color: active ? '#389bb2' : '#9BA3AF',
  padding: '8px 16px',
  cursor: 'pointer',
  position: 'relative',
  '&:after': active ? {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: '#389bb2',
    borderRadius: 2,
  } : {},
}));

const HomePage = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f7f7f7' }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <IconButton sx={{ color: '#389bb2' }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flex: 1, ml: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Hi, Simon</Typography>
          <Typography variant="body2" color="text.secondary">Welcome back</Typography>
        </Box>
        <IconButton sx={{ color: '#389bb2' }}>
          <SearchIcon />
        </IconButton>
        <IconButton sx={{ color: '#389bb2' }}>
          <SettingsIcon />
        </IconButton>
      </Box>


      {/* Appointment Cards */}
      <Box sx={{ px: 2, overflow: 'auto' }}>
        <Stack direction="row" spacing={2} sx={{ mb: 3, mt: 2 }}>
          <TaskCard
            title="User interface design"
            timeLeft="1 week left"
            progress={50}
            bgcolor="#389bb2"
          />
          <TaskCard
            title="Wireframe elements"
            timeLeft="2 week left"
            progress={35}
            bgcolor="#2c7a8c"
          />
        </Stack>

        {/* Task List */}
        <Stack spacing={2} sx={{ mb: 10 }}>
          {[
            { date: '17 August 2020' },
            { date: '26 July 2020' }
          ].map((task, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                bgcolor: 'white',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Avatar sx={{ bgcolor: '#389bb2', mr: 2 }}>
                <AssignmentIcon />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography color="#2c3e50">Lorem Ipsum dolor</Typography>
                <Typography variant="caption" color="text.secondary">
                  {task.date}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Floating Action Button */}
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: '#389bb2',
          color: 'white',
          width: 56,
          height: 56,
          '&:hover': { bgcolor: '#2c7a8c' },
          zIndex: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <AddIcon />
      </IconButton>
        
      <BottomNavBar />
    </Box>
  );
};

export default HomePage;