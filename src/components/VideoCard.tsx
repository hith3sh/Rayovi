
import React from 'react';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  year: string;
  rating?: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  id, 
  title, 
  thumbnail, 
  channelName, 
  year, 
  rating 
}) => {
  return (
    <div className="video-card">
      <Link to={`/video/${id}`}>
        <div className="relative overflow-hidden rounded-md">
          <img 
            src={thumbnail} 
            alt={title}
            className="video-card-image"
          />
          {rating && (
            <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
              {rating.toFixed(1)}
            </div>
          )}
        </div>
        <div className="mt-2">
          <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            <span>{channelName}</span>
            <span className="mx-1">•</span>
            <span>{year}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
