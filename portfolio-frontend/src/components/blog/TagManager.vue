<template>
    <div>
        <div class="container">
            <b-form-input v-model="tagSearch" placeholder="Tags" list="tag-data-list"></b-form-input>
            <b-button @click="addOrCreate(tagSearch)"><b-icon icon="plus-circle"/></b-button>
            <datalist id="tag-data-list">
                <option v-for="tag in unselectedTags" :value="tag.name" :key="tag.name"/>
            </datalist> 
        </div>
            
            
        <br>
        <b-list-group>
             <b-list-group-item v-for="tag in selectedTags" :key="tag.name">
                {{ tag.name }} <span @click="removeTagFromPost(tag)"><b-icon icon="trash"/></span>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>



<script>
import BlogService from '../../services/blog-service'
import { mapActions } from 'vuex'
export default {
    name: 'TagManager',
    mounted(){
        this.loadTags();
    },
    data(){
        return{
            tagSearch: "",
            allTags: []
        }
    },
    methods:{
        ...mapActions([
            'addTagToPost',
            'removeTagFromPost',
            'createTag',
        ]),
        async loadTags(){
            let { data } = await BlogService.getTags()
            this.allTags = data;
        },
        async addOrCreate(tag){
            this.tagSearch = "";
            var tagToAdd = this.allTags.find(c => c.name === tag);
            if(this.selectedTags.find(c => c.name === tag)){
                return;
            }
            if(tagToAdd){
                await this.addTagToPost(tagToAdd);
                
            }else{

                tag = await this.createTag({
                        name: tag
                });
                await this.addTagToPost(tag);
                this.loadTags();
                
            }
        }
    },
    computed:{
        selectedTags(){
            return this.$store.getters.tags
        },
        unselectedTags(){
            return this.allTags.filter(c => !this.selectedTags.includes(c));
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