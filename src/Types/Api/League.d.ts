export interface League {
    leagueId: null | string;
    queueType: string;
    tier: null | string;
    rank: null | string;
    summonerId: string;
    summonerName: string;
    leaguePoints: number | null;
    wins: number;
    losses: number;
    veteran: boolean | null;
    inactive: boolean | null;
    freshBlood: boolean | null;
    hotStreak: boolean | null;
    ratedTier: null | string;
    ratedRating: number | null;
}
