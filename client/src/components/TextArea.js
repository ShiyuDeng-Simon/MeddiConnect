import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function TextArea(props) {
  const { myNotes, updateNotes } = props;
  const [isEditMode, setIsEditMode] = React.useState(!myNotes);
  const [content, setContent] = React.useState(myNotes || "");
  
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  return (
    <Box
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {isEditMode ? (
        <TextField
          multiline
          minRows={10}
          value={content}
          onChange={handleChange} 
          sx={{ width: "85%" }}
          placeholder="Write down any symptoms or topics you'd like to discuss with your doctor."
        />
      ) : (
        <div>{content}</div>
      )}
      {isEditMode ? (
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ bgcolor: "#0f7696", '&:hover': { bgcolor: "#0a5a74" } }}
        >
          Save
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleEdit}
          sx={{ bgcolor: "#0f7696", '&:hover': { bgcolor: "#0a5a74" } }}
        >
          Edit
        </Button>
      )}
    </Box>
  );
}
