import axios from "axios";

export const fetchAIResponse = async (): Promise<AIResponses> => {
  try {
    const res = await axios.get("/mock/aiResponse.json");
    console.log("AI Response Data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy phản hồi AI:", error);
    return {
      greeting: "Xin chào!",
      english: "Hello!",
      programming: "Chương trình",
      design: "Thiết kế",
      marketing: "Tiếp thị",
      thanks: "Cảm ơn bạn!",
      bye: "Tạm biệt!",
      default: "Nội dung mặc định"
    };
  }
};
