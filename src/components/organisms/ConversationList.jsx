import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Avatar from '@/components/atoms/Avatar';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { getConversations } from '@/services/api/messageService';
import { format } from 'date-fns';

const ConversationList = ({ onConversationSelect, selectedConversationId }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      setError(err.message || 'Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return format(date, 'HH:mm');
    } else {
      return format(date, 'MMM dd');
    }
  };

  if (loading) {
    return <Loading type="messages" />;
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadConversations}
        type="messages"
      />
    );
  }

  if (conversations.length === 0) {
    return (
      <Empty 
        type="messages"
        onAction={() => window.location.href = '/browse'}
      />
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
      </div>
      
      <div className="overflow-y-auto h-full">
        {conversations.map((conversation) => (
          <motion.div
            key={conversation.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`conversation-item ${selectedConversationId === conversation.Id ? 'active' : ''} ${conversation.unread ? 'unread' : ''}`}
            onClick={() => onConversationSelect(conversation)}
          >
            <div className="flex items-center gap-3">
              <Avatar 
                src={conversation.otherUser?.avatar} 
                name={conversation.otherUser?.name}
                size="md"
                online={conversation.otherUser?.online}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800 truncate">
                    {conversation.otherUser?.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="conversation-time">
                      {formatTime(conversation.lastMessage?.timestamp)}
                    </span>
                    {conversation.unread && (
                      <span className="unread-badge"></span>
                    )}
                  </div>
                </div>
                
                <p className="conversation-preview">
                  {conversation.lastMessage?.content || 'No messages yet'}
                </p>
                
                {conversation.service && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-primary">
                      Re: {conversation.service.title}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;