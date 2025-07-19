import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import VideoCarousel from '@/components/VideoCarousel';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ChevronDown } from 'lucide-react';
import { toast } from "@/components/ui/sonner";
import { Link } from 'react-router-dom';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  year: string;
  rating?: number;
  watched?: boolean;
  category: string;
  uploadDate: string;
}

interface CategoryCard {
  id: string;
  name: string;
  gradient: string;
  thumbnail: string;
  videoCount: number;
}

const VideosPage = () => {
  const [sortBy, setSortBy] = useState<string>('most_recent');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [showCategories, setShowCategories] = useState(true);

  // Category cards with Spotify-style gradients
  const categoryCards: CategoryCard[] = [
    {
      id: 'tech',
      name: 'Technology',
      gradient: 'from-blue-500 to-purple-600',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoCount: 156
    },
    {
      id: 'music',
      name: 'Music',
      gradient: 'from-pink-500 to-rose-500',
      thumbnail: 'https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg',
      videoCount: 89
    },
    {
      id: 'comedy',
      name: 'Comedy',
      gradient: 'from-yellow-400 to-orange-500',
      thumbnail: 'https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg',
      videoCount: 67
    },
    {
      id: 'food',
      name: 'Food & Cooking',
      gradient: 'from-green-400 to-emerald-600',
      thumbnail: 'https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg',
      videoCount: 43
    },
    {
      id: 'documentary',
      name: 'Documentary',
      gradient: 'from-slate-600 to-slate-800',
      thumbnail: 'https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg',
      videoCount: 78
    },
    {
      id: 'travel',
      name: 'Travel',
      gradient: 'from-cyan-400 to-blue-500',
      thumbnail: 'https://i.ytimg.com/vi/HG6LRH-kJQ0/maxresdefault.jpg',
      videoCount: 52
    },
    {
      id: 'fitness',
      name: 'Fitness',
      gradient: 'from-red-500 to-pink-600',
      thumbnail: 'https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg',
      videoCount: 34
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      gradient: 'from-purple-500 to-indigo-600',
      thumbnail: 'https://i.ytimg.com/vi/XwfzqCDuQCQ/maxresdefault.jpg',
      videoCount: 91
    },
    {
      id: 'science',
      name: 'Science',
      gradient: 'from-teal-500 to-cyan-600',
      thumbnail: 'https://i.ytimg.com/vi/NWONeJKn6kc/maxresdefault.jpg',
      videoCount: 45
    },
    {
      id: 'film',
      name: 'Film & TV',
      gradient: 'from-violet-500 to-purple-700',
      thumbnail: 'https://i.ytimg.com/vi/MzPrsmk0pnA/maxresdefault.jpg',
      videoCount: 123
    },
    {
      id: 'gaming',
      name: 'Gaming',
      gradient: 'from-orange-500 to-red-600',
      thumbnail: 'https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg',
      videoCount: 87
    },
    {
      id: 'education',
      name: 'Educational',
      gradient: 'from-emerald-500 to-teal-600',
      thumbnail: 'https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg',
      videoCount: 76
    }
  ];

  // Mock data for trending videos
  const trendingVideos: Video[] = [
    {
      id: "t1",
      title: "The Future of AI in 2025",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      channelName: "TechVision",
      year: "2025",
      rating: 4.8,
      category: "tech",
      uploadDate: "2025-01-15"
    },
    {
      id: "t2",
      title: "Epic Guitar Solo Compilation",
      thumbnail: "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg",
      channelName: "MusicMasters",
      year: "2024",
      rating: 4.9,
      category: "music",
      uploadDate: "2024-12-20"
    },
    {
      id: "t3",
      title: "Stand-up Comedy Gold",
      thumbnail: "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
      channelName: "LaughTrack",
      year: "2024",
      rating: 4.7,
      category: "comedy",
      uploadDate: "2024-11-30"
    },
    {
      id: "t4",
      title: "Cooking Masterclass: Italian Pasta",
      thumbnail: "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg",
      channelName: "ChefExpert",
      year: "2024",
      rating: 4.6,
      category: "food",
      uploadDate: "2024-12-10"
    },
    {
      id: "t5",
      title: "Space Documentary: Mars Mission",
      thumbnail: "https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg",
      channelName: "ScienceHub",
      year: "2024",
      rating: 4.8,
      category: "documentary",
      uploadDate: "2024-12-05"
    }
  ];

  // Mock data for all videos
  const allVideos: Video[] = [
    {
      id: "1",
      title: "How I Learned to Stop Worrying and Love AI",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      channelName: "TechTalks",
      year: "2023",
      rating: 4.5,
      watched: true,
      category: "tech",
      uploadDate: "2023-06-15"
    },
    {
      id: "2",
      title: "Ultimate Guide to Web Development in 2025",
      thumbnail: "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg",
      channelName: "CodeMaster",
      year: "2025",
      rating: 4.8,
      category: "tech",
      uploadDate: "2025-01-10"
    },
    {
      id: "3",
      title: "The Future of Electric Vehicles",
      thumbnail: "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
      channelName: "TechReview",
      year: "2024",
      rating: 4.2,
      category: "tech",
      uploadDate: "2024-08-20"
    },
    {
      id: "4",
      title: "Making Sourdough Bread From Scratch",
      thumbnail: "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg",
      channelName: "FoodChannel",
      year: "2023",
      rating: 4.7,
      watched: true,
      category: "food",
      uploadDate: "2023-09-12"
    },
    {
      id: "5",
      title: "How to Start Investing in Stocks",
      thumbnail: "https://i.ytimg.com/vi/Vn3IRHhPXMo/maxresdefault.jpg",
      channelName: "FinanceExpert",
      year: "2024",
      rating: 4.9,
      category: "finance",
      uploadDate: "2024-03-18"
    },
    {
      id: "6",
      title: "Advanced Machine Learning Techniques",
      thumbnail: "https://i.ytimg.com/vi/NWONeJKn6kc/maxresdefault.jpg",
      channelName: "AI Academy",
      year: "2025",
      rating: 4.3,
      category: "tech",
      uploadDate: "2025-01-05"
    },
    {
      id: "7",
      title: "Home Renovation on a Budget",
      thumbnail: "https://i.ytimg.com/vi/XwfzqCDuQCQ/maxresdefault.jpg",
      channelName: "DIY Home",
      year: "2024",
      rating: 4.6,
      category: "lifestyle",
      uploadDate: "2024-07-22"
    },
    {
      id: "8",
      title: "Learning Piano in 30 Days",
      thumbnail: "https://i.ytimg.com/vi/WJ3-F02-F_Y/maxresdefault.jpg",
      channelName: "MusicMaster",
      year: "2023",
      rating: 4.4,
      category: "music",
      uploadDate: "2023-11-08"
    },
    {
      id: "9",
      title: "Traveling Through Japan",
      thumbnail: "https://i.ytimg.com/vi/HG6LRH-kJQ0/maxresdefault.jpg",
      channelName: "TravelVlogs",
      year: "2024",
      rating: 4.8,
      category: "travel",
      uploadDate: "2024-05-14"
    },
    {
      id: "10",
      title: "Full Body Workout at Home",
      thumbnail: "https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg",
      channelName: "FitLife",
      year: "2025",
      rating: 4.5,
      watched: true,
      category: "fitness",
      uploadDate: "2025-01-12"
    },
    {
      id: "11",
      title: "Stand-up Comedy Special",
      thumbnail: "https://i.ytimg.com/vi/MzPrsmk0pnA/maxresdefault.jpg",
      channelName: "ComedyCentral",
      year: "2024",
      rating: 4.7,
      category: "comedy",
      uploadDate: "2024-10-30"
    },
    {
      id: "12",
      title: "Jazz Music for Studying",
      thumbnail: "https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg",
      channelName: "JazzLounge",
      year: "2024",
      rating: 4.6,
      category: "music",
      uploadDate: "2024-09-15"
    }
  ];

  // Mock data for hidden gems
  const hiddenGems: Video[] = [
    {
      id: "h1",
      title: "Indie Film Analysis: Hidden Masterpieces",
      thumbnail: "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
      channelName: "CinemaSecrets",
      year: "2024",
      rating: 4.9,
      category: "film",
      uploadDate: "2024-06-20"
    },
    {
      id: "h2",
      title: "Underground Music Scene Documentary",
      thumbnail: "https://i.ytimg.com/vi/WJ3-F02-F_Y/maxresdefault.jpg",
      channelName: "MusicUnderground",
      year: "2023",
      rating: 4.8,
      category: "music",
      uploadDate: "2023-12-01"
    },
    {
      id: "h3",
      title: "Forgotten History: Ancient Civilizations",
      thumbnail: "https://i.ytimg.com/vi/HG6LRH-kJQ0/maxresdefault.jpg",
      channelName: "HistoryVault",
      year: "2024",
      rating: 4.7,
      category: "documentary",
      uploadDate: "2024-04-10"
    }
  ];

  // Mock data for recently reviewed
  const recentlyReviewed: Video[] = [
    {
      id: "r1",
      title: "Tech Review: Latest Smartphones",
      thumbnail: "https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg",
      channelName: "TechReviewer",
      year: "2025",
      rating: 4.4,
      category: "tech",
      uploadDate: "2025-01-08"
    },
    {
      id: "r2",
      title: "Movie Review: Sci-Fi Blockbuster",
      thumbnail: "https://i.ytimg.com/vi/NWONeJKn6kc/maxresdefault.jpg",
      channelName: "MovieCritic",
      year: "2024",
      rating: 4.6,
      category: "film",
      uploadDate: "2024-12-28"
    }
  ];

  // Mock data for shorts
  const shortsWorthWatching: Video[] = [
    {
      id: "s1",
      title: "Quick Cooking Tips",
      thumbnail: "https://i.ytimg.com/vi/XwfzqCDuQCQ/maxresdefault.jpg",
      channelName: "QuickChef",
      year: "2024",
      rating: 4.5,
      category: "food",
      uploadDate: "2024-12-30"
    },
    {
      id: "s2",
      title: "60-Second Science Facts",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      channelName: "ScienceShorts",
      year: "2024",
      rating: 4.7,
      category: "science",
      uploadDate: "2024-12-29"
    }
  ];

  useEffect(() => {
    let filtered = [...allVideos];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory);
      setShowCategories(false);
    } else {
      setShowCategories(true);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.channelName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setShowCategories(false);
    }

    // Sort videos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'most_recent':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'top_rated':
          return (b.rating || 0) - (a.rating || 0);
        case 'oldest':
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
        default:
          return 0;
      }
    });

    setFilteredVideos(filtered);
  }, [sortBy, selectedCategory, searchTerm]);

  const handleAddToList = (videoId: string) => {
    toast("Added to list!", {
      description: "Video has been added to your watchlist.",
    });
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchTerm('');
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tech', label: 'Technology' },
    { value: 'music', label: 'Music' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'food', label: 'Food & Cooking' },
    { value: 'documentary', label: 'Documentary' },
    { value: 'travel', label: 'Travel' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'science', label: 'Science' },
    { value: 'film', label: 'Film & TV' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'education', label: 'Educational' }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Header section */}
        <div className="bg-background py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Discover Amazing Videos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore trending content, hidden gems, and curated collections from across the web.
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="bg-background border-b border-border sticky top-0 z-10 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full input-letterboxd"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3 items-center">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] input-letterboxd">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="modal-letterboxd">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px] input-letterboxd">
                    <SelectValue placeholder="Sort by" />
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </SelectTrigger>
                  <SelectContent className="modal-letterboxd">
                    <SelectItem value="most_recent">Most Recent</SelectItem>
                    <SelectItem value="top_rated">Top Rated</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="container mx-auto px-4 py-8 space-y-12">
          {/* Spotify-style Category Grid */}
          {showCategories && (
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryCards.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className="group relative overflow-hidden rounded-lg aspect-square transition-all duration-300 material-hover"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`} />
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Category thumbnail */}
                    <div className="absolute bottom-4 right-4 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform duration-300">
                      <img 
                        src={category.thumbnail} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Category info */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-bold text-lg md:text-xl leading-tight">
                          {category.name}
                        </h3>
                      </div>
                      <div className="text-white/80 text-sm">
                        {category.videoCount} videos
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Trending Now Carousel */}
          {showCategories && (
            <VideoCarousel 
              title="Trending Now" 
              videos={trendingVideos} 
              onAddToList={handleAddToList}
            />
          )}

          {/* Main video grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {searchTerm ? `Search Results (${filteredVideos.length})` : 
                 selectedCategory !== 'all' ? `${categories.find(c => c.value === selectedCategory)?.label} Videos` : 
                 'All Videos'}
              </h2>
              <div className="flex items-center gap-4">
                {(selectedCategory !== 'all' || searchTerm) && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="btn-letterboxd-outline"
                  >
                    Show All
                  </Button>
                )}
                <span className="text-sm text-muted-foreground">
                  {filteredVideos.length} videos found
                </span>
              </div>
            </div>
            
            {filteredVideos.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-foreground mb-2">No videos found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 btn-letterboxd-outline"
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    channelName={video.channelName}
                    year={video.year}
                    rating={video.rating}
                    watched={video.watched}
                    onAddToList={handleAddToList}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Additional carousels only show when browsing all categories */}
          {showCategories && (
            <>
              {/* Hidden Gems */}
              <VideoCarousel 
                title="Hidden Gems" 
                videos={hiddenGems} 
                onAddToList={handleAddToList}
              />

              {/* Recently Reviewed */}
              <VideoCarousel 
                title="Recently Reviewed" 
                videos={recentlyReviewed} 
                onAddToList={handleAddToList}
              />

              {/* Shorts Worth Watching */}
              <VideoCarousel 
                title="Shorts Worth Watching" 
                videos={shortsWorthWatching} 
                onAddToList={handleAddToList}
              />
            </>
          )}

          {/* Pagination placeholder */}
          <div className="text-center py-8">
            <Button variant="outline" className="btn-letterboxd-outline">
              Load More Videos
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideosPage;