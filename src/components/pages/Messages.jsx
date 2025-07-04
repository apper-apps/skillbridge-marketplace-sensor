import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ConversationList from '@/components/organisms/ConversationList';
import ChatWindow from '@/components/organisms/ChatWindow';

const Messages = () => {
  const [searchParams] = useSearchParams();
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-card shadow-soft overflow-hidden" style={{ height: '600px' }}>
        <div className="flex h-full">
          {/* Conversation List */}
          <div className="w-full md:w-1/3 border-r border-gray-200">
            <ConversationList 
              onConversationSelect={handleConversationSelect}
              selectedConversationId={selectedConversation?.Id}
            />
          </div>
          
          {/* Chat Window */}
          <div className="hidden md:block w-2/3">
            <ChatWindow 
              conversationId={selectedConversation?.Id}
              otherUser={selectedConversation?.otherUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;