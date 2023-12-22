<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style lang="scss">
@import "~/scss/main";
</style>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default{
  components:{
    Header,
    Footer
  }
}
</script>