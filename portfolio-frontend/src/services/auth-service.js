import axios from "axios";


class AuthService {

    login(credentials){
        return axios.post('/auth/login/', credentials)
    }

    refreshToken(token){
        return axios.post("auth/token/refresh/", token)
    }

    fetchUser(){
        return axios.get('auth/user')
    }
}

export default new AuthService();