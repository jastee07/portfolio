import AuthService from '../services/auth-service';
import router from '../router';
const auth = {
    state: {
        refresh_token: "",
        access_token: "",
        loggedInUser: {},
        isAuthenticated: false
      },
      mutations: {
        setRefreshToken: function(state, refreshToken) {
          state.refresh_token = refreshToken;
        },
        setAccessToken: function(state, accessToken) {
          state.access_token = accessToken;
        },
        // sets state with user information and toggles 
        // isAuthenticated from false to true
        setLoggedInUser: function(state, user) {
          state.loggedInUser = user;
          state.isAuthenticated = true;
        },
        // delete all auth and user information from the state
        clearUserData: function(state) {
          state.refresh_token = "";
          state.access_token = "";
          state.loggedInUser = {};
          state.isAuthenticated = false;
        }
      },
      actions:{
        login: async({ dispatch, commit}, payload) => {
          try{
            var response = await AuthService.login(payload)
            
            if(response.status === 200){
              commit("setRefreshToken", response.data.refresh_token);
              commit("setAccessToken", response.data.access_token);
              dispatch("fetchUser").then(() => router.push("/author"));
            }
          }
          catch(e){
            return e.response.data ;
          }
        },
        refreshToken: async({ state, commit }) => {
          try{
            var response = await AuthService.refreshToken({refresh: state.refresh_token})
            if(response.status === 200){
              commit("setAccessToken", response.data.access);
            }
          }
          catch(e){
            console.log(e.response)
          }
        },
        fetchUser: async({ commit }) => {
          try{
            var response = await AuthService.fetchUser()
            if(response.status === 200){
              commit("setLoggedInUser", response.data);
            }
          }
          catch(e){
            console.log(e.response);
          }
        }
      },
      getters: {
        loggedInUser: state => state.loggedInUser,
        isAuthenticated: state => state.isAuthenticated,
        accessToken: state => state.access_token,
        refreshToken: state => state.refresh_token
      },
}

export default auth;