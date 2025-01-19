import React, { useState, useEffect, useRef } from 'react';
import { createRealtimeTranscriber } from './speechConfig';
import { 
    Button, 
    Box, 
    Typography, 
    Paper,
    Alert,
    Divider
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

const AudioTranscriptionTest = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [error, setError] = useState(null);
    const recognizerRef = useRef(null);

    const startRecording = () => {
        try {
            const recognizer = createRealtimeTranscriber((text) => {
                setTranscription(prev => prev + text);
            });
            
            recognizer.startContinuousRecognitionAsync(
                () => {
                    setIsRecording(true);
                    setError(null);
                },
                (err) => {
                    setError('Error starting recognition: ' + err);
                }
            );
            
            recognizerRef.current = recognizer;
        } catch (err) {
            setError('Failed to start recording: ' + err.message);
        }
    };

    const stopRecording = () => {
        if (recognizerRef.current) {
            recognizerRef.current.stopContinuousRecognitionAsync(
                () => {
                    setIsRecording(false);
                    recognizerRef.current = null;
                },
                (err) => {
                    setError('Error stopping recognition: ' + err);
                }
            );
        }
    };

    useEffect(() => {
        return () => {
            if (recognizerRef.current) {
                recognizerRef.current.stopContinuousRecognitionAsync();
            }
        };
    }, []);

    const handleClearTranscription = () => {
        setTranscription('');
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Real-time Speech-to-Text with Speaker Detection
            </Typography>

            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button 
                        variant="contained" 
                        color={isRecording ? "error" : "primary"}
                        onClick={isRecording ? stopRecording : startRecording}
                        startIcon={isRecording ? <StopIcon /> : <MicIcon />}
                    >
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </Button>

                    <Button 
                        variant="outlined"
                        onClick={handleClearTranscription}
                        disabled={!transcription}
                    >
                        Clear Transcription
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Transcription:
                    </Typography>
                    <Paper 
                        elevation={1} 
                        sx={{ 
                            p: 2, 
                            bgcolor: 'grey.50',
                            minHeight: 200,
                            maxHeight: 400,
                            overflow: 'auto'
                        }}
                    >
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                whiteSpace: 'pre-wrap',
                                '& .doctor': { color: 'primary.main' },
                                '& .patient': { color: 'secondary.main' }
                            }}
                        >
                            {transcription}
                        </Typography>
                    </Paper>
                </Box>
            </Paper>
        </Box>
    );
};

export default AudioTranscriptionTest;