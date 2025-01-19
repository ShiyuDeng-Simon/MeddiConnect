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

const MessageBubble = styled(Box)(({ isUser }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "16px",
  flexDirection: isUser ? "row-reverse" : "row",
}));

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

const dummyMessages = [
  {
    text: "Good morning, Mr. Johnson. How are you feeling today?",
    isUser: false,
  },
  {
    text: "Good morning, Doctor. I'm doing okay, but I'm a little anxious about my test results.",
    isUser: true,
  },
  {
    id: 3,
    text: "That's understandable. Let's go over them together. We ran a full panel of tests, and overall, your results look quite good. However, there are a couple of areas we need to address",
    isUser: false,
  },
  {
    id: 3,
    text: "Okay, I appreciate the details. What should I be concerned about?",
    isUser: true,
  },
  {
    id: 4,
    text: "Your cholesterol levels are slightly elevated. Your LDL cholesterol, often referred to as the 'bad' cholesterol, is 160 mg/dL. Ideally, we want it below 130. This indicates a higher risk for heart disease over time if not managed.",
    isUser: false,
  },
  {
    id: 3,
    text: "Oh, I see. Is it something I can improve with diet and exercise?",
    isUser: true,
  },
  {
    id: 4,
    text: "Absolutely. I recommend incorporating more fruits, vegetables, whole grains, and lean proteins into your diet while cutting back on saturated fats and processed foods. Regular physical activity, like brisk walking for 30 minutes a day, can also help lower your LDL cholesterol.",
    isUser: false,
  },
  {
    id: 3,
    text: "That sounds manageable. Are there other concerns?",
    isUser: true,
  },
  {
    id: 4,
    text: "Yes, your fasting blood sugar was slightly elevated at 105 mg/dL. While this isn't in the diabetic range, it suggests prediabetes. It's important to address this now to prevent it from progressing.",
    isUser: false,
  },
  {
    id: 3,
    text: "Got it. Are there any medications I need to take for this?",
    isUser: true,
  },
  {
    id: 4,
    text: "At this stage, lifestyle changes are the first line of action. If we don't see improvement in three to six months, we can discuss medications. Let's set a follow-up appointment to check your progress",
    isUser: false,
  },
  {
    id: 3,
    text: "Okay, that makes sense. Is there anything else I should be aware of?",
    isUser: true,
  },
  {
    id: 4,
    text: "One last note—make sure to stay hydrated and prioritize quality sleep, as both can impact your overall health. Do you have any questions or concerns about these recommendations",
    isUser: false,
  },
  {
    id: 3,
    text: "No, I think I understand everything. Thank you for explaining it so clearly.",
    isUser: true,
  },
  {
    id: 4,
    text: "You're welcome. You're taking a proactive approach to your health, and that's great to see. We'll work together to improve these numbers. Let's schedule that follow-up appointment before you leave.",
    isUser: false,
  },
  {
    id: 3,
    text: "Thank you, Doctor. I'll do my best to follow your advice.",
    isUser: true,
  },
  {
    id: 4,
    text: "You're welcome. You're taking a proactive approach to your health, and that's great to see. We'll work together to improve these numbers. Let's schedule that follow-up appointment before you leave.",
    isUser: false,
  },
  {
    id: 3,
    text: "Thank you, you too.",
    isUser: true,
  },
];

const Conversation = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [isRecording, setIsRecording] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleRecordingClick= () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
    }
  };
  const handleTranslate = () => {};

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8f9fa' }}>
      <Header 
        title={"Appointment with Dr. Lockhart"}
        sx={{ 
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          bgcolor: '#fff',
        }} 
      />
      <MessagesContainer>
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            isUser={message.isUser}
          >
            {!message.isUser && (
              <Avatar
                src={`https://${message.avatar}`}
                alt={"Dr."}
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
            <MessageContent
              isUser={message.isUser}
              className={activeIndex === index ? "selected" : ""}
              onClick={() => setActiveIndex(index)}
            >
              <Typography variant="body1" component="div">
                {message.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{ opacity: 0.7, mt: 0.5, display: "block" }}
              ></Typography>
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
