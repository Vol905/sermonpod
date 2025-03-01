
import { useState, useEffect, useRef } from 'react';
import { PodcastEpisodeType } from '@/lib/types';
import { Play, Pause, Volume2, VolumeX, ChevronRight, RefreshCw, Forward, Rewind, Clock, Mic } from 'lucide-react';
import { useInView, getAnimationClass } from '@/lib/animations';

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
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  // Fetch the latest episode from the RSS feed via proxy
  useEffect(() => {
    const fetchLatestEpisode = async () => {
      try {
        setIsLoading(true);
        setLoadingError(null);
        
        // For the purpose of this demo, we'll use a static episode
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
        setLoadingError('Unable to load the latest episode. Please try again later.');
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

  // Handle playback speed change
  const handleSpeedChange = () => {
    if (!audioRef.current) return;
    
    // Cycle through speeds: 1 -> 1.25 -> 1.5 -> 2 -> 1
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    
    audioRef.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  // Skip forward/backward
  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    
    const newTime = Math.min(Math.max(0, currentTime + seconds), duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="podcast" ref={ref} className="section bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={getAnimationClass(isInView, 'animate-fade-in')}>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 hover-lift">
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover-glow">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin mx-auto w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full mb-4"></div>
                <p className="text-gray-600">Loading latest episode...</p>
              </div>
            ) : loadingError ? (
              <div className="p-8 text-center">
                <p className="text-red-500 mb-4">{loadingError}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try again
                </button>
              </div>
            ) : episode ? (
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {/* Episode Cover Art */}
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="aspect-square bg-gradient-to-br from-primary/80 to-primary rounded-lg shadow-md flex items-center justify-center hover-scale">
                      <Mic className="h-20 w-20 text-white" />
                    </div>
                  </div>
                  
                  {/* Episode Info */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{episode.title}</h3>
                    <p className="text-primary text-sm mb-3">Released: {episode.pubDate}</p>
                    <p className="text-gray-700 mb-4">{episode.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatTime(duration)}</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Ministry</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Church Growth</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Digital Outreach</span>
                    </div>
                  </div>
                </div>
                
                {/* Custom Audio Player */}
                <div className="rounded-xl bg-gray-50 p-4 border border-gray-100 hover-glow">
                  <audio ref={audioRef} src={episode.audioUrl} preload="metadata" />
                  
                  {/* Progress Bar */}
                  <div className="relative h-2 bg-gray-200 rounded-full mb-4 cursor-pointer group">
                    <div 
                      className="absolute h-full bg-primary rounded-full" 
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
                    <div className="absolute h-4 w-4 bg-primary rounded-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: `${progressPercentage}%`, transform: 'translate(-50%, -50%)' }}></div>
                  </div>
                  
                  {/* Time Display */}
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* Skip Back */}
                      <button 
                        onClick={() => handleSkip(-15)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                        aria-label="Skip back 15 seconds"
                      >
                        <Rewind size={20} />
                      </button>
                      
                      {/* Play/Pause */}
                      <button 
                        onClick={togglePlayPause}
                        className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-2 hover:bg-primary/90 transition-colors hover-scale"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </button>
                      
                      {/* Skip Forward */}
                      <button 
                        onClick={() => handleSkip(15)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                        aria-label="Skip forward 15 seconds"
                      >
                        <Forward size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {/* Playback Speed */}
                      <button 
                        onClick={handleSpeedChange}
                        className="px-2 py-1 text-xs font-medium rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                        aria-label="Change playback speed"
                      >
                        {speed}x
                      </button>
                      
                      {/* Volume Controls */}
                      <div className="flex items-center">
                        <button 
                          onClick={toggleMute}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
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
                </div>
                
                <div className="mt-6 text-center">
                  <a 
                    href="https://feeds.acast.com/public/shows/67242ddd0e172486e4676e95" 
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors hover-lift"
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
