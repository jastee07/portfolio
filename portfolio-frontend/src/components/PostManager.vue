<template>
<div>
    <div class="flex-container">
    <b-row>
        <b-modal centered
        id="confirmationModal"
            title="Confirm"
            v-on:ok="deletePost()">
            <p class="my-4">Are you sure?</p>
        </b-modal>
        <b-col lg="4" class="pb-2"><b-button @click="updatePost(post)">Save</b-button></b-col>
        <b-col lg="4" class="pb-2"><b-button @click="createPost()">New Post</b-button></b-col>
        <b-col lg="4" class="pb-2"><b-button variant="success" size="sm" @click="publish(post)">Publish</b-button></b-col>
        <b-col lg="4" class="pb-2"><b-button v-b-modal.confirmationModal>Delete</b-button></b-col>
        <b-col><b-input v-model="post.title" ></b-input></b-col>
    </b-row>
    <b-row v-if="post.published">
            <b-col cols="5"><label>Date Published: </label><span v-if="post.published">{{post.published_at | formatDate}}</span></b-col>
            <b-col cols="6"><label>Last Update: </label><span>{{post.updated_at | formatDate}}</span></b-col>
    </b-row >

    </div>
      

</div>
</template>

<script>
import moment from 'moment'
import BlogService from '../services/blog-service'
export default {
    name:'PostManager',
    props:{
        post: Object
    },
    methods:{
        async updatePost(post){
            if(post.slug !== undefined){
                BlogService.updatePost(post, post.slug)
                .then(response => {
                    this.$emit('savePost', response.data)
                })
                .catch(error => console.log(error))
            }
            else{
                BlogService.createPost(post)
                .then(response => {
                    console.log(response.data)
                    this.$emit('savePost',response.data);
                }).catch(error => console.log(error))
            }
        },
        async publishPost(post){
            post.published_at = Date.now()
            this.updatePost(post)
        },
        createPost(){
            this.$emit('createPost')
        },
        deletePost(){
            this.$emit('deletePost')
        }
    },
    filters:{
        formatDate(date){
            if(date){
                return moment(date).format('LL')
            }
        }
    }
}
</script>
    
<style>
.flex-container{
    display:flex
}
</style>