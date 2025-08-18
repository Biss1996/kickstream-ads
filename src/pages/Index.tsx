import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Clock, Trophy } from 'lucide-react';
import Navigation from '@/components/Navigation';
import MatchCard from '@/components/MatchCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockMatches, getLiveMatches, getUpcomingMatches, getFinishedMatches } from '@/data/mockData';
import type { Match } from '@/data/mockData';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Simulate API call
    setMatches(mockMatches);
  }, []);

  const handleWatchLive = (matchId: number) => {
    navigate(`/live?match=${matchId}`);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'live':
        return {
          title: 'Live Matches',
          matches: getLiveMatches(),
          icon: <TrendingUp className="w-5 h-5" />,
          emptyMessage: 'No live matches at the moment'
        };
      case 'scores':
        return {
          title: 'Recent Results',
          matches: getFinishedMatches(),
          icon: <Trophy className="w-5 h-5" />,
          emptyMessage: 'No recent results'
        };
      case 'fixtures':
        return {
          title: 'Upcoming Fixtures',
          matches: getUpcomingMatches(),
          icon: <Clock className="w-5 h-5" />,
          emptyMessage: 'No upcoming fixtures'
        };
      default:
        return {
          title: 'All Matches',
          matches: matches,
          icon: <Trophy className="w-5 h-5" />,
          emptyMessage: 'No matches available'
        };
    }
  };

  const { title, matches: tabMatches, icon, emptyMessage } = getTabContent();
  const liveMatches = getLiveMatches();

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <div className="bg-gradient-hero rounded-2xl p-8 mb-8 text-white shadow-stadium">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold mb-4">
                  Watch Football Live
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  Stream live matches, get real-time scores, and never miss a goal. 
                  Your ultimate football companion.
                </p>
                {liveMatches.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-match-live text-white animate-pulse shadow-live">
                      <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                      {liveMatches.length} LIVE NOW
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Live Matches Section */}
            {liveMatches.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-match-live" />
                  <h2 className="text-2xl font-bold">Live Now</h2>
                  <Badge className="bg-match-live text-white animate-pulse">
                    {liveMatches.length}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {liveMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onWatchLive={handleWatchLive}
                    />
                  ))}
                </div>
                <AdPlaceholder type="banner" size="medium" />
              </div>
            )}
          </>
        )}

        {/* Main Content */}
        <div className="flex items-center gap-2 mb-6">
          {icon}
          <h2 className="text-2xl font-bold">{title}</h2>
          <Badge variant="secondary">{tabMatches.length}</Badge>
        </div>

        {tabMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tabMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onWatchLive={handleWatchLive}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                {icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{emptyMessage}</h3>
              <p className="text-muted-foreground">Check back later for updates.</p>
            </CardContent>
          </Card>
        )}

        {/* Bottom Ad */}
        {tabMatches.length > 0 && (
          <div className="mt-8">
            <AdPlaceholder type="banner" size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
