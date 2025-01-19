import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  Typography,
  Avatar,
  Stack
} from "@mui/material";
import { styled } from "@mui/system";
import TranslateIcon from "@mui/icons-material/Translate";
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';
import PauseIcon from "@mui/icons-material/Pause";
import Loader from "../components/Loader";
import Header from "../components/Header";
import {
  SpeechConfig,
  AudioConfig,
  ConversationTranscriber,
} from "microsoft-cognitiveservices-speech-sdk";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const MessagesContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#389bb2",
    borderRadius: "3px",
  },
});

const MessageBubble = styled(Box)(({ isUser }) => {
  console.log('MessageBubble isUser state:', isUser);
  return ({
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "16px",
    flexDirection: isUser ? "row-reverse" : "row",
  });
});

const MessageContent = styled(Paper)(({ isUser }) => ({
  textAlign: "left",
  padding: "12px 16px",
  borderRadius: "16px",
  maxWidth: "70%",
  marginLeft: isUser ? 0 : "12px",
  marginRight: isUser ? "12px" : 0,
  backgroundColor: isUser ? "#389bb2" : "#fff",
  color: isUser ? "#fff" : "#2B3A67",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
  },
}));

const InputContainer = styled(Box)({
  padding: "20px",
  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
});

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const transcriberRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let transcriber = null;

    const initializeTranscriber = async () => {
      try {
        const speechConfig = SpeechConfig.fromSubscription(
          process.env.REACT_APP_AZURE_SPEECH_KEY,
          process.env.REACT_APP_AZURE_SPEECH_REGION
        );
        
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        transcriber = new ConversationTranscriber(speechConfig, audioConfig);

        transcriber.transcribed = (s, e) => {
          if (e.result && e.result.text) {
            const speakerId = e.result.speakerId || "Unknown Speaker";
            const text = e.result.text;
            
            console.log('Transcription Result:', {
              speakerId,
              text
            });
            
            setMessages(prevMessages => [...prevMessages, {
              text,
              isUser: speakerId === "Guest-1"
            }]);
          }
        };

        transcriber.canceled = (s, e) => {
          console.error("Canceled:", e.reason);
          setIsRecording(false);
        };

        transcriber.sessionStopped = (s, e) => {
          console.log("Session stopped.");
          setIsRecording(false);
        };

        transcriberRef.current = transcriber;
      } catch (error) {
        console.error("Error initializing transcriber:", error);
      }
    };

    initializeTranscriber();

    // Cleanup function
    return () => {
      const cleanup = async () => {
        if (transcriberRef.current) {
          try {
            if (isRecording) {
              await transcriberRef.current.stopTranscribingAsync();
            }
            console.log("Cleaning up transcriber");
            transcriberRef.current = null;
          } catch (error) {
            console.error("Error during cleanup:", error);
          }
        }
      };
      
      cleanup().catch(console.error);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRecordingClick = async () => {
    if (!transcriberRef.current) {
      console.error('Transcriber not initialized');
      return;
    }

    try {
      if (isRecording) {
        setIsRecording(false);
        await transcriberRef.current.stopTranscribingAsync();
        console.log("Transcription stopped");
      } else {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setMessages([]);
        await transcriberRef.current.startTranscribingAsync();
        setIsRecording(true);
        console.log("Transcription started");
      }
    } catch (error) {
      console.error("Error in transcription:", error);
      setIsRecording(false);
    }
  };

  const handleEndSession = () => {
    if (isRecording) {
      handleRecordingClick();
    }
    navigate('/notes', {
        state: { noteType: 'pre', message: messages },

      });;
  };

  const getBars = () => {
    return (
        <div id="bars">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    );
  };

  const handleTranslate = () => {
    // Translation logic here
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8f9fa' }}>
      <Box
        sx={{ 
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          bgcolor: '#389bb2',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          position: 'relative'
        }} 
      >
        <IconButton 
          sx={{ color: '#fff', position: 'absolute', left: 8 }}
          onClick={() => window.history.back()}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#fff',
            width: '100%',
            textAlign: 'center',
            fontWeight: 400
          }}
        >
          Appointment with Dr. Lockhart
        </Typography>
      </Box>
      <MessagesContainer>
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            isUser={message.isUser}
          >
            {!message.isUser && (
              <Avatar
                alt="Dr."
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#2B3A67",
                  color: "#fff",
                  fontWeight: "bold",
                }}
                variant="rounded"
              >
                Dr
              </Avatar>
            )}
            <MessageContent isUser={message.isUser}>
              <Typography variant="body1" component="div">
                {message.text}
              </Typography>
            </MessageContent>
            {!message.isUser && (
              <IconButton
                sx={{
                  zIndex: "99",
                  background: "rgba(56, 155, 178, 0.1)",
                  borderRadius: "8px",
                  marginLeft: "30px",
                  color: "#389bb2",
                  "&:hover": {
                    background: "rgba(56, 155, 178, 0.2)",
                  },
                }}
                onClick={handleTranslate}
              >
                <TranslateIcon />
              </IconButton>
            )}
          </MessageBubble>
        ))}
        {isRecording && <Loader />}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer sx={{ 
        bgcolor: '#fff',
        boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{width:"90px"}}></div>
          <Stack direction="row" sx={{
            justifyContent: "center",
            textAlign: "center" }}>
            {isRecording && getBars()}
            <IconButton
              onClick={handleRecordingClick}
              color="primary"
              aria-label="Generate Notes"
              sx={{
                backgroundColor: isRecording ? "#2B3A67" : "#389bb2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: isRecording ? "#232f52" : "#2d7d8f",
                  transform: "scale(1.05)",
                },
                borderRadius: "50%",
                margin: "0 20px",
                width: "65px",
                height: "65px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              {isRecording ? <PauseIcon fontSize="large" /> : <KeyboardVoiceRoundedIcon fontSize="large"/>}
            </IconButton>
            {isRecording && getBars()}
          </Stack>
          <IconButton
            onClick={handleEndSession}
            sx={{
              backgroundColor: "#f7f7f7",
              color: "#2B3A67",
              "&:hover": {
                backgroundColor: "#e8e8e8",
                transform: "scale(1.05)",
              },
              borderRadius: "30px",
              width: "90px",
              height: "45px",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            End
          </IconButton>
        </Stack>
      </InputContainer>
    </Box>
  );
};

export default Conversation;
