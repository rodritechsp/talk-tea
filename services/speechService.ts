let isSpeaking = false;
let portugueseVoice: SpeechSynthesisVoice | null = null;

// As vozes são carregadas de forma assíncrona pelo navegador.
// Esta função tenta encontrar uma voz em português e a armazena para uso futuro.
const loadVoices = () => {
  const voices = window.speechSynthesis.getVoices();
  // Prioriza uma voz em português ('pt-BR' ou 'pt-PT'), mas usa a voz padrão como fallback.
  portugueseVoice = voices.find(voice => voice.lang.startsWith('pt')) || voices.find(voice => voice.default) || null;
};

// O evento 'onvoiceschanged' é disparado quando a lista de vozes está pronta.
window.speechSynthesis.onvoiceschanged = loadVoices;
// Chama a função uma vez no início, caso as vozes já estejam carregadas.
loadVoices();

/**
 * Converte texto em fala usando a API nativa do navegador (Web Speech API).
 * @param text O texto a ser falado.
 * @returns Uma Promise que resolve quando a fala termina ou é rejeitada em caso de erro.
 */
export const textToSpeech = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Se algo já estiver falando, cancela para evitar sobreposição.
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    if (!text) {
      console.error("Nenhum texto fornecido para a síntese de voz.");
      return reject(new Error("Nenhum texto fornecido."));
    }
    
    isSpeaking = true;

    const utterance = new SpeechSynthesisUtterance(text);

    // Tenta usar a voz em português pré-selecionada.
    if (portugueseVoice) {
      utterance.voice = portugueseVoice;
    }
    
    // Define configurações para uma fala mais natural e clara.
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    // A Promise é resolvida quando a fala termina com sucesso.
    utterance.onend = () => {
      isSpeaking = false;
      resolve();
    };

    // A Promise é rejeitada se ocorrer um erro.
    utterance.onerror = (event) => {
      console.error("Erro na síntese de voz:", event.error);
      isSpeaking = false;
      reject(new Error(`Falha na síntese de voz: ${event.error}`));
    };

    window.speechSynthesis.speak(utterance);
  });
};
