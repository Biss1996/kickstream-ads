import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AdPlaceholderProps {
  type: 'banner' | 'interstitial' | 'rewarded';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, size = 'medium', className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-16';
      case 'large':
        return 'h-48';
      default:
        return 'h-24';
    }
  };

  const getTypeInfo = () => {
    switch (type) {
      case 'interstitial':
        return { title: 'Interstitial Ad', bg: 'bg-gradient-to-r from-blue-500 to-purple-600' };
      case 'rewarded':
        return { title: 'Rewarded Ad', bg: 'bg-gradient-to-r from-yellow-500 to-orange-600' };
      default:
        return { title: 'Banner Ad', bg: 'bg-gradient-to-r from-field-green to-field-green-light' };
    }
  };

  const { title, bg } = getTypeInfo();

  return (
    <div className={`${getSizeClasses()} ${bg} rounded-lg flex items-center justify-center text-white relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative flex items-center gap-2 text-center">
        <ExternalLink className="w-4 h-4" />
        <div>
          <p className="font-medium text-sm">[{title} Space]</p>
          <p className="text-xs opacity-80">TopOn + FAN Integration Ready</p>
        </div>
      </div>
      <div className="absolute top-2 right-2 text-xs opacity-60 font-mono">
        {type.toUpperCase()}
      </div>
    </div>
  );
};

export default AdPlaceholder;