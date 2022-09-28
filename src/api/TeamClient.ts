import Client from "./FetchWrapper";
import {Team} from "../Types/Team";

export default class TeamClient {
    public static Create(team: Team, token: string): Promise<Team> {
        return Client.post <Team, Team>(
            '/api/user/google/login',
            team,
            {
                token: token
            }
        );
    }
}