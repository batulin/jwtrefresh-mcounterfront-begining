import $api from "../http";

export default class AtuthService {
    static async login(email, password) {
        return $api.post("/user/login", {email, password});
    }
    static async registration(email, password) {
        return $api.post("/user/registration", {email, password});
    }
    static async logout() {
        return $api.get("/user/logout");
    }
}