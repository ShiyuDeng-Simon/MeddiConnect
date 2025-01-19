import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const LiveTranscription = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [medicalInsights, setMedicalInsights] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = async (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        
        // Analyze medical terms when we have new content
        if (event.results[event.results.length - 1].isFinal) {
          analyzeMedicalTerms(currentTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognition);
    } else {
      console.error('Speech recognition not supported');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const analyzeMedicalTerms = async (text) => {
    try {
      setIsAnalyzing(true);
      const response = await fetch('http://localhost:5000/analyze-medical-terms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze medical terms');
      }

      const data = await response.json();
      setMedicalInsights(data.insights);
    } catch (error) {
      console.error('Error analyzing medical terms:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Live Medical Transcription & Analysis
        </Typography>
        
        <Button
          variant="contained"
          color={isListening ? 'error' : 'primary'}
          startIcon={isListening ? <MicOffIcon /> : <MicIcon />}
          onClick={toggleListening}
          sx={{ mb: 2 }}
        >
          {isListening ? 'Stop Recording' : 'Start Recording'}
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Transcript Section */}
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              minHeight: 200, 
              maxHeight: 400, 
              overflow: 'auto',
              bgcolor: 'grey.50',
              flex: 1
            }}
          >
            <Typography variant="h6" gutterBottom>Transcript</Typography>
            <Typography>
              {transcript || 'Transcript will appear here...'}
            </Typography>
          </Paper>

          {/* Medical Insights Section */}
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              minHeight: 200, 
              maxHeight: 400, 
              overflow: 'auto',
              bgcolor: 'grey.50',
              flex: 1
            }}
          >
            <Typography variant="h6" gutterBottom>
              Medical Insights
              {isAnalyzing && (
                <CircularProgress size={20} sx={{ ml: 2 }} />
              )}
            </Typography>
            {Object.entries(medicalInsights).map(([term, explanation], index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="primary" fontWeight="bold">
                  {term}
                </Typography>
                <Typography variant="body2">
                  {explanation}
                </Typography>
              </Box>
            ))}
            {!Object.keys(medicalInsights).length && !isAnalyzing && (
              <Typography color="text.secondary">
                Medical term explanations will appear here...
              </Typography>
            )}
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};

export default LiveTranscription; 