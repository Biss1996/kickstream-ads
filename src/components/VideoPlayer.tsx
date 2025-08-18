import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  streamUrl: string;
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ streamUrl, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    setIsLoading(true);
    setError(null);

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: false,
      });
      hlsRef.current = hls;
      
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play();
        setIsPlaying(true);
      });
      
      hls.on(Hls.Events.ERROR, (event, data) => {
        setIsLoading(false);
        setError('Stream unavailable');
        console.error('HLS error:', data);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        video.play();
        setIsPlaying(true);
      });
      video.addEventListener('error', () => {
        setIsLoading(false);
        setError('Stream unavailable');
      });
    } else {
      setIsLoading(false);
      setError('Browser not supported');
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [streamUrl]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div className="relative w-full bg-stadium-dark rounded-lg overflow-hidden shadow-stadium">
      {title && (
        <div className="absolute top-4 left-4 z-10 bg-stadium-dark/80 text-white px-3 py-1 rounded-lg backdrop-blur-sm">
          <span className="text-sm font-medium">{title}</span>
          <span className="ml-2 inline-block w-2 h-2 bg-match-live rounded-full animate-pulse"></span>
          <span className="ml-1 text-xs text-match-live font-semibold">LIVE</span>
        </div>
      )}
      
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-stadium-dark/50 backdrop-blur-sm">
            <div className="text-center text-white">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
              <p className="text-sm">Loading stream...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-stadium-dark/90 backdrop-blur-sm">
            <div className="text-center text-white">
              <p className="text-lg font-semibold mb-2">Stream Unavailable</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-stadium-dark/80 text-white border-none hover:bg-stadium-dark/90 backdrop-blur-sm"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button
                size="sm"
                variant="secondary"
                className="bg-stadium-dark/80 text-white border-none hover:bg-stadium-dark/90 backdrop-blur-sm"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
            
            <Button
              size="sm"
              variant="secondary"
              className="bg-stadium-dark/80 text-white border-none hover:bg-stadium-dark/90 backdrop-blur-sm"
              onClick={toggleFullscreen}
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;