import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'upcoming' | 'live' | 'finished';
  time: string;
  stadium?: string;
  competition: string;
  viewers?: number;
}

interface MatchCardProps {
  match: Match;
  onWatchLive?: (matchId: number) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onWatchLive }) => {
  const getStatusBadge = () => {
    switch (match.status) {
      case 'live':
        return (
          <Badge className="bg-match-live text-white animate-pulse shadow-live">
            <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
            LIVE
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge variant="secondary" className="bg-match-upcoming text-stadium-dark">
            <Clock className="w-3 h-3 mr-1" />
            {match.time}
          </Badge>
        );
      case 'finished':
        return (
          <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
            FT
          </Badge>
        );
    }
  };

  const getScoreDisplay = () => {
    if (match.homeScore !== undefined && match.awayScore !== undefined) {
      return (
        <div className="text-2xl font-bold text-center min-w-[60px]">
          {match.homeScore} - {match.awayScore}
        </div>
      );
    }
    return (
      <div className="text-sm text-muted-foreground text-center min-w-[60px]">
        VS
      </div>
    );
  };

  return (
    <Card className="bg-gradient-card hover:shadow-card-football transition-all duration-300 border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground font-medium">
            {match.competition}
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 text-center">
            <div className="font-semibold text-lg mb-1">{match.homeTeam}</div>
            <div className="text-xs text-muted-foreground">Home</div>
          </div>
          
          {getScoreDisplay()}
          
          <div className="flex-1 text-center">
            <div className="font-semibold text-lg mb-1">{match.awayTeam}</div>
            <div className="text-xs text-muted-foreground">Away</div>
          </div>
        </div>
        
        {match.stadium && (
          <div className="flex items-center justify-center text-sm text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            {match.stadium}
          </div>
        )}
        
        {match.viewers && match.status === 'live' && (
          <div className="flex items-center justify-center text-sm text-muted-foreground mb-3">
            <Users className="w-4 h-4 mr-1" />
            {match.viewers.toLocaleString()} watching
          </div>
        )}
        
        {match.status !== 'finished' && (
          <div className="pt-3 border-t border-border/50">
            {match.status === 'live' ? (
              <Button 
                onClick={() => onWatchLive?.(match.id)}
                className="w-full bg-gradient-field hover:bg-field-green text-white font-semibold"
              >
                Watch Live Stream
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full border-field-green text-field-green hover:bg-field-green hover:text-white"
              >
                Set Reminder
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchCard;