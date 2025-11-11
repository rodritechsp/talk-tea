import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            // Switched to Charon as another stable voice option.
            prebuiltVoiceConfig: { voiceName: 'Charon' }, 
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
      res.status(200).json({ audioContent: base64Audio });
    } else {
      console.error("No audio data received from Gemini API. Full response:", JSON.stringify(response, null, 2));
      res.status(500).json({ error: 'Failed to generate audio from the API' });
    }
  } catch (error) {
    // Log the full error object for better debugging in Vercel logs
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: 'An error occurred while communicating with the Gemini API.' });
  }
}
