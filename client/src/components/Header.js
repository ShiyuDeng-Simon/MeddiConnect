import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import NotesToggle from './NotesToggle';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useNavigate } from 'react-router-dom';




export default function Header(props) {
  const {title, showToggle, handleNoteTypeChange} = props;

  const navigate = useNavigate();
  
  const handleBackClick = (e) => {
      navigate('/');
    };
  
  return (
    <Box>
      <AppBar position="static" sx={{background: "#47a8af"}}>
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton 
          onClick={handleBackClick}
          edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, background: "#ffffff36", borderRadius: "5px"}  }>
            <ArrowBackIosSharpIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" component="div">
            {title}
          </Typography>
          {showToggle && <div style={{display: "flex"}}>
            <NotesToggle handleNoteTypeChange={handleNoteTypeChange}/>
          <IconButton sx={{marginLeft:"20px", color:"white", width: "45px"}}><IosShareIcon/></IconButton></div>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}