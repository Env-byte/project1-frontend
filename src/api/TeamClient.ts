import Client from "./FetchWrapper";
import {Team} from "../Types/Team";

interface UpdateOptionsParam {
    name: string,
    isPublic: boolean}

export default class TeamClient {
    public static Create(team: Team, token: string): Promise<Team> {
        return Client.post <Team, Team>(
            '/api/team/create',
            team,
            {
                token: token,
                contentType: 'application/json'
            }
        );
    }

    public static Get(guuid: string, token: string): Promise<Team> {
        return Client.get <Team>(
            '/api/team/' + encodeURIComponent(guuid),
            {
                token: token
            }
        );
    }

    public static ListUser(token: string): Promise<Team[]> {
        return Client.get <Team[]>(
            '/api/team/list/user',
            {
                token: token
            }
        );
    }

    static UpdateOptions(guuid:string,opts: UpdateOptionsParam, token: string) {
        return Client.patch<UpdateOptionsParam, boolean>(
            '/api/team/' + encodeURIComponent(guuid ?? '') + '/update/options',
            opts,
            {
                token: token,
                contentType: 'application/json'
            }
        );
    }

    public static Update(team: Team, token: string): Promise<boolean> {
        return Client.put <Team, boolean>(
            '/api/team/' + encodeURIComponent(team.guuid ?? '') + '/update',
            team,
            {
                token: token,
                contentType: 'application/json'
            }
        );
    }

    public static List(): Promise<Team[]> {
        return Client.get <Team[]>(
            '/api/team/list'
        );
    }
}