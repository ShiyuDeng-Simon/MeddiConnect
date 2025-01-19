import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

if (!process.env.REACT_APP_AZURE_SPEECH_KEY) {
    console.error('Azure Speech Key is missing in environment variables');
}
if (!process.env.REACT_APP_AZURE_SPEECH_REGION) {
    console.error('Azure Speech Region is missing in environment variables');
}

const speechConfig = speechsdk.SpeechConfig.fromSubscription(
    process.env.REACT_APP_AZURE_SPEECH_KEY,
    process.env.REACT_APP_AZURE_SPEECH_REGION
);

// Enable speaker diarization using the proper property
speechConfig.speechRecognitionLanguage = "en-US";
speechConfig.setProperty("SpeechServiceConnection_ConversationTranscriptionInRoomAndOnline", "true");
speechConfig.setProperty("DiarizationEnabled", "true");

export const createRealtimeTranscriber = (onTranscriptionUpdate) => {
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    let lastSpeakerId = null;
    let currentSpeakerNumber = null;

    recognizer.recognized = (s, e) => {
        if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
            const resultJson = JSON.parse(e.result.properties.getProperty(speechsdk.PropertyId.SpeechServiceResponse_JsonResult));
            
            // Get speaker ID from the result
            const speakerId = resultJson?.NBest?.[0]?.Speaker || 1;
            
            // Generate new random number when speaker changes
            if (lastSpeakerId !== speakerId) {
                currentSpeakerNumber = Math.floor(Math.random() * 1000) + 1;
                onTranscriptionUpdate(`\nSpeaker ${currentSpeakerNumber}: ${e.result.text}`);
            } else {
                onTranscriptionUpdate(" " + e.result.text);
            }
            
            lastSpeakerId = speakerId;
        }
    };

    return recognizer;
};