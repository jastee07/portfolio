<template>

<div>
 <nav-bar @search="searchPosts" :search="search"/>
    <div>
        <p v-if="!posts">We're sorry. We'll post something soon</p>
        <div v-if="isAuthenticated">
            <b-button-group size="sm">
                <b-button :pressed.sync="showDrafts" variant="secondary">{{ drafts_button }}</b-button>
            </b-button-group>
        </div>
        <b-list-group>
            <b-list-group-item v-for="post in selected_posts" v-bind:key="post.id">

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
                posts: [],
                search: '',
                toggleText: 'Show Drafts',
                showDrafts: false
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
        selected_posts(){
            var posts = this.posts.filter(post => post.published != this.showDrafts)
            if(this.search !== ''){
                return posts.filter(post => post.title.toLowerCase().includes(this.search.toLowerCase()))
            }
            else{
                return posts
            }
        },
        drafts_button(){
            if(this.showDrafts){
                return "Show Published"
            }
            else{
                return "Show Drafts"
            }
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
    },
    methods:{
        searchPosts(search){
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