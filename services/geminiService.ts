// Base64 decoding function
function decode(base64: string): Uint8Array {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Decode raw PCM audio data into an AudioBuffer
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

let isSpeaking = false;

export const textToSpeech = async (text: string): Promise<void> => {
  if (isSpeaking) {
    console.warn("Speech already in progress. Ignoring request.");
    return;
  }
  isSpeaking = true;

  // A new AudioContext is created for each playback. This is more robust against
  // browser policies that might suspend or close a long-lived AudioContext.
  // @ts-ignore
  const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });

  try {
    // Ensure the context is running. It can start in a suspended state.
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    const apiResponse = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({ error: 'Failed to parse error from server.' }));
      const errorMessage = errorData.error || apiResponse.statusText || 'Failed to fetch audio from the server.';
      console.error(`Error from TTS service: ${errorMessage}`, errorData);
      throw new Error(errorMessage);
    }

    const data = await apiResponse.json();
    const base64Audio = data.audioContent;

    if (base64Audio) {
      const audioBytes = decode(base64Audio);
      const audioBuffer = await decodeAudioData(audioBytes, audioContext, 24000, 1);
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      
      const audioFinished = new Promise<void>(resolve => {
        source.onended = () => resolve();
      });

      source.start();
      await audioFinished;
      
    } else {
      console.error("No audio data received from our TTS service.");
      throw new Error("Não foi possível gerar o áudio. Tente novamente.");
    }
  } catch (error) {
    console.error("Error generating speech:", error);
    const displayMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido ao gerar o áudio.";
    alert(`Erro ao gerar fala: ${displayMessage}`);
    throw error;
  } finally {
    // Clean up the AudioContext to release system resources.
    if (audioContext && audioContext.state !== 'closed') {
      await audioContext.close();
    }
    isSpeaking = false;
  }
};
