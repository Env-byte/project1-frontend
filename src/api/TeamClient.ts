import Client from "./FetchWrapper";
import {Team} from "../Types/Team";

interface UpdateOptionsParam {
    name: string,
    isPublic: boolean,
    guuid: string
}

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

    public static List(team: Team, token: string): Promise<Team> {
        return Client.get <Team>(
            '/api/team/list',
            {
                token: token
            }
        );
    }

    static UpdateOptions(opts: UpdateOptionsParam, token: string) {
        return Client.patch<UpdateOptionsParam, boolean>(
            '/api/team/update/options' + encodeURIComponent(opts.guuid ?? ''),
            opts,
            {
                token: token,
                contentType: 'application/json'
            }
        );
    }

    public static Update(team: Team, token: string): Promise<Team> {
        return Client.patch <Team, Team>(
            '/api/team/update' + encodeURIComponent(team.guuid ?? ''),
            team,
            {
                token: token,
                contentType: 'application/json'
            }
        );
    }
}