import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Heart, Eye, MessageCircle, Plus, ChevronRight, Play, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VideoList {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    username: string;
    avatar: string;
  };
  videoCount: number;
  likes: number;
  views: number;
  comments: number;
  thumbnails: string[];
  featured?: boolean;
  category?: string;
  createdAt: string;
}

const ListsPage = () => {
  const [lists, setLists] = useState<VideoList[]>([]);
  const [featuredLists, setFeaturedLists] = useState<VideoList[]>([]);
  const [popularLists, setPopularLists] = useState<VideoList[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLists, setFilteredLists] = useState<VideoList[]>([]);

  // Mock data for lists
  const mockLists: VideoList[] = [
    // Featured Lists
    {
      id: "1",
      title: "Top 250 Narrative Feature Films",
      description: "The definitive ranking of narrative cinema's greatest achievements",
      creator: {
        name: "Dave Vie",
        username: "davevie",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      videoCount: 250,
      likes: 15420,
      views: 89500,
      comments: 2340,
      thumbnails: [
        "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg",
        "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg"
      ],
      featured: true,
      category: "Cinema",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      title: "Most Fans on Letterboxd",
      description: "The most beloved and widely followed creators on the platform",
      creator: {
        name: "Jack Moulton",
        username: "jackmoulton",
        avatar: "https://i.pravatar.cc/150?img=2"
      },
      videoCount: 100,
      likes: 8920,
      views: 45600,
      comments: 1250,
      thumbnails: [
        "https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XvlO5SBG8hM/maxresdefault.jpg",
        "https://i.ytimg.com/vi/MzPrsmk0pnA/maxresdefault.jpg",
        "https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg"
      ],
      featured: true,
      category: "Community",
      createdAt: "2024-02-20"
    },
    {
      id: "3",
      title: "One Million Watched Club",
      description: "Videos that have achieved the coveted million-view milestone",
      creator: {
        name: "Alexander",
        username: "alexander",
        avatar: "https://i.pravatar.cc/150?img=3"
      },
      videoCount: 75,
      likes: 12340,
      views: 67800,
      comments: 890,
      thumbnails: [
        "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
        "https://i.ytimg.com/vi/WJ3-F02-F_Y/maxresdefault.jpg",
        "https://i.ytimg.com/vi/HG6LRH-kJQ0/maxresdefault.jpg",
        "https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg"
      ],
      featured: true,
      category: "Viral",
      createdAt: "2024-03-10"
    },
    // Popular This Week
    {
      id: "4",
      title: "Saved for Sunday",
      description: "Perfect videos for a lazy Sunday afternoon",
      creator: {
        name: "Sarah Chen",
        username: "sarahwatches",
        avatar: "https://i.pravatar.cc/150?img=4"
      },
      videoCount: 42,
      likes: 3420,
      views: 18900,
      comments: 567,
      thumbnails: [
        "https://i.ytimg.com/vi/NWONeJKn6kc/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XwfzqCDuQCQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg"
      ],
      category: "Chill",
      createdAt: "2024-11-01"
    },
    {
      id: "5",
      title: "Desert Island Videos",
      description: "If you could only watch these videos for the rest of your life",
      creator: {
        name: "Mike Rodriguez",
        username: "mikefilms",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      videoCount: 25,
      likes: 5670,
      views: 23400,
      comments: 890,
      thumbnails: [
        "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg",
        "https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XvlO5SBG8hM/maxresdefault.jpg"
      ],
      category: "Essential",
      createdAt: "2024-10-28"
    },
    {
      id: "6",
      title: "Peak Internet",
      description: "The absolute pinnacle of online video content",
      creator: {
        name: "Emma Davis",
        username: "emmawatches",
        avatar: "https://i.pravatar.cc/150?img=6"
      },
      videoCount: 38,
      likes: 4320,
      views: 19800,
      comments: 654,
      thumbnails: [
        "https://i.ytimg.com/vi/MzPrsmk0pnA/maxresdefault.jpg",
        "https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg",
        "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
        "https://i.ytimg.com/vi/WJ3-F02-F_Y/maxresdefault.jpg"
      ],
      category: "Culture",
      createdAt: "2024-11-05"
    },
    // More lists
    {
      id: "7",
      title: "The Greatest Hits",
      description: "Timeless classics that never get old",
      creator: {
        name: "Alex Thompson",
        username: "alexfilms",
        avatar: "https://i.pravatar.cc/150?img=7"
      },
      videoCount: 50,
      likes: 2890,
      views: 15600,
      comments: 423,
      thumbnails: [
        "https://i.ytimg.com/vi/HG6LRH-kJQ0/maxresdefault.jpg",
        "https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg",
        "https://i.ytimg.com/vi/NWONeJKn6kc/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XwfzqCDuQCQ/maxresdefault.jpg"
      ],
      category: "Classic",
      createdAt: "2024-10-15"
    },
    {
      id: "8",
      title: "Internet Gold",
      description: "Hidden gems and viral sensations worth your time",
      creator: {
        name: "Jordan Kim",
        username: "jordanwatches",
        avatar: "https://i.pravatar.cc/150?img=8"
      },
      videoCount: 67,
      likes: 3450,
      views: 21200,
      comments: 789,
      thumbnails: [
        "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg",
        "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg"
      ],
      category: "Discovery",
      createdAt: "2024-11-02"
    },
    {
      id: "9",
      title: "Tiny Desk–Style Performances",
      description: "Intimate musical performances that capture the soul",
      creator: {
        name: "Maria Lopez",
        username: "mariamusic",
        avatar: "https://i.pravatar.cc/150?img=9"
      },
      videoCount: 34,
      likes: 2340,
      views: 12800,
      comments: 345,
      thumbnails: [
        "https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XvlO5SBG8hM/maxresdefault.jpg",
        "https://i.ytimg.com/vi/MzPrsmk0pnA/maxresdefault.jpg",
        "https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg"
      ],
      category: "Music",
      createdAt: "2024-10-22"
    },
    {
      id: "10",
      title: "Explained in 5 Minutes",
      description: "Complex topics made simple and digestible",
      creator: {
        name: "Chris Wilson",
        username: "chrisexplains",
        avatar: "https://i.pravatar.cc/150?img=10"
      },
      videoCount: 89,
      likes: 4560,
      views: 28900,
      comments: 1230,
      thumbnails: [
        "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
        "https://i.ytimg.com/vi/WJ3-F02-F_Y/maxresdefault.jpg",
        "https://i.ytimg.com/vi/HG6LRH-kJQ0/maxresdefault.jpg",
        "https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg"
      ],
      category: "Educational",
      createdAt: "2024-11-08"
    },
    {
      id: "11",
      title: "Tech I Actually Understood",
      description: "Technology videos that don't make your brain hurt",
      creator: {
        name: "Lisa Chen",
        username: "lisatech",
        avatar: "https://i.pravatar.cc/150?img=11"
      },
      videoCount: 45,
      likes: 3210,
      views: 17600,
      comments: 567,
      thumbnails: [
        "https://i.ytimg.com/vi/NWONeJKn6kc/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XwfzqCDuQCQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg"
      ],
      category: "Tech",
      createdAt: "2024-10-30"
    },
    {
      id: "12",
      title: "Chaotic Energy Only",
      description: "Pure, unfiltered chaos in video form",
      creator: {
        name: "Tyler Brooks",
        username: "tylerchaos",
        avatar: "https://i.pravatar.cc/150?img=12"
      },
      videoCount: 56,
      likes: 6780,
      views: 34500,
      comments: 1890,
      thumbnails: [
        "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg",
        "https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XvlO5SBG8hM/maxresdefault.jpg"
      ],
      category: "Comedy",
      createdAt: "2024-11-03"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const featured = mockLists.filter(list => list.featured);
      const popular = mockLists.filter(list => !list.featured).slice(0, 6);
      const all = mockLists.filter(list => !list.featured);
      
      setFeaturedLists(featured);
      setPopularLists(popular);
      setLists(all);
      setFilteredLists(all);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = lists.filter(list =>
      list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      list.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      list.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLists(filtered);
  }, [searchTerm, lists]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const ListCard = ({ list, featured = false }: { list: VideoList; featured?: boolean }) => (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${featured ? 'border-primary/20' : ''}`}>
      <Link to={`/lists/${list.id}`}>
        <div className="relative">
          {/* Thumbnail Grid */}
          <div className={`grid grid-cols-2 gap-1 ${featured ? 'aspect-[16/10]' : 'aspect-video'} overflow-hidden`}>
            {list.thumbnails.slice(0, 4).map((thumbnail, index) => (
              <div key={index} className="relative overflow-hidden">
                <img 
                  src={thumbnail} 
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
          
          {/* Overlay with play button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 rounded-full p-3">
                <Play className="h-6 w-6 text-gray-900 fill-current" />
              </div>
            </div>
          </div>
          
          {/* Video count badge */}
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {list.videoCount} videos
          </div>
        </div>
        
        <CardContent className={`${featured ? 'p-6' : 'p-4'}`}>
          <div className="space-y-3">
            <div>
              <h3 className={`${featured ? 'text-lg' : 'text-base'} font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2`}>
                {list.title}
              </h3>
              <p className={`${featured ? 'text-sm' : 'text-xs'} text-gray-600 line-clamp-2 mt-1`}>
                {list.description}
              </p>
            </div>
            
            {/* Creator info */}
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={list.creator.avatar} alt={list.creator.name} />
                <AvatarFallback className="text-xs">
                  {list.creator.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-500">
                Created by <span className="font-medium">{list.creator.name}</span>
              </span>
            </div>
            
            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Heart className="h-3 w-3" />
                  <span>{formatNumber(list.likes)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{formatNumber(list.views)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-3 w-3" />
                  <span>{formatNumber(list.comments)}</span>
                </div>
              </div>
              {list.category && (
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {list.category}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );

  const ListCardSkeleton = ({ featured = false }: { featured?: boolean }) => (
    <Card className="overflow-hidden">
      <Skeleton className={`w-full ${featured ? 'aspect-[16/10]' : 'aspect-video'}`} />
      <CardContent className={`${featured ? 'p-6' : 'p-4'}`}>
        <div className="space-y-3">
          <div>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full mt-2" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-8" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        {/* Header section */}
        <div className="bg-gray-900 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Collect, curate, and share. Lists are the perfect way to group videos.
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Discover handpicked collections of the best videos on the internet, or create your own to share with the community.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Plus className="h-5 w-5 mr-2" />
                Start your own list
              </Button>
            </div>
          </div>
        </div>

        {/* Search section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search lists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured lists section */}
        {featuredLists.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Featured Lists</h2>
                <Button variant="ghost" className="flex items-center gap-2 text-primary">
                  All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <ListCardSkeleton key={index} featured={true} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredLists.map((list) => (
                    <ListCard key={list.id} list={list} featured={true} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Popular this week section */}
        {popularLists.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Popular This Week</h2>
                <Button variant="ghost" className="flex items-center gap-2 text-primary">
                  More
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ListCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {popularLists.map((list) => (
                    <ListCard key={list.id} list={list} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* All lists section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {searchTerm ? `Search Results (${filteredLists.length})` : 'All Lists'}
              </h2>
              <p className="text-gray-600">
                {searchTerm 
                  ? `Lists matching "${searchTerm}"`
                  : 'Discover curated collections from our community'
                }
              </p>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 12 }).map((_, index) => (
                  <ListCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredLists.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-12 w-12 text-gray-400 mx-auto mb-4">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No lists found' : 'No lists yet'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm 
                    ? 'Try adjusting your search terms'
                    : 'Be the first to create a list!'
                  }
                </p>
                {searchTerm ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                  >
                    Clear search
                  </Button>
                ) : (
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first list
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredLists.map((list) => (
                  <ListCard key={list.id} list={list} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to action section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Create Your Own List</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Curate your favorite videos, share your discoveries, and help others find amazing content.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Plus className="h-5 w-5 mr-2" />
              Start Creating
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListsPage;