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

    updatePost(post, slug){
        return axios.put(`blog/posts/${slug}/`, post)
    }

    createPost(post){
        return axios.post(`blog/posts/`, post)
    }

    removePost(slug){
        return axios.delete(`blog/posts/${slug}/?editor=true`)
    }
}

export default new BlogService();