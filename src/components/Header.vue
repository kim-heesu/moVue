<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div class="nav-item" v-for="nav in navigations" :key="nav.name">
        <router-link class="nav-link" :to="nav.href" active-class="active">{{ nav.name }}</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "~/components/Logo";
export default{ 
  components:{
    Logo
  },
  data(){
    return{
      navigations:[
        {
          name:"Search",
          href: '/'
        },
        {
          name:"Movie",
          href: '/Movie/tt4520988'
        },
        {
          name:"About",
          href: '/About'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  .logo{
    margin-right: 40px;
  }
}
</style>