import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VideoPlayer from '@/components/VideoPlayer';
import AdPlaceholder from '@/components/AdPlaceholder';
import { getMatchById, fetchStreamUrl } from '@/data/mockData';
import type { Match } from '@/data/mockData';

const LiveStream: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const matchId = parseInt(searchParams.get('match') || '1');
  
  const [match, setMatch] = useState<Match | null>(null);
  const [streamUrl, setStreamUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatch = async () => {
      setLoading(true);
      try {
        const matchData = getMatchById(matchId);
        if (matchData) {
          setMatch(matchData);
          if (matchData.status === 'live' || matchData.status === 'upcoming') {
            const url = await fetchStreamUrl(matchId);
            setStreamUrl(url);
          }
        }
      } catch (error) {
        console.error('Failed to load stream:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMatch();
  }, [matchId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-field-green mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading stream...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Match not found</h2>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero shadow-stadium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            {match.status === 'live' && (
              <Badge className="bg-match-live text-white animate-pulse shadow-live">
                <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                LIVE
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Match Info */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">
                    {match.homeTeam} vs {match.awayTeam}
                  </h1>
                  <div className="text-sm text-muted-foreground">
                    {match.competition}
                  </div>
                </div>
                
                <div className="flex items-center justify-center text-3xl font-bold mb-4">
                  {match.homeScore !== undefined && match.awayScore !== undefined ? (
                    <span>{match.homeScore} - {match.awayScore}</span>
                  ) : (
                    <span className="text-muted-foreground">vs</span>
                  )}
                </div>
                
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  {match.stadium && (
                    <div className="flex items-center gap-1">
                      <span>{match.stadium}</span>
                    </div>
                  )}
                  {match.status === 'live' && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {match.time}
                    </div>
                  )}
                  {match.viewers && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {match.viewers.toLocaleString()} viewers
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Video Player */}
            {streamUrl ? (
              <VideoPlayer
                streamUrl={streamUrl}
                title={`${match.homeTeam} vs ${match.awayTeam}`}
              />
            ) : (
              <Card className="bg-stadium-dark">
                <CardContent className="p-8 text-center text-white">
                  <h3 className="text-xl font-semibold mb-2">Stream Unavailable</h3>
                  <p className="text-muted-foreground">
                    This stream is not currently available. Check back later!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Post-Video Ad */}
            <AdPlaceholder type="banner" size="large" />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sidebar Ad */}
            <AdPlaceholder type="banner" size="medium" />
            
            {/* Match Stats (Placeholder) */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Match Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Possession</span>
                    <span>65% - 35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shots</span>
                    <span>8 - 4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>On Target</span>
                    <span>5 - 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Corners</span>
                    <span>6 - 3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fouls</span>
                    <span>7 - 12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Another Sidebar Ad */}
            <AdPlaceholder type="rewarded" size="medium" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;