<template>
    <div>
        <div class="container">
            <b-form-input v-model="categorySearch" placeholder="Categories" list="category-data-list"></b-form-input>
            <b-button @click="addOrCreate(categorySearch)"><b-icon icon="plus-circle"/></b-button>
            <datalist id="category-data-list">
                <option v-for="category in unselectedCategories" :value="category.name" :key="category.name"/>
            </datalist> 
        </div>
            
            
        <br>
        <b-list-group>
             <b-list-group-item v-for="category in selectedCategories" :key="category.name">
                {{ category.name }} <span @click="removeCategoryFromPost(category)"><b-icon icon="trash"/></span>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>



<script>
import BlogService from '../../services/blog-service'
import { mapActions } from 'vuex'
export default {
    name: 'CategoryManager',
    mounted(){
        this.loadCategories();
    },
    data(){
        return{
            categorySearch: "",
            allCategories: []
        }
    },
    methods:{
        ...mapActions([
            'addCategoryToPost',
            'removeCategoryFromPost',
            'createCategory',
        ]),
        async loadCategories(){
            let { data } = await BlogService.getCategories()
            this.allCategories = data;
        },
        async addOrCreate(category){
            this.categorySearch = "";
            var categoryToAdd = this.allCategories.find(c => c.name === category);
            if(this.selectedCategories.find(c => c.name === category)){
                return;
            }
            if(categoryToAdd){
                await this.addCategoryToPost(categoryToAdd);
                
            }else{

                category = await this.createCategory({
                        name: category
                });
                await this.addCategoryToPost(category);
                this.loadCategories();
                
            }
        }
    },
    computed:{
        selectedCategories(){
            return this.$store.getters.categories
        },
        unselectedCategories(){
            return this.allCategories.filter(c => !this.selectedCategories.includes(c));
        }
    }
}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>