<template>
    <div class="flex-container">
        <div class="row">
            <div class="col-8">
                <b-form-input v-model="modifiedPost.title"/>
                <vue-editor v-model="modifiedPost.body" v-on:input="debouncedHandler"/>
            </div>
            <div class="col-4">
                <b-button-group>
                    <b-button @click="updatePost(modifiedPost)">Save</b-button>
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
                    <label>Tags</label>
                    <b-list-group>
                        <b-form-tags v-model="modifiedPost.tags" separator=" ,;"></b-form-tags>
                    </b-list-group>
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

export default {
    name: 'EditPost',
    components: {
        VueEditor,
        CategoryManager
    },
    props: {
        post: {}
    },
    data() {
        return {
            modifiedPost: {}
        }
    },
    created(){
        this.modifiedPost = this.post;
        this.debouncedHandler = debounce(() => {
                this.updatePost(this.modifiedPost)
            }, 2000);
    },
    beforeUnmount(){
        this.debouncedHandler.cancel();
    },
    methods:{
        ...mapActions([
            'setPost',
            'updatePost',
        ]),
        publish(){
            if(this.modifiedPost.published){
                this.updatePost(this.modifiedPost)
            }else if(!this.modifiedPost.slug){
                this.createPost(this.modifiedPost)
            }
            else{
                this.modifiedPost.published = true;
                this.modifiedPost.published_at = moment(Date.now())
                this.updatePost(this.modifiedPost)
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
    }

}
</script>