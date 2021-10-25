import store from "../store"

function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
 if(store.getters.isAuthenticated)
  isAuthenticated = true;
 else
  isAuthenticated= false;
if(isAuthenticated) {
  next(); // allow to enter route
 } else{
  next('/login'); // go to '/login';
 }
}

export default guardMyroute;