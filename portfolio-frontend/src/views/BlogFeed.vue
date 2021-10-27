<template>

<div>
 <nav-bar @search="search"/>
    <div>
        <p v-if="!posts">We're sorry. We'll post something soon</p>
        <b-list-group>
            <b-list-group-item v-for="post in posts" v-bind:key="post.id">

                <b-link :to="'/' + post.slug + '/'" variant="dark" type="dark">
                <h2>{{post.title}}</h2>

                </b-link>
                <br/>
                {{post.published_at | formatDate}}
            </b-list-group-item>
        </b-list-group>
    </div>
</div>
   
</template>


<script>
//import axios from 'axios'
import moment from 'moment'
import BlogService from '../services/blog-service'
import NavBar from '../components/NavBar.vue'
export default {
    name: "BlogFeed",
    components: {
        NavBar
    },
    data: function() {
            return {
                posts: []
            };
    },
    async mounted(){
        this.posts = 
            await BlogService.getPosts(false)
            .then(response => response.data)
    },
    filters: {
        formatDate(date){
            return moment(date).format('LL')
        }
    },
    computed: {
        published_posts(){
            var posts = this.posts.filter(post => post.published)
            if(this.search != ''){
                posts = posts.filter(post => post.title.toLowerCase().includes(this.search.toLowerCase()))
            }
            else{
                return posts
            }
        }
    },
    methods:{
        searchPosts(){
            this.search = search
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}
</style>