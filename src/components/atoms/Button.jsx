import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary text-white',
    secondary: 'btn-secondary text-green-800',
    accent: 'bg-gradient-to-r from-accent to-warning text-pink-800',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary hover:bg-opacity-10',
    danger: 'bg-error text-white hover:bg-opacity-90'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const baseClasses = `
    rounded-full font-medium transition-all duration-200 
    flex items-center justify-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
    shadow-soft hover:shadow-soft-lg
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  const content = (
    <>
      {loading && <ApperIcon name="Loader2" size={20} className="animate-spin" />}
      {!loading && icon && iconPosition === 'left' && (
        <ApperIcon name={icon} size={20} />
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <ApperIcon name={icon} size={20} />
      )}
    </>
  );

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;