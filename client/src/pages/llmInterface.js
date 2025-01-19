import React, { useState } from "react";
import { callLLM } from "../llmServices/localLLM";

const LlmInterface = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await callLLM({
        prompt: input.trim()
      });
      
      const generatedText = response.choices?.[0]?.message?.content || "No response generated";
      setOutput(generatedText);
    } catch (error) {
      console.error("Error:", error);
      setOutput(`Failed to fetch response: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>AI Chat Interface</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your message here..."
        style={{
          width: '100%',
          minHeight: '100px',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      <button 
        onClick={handleGenerate}
        disabled={isLoading || !input.trim()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#389bb2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Generating...' : 'Send'}
      </button>
      {output && (
        <div style={{ marginTop: '20px' }}>
          <h2>Response:</h2>
          <div style={{
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            whiteSpace: 'pre-wrap'
          }}>
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

export default LlmInterface;
