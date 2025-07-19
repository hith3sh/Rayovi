import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VideoCard from '@/components/VideoCard';
import { Eye, List, ThumbsUp, Users, Video, Star, MoreHorizontal, Settings, Heart, MessageCircle, Calendar, Search, Rss } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  // Mock user data
  const userData = {
    username: "hith3sh",
    name: "Hitesh Kumar",
    avatar: "https://i.pravatar.cc/300?img=12",
    bio: "YouTube enthusiast. I love tech videos, documentaries, and music covers. Always looking for hidden gems!",
    stats: {
      videos: 3,
      lists: 12,
      likes: 209,
      followers: 9,
      following: 5,
    },
    joinDate: "Member since March 2023",
    location: "San Francisco, CA",
    website: "https://hitesh.dev"
  };

  // Mock video data for recent likes
  const recentLikes = [
    {
      id: "101",
      title: "The Imitation Game",
      thumbnail: "https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg",
      channelName: "FilmStudio",
      year: "2014",
      rating: 4.5,
    },
    {
      id: "102",
      title: "Shutter Island",
      thumbnail: "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
      channelName: "Paramount",
      year: "2010",
      rating: 4.8,
    },
    {
      id: "103",
      title: "Inception",
      thumbnail: "https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg",
      channelName: "Warner Bros",
      year: "2010",
      rating: 4.9,
    },
    {
      id: "104",
      title: "Interstellar",
      thumbnail: "https://i.ytimg.com/vi/XvlO5SBG8hM/maxresdefault.jpg",
      channelName: "Paramount",
      year: "2014",
      rating: 4.7,
    },
  ];

  // Mock data for favorite videos
  const favoriteVideos = [
    {
      id: "f1",
      title: "The Dark Knight",
      thumbnail: "https://i.ytimg.com/vi/MzPrsmk0pnA/maxresdefault.jpg",
      channelName: "Warner Bros",
      year: "2008",
      rating: 5.0,
    },
    {
      id: "f2",
      title: "Pulp Fiction",
      thumbnail: "https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg",
      channelName: "Miramax",
      year: "1994",
      rating: 5.0,
    },
    {
      id: "f3",
      title: "The Godfather",
      thumbnail: "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
      channelName: "Paramount",
      year: "1972",
      rating: 5.0,
    },
    {
      id: "f4",
      title: "Goodfellas",
      thumbnail: "https://i.ytimg.com/vi/WJ3-F02-F_Y/maxresdefault.jpg",
      channelName: "Warner Bros",
      year: "1990",
      rating: 5.0,
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

  // Mock following data
  const following = [
    {
      id: "401",
      name: "Sarah Wilson",
      username: "sarahw",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "402",
      name: "Mike Chen",
      username: "mikeseesvideos",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: "403",
      name: "Taylor Reed",
      username: "taylorwatches",
      avatar: "https://i.pravatar.cc/150?img=26",
    },
    {
      id: "404",
      name: "Jamie Lopez",
      username: "videocritic88",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    {
      id: "405",
      name: "Chris Johnson",
      username: "cj_reviews",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Profile header - matching the uploaded design */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Avatar and basic info */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 border-4 border-border shadow-lg avatar-letterboxd mb-4">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="text-2xl bg-muted text-muted-foreground">
                    {userData.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {/* Stats in a compact layout */}
                <div className="flex items-center gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">{userData.stats.videos}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Videos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{userData.stats.following}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Following</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{userData.stats.followers}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Followers</div>
                  </div>
                </div>
              </div>
              
              {/* Profile info and actions */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">{userData.username}</h1>
                      <Button size="sm" variant="outline" className="btn-letterboxd-outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button size="sm" variant="ghost" className="btn-letterboxd-ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-3">{userData.bio}</p>
                    <p className="text-sm text-muted-foreground">{userData.joinDate}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="btn-letterboxd-ghost">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="btn-letterboxd-ghost">
                      <Rss className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation tabs - matching the uploaded design */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-transparent border-none p-0 h-auto">
                <TabsTrigger 
                  value="profile" 
                  className="bg-transparent border-b-2 border-transparent px-4 py-3 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="activity" 
                  className="bg-transparent border-b-2 border-transparent px-4 py-3 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger 
                  value="films" 
                  className="bg-transparent border-b-2 border-transparent px-4 py-3 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
                >
                  Films
                </TabsTrigger>
                <TabsTrigger 
                  value="diary" 
                  className="bg-transparent border-b-2 border-transparent px-4 py-3 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
                >
                  Diary
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="bg-transparent border-b-2 border-transparent px-4 py-3 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger 
                  value="watchlist" 
                  className="bg-transparent border-b-2 border-transparent px-4 py-3 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
                >
                  Watchlist
                </TabsTrigger>
                <TabsTrigger 
                  value="lists" 
                  className="bg-transparent border-b-2 border-transparent px-4 py-3 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
                >
                  Lists
                </TabsTrigger>
                <TabsTrigger 
                  value="likes" 
                  className="bg-transparent border-b-2 border-transparent px-4 py-3 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
                >
                  Likes
                </TabsTrigger>
                <TabsTrigger 
                  value="tags" 
                  className="bg-transparent border-b-2 border-transparent px-4 py-3 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
                >
                  Tags
                </TabsTrigger>
                <TabsTrigger 
                  value="network" 
                  className="bg-transparent border-b-2 border-transparent px-4 py-3 rounded-none data-[state=active]:border-primary data-[state=active]:bg-transparent text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
                >
                  Network
                </TabsTrigger>
              </TabsList>
              
              {/* Main content area */}
              <div className="container mx-auto px-4 py-8">
                {/* Profile tab content */}
                <TabsContent value="profile" className="space-y-8 mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left column - Main content */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Favorite Films section */}
                      <section>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-semibold text-foreground uppercase tracking-wide">Favorite Films</h2>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            ALL
                          </Button>
                        </div>
                        <p className="text-muted-foreground mb-6 text-sm">
                          Don't forget to select your <Link to="/films" className="text-primary hover:underline">favorite films</Link>!
                        </p>
                      </section>

                      {/* Recent Likes section */}
                      <section>
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-lg font-semibold text-foreground uppercase tracking-wide">Recent Likes</h2>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            ALL
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {recentLikes.map((video) => (
                            <div key={video.id} className="group">
                              <Link to={`/video/${video.id}`}>
                                <div className="aspect-[2/3] overflow-hidden rounded-md bg-muted transition-transform duration-300 group-hover:scale-105">
                                  <img 
                                    src={video.thumbnail} 
                                    alt={video.title}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    {/* Right column - Sidebar */}
                    <div className="space-y-8">
                      {/* Following section */}
                      <section>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Following</h3>
                          <span className="text-sm text-muted-foreground">{userData.stats.following}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {following.map((person) => (
                            <Link key={person.id} to={`/user/${person.username}`}>
                              <Avatar className="h-10 w-10 border border-border hover:border-primary transition-colors avatar-letterboxd">
                                <AvatarImage src={person.avatar} alt={person.name} />
                                <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                                  {person.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            </Link>
                          ))}
                        </div>
                      </section>

                      {/* Ratings section */}
                      <section>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Ratings</h3>
                          <span className="text-sm text-muted-foreground">3</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                              ))}
                            </div>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }} />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                              ))}
                              <Star className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }} />
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Activity section */}
                      <section>
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">Activity</h3>
                        <p className="text-muted-foreground text-sm">No recent activity</p>
                      </section>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Activity tab content */}
                <TabsContent value="activity" className="space-y-6 mt-0">
                  <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <Card key={index} className="card-letterboxd">
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
                                <span className="font-medium text-muted-foreground">
                                  {activity.type === 'watched' && 'Watched'}
                                  {activity.type === 'rated' && 'Rated ★★★★½'}
                                  {activity.type === 'listed' && `Added to ${activity.list}`}
                                  {activity.type === 'reviewed' && 'Reviewed'}
                                </span>
                              </div>
                              <h3 className="mt-1 font-medium line-clamp-1 hover:underline text-foreground">
                                <a href={`/video/${activity.video.id}`}>{activity.video.title}</a>
                              </h3>
                              {activity.type === 'reviewed' && (
                                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{activity.reviewSnippet}</p>
                              )}
                              <div className="mt-1 text-xs text-muted-foreground">
                                {activity.timestamp}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Films tab content */}
                <TabsContent value="films" className="space-y-6 mt-0">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4 text-foreground">Watched Films</h2>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {favoriteVideos.map((video) => (
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
                  </div>
                </TabsContent>
                
                {/* Lists tab content */}
                <TabsContent value="lists" className="space-y-6 mt-0">
                  <h2 className="text-xl font-semibold mb-4 text-foreground">My Video Lists</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {videoLists.map((list) => (
                      <Card key={list.id} className="card-letterboxd hover:shadow-md transition-shadow">
                        <a href={`/lists/${list.id}`}>
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={list.thumbnail} 
                              alt={list.title}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium text-foreground">{list.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{list.description}</p>
                            <p className="mt-2 text-xs text-muted-foreground">{list.videoCount} videos</p>
                          </CardContent>
                        </a>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Other tabs with placeholder content */}
                <TabsContent value="diary" className="mt-0">
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No diary entries yet</h3>
                    <p className="text-muted-foreground">Start logging your video watching journey!</p>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-0">
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No reviews yet</h3>
                    <p className="text-muted-foreground">Share your thoughts on videos you've watched!</p>
                  </div>
                </TabsContent>

                <TabsContent value="watchlist" className="mt-0">
                  <div className="text-center py-12">
                    <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Your watchlist is empty</h3>
                    <p className="text-muted-foreground">Add videos you want to watch later!</p>
                  </div>
                </TabsContent>

                <TabsContent value="likes" className="mt-0">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {recentLikes.map((video) => (
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
                </TabsContent>

                <TabsContent value="tags" className="mt-0">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-foreground mb-2">No tags yet</h3>
                    <p className="text-muted-foreground">Organize your videos with custom tags!</p>
                  </div>
                </TabsContent>

                <TabsContent value="network" className="mt-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {following.map((person) => (
                      <Card key={person.id} className="card-letterboxd">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="avatar-letterboxd">
                              <AvatarImage src={person.avatar} alt={person.name} />
                              <AvatarFallback className="bg-muted text-muted-foreground">
                                {person.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium hover:underline text-foreground">
                                <a href={`/user/${person.username}`}>{person.name}</a>
                              </h3>
                              <p className="text-sm text-muted-foreground">@{person.username}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;