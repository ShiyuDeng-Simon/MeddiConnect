import { styled } from "@mui/system";
import * as React from 'react';
import TextArea from "../components/TextArea";
import Header from "../components/Header";
import { useLocation } from 'react-router-dom';
import { callLLM } from "../llmServices/localLLM";

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
        const prefix = "Summarize the conversation between a doctor and a patient in a concise, short and accurate way, in point form. Focus more on what the doctor's said. Return response strictly in string and suround medical terms with * in your response: ";
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
                        {isLoading ? (
                            "Generating notes..."
                        ) : (
                            getFormattedText(message || mockNotes)
                        )}
                    </AppointmentNotes>
                )}
            </Container>
        </>
    );
};

export default Notes;
