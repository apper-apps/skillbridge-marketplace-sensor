import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import MessageBubble from '@/components/molecules/MessageBubble';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { getMessages, sendMessage } from '@/services/api/messageService';
import { toast } from 'react-toastify';

const ChatWindow = ({ conversationId, otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (conversationId) {
      loadMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMessages(conversationId);
      setMessages(data);
    } catch (err) {
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      const message = await sendMessage(conversationId, newMessage.trim());
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      toast.success('Message sent successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const mockCurrentUser = { Id: 1, name: 'John Doe' };

  if (!conversationId) {
    return (
      <div className="h-full flex items-center justify-center">
        <Empty 
          title="Select a conversation"
          description="Choose a conversation from the list to start messaging"
          icon="MessageCircle"
        />
      </div>
    );
  }

  if (loading) {
    return <Loading type="messages" />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadMessages}
        type="messages"
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar 
              src={otherUser?.avatar} 
              name={otherUser?.name}
              size="md"
              online={otherUser?.online}
            />
            <div>
              <h3 className="font-semibold text-gray-800">
                {otherUser?.name}
              </h3>
              <p className="text-sm text-gray-600">
                {otherUser?.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <ApperIcon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <ApperIcon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <Empty 
            title="No messages yet"
            description="Start the conversation by sending a message"
            icon="MessageCircle"
          />
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.Id}
                message={message}
                isOwn={message.senderId === mockCurrentUser.Id}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            className="flex-shrink-0"
          >
            <ApperIcon name="Paperclip" size={20} />
          </Button>
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={sending}
          />
          
          <Button 
            type="submit" 
            variant="primary" 
            size="sm"
            disabled={!newMessage.trim() || sending}
            loading={sending}
            icon="Send"
            className="flex-shrink-0"
          />
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;