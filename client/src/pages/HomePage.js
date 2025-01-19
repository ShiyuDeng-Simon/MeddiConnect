import React from 'react';
import { Box, IconButton, Typography, Stack, Avatar, Modal, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/system';
import BottomNavBar from '../components/BottomNavBar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import AppointmentCard from '../components/AppointmentCard';

const TabButton = styled(Typography)(({ active }) => ({
  color: active ? '#6B4EFF' : '#9BA3AF',
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
    backgroundColor: '#6B4EFF',
    borderRadius: 2,
  } : {},
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const HomePage = (props) => {
  const [open, setOpen] = React.useState(false);
  const [appointments, setAppointments] = React.useState([
    {
      doctor: "Dr. Deng",
      date: "17 August 2020",
      time: "10:00 AM",
      location: "123 Main St, Anytown, USA",
    },
    {
      doctor: "Dr. Deng",
      date: "17 August 2020",
      time: "10:00 AM",
      location: "123 Main St, Anytown, USA",
    }
  ]);
  const [newAppointment, setNewAppointment] = React.useState({
    doctor: '',
    date: null,
    time: null,
    location: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the date and time
    const formattedDate = newAppointment.date ? 
      new Date(newAppointment.date).toLocaleDateString('en-US', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) : '';
    
    const formattedTime = newAppointment.time ?
      new Date(newAppointment.time).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }) : '';

    // Create the new appointment object
    const appointmentToAdd = {
      doctor: newAppointment.doctor,
      date: formattedDate,
      time: formattedTime,
      location: newAppointment.location,
    };

    // Add the new appointment to the state
    setAppointments([...appointments, appointmentToAdd]);

    // Reset the form
    setNewAppointment({
      doctor: '',
      date: null,
      time: null,
      location: '',
    });
    
    handleClose();
  };

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flex: 1, ml: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Hi, Jasmine</Typography>
          <Typography variant="body2" color="text.secondary">Welcome back</Typography>
        </Box>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Stack direction="row" sx={{ px: 2, mb: 2 }}>
        <TabButton active>Recently</TabButton>
        <TabButton>Today</TabButton>
        <TabButton>Upcoming</TabButton>
        <TabButton>Later</TabButton>
      </Stack>

      {/* Task Cards */}
      <Box sx={{ px: 2, overflow: 'auto' }}>
        <Stack 
          direction="row" 
          spacing={2} 
          sx={{ mb: 3 }}
          flexWrap="wrap"
          useFlexGap
        >
          {appointments.map((appointment, index) => (
            <Box key={index} sx={{ width: 'calc(50% - 8px)', mb: 2 }}>
              <AppointmentCard 
                appointment={appointment}
                bgcolor={index % 2 === 0 ? "#238197" : "#2B3A67"}
                onClick={() => console.log('Appointment clicked:', appointment)}
                onDelete={() => handleDeleteAppointment(index)}
              />
            </Box>
          ))}
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
                bgcolor: 'background.paper',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Avatar sx={{ bgcolor: '#2B3A67', mr: 2 }}>
                <AssignmentIcon />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography>Appointment with Dr. Smith</Typography>
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
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: '#389bb2',
          color: 'white',
          width: 56,
          height: 56,
          '&:hover': { bgcolor: '#389bb2' },
          zIndex: 2,
        }}
      >
        <AddIcon />
      </IconButton>

      {/* Add Appointment Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-appointment-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 3, color: '#2B3A67', fontWeight: 'bold' }}>
            Add New Appointment
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Doctor's Name"
                value={newAppointment.doctor}
                onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={newAppointment.date}
                  onChange={(newDate) => setNewAppointment({ ...newAppointment, date: newDate })}
                  renderInput={(params) => <TextField {...params} required />}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <TimePicker
                  label="Time"
                  value={newAppointment.time}
                  onChange={(newTime) => setNewAppointment({ ...newAppointment, time: newTime })}
                  renderInput={(params) => <TextField {...params} required />}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </LocalizationProvider>

              <TextField
                fullWidth
                label="Location"
                value={newAppointment.location}
                onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  sx={{
                    color: '#6B4EFF',
                    borderColor: '#6B4EFF',
                    '&:hover': {
                      borderColor: '#6B4EFF',
                      backgroundColor: 'rgba(107, 78, 255, 0.04)',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#6B4EFF',
                    '&:hover': {
                      bgcolor: '#5B3FEF',
                    },
                  }}
                >
                  Add Appointment
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </Box>
  );
};

export default HomePage;
