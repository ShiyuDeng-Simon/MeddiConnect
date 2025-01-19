const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    "3m4FzdtJk56AL7WVWXKAcWck8RZ5f0C9hUmmgmuLWJtI4gD1m2pyJQQJ99BAACBsN54XJ3w3AAAYACOGWNcf", // Your Azure key
    "canadacentral"  // Your Azure region
);
const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

const analyzeMedicalTerms = async (transcript) => {
    const payload = {
        messages: [
            { role: "system", content: "You are a helpful medical assistant." },
            { role: "user", content: transcript },
        ],
        temperature: 0.7,
        stream: false,
    };

    try {
        const response = await fetch("http://127.0.0.1:1337/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("JAN API error:", error);
        } else {
            const data = await response.json();
            console.log("JAN Response:", data);
        }
    } catch (error) {
        console.error("Error connecting to JAN API:", error);
    }
};

recognizer.recognizeOnceAsync((result) => {
    console.log(result.text);
    // Call analyzeMedicalTerms with the speech recognition result
    analyzeMedicalTerms(result.text);
});

// Add a test function to try Jan directly
const testJanConnection = async () => {
    const testPayload = {
        messages: [
            { role: "system", content: "You are a helpful medical assistant." },
            { role: "user", content: "What is myocardial infarction in simple terms?" }
        ],
        temperature: 0.7,
        stream: false
    };

    try {
        const response = await fetch("http://127.0.0.1:1337/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testPayload),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("JAN API error:", error);
        } else {
            const data = await response.json();
            console.log("JAN Test Response:", data);
        }
    } catch (error) {
        console.error("Error connecting to JAN API:", error);
    }
};

// Add a button to trigger the test
return (
    <div>
        {/* ... existing JSX ... */}
        <button onClick={testJanConnection}>Test Jan Connection</button>
    </div>
); 