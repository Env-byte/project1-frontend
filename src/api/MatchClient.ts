import Client from "./FetchWrapper";
import {Match} from "../Types/Api/Match";

export default class MatchClient {
    public static GetMatchIds(puuid: string, region: string): Promise<string[]> {
        return Client
            .get<string[]>('/api/match/summonerPuuid/' + puuid, {region: region});
    }

    public static GetMatchById(puuid: string, region: string): Promise<Match> {
        return Client
            .get<Match>('/api/match/' + puuid, {region: region});
    }
}