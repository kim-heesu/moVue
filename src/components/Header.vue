<template>
  <header>
    <Logo />
    <div class="nav nav-pills">ㅇㅇ
      <div class="nav-item" v-for="nav in navigations" :key="nav.name">
        <router-link class="nav-link" :to="nav.href" active-class="active" :class="{active: isMatch(nav.path)}">{{ nav.name }}</router-link>
      </div>
    </div>
    <div class="user" @click="toAbout">
      <img :src="image" :alt="name" />
    </div>
  </header>
</template>

<script>
import Logo from "~/components/Logo";
import {mapState} from 'vuex';
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
    },
    toAbout(){
      this.$router.push('/about')
    }
  },
  computed:{
    ...mapState('about',[
        'image',
        'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  .logo{
    margin-right: 40px;
  }
  .user{
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: all 0.4;
    &:hover{
      background-color: darken($gray-200, 10%);
    }
    img{
      width: 100%;
      border-radius: 50%;
    }
  }
  @include media-breakpoint-down(sm){
    .nav{
      display: none;
    }
  }
}
</style>