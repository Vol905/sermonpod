
import { useState, useEffect, useRef } from 'react';
import { PodcastEpisodeType } from '@/lib/types';
import { Play, Pause, Volume2, VolumeX, ChevronRight } from 'lucide-react';
import { useInView, getAnimationClass } from '@/lib/animations';

const PodcastPlayer = () => {
  const [episode, setEpisode] = useState<PodcastEpisodeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  // Fetch the latest episode from the RSS feed
  useEffect(() => {
    const fetchLatestEpisode = async () => {
      try {
        setIsLoading(true);
        // For demo purposes, we're using a static episode since we can't directly fetch from RSS in client side
        // In a production environment, you would set up a server endpoint to fetch and parse the RSS feed
        const demoEpisode: PodcastEpisodeType = {
          title: "Reaching New Audiences Through Digital Ministry",
          audioUrl: "https://cdn.acast.com/audio-output/f30a2a09-3946-452d-9a30-82f4a678bba5/a8f07a8b9dba71cee6b49a21c8c89f40-21dd1bdd-2f0b-4c17-b77c-6077064aaf50.mp3",
          description: "In this episode, we discuss effective strategies for expanding your church's reach through digital ministry platforms.",
          pubDate: new Date().toLocaleDateString()
        };
        
        setEpisode(demoEpisode);
      } catch (error) {
        console.error('Failed to fetch podcast episode:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestEpisode();
  }, []);

  // Set up audio event listeners
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

  // Handle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMuteState = !isMuted;
    audioRef.current.muted = newMuteState;
    setIsMuted(newMuteState);
  };

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section id="podcast" ref={ref} className="section bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={getAnimationClass(isInView, 'animate-fade-in')}>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Listen Now
            </div>
          </div>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${getAnimationClass(isInView, 'animate-fade-in', 100)}`}>
            Latest Podcast Episode
          </h2>
          
          <p className={`text-lg text-gray-600 ${getAnimationClass(isInView, 'animate-fade-in', 200)}`}>
            Experience the quality and impact of SermonPod's production with our latest episode.
          </p>
        </div>
        
        <div className={`max-w-4xl mx-auto ${getAnimationClass(isInView, 'animate-scale-in', 300)}`}>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            ) : episode ? (
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-3">{episode.title}</h3>
                <p className="text-gray-500 text-sm mb-6">Released: {episode.pubDate}</p>
                
                <p className="text-gray-700 mb-8">{episode.description}</p>
                
                {/* Audio Player */}
                <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                  <audio ref={audioRef} src={episode.audioUrl} preload="metadata" />
                  
                  {/* Controls */}
                  <div className="flex items-center mb-4">
                    <button 
                      onClick={togglePlayPause}
                      className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 hover:bg-primary/90 transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    
                    <div className="flex-1">
                      <input 
                        type="range" 
                        min="0" 
                        max={duration || 100}
                        value={currentTime} 
                        onChange={handleSeek}
                        className="w-full h-2 rounded-full appearance-none bg-gray-300 cursor-pointer accent-primary"
                        aria-label="Seek"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center ml-4">
                      <button 
                        onClick={toggleMute}
                        className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-primary transition-colors"
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
                        className="w-16 h-2 rounded-full appearance-none bg-gray-300 ml-2 cursor-pointer accent-primary"
                        aria-label="Volume"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <a 
                    href="https://feeds.acast.com/public/shows/67242ddd0e172486e4676e95" 
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Subscribe to our podcast
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
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
