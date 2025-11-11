import { GoogleGenAI, Modality } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required in the request body' });
  }
  
  if (!process.env.API_KEY) {
    console.error('API key for Gemini is not configured on the server.');
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Diga com uma voz infantil e amigável: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Puck' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      res.status(200).json({ audioContent: base64Audio });
    } else {
      console.error("No audio data received from Gemini API.");
      res.status(500).json({ error: 'Failed to generate audio from the API' });
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: 'An error occurred while communicating with the Gemini API.' });
  }
}
