import Client from "./FetchWrapper";
import {Summoner} from "../Types/Api/Summoner";

export default class SummonerClient {
    public static GetByName(name: string, region: string): Promise<Summoner> {
        return Client.get<Summoner>('/api/summoner/name/' + name, {region: region});
    }

    public static Refesh(puuid: string, region: string): Promise<Summoner> {
        return Client.get<Summoner>('/api/summoner/' + puuid + '/refresh', {region: region});
    }
}