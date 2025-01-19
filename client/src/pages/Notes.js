import { styled } from "@mui/system";
import * as React from 'react';
import TextArea from "../components/TextArea";
import Header from "../components/Header";
import { useLocation } from 'react-router-dom';
import { callLLM } from "../llmServices/localLLM";
import ReactMarkdown from "react-markdown";
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';

const Container = styled('div')({
    textAlign: 'left',
    lineHeight: '2.5rem',
    background: '#f9f9f9',
    height: '90vh',
  });

const AppointmentNotes = styled('div')({
    fontFamily: 'sans-serif',
    margin: '0',

    padding: '50px',
    whiteSpace: 'pre-wrap'
});

const LoadingBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: 9999,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
}));

const Notes = () => {
    const location = useLocation();
    const [noteType, setNoteType] = React.useState(location?.state?.noteType);
    const [message, setMessage] = React.useState(location?.state?.message);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const generateNotes = async () => {
            if (Array.isArray(message)) {
                setIsLoading(true);
                try {
                    const parsedMessage = parseConversation(message);
                    const response = await callLLM({
                        prompt: parsedMessage
                    });
                    
                    const generatedText = response.choices?.[0]?.message?.content || "Could not generate notes";
                    setMessage(generatedText);
                } catch (error) {
                    console.error("Error generating notes:", error);
                    setMessage("Failed to generate notes. Please try again.");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        generateNotes();
    }, []); // Run once when component mounts

    function parseConversation(conversation) {
        const prefix = "Extract the key information from the following conversation between a doctor and a patient. Focus on summarizing the patient's symptoms, diagnosis, recommended tests, prescribed treatments or medications, follow-up instructions, and any other actionable advice or important details. Present the information in a clear, concise, and patient-friendly format.: ";
        const conversationString = conversation.map(obj => 
            `${obj.isUser ? "Patient: " : "Doctor: "}${obj.text}`
        ).join("; ");
        return `${prefix}${conversationString}`;
    }

    const handleNoteTypeChange = (noteType) => {
        setNoteType(noteType);
    }

    const handleKeywordClick = () => {}

    const mockNotes = "The patient's *cholesterol* levels are slightly elevated with an *LDL cholesterol* level of 160 mg/dL.\nFasting *blood sugar* was slightly elevated at 105 mg/dL, indicating *prediabetes*.\n\nLifestyle changes should be prioritized to improve these numbers. These include:\n- Eating a balanced diet rich in fruits, vegetables, whole grains, and *lean proteins*\n- Cutting back on *saturated fats* and processed foods\n- Regular physical activity, such as brisk walking for 30 minutes a day\n\nThe patient's *LDL cholesterol* is slightly elevated.\nPrediabetes was identified, which requires attention to be addressed.\n\nA follow-up appointment will be scheduled in three to six months to reassess the patient's progress.\nMedications may be considered if lifestyle changes are not sufficient in improving the patient's health."

    const getFormattedText = (input) => {
        if (!input || typeof input !== 'string') return '';
        
        // Remove quotation marks from the input
        input = input.replace(/['"]/g, '');
        
        // First, add line breaks every 80 characters
        let formattedString = '';
        let currentLine = '';
        const words = input.split(' ');
        
        for (const word of words) {
            if ((currentLine + ' ' + word).length > 80) {
                formattedString += currentLine + '\n';
                currentLine = word;
            } else {
                currentLine += (currentLine ? ' ' : '') + word;
            }
        }
        formattedString += currentLine;
        
        // Split by newlines first, then by asterisks
        return formattedString.split('\n').map((line, i) => {
            const parts = line.split("*");
            const formattedParts = parts.map((string, index) => {
                if (index % 2 === 0) {
                    return string;
                } else {
                    return <b key={index} style={{ cursor: "pointer", color: "#2091d7"}} onClick={handleKeywordClick}>{string}</b>
                }
            });
            return (
                <React.Fragment key={i}>
                    {formattedParts}
                    <br />
                </React.Fragment>
            );
        });
    }

    const mockedSummary1 = "**Conversation Summary:**";
    const mockedSummary2 = "- Most lab results are within normal ranges. ";
    const mockedSummary3 = "- Cholesterol levels are slightly elevated; improvement needed through diet and exercise.";
    const mockedSummary4 = "- Glucose levels, liver, and kidney functions are normal.";
    const mockedSummary5 = "- Follow-up test scheduled in three months to monitor progress.";
    const mockedSummary6 = "- Patient encouraged to reach out with questions or concerns.";







    return (
        <>
            <Header 
                title={"Medical Notes"} 
                showToggle={true} 
                handleNoteTypeChange={handleNoteTypeChange}
            />
            <Container>
                {noteType === "pre" ? (
                    <TextArea/>
                ) : (
                    <AppointmentNotes>
                        <ReactMarkdown>{mockedSummary1}</ReactMarkdown>
                        <br/>
                        <ReactMarkdown>{mockedSummary2}</ReactMarkdown> 
                        <ReactMarkdown>{mockedSummary3}</ReactMarkdown>
                        <ReactMarkdown>{mockedSummary4}</ReactMarkdown> 
                        <ReactMarkdown>{mockedSummary5}</ReactMarkdown> 
                        <ReactMarkdown>{mockedSummary6}</ReactMarkdown> 
                    </AppointmentNotes>
                )}
            </Container>

            {/* Loading Backdrop */}
            <LoadingBackdrop open={isLoading}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        gap: 2 
                    }}
                >
                    <CircularProgress color="inherit" />
                    <Typography variant="h6" component="div">
                        Waiting for doctor verification...
                    </Typography>
                </Box>
            </LoadingBackdrop>
        </>
    );
};

export default Notes;
