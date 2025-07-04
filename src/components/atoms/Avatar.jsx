const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  name, 
  className = '',
  online = false 
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const avatarClasses = `
    ${sizes[size]} rounded-full flex items-center justify-center
    relative ${className}
  `;

  return (
    <div className={avatarClasses}>
      {src ? (
        <img 
          src={src} 
          alt={alt || name} 
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
          {getInitials(name)}
        </div>
      )}
      {online && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-white rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;