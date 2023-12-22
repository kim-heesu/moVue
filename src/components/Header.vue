<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div class="nav-item" v-for="nav in navigations" :key="nav.name">
        <router-link class="nav-link" :to="nav.href" active-class="active" :class="{active: isMatch(nav.path)}">{{ nav.name }}</router-link>
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
          href: '/Movie/tt4520988',
          path: /^\/movie/ //'/movie'
        },
        {
          name:"About",
          href: '/About'
        },
      ]
    }
  },
  methods:{
    isMatch(path){
      if(!path) return false
      console.log(this.$route)
      return path.test(this.$route.fullPath)
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