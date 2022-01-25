<template>
    <div>
        <label>Categories</label>
        <br>
        <b-list-group>
             <b-list-group-item v-for="category in selectedCategories" :key="category.name">
                {{ category.name }}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>



<script>
import BlogService from '../../services/blog-service'
export default {
    name: 'CategoryManager',
    mounted(){
        this.loadCategories();
    },
    data(){
        return{
            allCategories: []
        }
    },
    methods:{
        async loadCategories(){
            let { data } = await BlogService.getCategories()
            this.allCategories = data;
        }
    },
    computed:{
        selectedCategories(){
            return this.$store.getters.post.categories
        }
    }
}
</script>