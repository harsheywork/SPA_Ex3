<template>
<div v-if="!isLoginPage" class="divLayout">
  <header class="hdrHeader">
    <p class="projectName">SPA</p>
    <div>
      <v-btn class="btn btnLogout" @click="handleClickLogoutButton">Logout</v-btn>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</div>

<router-view v-if="isLoginPage" />
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();

    /*Hide divLayout when the route is 'Login'*/
    const isLoginPage = computed(() => route.name === 'Login');
    return { isLoginPage };
  },

  methods: {

    /*Called on click of logout button, accesstoken will be removed from session storage*/
    handleClickLogoutButton() {
      sessionStorage.removeItem('accessTokenInSessn');
      this.$router.push("/")
    }
  }
};
</script>
  
  
  
  
  
  