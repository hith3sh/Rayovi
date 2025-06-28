import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import VideoCard from './VideoCard';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  year: string;
  rating?: number;
  watched?: boolean;
}

interface VideoCarouselProps {
  title: string;
  videos: Video[];
  onAddToList?: (videoId: string) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ title, videos, onAddToList }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {videos.map((video) => (
            <CarouselItem key={video.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
              <VideoCard
                id={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                channelName={video.channelName}
                year={video.year}
                rating={video.rating}
                watched={video.watched}
                onAddToList={onAddToList}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default VideoCarousel;