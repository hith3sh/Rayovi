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
    <div className="video-card card-letterboxd">
      <Link to={`/video/${id}`}>
        <div className="relative overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title}
            className="video-card-image"
          />
          {rating && (
            <div className="absolute bottom-2 right-2 rounded bg-background/90 px-2 py-1 text-xs text-foreground backdrop-blur-sm">
              {rating.toFixed(1)}
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 text-foreground hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
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