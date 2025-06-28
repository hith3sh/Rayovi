import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Film, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Member {
  id: string;
  name: string;
  username: string;
  avatar: string;
  stats: {
    films: number;
    reviews: number;
    followers: number;
  };
  bio?: string;
  featured?: boolean;
}

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [featuredMembers, setFeaturedMembers] = useState<Member[]>([]);
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
      stats: { films: 1800, reviews: 2000, followers: 1250 },
      bio: "Film enthusiast and critic",
      featured: true
    },
    {
      id: "2",
      name: "Rachel Green",
      username: "rrrrrrachie",
      avatar: "https://i.pravatar.cc/240?img=2",
      stats: { films: 350, reviews: 399, followers: 890 },
      bio: "Independent cinema lover",
      featured: true
    },
    {
      id: "3",
      name: "Jordan Gustafson",
      username: "jordangustafson",
      avatar: "https://i.pravatar.cc/240?img=3",
      stats: { films: 970, reviews: 2800, followers: 1560 },
      bio: "Documentary specialist",
      featured: true
    },
    {
      id: "4",
      name: "Leonora Anne Mint",
      username: "leonoramint",
      avatar: "https://i.pravatar.cc/240?img=4",
      stats: { films: 5100, reviews: 4700, followers: 2340 },
      bio: "Classic film historian",
      featured: true
    },
    {
      id: "5",
      name: "Kyle Turner",
      username: "kyleturner",
      avatar: "https://i.pravatar.cc/240?img=5",
      stats: { films: 3200, reviews: 1300, followers: 1890 },
      bio: "Horror and thriller expert",
      featured: true
    },
    {
      id: "6",
      name: "James Schaffrillas",
      username: "schaff",
      avatar: "https://i.pravatar.cc/240?img=6",
      stats: { films: 1300, reviews: 1100, followers: 980 },
      bio: "Animation and family films"
    },
    {
      id: "7",
      name: "Tim Tantitus",
      username: "timtantitus",
      avatar: "https://i.pravatar.cc/240?img=7",
      stats: { films: 1300, reviews: 745, followers: 650 },
      bio: "International cinema"
    },
    {
      id: "8",
      name: "Cinema Joe",
      username: "cinemajoe",
      avatar: "https://i.pravatar.cc/240?img=8",
      stats: { films: 2000, reviews: 1400, followers: 1120 },
      bio: "Action and adventure films"
    },
    {
      id: "9",
      name: "Karsten",
      username: "karsten",
      avatar: "https://i.pravatar.cc/240?img=9",
      stats: { films: 2300, reviews: 1600, followers: 890 },
      bio: "European cinema enthusiast"
    },
    {
      id: "10",
      name: "Zoë Rose Bryant",
      username: "zoerosebryant",
      avatar: "https://i.pravatar.cc/240?img=10",
      stats: { films: 5000, reviews: 2400, followers: 1780 },
      bio: "Contemporary drama specialist"
    },
    {
      id: "11",
      name: "Sarah Wilson",
      username: "sarahw",
      avatar: "https://i.pravatar.cc/240?img=11",
      stats: { films: 890, reviews: 456, followers: 234 },
      bio: "Indie film lover"
    },
    {
      id: "12",
      name: "Mike Chen",
      username: "mikeseesvideos",
      avatar: "https://i.pravatar.cc/240?img=12",
      stats: { films: 1200, reviews: 890, followers: 567 },
      bio: "Sci-fi and fantasy expert"
    },
    {
      id: "13",
      name: "Taylor Reed",
      username: "taylorwatches",
      avatar: "https://i.pravatar.cc/240?img=13",
      stats: { films: 670, reviews: 234, followers: 345 },
      bio: "Romance and comedy films"
    },
    {
      id: "14",
      name: "Jamie Lopez",
      username: "videocritic88",
      avatar: "https://i.pravatar.cc/240?img=14",
      stats: { films: 1500, reviews: 1200, followers: 890 },
      bio: "Film critic and reviewer"
    },
    {
      id: "15",
      name: "Chris Johnson",
      username: "cj_reviews",
      avatar: "https://i.pravatar.cc/240?img=15",
      stats: { films: 980, reviews: 567, followers: 432 },
      bio: "Thriller and mystery films"
    },
    {
      id: "16",
      name: "Emma Davis",
      username: "emmawatches",
      avatar: "https://i.pravatar.cc/240?img=16",
      stats: { films: 1100, reviews: 678, followers: 543 },
      bio: "Period dramas and biopics"
    },
    {
      id: "17",
      name: "Alex Thompson",
      username: "alexfilms",
      avatar: "https://i.pravatar.cc/240?img=17",
      stats: { films: 750, reviews: 345, followers: 289 },
      bio: "Experimental cinema"
    },
    {
      id: "18",
      name: "Maria Garcia",
      username: "mariacinema",
      avatar: "https://i.pravatar.cc/240?img=18",
      stats: { films: 1300, reviews: 890, followers: 678 },
      bio: "Latin American cinema"
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

  const MemberCard = ({ member, featured = false }: { member: Member; featured?: boolean }) => (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${featured ? 'border-primary/20' : ''}`}>
      <CardContent className="p-6">
        <Link to={`/user/${member.username}`} className="block">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <Avatar className="h-30 w-30 border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-lg font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {featured && (
                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                  <Star className="h-3 w-3 fill-current" />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">@{member.username}</p>
              {member.bio && (
                <p className="text-sm text-gray-600 line-clamp-2">{member.bio}</p>
              )}
            </div>
            
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 w-full">
              <div className="flex items-center space-x-1">
                <Film className="h-3 w-3" />
                <span>{formatNumber(member.stats.films)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>{formatNumber(member.stats.reviews)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{formatNumber(member.stats.followers)}</span>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );

  const MemberCardSkeleton = () => (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Skeleton className="h-30 w-30 rounded-full" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-5 w-32 mx-auto" />
            <Skeleton className="h-4 w-24 mx-auto" />
            <Skeleton className="h-4 w-40 mx-auto" />
          </div>
          <div className="flex items-center justify-center space-x-4 w-full">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
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
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Video lovers, critics and friends — find popular members.
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Connect with fellow video enthusiasts, discover new perspectives, and build your community of content lovers.
              </p>
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
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured members section */}
        {featuredMembers.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Members</h2>
                <p className="text-gray-600">Our most active and influential community members</p>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <MemberCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {featuredMembers.map((member) => (
                    <MemberCard key={member.id} member={member} featured={true} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* All members section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {searchTerm ? `Search Results (${filteredMembers.length})` : 'All Members'}
                </h2>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `Members matching "${searchTerm}"`
                    : 'Discover and connect with our community'
                  }
                </p>
              </div>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 12 }).map((_, index) => (
                  <MemberCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No members found' : 'No members yet'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Try adjusting your search terms'
                    : 'Be the first to join our community!'
                  }
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                    className="mt-4"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to action section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with thousands of video enthusiasts, share your reviews, and discover your next favorite content.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
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