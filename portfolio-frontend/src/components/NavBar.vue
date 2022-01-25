<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
                <b-navbar-nav>
                    <b-nav-item to="/">Home</b-nav-item>
                    <b-nav-item to="/blog">Blog</b-nav-item>
                </b-navbar-nav>
                 <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" v-model="searchBar" placeholder="Search..."/>
                    </b-nav-form>
                </b-navbar-nav>
           
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            searchBar: this.search
        }
    },
    props: {
        search: {
            type: String,
            required: false,
            default: ''
        }
    },
    computed: { 
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
    },
    watch:{
        searchBar(newVal, oldVal){
            if(newVal !== oldVal){
                this.$emit("search", newVal)
            }
        }
    }
}
</script>