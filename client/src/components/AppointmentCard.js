import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/system';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';


const AppointmentCardContainer = styled(Box)(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  borderRadius: 16,
  padding: 20,
  color: 'white',
  minWidth: 280,
  marginRight: 16,
}));

const ActionButton = styled(Button)({
  minWidth: 'auto',
  flex: 1,
  color: 'white',
  padding: '4px 8px',
  fontSize: '0.75rem',
  borderColor: 'rgba(255, 255, 255, 0.5)',
  '&:hover': {
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const AppointmentCard = ({ appointment = {}, bgcolor, onDelete }) => {
    const navigate = useNavigate();
    
    const {
        doctor = 'Dr. Smith',
        date = 'No date set',
        time = 'No time set',
        location = 'No location set'
    } = appointment;
  
    const handleStartClick = (e) => {
      navigate('/conversation');
    };

    const handleNotesClick = (e) => {
        navigate('/notes');
      };
  
  return (
    <AppointmentCardContainer bgcolor={bgcolor}>
      <Typography variant="h6" sx={{ mb: 2 }}>{`Appointment with ${doctor}`}</Typography>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, opacity: 0.7 }} />
          <Typography variant="body2">{date}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTimeIcon sx={{ fontSize: 16, mr: 1, opacity: 0.7 }} />
          <Typography variant="body2">{time}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ fontSize: 16, mr: 1, opacity: 0.7 }} />
          <Typography variant="body2" sx={{ opacity: 0.7 }}>{location}</Typography>
        </Box>
      </Stack>
      <Stack 
        direction="row" 
        spacing={1} 
        sx={{ 
          mt: 2, 
          pt: 2, 
          borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <ActionButton 
          variant="outlined" 
          size="small"
          startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
          onClick={handleNotesClick}
        >
          Notes
        </ActionButton>
        <ActionButton 
          variant="outlined" 
          size="small"
          startIcon={<PlayArrowIcon sx={{ fontSize: 16 }} />}
          onClick={handleStartClick}
        >
          Start
        </ActionButton>
        <ActionButton 
          variant="outlined" 
          size="small"
          startIcon={<DeleteOutlineIcon sx={{ fontSize: 16 }} />}
          onClick={onDelete}
        >
          Delete
        </ActionButton>
      </Stack>
    </AppointmentCardContainer>
  );
};

export default AppointmentCard;