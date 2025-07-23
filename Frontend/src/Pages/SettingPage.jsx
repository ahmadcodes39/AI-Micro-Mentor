import React, { useEffect, useState } from "react";

const SettingPage = () => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    // Chrome might not load voices immediately
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const doit = () => {
    const msg = new SpeechSynthesisUtterance("Your time starts now");

    // Optional: pick an English female voice if available
    const selectedVoice = voices.find(
      (voice) => voice.lang === "en-US" && voice.name.toLowerCase().includes("female")
    ) || voices.find((voice) => voice.lang === "en-US");

    if (selectedVoice) {
      msg.voice = selectedVoice;
    }

    msg.rate = 1;
    msg.pitch = 1;
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="p-4">
      <button onClick={doit} className="btn btn-primary">
        🔊 Test Voice
      </button>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Available Voices:</h2>
        <ul className="list-disc ml-5">
          {voices.map((voice, idx) => (
            <li key={idx}>
              {voice.name} ({voice.lang})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingPage;
