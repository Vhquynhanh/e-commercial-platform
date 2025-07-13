"use client";
import { useEffect, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { aiResponses } from "@/lib/data/aiResponses";

const suggestionTopics = [
  { label: "Tiếng Anh", key: "english" },
  { label: "Lập trình", key: "programming" },
  { label: "Thiết kế", key: "design" },
  { label: "Marketing", key: "marketing" }
];

type Message = {
  type: "user" | "ai";
  content: string;
};

const ChatBot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSendMessage = () => {
    const input = chatInput.trim();
    if (!input) return;

    setChatMessages((prev) => [...prev, { type: "user", content: input }]);

    const content = input.toLowerCase();
    let aiResponse = aiResponses.default;

    if (content.includes("xin chào") || content.includes("hello")) {
      aiResponse = aiResponses.greeting;
    } else if (content.includes("tiếng anh") || content.includes("english")) {
      aiResponse = aiResponses.english;
    } else if (
      content.includes("lập trình") ||
      content.includes("programming")
    ) {
      aiResponse = aiResponses.programming;
    } else if (content.includes("thiết kế") || content.includes("design")) {
      aiResponse = aiResponses.design;
    } else if (content.includes("marketing")) {
      aiResponse = aiResponses.marketing;
    }

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { type: "ai", content: aiResponse }]);
    }, 800);

    setChatInput("");
  };

  const handleSelectTopic = (label: string, key: string) => {
    setSelectedTopic(key);
    setChatMessages([
      { type: "user", content: label },
      { type: "ai", content: aiResponses[key as keyof typeof aiResponses] }
    ]);
  };

  useEffect(() => {
    if (showChatbot && !selectedTopic && chatMessages.length === 0) {
      setChatMessages([
        { type: "ai", content: "Bạn muốn được gợi ý về chủ đề nào?" }
      ]);
    }
  }, [showChatbot, selectedTopic, chatMessages.length]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!showChatbot ? (
        <button
          onClick={() => setShowChatbot(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-80 h-[28rem] flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle size={20} className="mr-2" />
              <span className="font-medium">AI Tư vấn</span>
            </div>
            <button
              onClick={() => {
                setShowChatbot(false);
                setChatInput("");
                setSelectedTopic(null);
                setChatMessages([]);
              }}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 ${
                  msg.type === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-xs ${
                    msg.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Topic Suggestions */}
            {!selectedTopic && (
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestionTopics.map((topic) => (
                  <button
                    key={topic.key}
                    onClick={() => handleSelectTopic(topic.label, topic.key)}
                    className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input + Đổi chủ đề */}
          {selectedTopic && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex mb-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setSelectedTopic(null);
                    setChatMessages([
                      {
                        type: "ai",
                        content: "Bạn muốn được gợi ý về chủ đề nào?"
                      }
                    ]);
                  }}
                  className="text-sm text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
                >
                  Đổi chủ đề
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
