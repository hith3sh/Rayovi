
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  video: {
    title: string;
    thumbnail: string;
  };
  timestamp: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 rounded-lg p-3 transition hover:bg-gray-50">
            <Avatar className="h-8 w-8">
              {activity.user.avatar ? (
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              ) : (
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center space-x-1">
                <span className="font-medium">{activity.user.name}</span>
                <span className="text-gray-600">{activity.action}</span>
                <span className="font-medium">{activity.video.title}</span>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {activity.timestamp}
              </div>
            </div>
            <div className="flex-shrink-0">
              <img 
                src={activity.video.thumbnail} 
                alt={activity.video.title} 
                className="h-12 w-20 rounded-md object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
