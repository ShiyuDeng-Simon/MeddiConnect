
import { styled } from "@mui/system";
import * as React from 'react';
import TextArea from "../components/TextArea";
import Header from "../components/Header";
import { useLocation } from 'react-router-dom';


const Container = styled('div')({
    textAlign: 'left',
    lineHeight: '2.5rem',
    background: '#f9f9f9',
    height: '90vh',
  });

const AppointmentNotes = styled('pre')({
    fontFamily: 'sans-serif',
    margin: '0',
    padding: '50px'
});

const Notes = () => {
    const location = useLocation();

    const [noteType, setNoteType] = React.useState(location?.state?.noteType);
    const handleNoteTypeChange = (noteType) => {
        setNoteType(noteType);
    }
    const handleKeywordClick = () => {}
    const mockNotes = "The patient's *cholesterol* levels are slightly elevated with an *LDL cholesterol* level of 160 mg/dL.\nFasting *blood sugar* was slightly elevated at 105 mg/dL, indicating *prediabetes*.\n\nLifestyle changes should be prioritized to improve these numbers. These include:\n- Eating a balanced diet rich in fruits, vegetables, whole grains, and *lean proteins*\n- Cutting back on *saturated fats* and processed foods\n- Regular physical activity, such as brisk walking for 30 minutes a day\n\nThe patient's *LDL cholesterol* is slightly elevated.\nPrediabetes was identified, which requires attention to be addressed.\n\nA follow-up appointment will be scheduled in three to six months to reassess the patient's progress.\nMedications may be considered if lifestyle changes are not sufficient in improving the patient's health."
    const getFormattedText = (input) => {
        const parts  = input.split("*");
        return parts.map((string, index) => {
            if (index % 2 === 0) {
                return string;
            } else {
                return <b style={{ cursor: "pointer", color: "#2091d7"}} onClick={handleKeywordClick}>{string}</b>
            }
        });
    }
    return (
        <>
        <Header title={"Medical Notes"} showToggle={true} handleNoteTypeChange={handleNoteTypeChange}/>
        <Container>

            {noteType === "pre" ?   <TextArea/> :   <AppointmentNotes> {getFormattedText(mockNotes)}</AppointmentNotes>}   

        </Container>
        </>

    )
};
export default Notes;
