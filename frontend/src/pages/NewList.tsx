import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, GripVertical } from 'lucide-react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Mock liked videos (replace with real data from backend or context)
const likedVideos = [
  {
    id: 'jJpIzr2sCDE',
    title: 'Making Sourdough Bread From Scratch',
    thumbnail: 'https://img.youtube.com/vi/jJpIzr2sCDE/hqdefault.jpg',
    likedAt: '2024-06-20T10:00:00Z',
  },
  {
    id: '9vz06QO3UkQ',
    title: 'The Future of Electric Vehicles',
    thumbnail: 'https://img.youtube.com/vi/9vz06QO3UkQ/hqdefault.jpg',
    likedAt: '2024-06-19T09:00:00Z',
  },
  {
    id: 'j5-yKhDd64s',
    title: 'Ultimate Guide to Web Development in 2025',
    thumbnail: 'https://img.youtube.com/vi/j5-yKhDd64s/hqdefault.jpg',
    likedAt: '2024-06-18T08:00:00Z',
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'How I Learned to Stop Worrying and Love AI',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    likedAt: '2024-06-17T07:00:00Z',
  },
];

const isValidYouTubeUrl = (url) => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/.test(url);
};

const extractYouTubeId = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  return match ? match[1] : null;
};

const getYouTubeThumbnail = (videoId) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

const fetchYouTubeTitle = async (url) => {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    if (!res.ok) throw new Error('No title');
    const data = await res.json();
    return data.title;
  } catch {
    return null;
  }
};

const NewListPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [ranked, setRanked] = useState(false);
  const [videos, setVideos] = useState([]);
  const [videoInput, setVideoInput] = useState('');
  const [videoError, setVideoError] = useState('');
  const [loadingTitles, setLoadingTitles] = useState({});
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [saveError, setSaveError] = useState('');
  // TODO: Replace with actual user ID from auth context or props
  const userId = 'demo-user-id'; // <-- Replace with real user ID
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddVideo = async () => {
    if (!isValidYouTubeUrl(videoInput)) {
      setVideoError('Please enter a valid YouTube video link.');
      return;
    }
    const videoId = extractYouTubeId(videoInput);
    if (!videoId) {
      setVideoError('Could not extract video ID.');
      return;
    }
    if (videos.some(v => v.id === videoId)) {
      setVideoError('This video is already in your list.');
      return;
    }
    setVideoError('');
    setLoadingTitles((prev) => ({ ...prev, [videoId]: true }));
    const title = await fetchYouTubeTitle(videoInput);
    setVideos([...videos, { url: videoInput, id: videoId, title: title || 'Unknown Title' }]);
    setLoadingTitles((prev) => {
      const copy = { ...prev };
      delete copy[videoId];
      return copy;
    });
    setVideoInput('');
  };

  const handleAddLikedVideo = (video) => {
    if (videos.some(v => v.id === video.id)) {
      setVideoError('This video is already in your list.');
      return;
    }
    setVideos([...videos, { ...video, url: `https://www.youtube.com/watch?v=${video.id}` }]);
    setVideoError('');
    setDialogOpen(false);
  };

  const handleRemoveVideo = (id) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  // Drag and drop handlers
  const handleDragStart = (idx) => setDraggedIdx(idx);
  const handleDragOver = (idx) => {
    if (draggedIdx === null || draggedIdx === idx) return;
    const updated = [...videos];
    const [removed] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, removed);
    setVideos(updated);
    setDraggedIdx(idx);
  };
  const handleDragEnd = () => setDraggedIdx(null);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    // setSaveSuccess(false); // Remove if not needed
    if (!name.trim()) {
      toast({ title: "Error", description: "List name is required.", variant: "destructive" });
      setSaving(false);
      return;
    }
    if (videos.length === 0) {
      toast({ title: "Error", description: "A list must have at least one video.", variant: "destructive" });
      setSaving(false);
      return;
    }
    try {
      const payload = {
        name,
        description,
        tags,
        visibility,
        ranked,
        // userId, // No longer needed, backend gets from token
        videos: videos.map((v, idx) => ({
          youtubeId: v.id,
          title: v.title,
          thumbnail: v.thumbnail || '',
          position: ranked ? idx + 1 : null,
        })),
      };
      const token = localStorage.getItem('token');
      const res = await fetch('/api/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save list');
      toast({ title: "List added!", description: `Your list '${name}' was created.`, variant: "success" });
      setTimeout(() => navigate('/lists'), 1200);
    } catch (err) {
      setSaveError('Failed to save list. Please try again.');
      toast({ title: "Error", description: "Failed to save list. Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  // Sort liked videos by most recent
  const sortedLikedVideos = [...likedVideos].sort((a, b) => new Date(b.likedAt).getTime() - new Date(a.likedAt).getTime());

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-card rounded-lg shadow-md shadow-black/20 p-12 border border-border">
          <h1 className="text-3xl font-bold mb-8 text-foreground">New List</h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSave}>
            {/* Column 1: Name, Tags, Visibility, Ranked */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Name</label>
                <Input 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="List name" 
                  className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Tags</label>
                <Input 
                  value={tags} 
                  onChange={e => setTags(e.target.value)} 
                  placeholder="eg. top 10" 
                  className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Who can view</label>
                <select 
                  value={visibility} 
                  onChange={e => setVisibility(e.target.value)} 
                  className="w-full rounded border px-3 py-2 bg-input text-foreground border-border focus:border-primary"
                >
                  <option value="public">Anyone — Public list</option>
                  <option value="private">Only me — Private list</option>
                  <option value="unlisted">Anyone with link — Unlisted</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="ranked" checked={ranked} onCheckedChange={checked => setRanked(!!checked)} />
                <label htmlFor="ranked" className="text-sm text-foreground">Ranked list <span className="text-muted-foreground">(Show position for each video)</span></label>
              </div>
            </div>

            {/* Column 2: Description */}
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Description</label>
              <Textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                rows={10} 
                placeholder="Description" 
                className="w-full bg-input border-border text-foreground placeholder-muted-foreground focus:border-primary" 
              />
            </div>

            {/* Full-width section for adding videos, spanning both columns */}
            <div className="md:col-span-2 mt-8 space-y-4">
              <h2 className="text-lg font-semibold mb-2 text-foreground">Add Videos</h2>
              <div className="flex flex-col md:flex-row gap-2 mb-2">
                <Input
                  placeholder="Paste YouTube video link..."
                  className="flex-1 bg-input border-border text-foreground placeholder-muted-foreground focus:border-primary"
                  value={videoInput}
                  onChange={e => setVideoInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddVideo(); } }}
                />
                <Button type="button" onClick={handleAddVideo} className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-full font-semibold shadow transition-all duration-200 ease-out hover:scale-105 active:scale-95 will-change-transform">
                  Add Video
                </Button>
              </div>
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <span className="text-sm text-muted-foreground mr-2">or</span>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline" className="bg-input border-border text-foreground hover:bg-accent transition-all duration-200 ease-out hover:scale-105 active:scale-95">
                      Choose from your liked videos
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Choose from your liked videos</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Select a video you have liked to add it to your list. Sorted by most recently liked.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-80 overflow-y-auto space-y-2 mt-4">
                      {sortedLikedVideos.map((video) => (
                        <div key={video.id} className="flex items-center gap-4 p-2 rounded hover:bg-accent transition-all duration-200 ease-out cursor-pointer" onClick={() => handleAddLikedVideo(video)}>
                          <img src={video.thumbnail} alt={video.title} className="w-16 h-10 rounded object-cover border border-border" />
                          <span className="font-medium text-foreground truncate">{video.title}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{new Date(video.likedAt).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <Button variant="outline" className="bg-input border-border text-foreground hover:bg-accent transition-all duration-200 ease-out hover:scale-105 active:scale-95">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              {videoError && <div className="text-destructive text-sm mb-2">{videoError}</div>}
              {videos.length === 0 ? (
                <div className="bg-muted rounded p-6 text-center text-muted-foreground">
                  Your list is empty.<br />
                  <span className="text-xs">Add videos using the field above, or from the links on a yt video.</span>
                </div>
              ) : (
                <ul className="bg-muted rounded p-4 mb-2">
                  {videos.map((v, idx) => (
                    <li
                      key={v.id}
                      className="flex items-center justify-between py-2 border-b border-border last:border-b-0 gap-2 group"
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={e => { e.preventDefault(); handleDragOver(idx); }}
                      onDragEnd={handleDragEnd}
                      style={{ cursor: 'grab' }}
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="w-8 h-8 flex items-center justify-center rounded bg-primary/10 text-lg font-bold text-primary border border-primary/20 mr-2">
                          {idx + 1}
                        </div>
                        <img
                          src={v.thumbnail || getYouTubeThumbnail(v.id)}
                          alt="thumbnail"
                          className="w-24 h-14 rounded object-cover border border-border"
                          style={{ minWidth: 96 }}
                        />
                        <span className="truncate text-foreground text-base font-medium">
                          {loadingTitles[v.id] ? 'Loading...' : v.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveVideo(v.id)} aria-label="Remove video" className="text-destructive hover:bg-accent">
                          <Trash2 className="w-5 h-5" />
                        </Button>
                        <span className="cursor-grab text-muted-foreground group-hover:text-primary">
                          <GripVertical className="w-5 h-5" />
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Form actions */}
            <div className="md:col-span-2 flex justify-end gap-2 mt-8">
              <Button variant="outline" type="button" disabled={saving} className="bg-input border-border text-foreground hover:bg-accent transition-all duration-200 ease-out hover:scale-105 active:scale-95">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-full font-semibold shadow transition-all duration-200 ease-out hover:scale-105 active:scale-95 will-change-transform">
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
          {saveError && <div className="text-destructive text-sm mt-2">{saveError}</div>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewListPage;