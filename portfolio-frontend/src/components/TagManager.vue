<template>
    <div>
        <label>Tags</label>
        <br>
        <b-list-group>
             <b-list-group-item v-for="tag in selectedTags" :key="tag.name">
                {{ tag.name }}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>



<script>
import BlogService from '../services/blog-service'
export default {
    name: 'CategoryManager',
    mounted(){
        this.loadTags();
    },
    data(){
        return{
            allTags: []
        }
    },
    methods:{
        async loadTags(){
            let { data } = await BlogService.getTags()
            this.allTags = data;
        }
    },
    computed:{
        selectedTags(){
            return this.$store.getters.post.tags
        }
    }
}
</script>