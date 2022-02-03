<template>
<div>
    <nav-bar/>
    <b-button-group size="sm" v-if="isAuthenticated && !isEditing">
        <b-button :pressed.sync="isEditing" variant="secondary">
            Edit
        </b-button>
    </b-button-group>
    <edit-post v-if="isEditing" :post="post" v-on:preview="toggleEditingMode"/>
    <view-post v-else :post="post"/>
</div>
  
</template>

<script>
import moment from 'moment'
import BlogService from '../services/blog-service'
import NavBar from '../components/NavBar.vue'
import ViewPost from '../components/blog/ViewPost.vue'
import EditPost from '../components/blog/EditPost.vue'
import {mapActions} from 'vuex'

export default {
    name: 'BlogPost',
    components: {
        NavBar,
        ViewPost,
        EditPost
    },
    data(){
        return {
            isEditing: false
        }
    },
    async mounted() {
        await this.loadPost();
    },
    methods:{
        ...mapActions(['setPost']),
        async loadPost(){
            if(this.$route.params.slug==='new-post'){
                await this.setPost({
                    title: 'New Post',
                    body: '',
                    published: false,
                    slug:null,
                    tags:[],
                    categories:[],
                });
            }
            else{
                var response = await BlogService.getPost(this.$route.params.slug)
                this.setPost(response.data);
            }
        },
        toggleEditingMode(){
            this.isEditing = !this.isEditing
        }
    },
    filters: {
        formatDate(date){
            return moment(date).format('LL')
        }
    },
    computed:{
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
        post(){
            return this.$store.getters.post;
        }
    }
}
</script>