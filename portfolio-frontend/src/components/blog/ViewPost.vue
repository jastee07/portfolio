<template>
    <div class="container mt-5">
      <div class="row">
          <div class="col-lg-12">
              <article>
                        <!-- Post header-->
                        <header class="mb-4">
                            <!-- Post title-->
                            <h1 class="fw-bolder mb-1">{{ post.title }}</h1>
                            <!-- Post meta content-->
                            <div class="text-muted fst-italic mb-2">{{post.published_at | formatDate}}</div>
                            <!-- Post categories-->
                            <p class="badge bg-secondary text-decoration-none link-light" v-for="category in post.categories" :key="category.id">{{category.name}}</p>
                        </header>
                        <!-- Preview image figure-->
                        <!-- Post content-->
                        <section class="mb-5" v-html="post.body">

                        </section>
                    </article>
          </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'ViewPost',
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