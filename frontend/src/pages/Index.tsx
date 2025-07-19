import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RecentActivity from '@/components/RecentActivity';
import PopularVideos from '@/components/PopularVideos';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';

const Index = () => {
  // Mock data for videos
  const popularVideos = [
    {
      id: "1",
      title: "How I Learned to Stop Worrying and Love AI",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      channelName: "TechTalks",
      year: "2023",
      rating: 4.5,
    },
    {
      id: "2",
      title: "Ultimate Guide to Web Development in 2025",
      thumbnail: "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg",
      channelName: "CodeMaster",
      year: "2025",
      rating: 4.8,
    },
    {
      id: "3",
      title: "The Future of Electric Vehicles",
      thumbnail: "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
      channelName: "TechReview",
      year: "2024",
      rating: 4.2,
    },
    {
      id: "4",
      title: "Making Sourdough Bread From Scratch",
      thumbnail: "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg",
      channelName: "FoodChannel",
      year: "2023",
      rating: 4.7,
    },
    {
      id: "5",
      title: "How to Start Investing in Stocks",
      thumbnail: "https://i.ytimg.com/vi/Vn3IRHhPXMo/maxresdefault.jpg",
      channelName: "FinanceExpert",
      year: "2024",
      rating: 4.9,
    },
  ];

  const recentVideos = [
    {
      id: "6",
      title: "Advanced Machine Learning Techniques",
      thumbnail: "https://i.ytimg.com/vi/NWONeJKn6kc/maxresdefault.jpg",
      channelName: "AI Academy",
      year: "2025",
      rating: 4.3,
    },
    {
      id: "7",
      title: "Home Renovation on a Budget",
      thumbnail: "https://i.ytimg.com/vi/XwfzqCDuQCQ/maxresdefault.jpg",
      channelName: "DIY Home",
      year: "2024",
      rating: 4.6,
    },
    {
      id: "8",
      title: "Learning Piano in 30 Days",
      thumbnail: "https://i.ytimg.com/vi/WJ3-F02-F_Y/maxresdefault.jpg",
      channelName: "MusicMaster",
      year: "2023",
      rating: 4.4,
    },
    {
      id: "9",
      title: "Traveling Through Japan",
      thumbnail: "https://i.ytimg.com/vi/HG6LRH-kJQ0/maxresdefault.jpg",
      channelName: "TravelVlogs",
      year: "2024",
      rating: 4.8,
    },
    {
      id: "10",
      title: "Full Body Workout at Home",
      thumbnail: "https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg",
      channelName: "FitLife",
      year: "2025",
      rating: 4.5,
    },
  ];

  // Mock data for activities
  const activities = [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "https://i.pravatar.cc/100?img=1",
        initials: "AJ",
      },
      action: "watched and rated ★★★★½",
      video: {
        title: "How I Learned to Stop Worrying and Love AI",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      user: {
        name: "Maria Garcia",
        avatar: "https://i.pravatar.cc/100?img=2",
        initials: "MG",
      },
      action: "added to watchlist",
      video: {
        title: "Ultimate Guide to Web Development in 2025",
        thumbnail: "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg",
      },
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      user: {
        name: "David Kim",
        avatar: "https://i.pravatar.cc/100?img=3",
        initials: "DK",
      },
      action: "rated ★★★★",
      video: {
        title: "The Future of Electric Vehicles",
        thumbnail: "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
      },
      timestamp: "Yesterday",
    },
    {
      id: "4",
      user: {
        name: "Sarah Wilson",
        avatar: "https://i.pravatar.cc/100?img=4",
        initials: "SW",
      },
      action: "reviewed",
      video: {
        title: "Making Sourdough Bread From Scratch",
        thumbnail: "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg",
      },
      timestamp: "2 days ago",
    },
  ];

  const [user, setUser] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function handleSignOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="gradient-letterboxd py-16 text-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl space-y-6">
              {user ? (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar src={user.picture || ''} alt={user.name} size={56} />
                    <div>
                      <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-foreground">
                        Welcome, {user.name}!
                      </h1>
                      <p className="text-lg text-muted-foreground">
                        Glad to have you back. Start exploring or create a new list!
                      </p>
                    </div>
                  </div>
                  <div className="space-x-4 mt-4">
                    <Link to="/lists">
                      <Button size="lg" className="get-started-btn">
                        Go to your lists
                      </Button>
                    </Link>
                    <Link to="/new-list">
                      <Button size="lg" variant="outline">
                        Create a new list
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-foreground">
                    We're everything youtube is missing.
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    The social network for Youtube lovers.
                  </p>
                  <div className="space-x-4">
                    <Link to="/auth">
                      <Button size="lg" className="get-started-btn">
                        Get started — it's free!
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Content section */}
        <section className="py-12">
          <div className="container mx-auto grid grid-cols-1 gap-12 px-4 lg:grid-cols-3">
            <div className="col-span-2 space-y-12">
              <PopularVideos videos={popularVideos} title="Popular this week" />
              <Separator className="separator-letterboxd" />
              <PopularVideos videos={recentVideos} title="Recently added" />
            </div>
            
            <div className="space-y-8">
              <div className="card-letterboxd p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Join today</h3>
                <p className="mb-6 text-muted-foreground">
                  Keep track of every video you've ever watched or just start from the day you join. Rate, review and tag as you go.
                </p>
                <Link to="/auth">
                  <Button className="btn-letterboxd w-full">
                    Create an account
                  </Button>
                </Link>
              </div>
              
              <RecentActivity activities={activities} />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;