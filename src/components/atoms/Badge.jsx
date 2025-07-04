const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary bg-opacity-10 text-primary',
    secondary: 'bg-secondary bg-opacity-10 text-green-800',
    accent: 'bg-accent bg-opacity-10 text-pink-800',
    success: 'bg-success bg-opacity-10 text-green-800',
    warning: 'bg-warning bg-opacity-10 text-yellow-800',
    error: 'bg-error bg-opacity-10 text-red-800',
    info: 'bg-info bg-opacity-10 text-blue-800'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const badgeClasses = `
    inline-flex items-center rounded-full font-medium
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;