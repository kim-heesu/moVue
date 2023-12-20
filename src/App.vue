<template>
  <Header />
  <RouterView />
</template>

<style lang="scss">
@import "~/scss/main";
</style>

<script>
import Header from "~/components/Header";

export default{
  components:{
    Header
  }
}
</script>