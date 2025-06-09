<template>
  <div class="divBody">
  </div>
</template>

<script>
export default {
  mounted(){
    if(sessionStorage.getItem('accessTokenInSessn') == null){
      this.$router.push("/");
    }
  }
}
</script>

<style>
.divBody {
    overflow-x: hidden;
}
</style>