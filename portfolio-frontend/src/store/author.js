const author = {
    state: {
        post: {}
      },
      mutations: {
       setPost: function(state, post) {
            state.post = post;
        },
        setPostContent: function(state, content) {
            state.post.content = content;
        }
      },
      actions:{
        updatePost: async({ dispatch, commit }, payload) => {
            try{
                var response = await BlogService.updatePost(payload)

                if(response.status === 200){
                    commit("setPost", response.data);
                }
            }
            catch(e){
                return e.response.data ;
            }
        }
      },
      getters: {
        activePost: state => state.post
      }
}

export default author;