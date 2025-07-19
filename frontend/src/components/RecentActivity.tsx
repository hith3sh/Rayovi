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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="card-letterboxd p-4 transition-all duration-200 material-hover">
            <div className="flex items-start space-x-3">
              <Avatar className="avatar-letterboxd h-8 w-8">
                {activity.user.avatar ? (
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                ) : (
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {activity.user.initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-center space-x-1">
                  <span className="font-medium text-foreground">{activity.user.name}</span>
                  <span className="text-muted-foreground">{activity.action}</span>
                  <span className="font-medium text-foreground hover:text-primary transition-colors duration-200">
                    {activity.video.title}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {activity.timestamp}
                </div>
              </div>
              <div className="flex-shrink-0">
                <img 
                  src={activity.video.thumbnail} 
                  alt={activity.video.title} 
                  className="h-12 w-20 rounded object-cover transition-transform duration-200"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;