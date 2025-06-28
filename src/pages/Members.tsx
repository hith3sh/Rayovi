import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Star, MessageCircle, Plus, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Member {
  id: string;
  name: string;
  username: string;
  avatar: string;
  stats: {
    videosRated: number;
    comments: number;
    followers: number;
  };
  bio?: string;
  featured?: boolean;
  isFollowing?: boolean;
}

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [featuredMembers, setFeaturedMembers] = useState<Member[]>([]);
  const [followedMembers, setFollowedMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  // Mock data for members
  const mockMembers: Member[] = [
    {
      id: "1",
      name: "Randy Jones",
      username: "randyjones",
      avatar: "https://i.pravatar.cc/240?img=1",
      stats: { videosRated: 1800, comments: 2000, followers: 1250 },
      bio: "Film enthusiast and critic",
      featured: true,
      isFollowing: false
    },
    {
      id: "2",
      name: "Rachel Green",
      username: "rrrrrrachie",
      avatar: "https://i.pravatar.cc/240?img=2",
      stats: { videosRated: 350, comments: 399, followers: 890 },
      bio: "Independent cinema lover",
      featured: true,
      isFollowing: false
    },
    {
      id: "3",
      name: "Jordan Gustafson",
      username: "jordangustafson",
      avatar: "https://i.pravatar.cc/240?img=3",
      stats: { videosRated: 970, comments: 2800, followers: 1560 },
      bio: "Documentary specialist",
      featured: true,
      isFollowing: false
    },
    {
      id: "4",
      name: "Leonora Anne Mint",
      username: "leonoramint",
      avatar: "https://i.pravatar.cc/240?img=4",
      stats: { videosRated: 5100, comments: 4700, followers: 2340 },
      bio: "Classic film historian",
      featured: true,
      isFollowing: false
    },
    {
      id: "5",
      name: "Kyle Turner",
      username: "kyleturner",
      avatar: "https://i.pravatar.cc/240?img=5",
      stats: { videosRated: 3200, comments: 1300, followers: 1890 },
      bio: "Horror and thriller expert",
      featured: true,
      isFollowing: false
    },
    {
      id: "6",
      name: "James Schaffrillas",
      username: "schaff",
      avatar: "https://i.pravatar.cc/240?img=6",
      stats: { videosRated: 1300, comments: 1100, followers: 980 },
      bio: "Animation and family films",
      isFollowing: false
    },
    {
      id: "7",
      name: "Tim Tantitus",
      username: "timtantitus",
      avatar: "https://i.pravatar.cc/240?img=7",
      stats: { videosRated: 1300, comments: 745, followers: 650 },
      bio: "International cinema",
      isFollowing: false
    },
    {
      id: "8",
      name: "Cinema Joe",
      username: "cinemajoe",
      avatar: "https://i.pravatar.cc/240?img=8",
      stats: { videosRated: 2000, comments: 1400, followers: 1120 },
      bio: "Action and adventure films",
      isFollowing: false
    },
    {
      id: "9",
      name: "Karsten",
      username: "karsten",
      avatar: "https://i.pravatar.cc/240?img=9",
      stats: { videosRated: 2300, comments: 1600, followers: 890 },
      bio: "European cinema enthusiast",
      isFollowing: false
    },
    {
      id: "10",
      name: "Zoë Rose Bryant",
      username: "zoerosebryant",
      avatar: "https://i.pravatar.cc/240?img=10",
      stats: { videosRated: 5000, comments: 2400, followers: 1780 },
      bio: "Contemporary drama specialist",
      isFollowing: false
    },
    {
      id: "11",
      name: "Sarah Wilson",
      username: "sarahw",
      avatar: "https://i.pravatar.cc/240?img=11",
      stats: { videosRated: 890, comments: 456, followers: 234 },
      bio: "Indie film lover",
      isFollowing: false
    },
    {
      id: "12",
      name: "Mike Chen",
      username: "mikeseesvideos",
      avatar: "https://i.pravatar.cc/240?img=12",
      stats: { videosRated: 1200, comments: 890, followers: 567 },
      bio: "Sci-fi and fantasy expert",
      isFollowing: false
    },
    {
      id: "13",
      name: "Taylor Reed",
      username: "taylorwatches",
      avatar: "https://i.pravatar.cc/240?img=13",
      stats: { videosRated: 670, comments: 234, followers: 345 },
      bio: "Romance and comedy films",
      isFollowing: false
    },
    {
      id: "14",
      name: "Jamie Lopez",
      username: "videocritic88",
      avatar: "https://i.pravatar.cc/240?img=14",
      stats: { videosRated: 1500, comments: 1200, followers: 890 },
      bio: "Film critic and reviewer",
      isFollowing: false
    },
    {
      id: "15",
      name: "Chris Johnson",
      username: "cj_reviews",
      avatar: "https://i.pravatar.cc/240?img=15",
      stats: { videosRated: 980, comments: 567, followers: 432 },
      bio: "Thriller and mystery films",
      isFollowing: false
    }
  ];

  // Mock followed members
  const mockFollowedMembers: Member[] = [
    {
      id: "f1",
      name: "Emma Davis",
      username: "emmawatches",
      avatar: "https://i.pravatar.cc/240?img=16",
      stats: { videosRated: 1100, comments: 678, followers: 543 },
      bio: "Period dramas and biopics",
      isFollowing: true
    },
    {
      id: "f2",
      name: "Alex Thompson",
      username: "alexfilms",
      avatar: "https://i.pravatar.cc/240?img=17",
      stats: { videosRated: 750, comments: 345, followers: 289 },
      bio: "Experimental cinema",
      isFollowing: true
    },
    {
      id: "f3",
      name: "Maria Garcia",
      username: "mariacinema",
      avatar: "https://i.pravatar.cc/240?img=18",
      stats: { videosRated: 1300, comments: 890, followers: 678 },
      bio: "Latin American cinema",
      isFollowing: true
    },
    {
      id: "f4",
      name: "David Kim",
      username: "davidwatches",
      avatar: "https://i.pravatar.cc/240?img=19",
      stats: { videosRated: 890, comments: 456, followers: 234 },
      bio: "Korean cinema specialist",
      isFollowing: true
    },
    {
      id: "f5",
      name: "Lisa Chen",
      username: "lisareviews",
      avatar: "https://i.pravatar.cc/240?img=20",
      stats: { videosRated: 1200, comments: 890, followers: 567 },
      bio: "Animation enthusiast",
      isFollowing: true
    },
    {
      id: "f6",
      name: "Tom Wilson",
      username: "tomwatches",
      avatar: "https://i.pravatar.cc/240?img=21",
      stats: { videosRated: 670, comments: 234, followers: 345 },
      bio: "Horror film expert",
      isFollowing: true
    },
    {
      id: "f7",
      name: "Anna Rodriguez",
      username: "annafilms",
      avatar: "https://i.pravatar.cc/240?img=22",
      stats: { videosRated: 1500, comments: 1200, followers: 890 },
      bio: "Documentary lover",
      isFollowing: true
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const featured = mockMembers.filter(member => member.featured);
      const regular = mockMembers.filter(member => !member.featured);
      
      setFeaturedMembers(featured);
      setMembers(regular);
      setFilteredMembers(regular);
      setFollowedMembers(mockFollowedMembers);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchTerm, members]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleFollow = (memberId: string) => {
    setMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, isFollowing: !member.isFollowing }
        : member
    ));
    setFeaturedMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, isFollowing: !member.isFollowing }
        : member
    ));
  };

  const handleUnfollow = (memberId: string) => {
    setFollowedMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const MemberCard = ({ member, featured = false, isFollowed = false }: { member: Member; featured?: boolean; isFollowed?: boolean }) => (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 card-letterboxd ${featured ? 'border-primary/20' : ''}`}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative">
            <Avatar className={`${featured ? 'h-24 w-24' : 'h-16 w-16'} border-2 border-border shadow-md transition-transform duration-300 group-hover:scale-105 avatar-letterboxd`}>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className={`${featured ? 'text-lg' : 'text-sm'} font-semibold bg-muted text-muted-foreground`}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            {/* Follow/Unfollow Button */}
            <button
              onClick={() => isFollowed ? handleUnfollow(member.id) : handleFollow(member.id)}
              className={`absolute -bottom-1 -right-1 rounded-full p-1.5 shadow-md transition-all duration-200 hover:scale-110 ${
                member.isFollowing || isFollowed
                  ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              }`}
            >
              {member.isFollowing || isFollowed ? (
                <X className="h-3 w-3" />
              ) : (
                <Plus className="h-3 w-3" />
              )}
            </button>
            
            {featured && (
              <div className="absolute -top-1 -left-1 bg-primary text-primary-foreground rounded-full p-1">
                <Star className="h-3 w-3 fill-current" />
              </div>
            )}
          </div>
          
          <div className="space-y-1 min-h-[3rem] flex flex-col justify-center">
            <Link to={`/user/${member.username}`}>
              <h3 className={`${featured ? 'text-base' : 'text-sm'} font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1`}>
                {member.name}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground">@{member.username}</p>
          </div>
          
          <div className="flex items-center justify-center space-x-3 text-xs text-muted-foreground w-full">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-current text-primary" />
              <span>{formatNumber(member.stats.videosRated)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-3 w-3" />
              <span>{formatNumber(member.stats.comments)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MemberCardSkeleton = ({ featured = false }: { featured?: boolean }) => (
    <Card className="overflow-hidden card-letterboxd">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center space-y-3">
          <Skeleton className={`${featured ? 'h-24 w-24' : 'h-16 w-16'} rounded-full`} />
          <div className="space-y-1 w-full">
            <Skeleton className="h-4 w-20 mx-auto" />
            <Skeleton className="h-3 w-16 mx-auto" />
          </div>
          <div className="flex items-center justify-center space-x-3 w-full">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Simple header section - minimal design */}
        <div className="bg-background py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Video lovers, critics and friends — find popular members.
            </h1>
          </div>
        </div>

        {/* Search section */}
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full input-letterboxd"
                />
              </div>
            </div>
          </div>
        </div>

        {/* People You Follow section */}
        {followedMembers.length > 0 && (
          <section className="py-8 bg-background border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">People You Follow</h2>
                {followedMembers.length > 5 && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2 btn-letterboxd-outline">
                    See All
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {followedMembers.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex-shrink-0 w-40">
                    <MemberCard member={member} isFollowed={true} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured members section */}
        {featuredMembers.length > 0 && (
          <section className="py-12 bg-card">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Featured Members</h2>
                <p className="text-muted-foreground">Our most active and influential community members</p>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <MemberCardSkeleton key={index} featured={true} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {featuredMembers.map((member) => (
                    <MemberCard key={member.id} member={member} featured={true} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* All members section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {searchTerm ? `Search Results (${filteredMembers.length})` : 'All Members'}
                </h2>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? `Members matching "${searchTerm}"`
                    : 'Discover and connect with our community'
                  }
                </p>
              </div>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Array.from({ length: 15 }).map((_, index) => (
                  <MemberCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {searchTerm ? 'No members found' : 'No members yet'}
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? 'Try adjusting your search terms'
                    : 'Be the first to join our community!'
                  }
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 btn-letterboxd-outline"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to action section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Join Our Community</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with thousands of video enthusiasts, share your reviews, and discover your next favorite content.
            </p>
            <Button size="lg" className="btn-letterboxd">
              Create Your Profile
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MembersPage;