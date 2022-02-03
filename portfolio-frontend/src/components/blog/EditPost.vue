<template>
    <div class="flex-container">
        <div class="row">
            <div class="col-8">
                <b-form-input v-model="modifiedPost.title"/>
                <vue-editor v-model="modifiedPost.body" v-on:input="debouncedHandler"/>
            </div>
            <div class="col-4">
                <b-button-group>
                    <b-button @click="saveOrUpdatePost(modifiedPost)">Save</b-button>
                    <b-button @click="publish" v-if="!modifiedPost.published">Publish</b-button>
                    <b-button @click="preview">Preview</b-button>
                </b-button-group>

                <div>
                    <label v-if="modifiedPost.published"> Published: {{ modifiedPost.published_at | formatDate}} </label>
                    <br>
                    <label>Updated: {{ modifiedPost.updated_at | formatDate }} </label>
                    <br>
                    <category-manager/>
                    <br>
                    <tag-manager/>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { VueEditor } from 'vue2-quill-editor'
import debounce from 'lodash.debounce'
import moment from 'moment'
import { mapActions } from 'vuex'
import CategoryManager from './CategoryManager.vue'
import TagManager from './TagManager.vue'

export default {
    name: 'EditPost',
    components: {
        VueEditor,
        CategoryManager,
        TagManager
    },
    data() {
        return {
            modifiedPost: {}
        }
    },
    created(){
        this.modifiedPost = this.post;
        this.debouncedHandler = debounce(() => {
                this.saveOrUpdatePost(this.modifiedPost)
            }, 2000);
    },
    beforeUnmount(){
        this.debouncedHandler.cancel();
    },
    methods:{
        ...mapActions([
            'setPost',
            'createPost',
            'updatePost'

        ]),
        async publish(){
            if(this.modifiedPost.published){
                await this.setPost(this.modifiedPost)
                this.updatePost()
            }else if(!this.modifiedPost.slug){
                await this.setPost(this.modifiedPost)
                this.createPost(this.modifiedPost)
            }
            else{
                this.modifiedPost.published = true;
                this.modifiedPost.published_at = moment(Date.now())
                await this.setPost(this.modifiedPost)
                this.updatePost()
            }
        },
        async saveOrUpdatePost(){
            if(this.modifiedPost.slug === null){
                this.createPost(this.modifiedPost)
            }
            else{
                await this.setPost(this.modifiedPost)
                this.updatePost()
            }
        },
        preview(){
            this.$emit('preview')
        }
    },
    filters: {
        formatDate(date){
            return moment(date).format('LL')
        }
    },
    computed:{
        post(){
            return this.$store.getters.post;
        }
    }

}
</script>