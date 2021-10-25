<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
                <b-navbar-nav>
                    <b-nav-item to="/">Home</b-nav-item>
                    <b-nav-item to="/author" v-if="isAuthenticated">Author</b-nav-item>
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
    computed: { 
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
    },
}
</script>