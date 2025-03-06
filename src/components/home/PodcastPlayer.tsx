import { useState, useEffect, useRef } from 'react';
import { PodcastEpisodeType } from '@/lib/types';
import { Play, Pause, Volume2, VolumeX, ChevronRight, RefreshCw, Forward, Rewind, Clock, Mic, ArrowRight } from 'lucide-react';
import { useInView, getAnimationClass } from '@/lib/animations';
import { GradientButton } from '@/components/ui/gradient-button';

const PodcastPlayer = () => {
  const [episode, setEpisode] = useState<PodcastEpisodeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [speed, setSpeed] = useState(1);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [podcastArtwork, setPodcastArtwork] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    const fetchLatestEpisode = async () => {
      try {
        setIsLoading(true);
        setLoadingError(null);
        
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        const encodedRssUrl = encodeURIComponent('https://feeds.acast.com/public/shows/67242ddd0e172486e4676e95');
        const response = await fetch(`${corsProxy}${encodedRssUrl}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch RSS feed');
        }
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        const channelImage = xmlDoc.querySelector('channel > image > url');
        const itunesImage = xmlDoc.querySelector('channel > itunes\\:image');
        
        let artwork = null;
        if (channelImage && channelImage.textContent) {
          artwork = channelImage.textContent;
        } else if (itunesImage && itunesImage.getAttribute('href')) {
          artwork = itunesImage.getAttribute('href');
        }
        
        if (artwork) {
          setPodcastArtwork(artwork);
          console.log('Fetched podcast artwork:', artwork);
        }
        
        const latestItem = xmlDoc.querySelector('item');
        
        if (!latestItem) {
          throw new Error('No episodes found in the RSS feed');
        }
        
        const title = latestItem.querySelector('title')?.textContent || 'Unknown Title';
        const description = latestItem.querySelector('description')?.textContent || 'No description available';
        const pubDate = latestItem.querySelector('pubDate')?.textContent || new Date().toUTCString();
        
        const episodeImage = latestItem.querySelector('itunes\\:image');
        const episodeArtwork = episodeImage ? episodeImage.getAttribute('href') : artwork;
        
        const enclosure = latestItem.querySelector('enclosure');
        const audioUrl = enclosure?.getAttribute('url') || '';
        
        if (!audioUrl) {
          throw new Error('No audio URL found for the latest episode');
        }
        
        const formattedDate = new Date(pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        const parsedEpisode: PodcastEpisodeType = {
          title,
          description: description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          pubDate: formattedDate,
          audioUrl,
          imageUrl: episodeArtwork || null
        };
        
        setEpisode(parsedEpisode);
        console.log('Fetched episode:', parsedEpisode);
      } catch (error) {
        console.error('Failed to fetch podcast episode:', error);
        setLoadingError('Unable to load the latest episode. Please try again later.');
        
        const fallbackEpisode: PodcastEpisodeType = {
          title: "Revelation Chapter 7",
          audioUrl: "https://cdn.acast.com/audio-output/f30a2a09-3946-452d-9a30-82f4a678bba5/a8f07a8b9dba71cee6b49a21c8c89f40-21dd1bdd-2f0b-4c17-b77c-6077064aaf50.mp3",
          description: "Experience the powerful interlude between the sixth and seventh seals as God marks His chosen ones! Witness the sealing of the 144,000 from Israel's tribes and the...",
          pubDate: "February 28, 2025",
          imageUrl: null
        };
        
        setEpisode(fallbackEpisode);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestEpisode();
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef.current]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMuteState = !isMuted;
    audioRef.current.muted = newMuteState;
    setIsMuted(newMuteState);
  };

  const handleSpeedChange = () => {
    if (!audioRef.current) return;
    
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    
    audioRef.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    
    const newTime = Math.min(Math.max(0, currentTime + seconds), duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="podcast" ref={ref} className="section bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={getAnimationClass(isInView, 'animate-fade-in')}>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/30 text-blue-400 text-sm font-medium mb-4 hover-lift">
              Latest Episodes
            </div>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-white ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
            SermonPod Podcast
          </h2>
          
          <p className={`text-lg text-gray-300 ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
            Experience the quality and impact of SermonPod's production with our latest episodes.
          </p>
        </div>
        
        <div className={`max-w-4xl mx-auto ${getAnimationClass(isInView, 'animate-scale-in', 300)}`}>
          <div className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-800 shadow-2xl hover-glow">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin mx-auto w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full mb-4"></div>
                <p className="text-gray-400">Loading latest episode...</p>
              </div>
            ) : loadingError ? (
              <div className="p-8 text-center">
                <p className="text-red-500 mb-4">{loadingError}</p>
                <GradientButton 
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center text-base"
                  variant="default"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try again
                </GradientButton>
              </div>
            ) : episode ? (
              <div>
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                      <img 
                        src={podcastArtwork || "/lovable-uploads/bfa92956-2255-43a1-a074-b031c82f118c.png"} 
                        alt="SermonPod" 
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-white">SermonPod Ministries</div>
                      <div className="text-sm text-gray-400">Latest Episode: {episode.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
                      <Volume2 size={18} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex gap-6 mb-6">
                    <div className="w-32 h-32 flex-shrink-0">
                      <div className="w-full h-full rounded-md overflow-hidden bg-gray-800 relative">
                        <img 
                          src={episode.imageUrl || podcastArtwork || "/lovable-uploads/bfa92956-2255-43a1-a074-b031c82f118c.png"}
                          alt="Episode artwork" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-white">{episode.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{episode.pubDate}</p>
                      <p className="text-gray-300 text-sm mb-4">{episode.description}</p>
                      
                      <GradientButton 
                        onClick={togglePlayPause}
                        className="inline-flex items-center justify-center text-base"
                      >
                        {isPlaying ? (
                          <>
                            <Pause size={18} className="mr-2" /> Pause Episode
                          </>
                        ) : (
                          <>
                            <Play size={18} className="mr-2" /> Play Episode
                          </>
                        )}
                      </GradientButton>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <audio ref={audioRef} src={episode.audioUrl} preload="metadata" />
                    
                    <div className="relative h-1.5 bg-gray-700 rounded-full mb-2 cursor-pointer group">
                      <div 
                        className="absolute h-full bg-blue-500 rounded-full" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                      <input 
                        type="range" 
                        min="0" 
                        max={duration || 100}
                        value={currentTime} 
                        onChange={handleSeek}
                        className="absolute w-full h-full opacity-0 cursor-pointer"
                        aria-label="Seek"
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-400 mb-4">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleSkip(-15)}
                          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                          aria-label="Skip back 15 seconds"
                        >
                          <Rewind size={20} />
                        </button>
                        
                        <button 
                          onClick={togglePlayPause}
                          className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center mx-2 hover:bg-blue-600 transition-colors hover-scale"
                          aria-label={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                        
                        <button 
                          onClick={() => handleSkip(15)}
                          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                          aria-label="Skip forward 15 seconds"
                        >
                          <Forward size={20} />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={handleSpeedChange}
                          className="px-2 py-1 text-xs font-medium rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                          aria-label="Change playback speed"
                        >
                          {speed}x
                        </button>
                        
                        <div className="flex items-center">
                          <button 
                            onClick={toggleMute}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                          >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                          </button>
                          
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.01"
                            value={volume} 
                            onChange={handleVolumeChange}
                            className="w-16 h-1.5 rounded-full appearance-none bg-gray-700 ml-2 cursor-pointer accent-blue-500"
                            aria-label="Volume"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">Unable to load the latest episode.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastPlayer;
