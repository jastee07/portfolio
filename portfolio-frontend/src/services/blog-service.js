import axios from "axios";


class BlogService {

    getPosts(isEditor){
        if(isEditor){
            return axios.get(`/blog/posts/?editor=${isEditor}`);
        }
        else {
            return axios.get(`/blog/posts/`);
        }
        
    }

    getPost(slug){
        return axios.get(`blog/posts/${slug}/`)
    }

    updatePost(post){
        return axios.put(`blog/posts/${post.slug}/`, post)
    }

    createPost(post){
        return axios.post(`blog/posts/`, post)
    }

    removePost(slug){
        return axios.delete(`blog/posts/${slug}/?editor=true`)
    }

    createTag(tag){
        return axios.post(`blog/tags/`, tag)
    }

    getTags(){
        return axios.get(`blog/tags/`)
    }

    createCategory(category){
        return axios.post(`blog/categories/`, category)
    }

    getCategories(){
        return axios.get(`blog/categories/`)
    }
}

export default new BlogService();