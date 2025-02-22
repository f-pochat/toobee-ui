import superagent from "superagent";

class AuthenticatedSuperAgent {
    async get(url: string) {
        return superagent
            .get(url)
            .set('Authorization', `Bearer ${localStorage.getItem("access_token")}`);
    }

    async post(url: string, body?: object) {
        return superagent
            .post(url)
            .set('Authorization', `Bearer ${localStorage.getItem("access_token")}`)
            .send(body)
    }

    async put(url: string, body: object) {
        return superagent
            .put(url)
            .set('Authorization', `Bearer ${localStorage.getItem("access_token")}`)
            .send(body)
    }

    async delete(url: string) {
        return superagent
            .delete(url)
            .set('Authorization', `Bearer ${localStorage.getItem("access_token")}`);
    }
}

export const request = new AuthenticatedSuperAgent();