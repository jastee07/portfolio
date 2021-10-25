<template>
  <div>
    <h1>LOGIN</h1>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="email" />
      <br />
      <span v-if="errors.email">{{errors.email[0]}}</span>
      <br />
      <input v-model="password" placeholder="password" type="password" />
      <br />
      <span v-if="errors.non_field_errors">{{errors.non_field_errors[0]}}</span>
      <span v-else-if="errors.password">{{errors.password[0]}}</span>
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      email: "",
      password: "",
      errors: {}
    };
  },
  methods: {
    async login(e) {
        e.preventDefault();
      let errors = await this.$store.dispatch('login', {email:this.email, password:this.password})
      if(errors){
        this.errors = errors;
      } else {
        this.errors = {}
      }
    },
  }
};
</script>