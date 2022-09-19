import Client from "./FetchWrapper";
import {League} from "../Types/Api/League";

export default class LeagueClient {
    public static GetBySummonerId(id: string, region: string): Promise<League[]> {
        return Client
            .get<League[]>('/api/league/summonerId/' + id, {region: region});
    }
}