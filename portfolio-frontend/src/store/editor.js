import BlogService from '../services/blog-service';

const editor = {
    state: {
        post : {
            title: '',
            body: ''
        },
        errors : {}
      },
      mutations: {
        SET_POST: function(state, post) {
            Object.assign(state.post, post);
        },
        ADD_CATEGORY_TO_POST: function(state, category) {
            state.post.categories.push(category);
        },
        REMOVE_CATEGORY_FROM_POST: function(state, category) {
            state.post.categories.splice(state.post.categories.indexOf(category), 1);
        },
        ADD_TAG_TO_POST: function(state, tag) {
            state.post.tags.push(tag);
        },
        REMOVE_TAG_FROM_POST: function(state, tag) {
            state.post.tags.splice(state.post.tags.indexOf(tag), 1);
        },
        SET_ERRORS: function(state, errors) {
            state.errors = errors;
        },
        REMOVE_ERRORS: function(state) {
            state.errors = {};
        }
      },
      actions:{
        setPost: function({ commit }, post) {
            commit("SET_POST", post);
        },
        createPost: async ({commit}, post) => {
            var response = await BlogService.createPost(post);
            if(response.status === 200){
                commit("SET_POST", response.data);
            }
            else{
                commit('SET_ERRORS', response.data);
            }
        },
        updatePost: async ({commit, state}) => {
            var response = await BlogService.updatePost(state.post);
            if(response.status === 200){
                commit("SET_POST", response.data);
            }
            else{
                commit('SET_ERRORS', response.data);
            }
        },
        addCategoryToPost: async function({ commit, state }, category) {
            var data = {post_id: state.post.id, category_id: category.id};
            var response = await BlogService.addCategoryToPost(data);

            if(response.status === 200){
                commit("ADD_CATEGORY_TO_POST", category);
            }
            else{
                commit('SET_ERRORS', response.data);
            }
        },
        removeCategoryFromPost: async function({ commit, state }, category) {
            var data = {post_id: state.post.id, category_id: category.id};
            var response = await BlogService.removeCategoryFromPost(data);
            if(response.status === 200){
                commit("REMOVE_CATEGORY_FROM_POST", category);
            }
            else{
                commit('SET_ERRORS', response.data);
            }
        },
        createCategory: async function({ commit }, category) {
            var response = await BlogService.createCategory(category);
            if(response.status === 201){
                return response.data;
            }
            else{
                commit('SET_ERRORS', response.data);
            }
            
        },
        addTagToPost: async function({ commit, state }, tag) {
            var data = {post_id: state.post.id, tag_id: tag.id};
            var response = await BlogService.addTagToPost(data);
            if(response.status === 200){
                commit("ADD_TAG_TO_POST", tag);
            }
            else{
                commit('SET_ERRORS', response.data);
            }
        },
        removeTagFromPost: function({ commit }, tag) {
            commit("REMOVE_TAG_FROM_POST", tag);
        },
        createTag: async function({ commit }, tag) {
            var response = await BlogService.createTag(tag);
            if(response.status === 201){
                commit("ADD_TAG_TO_POST", response.data);
            }
            else{
                commit('SET_ERRORS', response.data);
            }
        }
      },
      getters: {
        post: state => state.post,
        errors: state => state.errors,
        categories: state => state.post.categories,
        tags: state => state.post.tags
      },
}

export default editor;