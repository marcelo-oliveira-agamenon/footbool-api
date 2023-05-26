export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface League {
  league: LeagueData;
  country: Country;
  seasons: Season[];
}

export interface LeagueData {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface Season {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: Coverage;
}

export interface Coverage {
  fixtures: Fixture;
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
}

export interface Fixture {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
}

export interface Team {
  team: TeamData;
}

export interface TeamData {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}

export interface Player {
  player: PlayerInfo;
}

export interface PlayerInfo {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: {
    date: string;
    place: string;
    country: string;
  };
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
}

export interface TeamStats {
  league: Partial<
    TeamData & {
      flag: string;
      season: number;
    }
  >;
  team: Partial<TeamData>;
  form: string;
  fixtures: Fixtures;
  goals: {
    for: Goals;
    against: Goals;
  };
  lineups: Array<Lineups>;
}

export interface Lineups {
  formation: string;
  played: number;
}

export interface HomeAway {
  home: number;
  away: number;
  total: number;
}

export interface Fixtures {
  played: HomeAway;
  wins: HomeAway;
  draws: HomeAway;
  loses: HomeAway;
}

export interface Goals {
  total: HomeAway;
  average: HomeAway;
  minute: {
    '0-15': Minutes;
    '16-30': Minutes;
    '31-45': Minutes;
    '46-60': Minutes;
    '61-75': Minutes;
    '76-90': Minutes;
    '91-105': Minutes;
    '106-120': Minutes;
  };
}

export interface Minutes {
  total: number | null;
  percentage: string | null;
}
