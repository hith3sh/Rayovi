import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Plus, Eye } from 'lucide-react';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  year: string;
  rating?: number;
  watched?: boolean;
  onAddToList?: (videoId: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  id, 
  title, 
  thumbnail, 
  channelName, 
  year, 
  rating,
  watched,
  onAddToList
}) => {
  const handleAddToList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToList) {
      onAddToList(id);
    }
  };

  return (
    <div className="video-card card-letterboxd group relative material-hover">
      <Link to={`/video/${id}`}>
        <div className="relative overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title}
            className="video-card-image"
          />
          
          {/* Watched Badge */}
          {watched && (
            <div className="absolute top-2 left-2 bg-background/90 text-foreground rounded px-2 py-1 text-xs font-medium backdrop-blur-sm flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Watched
            </div>
          )}
          
          {/* Add to List Button */}
          {onAddToList && (
            <Button
              size="sm"
              onClick={handleAddToList}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm"
            >
              <Plus className="h-3 w-3" />
            </Button>
          )}
          
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