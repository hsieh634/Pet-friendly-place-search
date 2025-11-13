
import { GoogleGenAI, Type } from "@google/genai";
import { PetFriendlyPlace } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const findPetFriendlyPlaces = async (
  city: string,
  district: string,
  type: string,
  keyword: string = ''
): Promise<PetFriendlyPlace[]> => {
  const model = 'gemini-2.5-flash';

  const locationString = district === '不拘' ? city : `${city}${district}`;
  const typeString = type === '不拘' ? '任何類型的寵物友善地點' : `寵物友善的「${type}」`;
  const keywordString = keyword ? `，其名稱或描述需與「${keyword}」相關` : '';

  const prompt = `請使用 Google 搜尋在台灣的 ${locationString} 尋找${typeString}${keywordString}。
    請盡力找出所有相關的地點，目標是提供一份完整的列表。
    請回傳最多50個最相關的地點。
    請務必以 JSON 陣列格式回傳，其中每個物件需要包含地點名稱(name)、地址(address)、簡短的特色描述(description)，地理座標(latitude and longitude)，以及該地點在Google Maps上的平均評分(google_rating)。
    如果找不到任何地點，請回傳一個空的 JSON 陣列 []。`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        temperature: 0.2,
      },
    });

    const text = response.text.trim();
    if (!text) {
      return [];
    }
    
    // Find the start and end of the JSON array to handle potential text before/after it
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');

    if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
        // If the model returns just an empty array string, it's valid
        if (text === '[]') return [];
        console.warn('Could not find a JSON array in the response from Gemini.', text);
        // If no array is found, assume no results. This prevents errors for non-JSON "no results" messages.
        return [];
    }

    const jsonString = text.substring(startIndex, endIndex + 1);

    try {
        const parsedResult = JSON.parse(jsonString);
        return parsedResult as PetFriendlyPlace[];
    } catch (parseError) {
        console.error('Failed to parse JSON from Gemini response:', parseError);
        console.error('Original text from Gemini:', text);
        console.error('Attempted to parse this string:', jsonString);
        throw new Error('搜尋結果格式錯誤，無法解析。');
    }

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof Error && error.message.includes('無法解析')) {
        throw error;
    }
    throw new Error('呼叫 AI 服務時發生錯誤，請稍後再試。');
  }
};