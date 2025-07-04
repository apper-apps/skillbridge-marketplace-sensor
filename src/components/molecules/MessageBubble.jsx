import { format } from 'date-fns';
import Avatar from '@/components/atoms/Avatar';

const MessageBubble = ({ message, isOwn = false, showAvatar = true }) => {
  const formatTime = (timestamp) => {
    return format(new Date(timestamp), 'HH:mm');
  };

  return (
    <div className={`flex items-end gap-2 mb-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {showAvatar && !isOwn && (
        <Avatar 
          src={message.sender?.avatar} 
          name={message.sender?.name}
          size="sm"
        />
      )}
      
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className={`message-bubble ${isOwn ? 'sent' : 'received'}`}>
          <p className="text-sm">{message.content}</p>
        </div>
        
        <div className={`message-timestamp ${isOwn ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;