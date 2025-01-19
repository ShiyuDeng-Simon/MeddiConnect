import HistoryEduSharpIcon from '@mui/icons-material/HistoryEduSharp';
import PsychologyAltSharpIcon from '@mui/icons-material/PsychologyAltSharp';
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from "@mui/system";

const StyledToggle = styled(ToggleButton)({
  '&.selected': {
    backgroundColor: '#288f97',
  },
});

export default function NotesToggle(props) {
  const [noteType, setNoteType] = React.useState('pre');
  const {handleNoteTypeChange} = props;

  const onToggleChange = (event, noteType) => {
    if (noteType !== null) {
      setNoteType(noteType);
      handleNoteTypeChange(noteType);
    }
  };
  return (
      <ToggleButtonGroup
        value={noteType}
        exclusive
        onChange={onToggleChange}
        aria-label="note types"
        sx={{background:"#ffffff36"}}
      >
        <StyledToggle value="pre" aria-label="pre visit" className={noteType === "pre" ? "selected": ""}>
          <PsychologyAltSharpIcon sx={{color: "white"}}/>
        </StyledToggle>
        <StyledToggle value="post" aria-label="post visit" className={noteType === "post" ? "selected": ""}>
          <HistoryEduSharpIcon sx={{color: "white"}}/>
        </StyledToggle>
      </ToggleButtonGroup>
  );
}