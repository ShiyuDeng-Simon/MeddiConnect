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
    let audioConfig;
    try {
        audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    } catch (error) {
        console.error('Error creating audio config:', error);
        return { recognizer: null, cleanup: () => {} };
    }

    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    // Add error handling for the recognizer
    recognizer.sessionStarted = (s, e) => {
        console.log("Session started");
    };

    recognizer.sessionStopped = (s, e) => {
        console.log("Session stopped");
    };

    let lastSpeakerId = null;
    let currentSpeakerNumber = null;

    recognizer.recognizing = (s, e) => {
        console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    recognizer.recognized = (s, e) => {
        if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
            try {
                const resultJson = JSON.parse(e.result.properties.getProperty(speechsdk.PropertyId.SpeechServiceResponse_JsonResult));
                
                console.log('Full Azure Response:', {
                    resultJson,
                    properties: e.result.properties,
                    text: e.result.text
                });
                
                const speakerId = resultJson?.NBest?.[0]?.Speaker || 1;
                
                console.log('Speaker Detection:', {
                    speakerId,
                    text: e.result.text
                });
                
                if (lastSpeakerId !== speakerId) {
                    currentSpeakerNumber = Math.floor(Math.random() * 1000) + 1;
                    onTranscriptionUpdate(`\nSpeaker ${currentSpeakerNumber}: ${e.result.text}`, resultJson);
                } else {
                    onTranscriptionUpdate(" " + e.result.text, resultJson);
                }
                
                lastSpeakerId = speakerId;
            } catch (error) {
                console.error('Error processing recognition result:', error);
            }
        }
    };

    recognizer.canceled = (s, e) => {
        console.log(`CANCELED: Reason=${e.reason}`);
        if (e.reason === speechsdk.CancellationReason.Error) {
            console.error(`"CANCELED: ErrorCode=${e.errorCode}`);
            console.error(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        }
    };

    const cleanup = async () => {
        if (recognizer) {
            try {
                await recognizer.stopContinuousRecognitionAsync();
                recognizer.close();
            } catch (error) {
                console.error('Error during cleanup:', error);
            }
        }
    };

    return { recognizer, cleanup };
};