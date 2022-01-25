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
import ViewPost from '../components/ViewPost.vue'
import EditPost from '../components/EditPost.vue'

export default {
    name: 'BlogPost',
    components: {
        NavBar,
        ViewPost,
        EditPost
    },
    data(){
        return {
            post: {},
            isEditing: false
        }
    },
    mounted() {
        this.loadPost();
    },
    methods:{
        async loadPost(){
            let { data } = await BlogService.getPost(this.$route.params.slug)
            this.post = data;
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
    }
}
</script>

<style>

</style>