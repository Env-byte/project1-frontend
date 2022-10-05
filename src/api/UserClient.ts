import Client from "./FetchWrapper";
export default class UserClient {
    public static Login(token: string): Promise<UserAccount> {
        return Client.post <string, UserAccount>('/api/user/google/login?token=' + token, '');
    }

    static LoginAccessToken(token: string): Promise<UserAccount> {
        return Client.post <string, UserAccount>('/api/user/access-token/login?token=' + token, '');
    }
}