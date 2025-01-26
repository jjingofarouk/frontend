import React, { useState, useRef, useEffect } from "react";
import { Camera, Paperclip, SendHorizontal, UserCircle2, FileImage, FileText, Video } from "lucide-react";
import './Chat.css';

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;

    const newMessage = {
      id: Date.now(),
      sender: "patient",
      text: message.trim(),
      timestamp: new Date(),
      attachments: [...attachments],
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    setAttachments([]);
    simulateDoctorResponse();
  };

  // Simulate a doctor's response
  const simulateDoctorResponse = () => {
    setTimeout(() => {
      const doctorMessage = {
        id: Date.now(),
        sender: "doctor",
        text: "I see your message. Could you provide more details about your symptoms?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, doctorMessage]);
    }, 1500);
  };

  // Handle file attachments
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type,
    }));
    setAttachments([...attachments, ...files]);
  };

  // Remove attachment
  const removeAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  // Render attachment preview
  const renderAttachmentPreview = (attachment) => {
    if (attachment.type.startsWith("image/")) {
      return <FileImage className="icon" />;
    } else if (attachment.type.startsWith("video/")) {
      return <Video className="icon" />;
    }
    return <FileText className="icon" />;
  };

  return (
    <div className="chat-container">


      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="attachments-preview">
          {attachments.map((attachment, index) => (
            <div key={index} className="attachment-item">
              {renderAttachmentPreview(attachment)}
              <button onClick={() => removeAttachment(index)} className="remove-attachment">×</button>
            </div>
          ))}
        </div>
      )}

      {/* Messages Area */}
      <main className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            <div className="message-bubble">
              <p>{msg.text}</p>
              {msg.attachments &&
                msg.attachments.map((attachment, index) => (
                  <div key={index} className="attachment-preview">
                    {renderAttachmentPreview(attachment)}
                  </div>
                ))}
            </div>
            <span className="message-timestamp">
              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <div className="chat-input-area">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,video/*,.pdf,.doc,.docx"
          />

          {/* Attachment Button */}
          <button type="button" onClick={() => fileInputRef.current.click()} className="attachment-button">
            <Paperclip className="icon" />
          </button>

          {/* Camera Button */}
          <button type="button" className="camera-button">
            <Camera className="icon" />
          </button>

          {/* Message Input */}
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            className="message-input"
          />

          {/* Send Button */}
          <button type="submit" disabled={!message.trim() && attachments.length === 0} className="send-button">
            <SendHorizontal className="icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;