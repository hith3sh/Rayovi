
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import VideoCard from '@/components/VideoCard';
import { Eye, List, ThumbsUp, Users, Video } from 'lucide-react';

const ProfilePage = () => {
  // Mock user data
  const userData = {
    username: "videoLover42",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/300?img=12",
    bio: "YouTube enthusiast. I love tech videos, documentaries, and music covers. Always looking for hidden gems!",
    stats: {
      videos: 347,
      lists: 12,
      likes: 209,
      followers: 156,
      following: 89,
    },
    joinDate: "Member since March 2023"
  };

  // Mock video data
  const likedVideos = [
    {
      id: "101",
      title: "10 Tech Predictions for 2025",
      thumbnail: "https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg",
      channelName: "FutureTech",
      year: "2024",
      rating: 4.8,
    },
    {
      id: "102",
      title: "Making the Perfect Homemade Pizza",
      thumbnail: "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
      channelName: "ChefMaster",
      year: "2023",
      rating: 4.9,
    },
    {
      id: "103",
      title: "History of Space Exploration",
      thumbnail: "https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg",
      channelName: "ScienceHub",
      year: "2024",
      rating: 4.7,
    },
    {
      id: "104",
      title: "Building a Minimalist Workspace",
      thumbnail: "https://i.ytimg.com/vi/XvlO5SBG8hM/maxresdefault.jpg",
      channelName: "MinimalLiving",
      year: "2023",
      rating: 4.5,
    },
  ];

  const recentActivity = [
    {
      type: "watched",
      video: {
        id: "201",
        title: "Morning Productivity Routine",
        thumbnail: "https://i.ytimg.com/vi/MzPrsmk0pnA/maxresdefault.jpg",
        channelName: "ProductivityGuru",
        year: "2025",
      },
      timestamp: "2 hours ago"
    },
    {
      type: "rated",
      video: {
        id: "202",
        title: "The Future of Electric Vehicles",
        thumbnail: "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
        channelName: "TechReview",
        year: "2024",
      },
      rating: 4.5,
      timestamp: "Yesterday"
    },
    {
      type: "listed",
      video: {
        id: "203",
        title: "Ultimate Guide to Web Development in 2025",
        thumbnail: "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg",
        channelName: "CodeMaster",
        year: "2025",
      },
      list: "Must-Watch Tech Tutorials",
      timestamp: "3 days ago"
    },
    {
      type: "reviewed",
      video: {
        id: "204",
        title: "Making Sourdough Bread From Scratch",
        thumbnail: "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg",
        channelName: "FoodChannel",
        year: "2023",
      },
      reviewSnippet: "This is the best tutorial I've seen on sourdough bread making...",
      timestamp: "Last week"
    },
  ];

  // Mock lists data
  const videoLists = [
    {
      id: "301",
      title: "Must-Watch Tech Tutorials",
      description: "The best tech tutorials that helped me learn new skills",
      videoCount: 18,
      thumbnail: "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg",
    },
    {
      id: "302",
      title: "Favorite Documentaries",
      description: "Mind-blowing documentaries about nature and science",
      videoCount: 12,
      thumbnail: "https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg",
    },
    {
      id: "303",
      title: "Cooking Recipes to Try",
      description: "Delicious recipes I want to make someday",
      videoCount: 24,
      thumbnail: "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
    },
  ];

  // Mock friends data
  const friends = [
    {
      id: "401",
      name: "Sarah Wilson",
      username: "sarahw",
      avatar: "https://i.pravatar.cc/150?img=5",
      mutualFriends: 12,
    },
    {
      id: "402",
      name: "Mike Chen",
      username: "mikeseesvideos",
      avatar: "https://i.pravatar.cc/150?img=8",
      mutualFriends: 5,
    },
    {
      id: "403",
      name: "Taylor Reed",
      username: "taylorwatches",
      avatar: "https://i.pravatar.cc/150?img=26",
      mutualFriends: 8,
    },
    {
      id: "404",
      name: "Jamie Lopez",
      username: "videocritic88",
      avatar: "https://i.pravatar.cc/150?img=33",
      mutualFriends: 3,
    },
    {
      id: "405",
      name: "Chris Johnson",
      username: "cj_reviews",
      avatar: "https://i.pravatar.cc/150?img=15",
      mutualFriends: 7,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        {/* Profile header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                    <p className="text-gray-500 text-sm">@{userData.username}</p>
                  </div>
                  <p className="text-sm text-gray-500">{userData.joinDate}</p>
                </div>
                
                <p className="mt-2 text-gray-700">{userData.bio}</p>
                
                <div className="mt-4 flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Video size={16} />
                    <span><strong>{userData.stats.videos}</strong> videos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <List size={16} />
                    <span><strong>{userData.stats.lists}</strong> lists</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={16} />
                    <span><strong>{userData.stats.likes}</strong> likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span><strong>{userData.stats.followers}</strong> followers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span><strong>{userData.stats.following}</strong> following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content with tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="mb-8 border-b w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="activity" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger 
                value="videos" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger 
                value="lists" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Lists
              </TabsTrigger>
              <TabsTrigger 
                value="friends" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Friends
              </TabsTrigger>
            </TabsList>
            
            {/* Activity tab content */}
            <TabsContent value="activity" className="space-y-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-28 flex-shrink-0 overflow-hidden rounded">
                          <img 
                            src={activity.video.thumbnail} 
                            alt={activity.video.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center text-sm">
                            <span className="font-medium text-gray-600">
                              {activity.type === 'watched' && 'Watched'}
                              {activity.type === 'rated' && 'Rated ★★★★½'}
                              {activity.type === 'listed' && `Added to ${activity.list}`}
                              {activity.type === 'reviewed' && 'Reviewed'}
                            </span>
                          </div>
                          <h3 className="mt-1 font-medium line-clamp-1 hover:underline">
                            <a href={`/video/${activity.video.id}`}>{activity.video.title}</a>
                          </h3>
                          {activity.type === 'reviewed' && (
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{activity.reviewSnippet}</p>
                          )}
                          <div className="mt-1 text-xs text-gray-500">
                            {activity.timestamp}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Videos tab content */}
            <TabsContent value="videos" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Liked Videos</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {likedVideos.map((video) => (
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
                
                <Separator />
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recently Watched</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {recentActivity
                      .filter(activity => activity.type === 'watched')
                      .map((activity) => (
                      <VideoCard
                        key={activity.video.id}
                        id={activity.video.id}
                        title={activity.video.title}
                        thumbnail={activity.video.thumbnail}
                        channelName={activity.video.channelName}
                        year={activity.video.year}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Lists tab content */}
            <TabsContent value="lists" className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">My Video Lists</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {videoLists.map((list) => (
                  <Card key={list.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <a href={`/lists/${list.id}`}>
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={list.thumbnail} 
                          alt={list.title}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{list.title}</h3>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{list.description}</p>
                        <p className="mt-2 text-xs text-gray-500">{list.videoCount} videos</p>
                      </CardContent>
                    </a>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Friends tab content */}
            <TabsContent value="friends" className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Friends ({friends.length})</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {friends.map((friend) => (
                  <Card key={friend.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback>{friend.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium hover:underline">
                            <a href={`/user/${friend.username}`}>{friend.name}</a>
                          </h3>
                          <p className="text-sm text-gray-500">@{friend.username}</p>
                          {friend.mutualFriends > 0 && (
                            <p className="mt-1 text-xs text-gray-500">{friend.mutualFriends} mutual friends</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
