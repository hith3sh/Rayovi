
import React from 'react';
import VideoCard from './VideoCard';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  year: string;
  rating?: number;
}

interface PopularVideosProps {
  videos: Video[];
  title: string;
}

const PopularVideos: React.FC<PopularVideosProps> = ({ videos, title }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <a href="#" className="text-sm text-primary hover:underline">View all</a>
      </div>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            channelName={video.channelName}
            year={video.year}
            rating={video.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularVideos;
