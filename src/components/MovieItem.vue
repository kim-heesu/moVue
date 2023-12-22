<template>
  <RouterLink :to="`movie/${movie.imdbID}`">
    <div class="movie" :style="{ backgroundImage: `url(${movie.Poster})` }">
      <Loader v-if="imageLoading" :size="1.5" absolute />
        <div class="info">
          <div class="year">{{ movie.Year }}</div>
          <div class="title">{{ movie.Title }}</div>
        </div>
    </div>
  </RouterLink>
</template>
<script>
import { RouterLink } from 'vue-router';
import Loader from '~/components/Loader'
export default{
  components:{
    Loader,
    RouterLink
},
  props:{
    movie:{
      type:Object,
      default:()=>({})
    }
  },
  data(){
    return{
      imageLoading: true
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    async init(){
      const poster = this.movie.Poster;
      if(!poster || poster =="N/A"){
        this.imageLoading = false
      }
      await this.$loadImage(poster)
      this.imageLoading = false
    },

  }
}
</script>
<style lang="scss" scoped>
@import "~/scss/main";
.movie{
  position:relative;
  $width: 168px;
  width: $width;
  height: $width * 3/2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow:hidden;
  &:hover::after {
    content:'';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border: 6px solid $primary;
  }
  .info{
    background-color: rgba($black,.3);
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 14px;
    font-size:14px;
    text-align:center;
    backdrop-filter: blur(10px);
    .year{
      color: $primary;
    }
    .title{
      color:$white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

}
</style>