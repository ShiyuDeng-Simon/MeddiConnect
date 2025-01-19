import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  LinearProgress,
  IconButton,
  Chip,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { styled } from '@mui/system';
import BottomNavBar from '../components/BottomNavBar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PrescriptionCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(56, 155, 178, 0.2)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#389bb2',
  },
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

const Prescriptions = () => {
  const [open, setOpen] = React.useState(false);
  const [newPrescription, setNewPrescription] = React.useState({
    name: '',
    dosage: '',
    frequency: '',
    totalPills: '',
    instructions: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add prescription logic here
    handleClose();
  };

  // Mock data - replace with real data from your backend
  const prescriptions = [
    {
      id: 1,
      name: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
      remainingDays: 5,
      totalDays: 10,
      remainingPills: 15,
      totalPills: 30,
      instructions: "Take with food",
      nextRefillDate: "2024-03-20"
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      remainingDays: 15,
      totalDays: 30,
      remainingPills: 15,
      totalPills: 30,
      instructions: "Take in the morning",
      nextRefillDate: "2024-03-30"
    }
  ];

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flex: 1, ml: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Prescriptions</Typography>
          <Typography variant="body2" color="text.secondary">Manage your medications</Typography>
        </Box>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 2, overflow: 'auto', mb: 8 }}>
        <Stack spacing={3}>
          {prescriptions.map((prescription) => (
            <PrescriptionCard key={prescription.id}>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" color="#2B3A67" fontWeight={600}>
                      {prescription.name} {prescription.dosage}
                    </Typography>
                    <IconButton 
                      sx={{ 
                        bgcolor: 'rgba(56, 155, 178, 0.1)',
                        '&:hover': { bgcolor: 'rgba(56, 155, 178, 0.2)' }
                      }}
                    >
                      <NotificationsIcon sx={{ color: '#389bb2' }} />
                    </IconButton>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Chip
                      icon={<ScheduleIcon />}
                      label={prescription.frequency}
                      sx={{ bgcolor: 'rgba(43, 58, 103, 0.1)', color: '#2B3A67' }}
                    />
                    <Chip
                      icon={<LocalPharmacyIcon />}
                      label={`Refill in ${prescription.remainingDays} days`}
                      sx={{ bgcolor: 'rgba(56, 155, 178, 0.1)', color: '#389bb2' }}
                    />
                  </Stack>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Pills Remaining
                    </Typography>
                    <ProgressBar
                      variant="determinate"
                      value={(prescription.remainingPills / prescription.totalPills) * 100}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {prescription.remainingPills} of {prescription.totalPills} pills left
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Instructions:</strong> {prescription.instructions}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Next Refill Date:</strong> {prescription.nextRefillDate}
                  </Typography>
                </Stack>
              </CardContent>
            </PrescriptionCard>
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

      {/* Add Prescription Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-prescription-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 3, color: '#2B3A67', fontWeight: 'bold' }}>
            Add New Prescription
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Medication Name"
                value={newPrescription.name}
                onChange={(e) => setNewPrescription({ ...newPrescription, name: e.target.value })}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              
              <TextField
                fullWidth
                label="Dosage"
                value={newPrescription.dosage}
                onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Frequency"
                value={newPrescription.frequency}
                onChange={(e) => setNewPrescription({ ...newPrescription, frequency: e.target.value })}
                required
                placeholder="e.g., 3 times daily"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Total Pills"
                type="number"
                value={newPrescription.totalPills}
                onChange={(e) => setNewPrescription({ ...newPrescription, totalPills: e.target.value })}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Instructions"
                value={newPrescription.instructions}
                onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
                required
                multiline
                rows={2}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  sx={{
                    color: '#389bb2',
                    borderColor: '#389bb2',
                    '&:hover': {
                      borderColor: '#389bb2',
                      backgroundColor: 'rgba(56, 155, 178, 0.04)',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#389bb2',
                    '&:hover': {
                      bgcolor: '#2d7d8f',
                    },
                  }}
                >
                  Add Prescription
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

export default Prescriptions; 