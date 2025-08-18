// Mock data for testing - will be replaced with real APIs later

export interface Match {
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
  streamUrl?: string;
}

export const mockMatches: Match[] = [
  {
    id: 1,
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    time: '75\'',
    stadium: "Old Trafford",
    competition: "Premier League",
    viewers: 125000,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },
  {
    id: 2,
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    homeScore: 1,
    awayScore: 1,
    status: 'live',
    time: '88\'',
    stadium: "Camp Nou",
    competition: "La Liga",
    viewers: 89000,
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },
  {
    id: 3,
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    status: 'upcoming',
    time: '20:00',
    stadium: "Allianz Arena",
    competition: "Bundesliga",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },
  {
    id: 4,
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    status: 'upcoming',
    time: '17:30',
    stadium: "Stamford Bridge",
    competition: "Premier League",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },
  {
    id: 5,
    homeTeam: "AC Milan",
    awayTeam: "Inter Milan",
    homeScore: 2,
    awayScore: 3,
    status: 'finished',
    time: 'FT',
    stadium: "San Siro",
    competition: "Serie A"
  },
  {
    id: 6,
    homeTeam: "PSG",
    awayTeam: "Marseille",
    homeScore: 4,
    awayScore: 0,
    status: 'finished',
    time: 'FT',
    stadium: "Parc des Princes",
    competition: "Ligue 1"
  }
];

export const getMatchById = (id: number): Match | undefined => {
  return mockMatches.find(match => match.id === id);
};

export const getLiveMatches = (): Match[] => {
  return mockMatches.filter(match => match.status === 'live');
};

export const getUpcomingMatches = (): Match[] => {
  return mockMatches.filter(match => match.status === 'upcoming');
};

export const getFinishedMatches = (): Match[] => {
  return mockMatches.filter(match => match.status === 'finished');
};

// Mock API endpoints simulation
export const fetchMatches = (): Promise<Match[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMatches), 500);
  });
};

export const fetchStreamUrl = (matchId: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const match = getMatchById(matchId);
      if (match?.streamUrl) {
        resolve(match.streamUrl);
      } else {
        reject(new Error('Stream not available'));
      }
    }, 300);
  });
};