import { motion } from 'framer-motion';

const Loading = ({ type = 'services' }) => {
  const renderServicesSkeleton = () => (
    <div className="services-grid">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="service-card animate-pulse">
          <div className="skeleton h-48 w-full rounded-t-card"></div>
          <div className="p-4">
            <div className="skeleton h-4 w-3/4 mb-2 rounded"></div>
            <div className="skeleton h-3 w-full mb-2 rounded"></div>
            <div className="skeleton h-3 w-2/3 mb-4 rounded"></div>
            <div className="flex items-center justify-between">
              <div className="skeleton h-4 w-16 rounded"></div>
              <div className="skeleton h-4 w-12 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMessagesSkeleton = () => (
    <div className="flex h-full">
      <div className="w-1/3 border-r border-gray-200">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 border-b border-gray-100 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="skeleton w-12 h-12 rounded-full"></div>
              <div className="flex-1">
                <div className="skeleton h-4 w-24 mb-2 rounded"></div>
                <div className="skeleton h-3 w-full rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 p-4">
        <div className="skeleton h-16 w-full rounded mb-4"></div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className="skeleton h-10 w-48 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrdersSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-card p-6 shadow-soft animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="skeleton h-6 w-48 rounded"></div>
            <div className="skeleton h-6 w-20 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="skeleton h-4 w-full rounded"></div>
            <div className="skeleton h-4 w-full rounded"></div>
            <div className="skeleton h-4 w-full rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProfileSkeleton = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-card p-6 shadow-soft animate-pulse">
        <div className="flex items-center gap-6">
          <div className="skeleton w-24 h-24 rounded-full"></div>
          <div className="flex-1">
            <div className="skeleton h-6 w-48 mb-2 rounded"></div>
            <div className="skeleton h-4 w-32 mb-4 rounded"></div>
            <div className="skeleton h-4 w-full rounded"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton h-20 rounded-card"></div>
        ))}
      </div>
    </div>
  );

  const renderDefaultSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-card p-6 shadow-soft animate-pulse">
          <div className="skeleton h-4 w-3/4 mb-4 rounded"></div>
          <div className="skeleton h-4 w-full mb-2 rounded"></div>
          <div className="skeleton h-4 w-2/3 rounded"></div>
        </div>
      ))}
    </div>
  );

  const skeletonTypes = {
    services: renderServicesSkeleton,
    messages: renderMessagesSkeleton,
    orders: renderOrdersSkeleton,
    profile: renderProfileSkeleton,
    default: renderDefaultSkeleton
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      {skeletonTypes[type] || skeletonTypes.default}
    </motion.div>
  );
};

export default Loading;