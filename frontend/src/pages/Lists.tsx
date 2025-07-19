import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Heart, Eye, MessageCircle, Plus, ChevronRight, Play, Clock, User, Film } from 'lucide-react';
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
  recentlyLiked?: boolean;
}

const ListsPage = () => {
  const [lists, setLists] = useState<VideoList[]>([]);
  const [featuredLists, setFeaturedLists] = useState<VideoList[]>([]);
  const [popularLists, setPopularLists] = useState<VideoList[]>([]);
  const [recentlyLikedLists, setRecentlyLikedLists] = useState<VideoList[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLists, setFilteredLists] = useState<VideoList[]>([]);

  // Mock data for lists
  const mockLists: VideoList[] = [
    // Popular This Week (Big Cards)
    {
      id: "p1",
      title: "Saved for Sunday",
      description: "Perfect videos for a lazy Sunday afternoon when you want to unwind and discover something new",
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
      id: "p2",
      title: "Desert Island Videos",
      description: "If you could only watch these videos for the rest of your life, these would be the ones",
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
      id: "p3",
      title: "Peak Internet",
      description: "The absolute pinnacle of online video content that defines what the internet can be",
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
    {
      id: "p4",
      title: "Internet Gold",
      description: "Hidden gems and viral sensations that are absolutely worth your time",
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
    // Recently Liked Lists - Expanded with more content
    {
      id: "r1",
      title: "Every Horror Film Ever Made",
      description: "The definitive list of every horror title I could find from IMDB and Letterboxd. This list spans from 1895-present day....",
      creator: {
        name: "Wolfman07",
        username: "wolfman07",
        avatar: "https://i.pravatar.cc/150?img=9"
      },
      videoCount: 66639,
      likes: 1900,
      views: 12800,
      comments: 56,
      thumbnails: [
        "https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XvlO5SBG8hM/maxresdefault.jpg",
        "https://i.ytimg.com/vi/MzPrsmk0pnA/maxresdefault.jpg",
        "https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg"
      ],
      category: "Horror",
      createdAt: "2024-10-22",
      recentlyLiked: true
    },
    {
      id: "r2",
      title: "catálogo • nicho",
      description: "catálogo de filmes disponíveis no perfil @nichodrive. links nas notas de cada filme.",
      creator: {
        name: "manel",
        username: "manel",
        avatar: "https://i.pravatar.cc/150?img=10"
      },
      videoCount: 255,
      likes: 1800,
      views: 28900,
      comments: 5,
      thumbnails: [
        "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
        "https://i.ytimg.com/vi/WJ3-F02-F_Y/maxresdefault.jpg",
        "https://i.ytimg.com/vi/HG6LRH-kJQ0/maxresdefault.jpg",
        "https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg"
      ],
      category: "Catalog",
      createdAt: "2024-11-08",
      recentlyLiked: true
    },
    {
      id: "r3",
      title: "cozy",
      description: "",
      creator: {
        name: "allie ☆⋆｡‖",
        username: "allie",
        avatar: "https://i.pravatar.cc/150?img=11"
      },
      videoCount: 40,
      likes: 1,
      views: 17600,
      comments: 0,
      thumbnails: [
        "https://i.ytimg.com/vi/NWONeJKn6kc/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XwfzqCDuQCQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg"
      ],
      category: "Mood",
      createdAt: "2024-10-30",
      recentlyLiked: true
    },
    {
      id: "r4",
      title: "Tiny Desk–Style Performances",
      description: "Intimate musical performances that capture the soul and showcase raw talent in stripped-down settings",
      creator: {
        name: "Maria Lopez",
        username: "mariamusic",
        avatar: "https://i.pravatar.cc/150?img=12"
      },
      videoCount: 34,
      likes: 2340,
      views: 34500,
      comments: 345,
      thumbnails: [
        "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg",
        "https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XvlO5SBG8hM/maxresdefault.jpg"
      ],
      category: "Music",
      createdAt: "2024-11-03",
      recentlyLiked: true
    },
    {
      id: "r5",
      title: "Explained in 5 Minutes",
      description: "Complex topics made simple and digestible for curious minds who want to learn quickly",
      creator: {
        name: "Chris Wilson",
        username: "chrisexplains",
        avatar: "https://i.pravatar.cc/150?img=13"
      },
      videoCount: 89,
      likes: 4560,
      views: 15600,
      comments: 1230,
      thumbnails: [
        "https://i.ytimg.com/vi/HG6LRH-kJQ0/maxresdefault.jpg",
        "https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg",
        "https://i.ytimg.com/vi/NWONeJKn6kc/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XwfzqCDuQCQ/maxresdefault.jpg"
      ],
      category: "Educational",
      createdAt: "2024-10-15",
      recentlyLiked: true
    },
    {
      id: "r6",
      title: "Tech I Actually Understood",
      description: "Technology videos that don't make your brain hurt and actually explain things in human terms",
      creator: {
        name: "Lisa Chen",
        username: "lisatech",
        avatar: "https://i.pravatar.cc/150?img=14"
      },
      videoCount: 45,
      likes: 3210,
      views: 17600,
      comments: 567,
      thumbnails: [
        "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg",
        "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg"
      ],
      category: "Tech",
      createdAt: "2024-10-30",
      recentlyLiked: true
    },
    {
      id: "r7",
      title: "Chaotic Energy Only",
      description: "Pure, unfiltered chaos in video form. Warning: may cause uncontrollable laughter",
      creator: {
        name: "Tyler Brooks",
        username: "tylerchaos",
        avatar: "https://i.pravatar.cc/150?img=15"
      },
      videoCount: 56,
      likes: 6780,
      views: 34500,
      comments: 1890,
      thumbnails: [
        "https://i.ytimg.com/vi/MzPrsmk0pnA/maxresdefault.jpg",
        "https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg",
        "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
        "https://i.ytimg.com/vi/WJ3-F02-F_Y/maxresdefault.jpg"
      ],
      category: "Comedy",
      createdAt: "2024-11-03",
      recentlyLiked: true
    },
    {
      id: "r8",
      title: "The Greatest Hits",
      description: "Timeless classics that never get old and deserve to be watched again and again",
      creator: {
        name: "Alex Thompson",
        username: "alexfilms",
        avatar: "https://i.pravatar.cc/150?img=16"
      },
      videoCount: 50,
      likes: 2890,
      views: 15600,
      comments: 423,
      thumbnails: [
        "https://i.ytimg.com/vi/kJp4CFGGQkI/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XvlO5SBG8hM/maxresdefault.jpg",
        "https://i.ytimg.com/vi/MzPrsmk0pnA/maxresdefault.jpg",
        "https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg"
      ],
      category: "Classic",
      createdAt: "2024-10-15",
      recentlyLiked: true
    },
    {
      id: "r9",
      title: "Deep Dives & Documentaries",
      description: "Long-form content that takes you on a journey through fascinating topics and untold stories",
      creator: {
        name: "Documentary Dan",
        username: "docdan",
        avatar: "https://i.pravatar.cc/150?img=17"
      },
      videoCount: 73,
      likes: 4120,
      views: 28700,
      comments: 892,
      thumbnails: [
        "https://i.ytimg.com/vi/HG6LRH-kJQ0/maxresdefault.jpg",
        "https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg",
        "https://i.ytimg.com/vi/NWONeJKn6kc/maxresdefault.jpg",
        "https://i.ytimg.com/vi/XwfzqCDuQCQ/maxresdefault.jpg"
      ],
      category: "Documentary",
      createdAt: "2024-11-01",
      recentlyLiked: true
    },
    {
      id: "r10",
      title: "Cooking Adventures",
      description: "From simple recipes to complex culinary masterpieces, these videos will inspire your next meal",
      creator: {
        name: "Chef Maria",
        username: "chefmaria",
        avatar: "https://i.pravatar.cc/150?img=18"
      },
      videoCount: 92,
      likes: 5670,
      views: 42300,
      comments: 1456,
      thumbnails: [
        "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
        "https://i.ytimg.com/vi/WJ3-F02-F_Y/maxresdefault.jpg",
        "https://i.ytimg.com/vi/HG6LRH-kJQ0/maxresdefault.jpg",
        "https://i.ytimg.com/vi/UBMk30rjy0o/maxresdefault.jpg"
      ],
      category: "Food",
      createdAt: "2024-10-25",
      recentlyLiked: true
    },
    {
      id: "r11",
      title: "Late Night Vibes",
      description: "Perfect for those 2 AM browsing sessions when you can't sleep and need something chill",
      creator: {
        name: "Night Owl",
        username: "nightowl",
        avatar: "https://i.pravatar.cc/150?img=19"
      },
      videoCount: 28,
      likes: 1890,
      views: 9800,
      comments: 234,
      thumbnails: [
        "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/j5-yKhDd64s/maxresdefault.jpg",
        "https://i.ytimg.com/vi/9vz06QO3UkQ/maxresdefault.jpg",
        "https://i.ytimg.com/vi/jJpIzr2sCDE/maxresdefault.jpg"
      ],
      category: "Chill",
      createdAt: "2024-11-07",
      recentlyLiked: true
    },
    {
      id: "r12",
      title: "Mind-Bending Science",
      description: "Videos that will make you question everything you thought you knew about the universe",
      creator: {
        name: "Science Sam",
        username: "sciencesam",
        avatar: "https://i.pravatar.cc/150?img=20"
      },
      videoCount: 64,
      likes: 7890,
      views: 56700,
      comments: 2340,
      thumbnails: [
        "https://i.ytimg.com/vi/MzPrsmk0pnA/maxresdefault.jpg",
        "https://i.ytimg.com/vi/7ku5YJtfH_0/maxresdefault.jpg",
        "https://i.ytimg.com/vi/xWPUJDG4Gk4/maxresdefault.jpg",
        "https://i.ytimg.com/vi/WJ3-F02-F_Y/maxresdefault.jpg"
      ],
      category: "Science",
      createdAt: "2024-10-18",
      recentlyLiked: true
    }
  ];

  useEffect(() => {
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
    // Load data immediately
    const popular = mockLists.filter(list => list.id.startsWith('p'));
    const featured = mockLists.filter(list => list.featured);
    const recentlyLiked = mockLists.filter(list => list.recentlyLiked);
    const all = mockLists;
    
    setPopularLists(popular);
    setFeaturedLists(featured);
    setRecentlyLikedLists(recentlyLiked);
    setLists(all);
    setFilteredLists(all);
    setLoading(false);
=======
    // Simulate loading
    const timer = setTimeout(() => {
      const popular = mockLists.filter(list => list.id.startsWith('p'));
      const featured = mockLists.filter(list => list.featured);
      const recentlyLiked = mockLists.filter(list => list.recentlyLiked);
      const all = mockLists;
      
      setPopularLists(popular);
      setFeaturedLists(featured);
      setRecentlyLikedLists(recentlyLiked);
      setLists(all);
      setFilteredLists(all);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
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

  const BigListCard = ({ list }: { list: VideoList }) => (
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
    <Card className="group overflow-hidden transition-all duration-300 ease-out shadow-md shadow-black/20 bg-card border-border material-hover">
      <Link to={`/lists/${list.id}`}>
        <CardContent className="p-0">
          {/* Large prominent image section */}
          <div className="relative h-48 overflow-hidden bg-background">
=======
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl shadow-lg card-letterboxd">
      <Link to={`/lists/${list.id}`}>
        <CardContent className="p-0">
          {/* Large prominent image section */}
          <div className="relative h-48 overflow-hidden bg-muted">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
            <div className="relative w-full h-full">
              {list.thumbnails.slice(0, 4).map((thumbnail, index) => (
                <div 
                  key={index} 
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                  className="absolute w-24 h-16 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-out group-hover:scale-105 will-change-transform"
=======
                  className="absolute w-24 h-16 overflow-hidden rounded-md shadow-lg transition-transform duration-300 group-hover:scale-105"
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                  style={{ 
                    left: `${20 + index * 20}px`,
                    top: `${20 + index * 8}px`,
                    zIndex: list.thumbnails.length - index 
                  }}
                >
                  <img 
                    src={thumbnail} 
                    alt={list.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              
              {/* Simple overlay on hover */}
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 ease-out" />
=======
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
            </div>
          </div>
          
          {/* Compact content section */}
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
          <div className="p-4 md:p-6 space-y-3">
            <div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {list.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
=======
          <div className="p-4 space-y-3">
            <div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {list.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                {list.description}
              </p>
            </div>
            
            {/* Creator and stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={list.creator.avatar} alt={list.creator.name} />
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                  <AvatarFallback className="text-xs bg-muted text-foreground">
=======
                  <AvatarFallback className="text-xs">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                    {list.creator.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-muted-foreground">{list.creator.username}</span>
              </div>
              
              {list.category && (
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
=======
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                  {list.category}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Film className="h-3 w-3" />
                <span>{formatNumber(list.videoCount)} videos</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{formatNumber(list.likes)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-3 w-3" />
                <span>{formatNumber(list.comments)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );

  const RegularListCard = ({ list }: { list: VideoList }) => (
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
    <Card className="group overflow-hidden transition-all duration-300 ease-out bg-card border-border material-hover">
      <Link to={`/lists/${list.id}`}>
        <CardContent className="p-4 md:p-6">
          <div className="flex gap-4 md:gap-6">
=======
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 card-letterboxd">
      <Link to={`/lists/${list.id}`}>
        <CardContent className="p-4">
          <div className="flex gap-4">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
            {/* Card stack thumbnail display */}
            <div className="relative flex-shrink-0 w-[88px] h-[48px]">
              {list.thumbnails.slice(0, 3).map((thumbnail, index) => (
                <div 
                  key={index} 
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                  className="absolute w-16 h-12 overflow-hidden rounded-lg transition-transform duration-300 ease-out group-hover:scale-105 will-change-transform"
=======
                  className="absolute w-16 h-12 overflow-hidden rounded transition-transform duration-300 group-hover:scale-105"
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                  style={{ 
                    left: `${index * 12}px`, 
                    zIndex: list.thumbnails.length - index 
                  }}
                >
                  <img 
                    src={thumbnail} 
                    alt={list.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Content */}
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {list.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {list.description}
                </p>
              </div>
              
              {/* Creator and stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={list.creator.avatar} alt={list.creator.name} />
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                    <AvatarFallback className="text-xs bg-muted text-foreground">
=======
                    <AvatarFallback className="text-xs">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                      {list.creator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground font-medium">{list.creator.username}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Film className="h-3 w-3" />
                    <span>{formatNumber(list.videoCount)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{formatNumber(list.likes)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{formatNumber(list.comments)}</span>
                  </div>
                </div>
                {list.category && (
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                  <span className="bg-muted text-foreground px-2 py-1 rounded text-xs">
=======
                  <span className="bg-muted px-2 py-1 rounded text-xs">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                    {list.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );

  // Vertical list card for Recently Liked section
  const VerticalListCard = ({ list }: { list: VideoList }) => (
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
    <Card className="group overflow-hidden transition-all duration-300 ease-out border-l-4 border-l-transparent hover:border-l-primary bg-card border-border material-hover">
=======
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-l-transparent hover:border-l-primary card-letterboxd">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
      <Link to={`/lists/${list.id}`}>
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Larger thumbnail stack for vertical layout */}
            <div className="relative flex-shrink-0 w-[120px] h-[80px]">
              {list.thumbnails.slice(0, 4).map((thumbnail, index) => (
                <div 
                  key={index} 
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                  className="absolute w-20 h-16 overflow-hidden rounded-lg shadow-md transition-transform duration-300 ease-out group-hover:scale-105 will-change-transform"
=======
                  className="absolute w-20 h-16 overflow-hidden rounded-md shadow-md transition-transform duration-300 group-hover:scale-105"
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                  style={{ 
                    left: `${index * 16}px`,
                    top: `${index * 4}px`,
                    zIndex: list.thumbnails.length - index 
                  }}
                >
                  <img 
                    src={thumbnail} 
                    alt={list.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Content */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {list.title}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={list.creator.avatar} alt={list.creator.name} />
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                    <AvatarFallback className="text-xs bg-muted text-foreground">
                      {list.creator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium text-muted-foreground">Created by {list.creator.username}</span>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{formatNumber(list.videoCount)} films</span>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 fill-current text-primary" />
=======
                    <AvatarFallback className="text-xs">
                      {list.creator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-muted-foreground">{list.creator.username}</span>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{formatNumber(list.videoCount)} films</span>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 fill-current text-red-500" />
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                      <span>{formatNumber(list.likes)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{formatNumber(list.comments)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {list.description && (
                <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                  {list.description}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );

  const BigListCardSkeleton = () => (
    <Card className="overflow-hidden shadow-lg card-letterboxd">
      <CardContent className="p-0">
        <div className="h-48 bg-muted relative">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton 
              key={index} 
              className="absolute w-24 h-16 rounded-md" 
              style={{ 
                left: `${20 + index * 20}px`,
                top: `${20 + index * 8}px`,
                zIndex: 4 - index 
              }}
            />
          ))}
        </div>
        <div className="p-4 space-y-3">
          <div>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full mt-2" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const RegularListCardSkeleton = () => (
    <Card className="overflow-hidden card-letterboxd">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0 w-[88px] h-[48px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton 
                key={index} 
                className="absolute w-16 h-12 rounded" 
                style={{ 
                  left: `${index * 12}px`, 
                  zIndex: 3 - index 
                }}
              />
            ))}
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full mt-1" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-3 w-16" />
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
        </div>
      </CardContent>
    </Card>
  );

  const VerticalListCardSkeleton = () => (
    <Card className="overflow-hidden card-letterboxd">
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="relative flex-shrink-0 w-[120px] h-[80px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton 
                key={index} 
                className="absolute w-20 h-16 rounded-md" 
                style={{ 
                  left: `${index * 16}px`,
                  top: `${index * 4}px`,
                  zIndex: 4 - index 
                }}
              />
            ))}
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <Skeleton className="h-6 w-3/4" />
              <div className="flex items-center space-x-2 mt-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Simple header section - matching the uploaded design */}
        <div className="bg-background py-12">
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
          <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-xl md:text-xl lg:text-2xl font-bold text-foreground mb-4">
              Collect, curate, and share. Lists are the perfect way to group films.
            </h1>
            <Link to="/lists/new">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-full font-semibold shadow mt-8 transition-all duration-200 ease-out">
                Start your own list
              </Button>
            </Link>
=======
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
              Collect, curate, and share. Lists are the perfect way to group videos.
            </h1>
            <Button size="lg" className="btn-letterboxd mt-8">
              Start your own list
            </Button>
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
          </div>
        </div>

        {/* Search section */}
        <div className="bg-background border-b border-border">
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
=======
          <div className="container mx-auto px-4 py-6">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search lists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                  className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-primary pl-10 pr-4 py-2 w-full rounded-full"
=======
                  className="pl-10 pr-4 py-2 w-full input-letterboxd"
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                />
              </div>
            </div>
          </div>
        </div>

        {/* Popular this week section */}
        {popularLists.length > 0 && (
          <section className="py-12 bg-background">
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-foreground">POPULAR THIS WEEK</h2>
                <Button variant="ghost" className="flex items-center gap-2 text-primary hover:bg-accent hover:text-primary transition-all duration-200 ease-out hover:scale-105 active:scale-95">
=======
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">Popular This Week</h2>
                <Button variant="ghost" className="flex items-center gap-2 text-primary btn-letterboxd-ghost">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                  More
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {loading ? (
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
=======
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                  {Array.from({ length: 4 }).map((_, index) => (
                    <BigListCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {popularLists.map((list, index) => (
                    <div key={list.id} className="animate-in fade-in duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                      <BigListCard list={list} />
                    </div>
=======
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {popularLists.map((list) => (
                    <BigListCard key={list.id} list={list} />
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Featured lists section */}
        {featuredLists.length > 0 && (
          <section className="py-12 bg-card">
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-foreground">FEATURED LISTS</h2>
                <Button variant="ghost" className="flex items-center gap-2 text-primary hover:bg-accent hover:text-primary transition-all duration-200 ease-out hover:scale-105 active:scale-95">
=======
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">Featured Lists</h2>
                <Button variant="ghost" className="flex items-center gap-2 text-primary btn-letterboxd-ghost">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                  All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <RegularListCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                  {featuredLists.map((list, index) => (
                    <div key={list.id} className="animate-in fade-in duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                      <RegularListCard list={list} />
                    </div>
=======
                  {featuredLists.map((list) => (
                    <RegularListCard key={list.id} list={list} />
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Recently liked section */}
        {recentlyLikedLists.length > 0 && (
          <section className="py-12 bg-background">
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-foreground">RECENTLY LIKED</h2>
                <Button variant="ghost" className="flex items-center gap-2 text-primary hover:bg-accent hover:text-primary transition-all duration-200 ease-out hover:scale-105 active:scale-95">
=======
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">Recently Liked</h2>
                <Button variant="ghost" className="flex items-center gap-2 text-primary btn-letterboxd-ghost">
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {loading ? (
                <div className="space-y-4 max-w-4xl">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <VerticalListCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4 max-w-4xl">
<<<<<<< HEAD:frontend/src/pages/Lists.tsx
                  {recentlyLikedLists.map((list, index) => (
                    <div key={list.id} className="animate-in fade-in duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                      <VerticalListCard list={list} />
                    </div>
=======
                  {recentlyLikedLists.map((list) => (
                    <VerticalListCard key={list.id} list={list} />
>>>>>>> 84ac6a3b453bad20ec2feac9327f1a5e9a9faa31:src/pages/Lists.tsx
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ListsPage;