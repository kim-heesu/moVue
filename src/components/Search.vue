<template>
  <div class="container">
    <input type="text" class="form-control" v-model="title" placeholder="Search for Monies, Serise & more" @keyup.enter="apply"/>
    <div class="selects">
      <!-- $data는 data(){return} 안에 있는 내용에 접근할 수 있게 해준다 -->
      <select v-for="filter in filters" v-model="$data[filter.name]" :key="filter.item" class="form-select">
        <option v-if="filter.name =='year'" value="">All Years</option>
        <option v-for="item in filter.items" :key="item">{{ item }}</option>
      </select>
    </div>
    <button type="button" class="btn btn-primary" @click="apply">Apply</button>
  </div>  
</template>

<style lang="scss" scoped>
.container{
  display:flex;
  > *{
    margin-right: 10px;
    font-size: 15px;
    &:last-child{
      margin-right: 0;
    }
  }
  .selects{
    display: flex;
    select{
      width: 120px;
      margin-right: 10px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
  .btn{
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0; //flex가 하위요소의 넓이를 자동으로 줄이는걸 방지
  }
}
</style>

<script>

export default{
  data(){
    return{
      title:'',
      type:'movie',
      number: 10,
      year:'',
      filters:[
        {
          name:'type',
          items:['movie','series','episode']
        },
        {
          name:'number',
          items:['10','20','30']
        },
        {
          name:'year',
          items:(function(){
            const years = []
            //자동으로 올해년도를 가져올수있다.
            const thisYear = new Date().getFullYear()
            for(let i=thisYear; i>=1985; i-=1){
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },
  methods:{
    async apply(){
      this.$store.dispatch('movie/searchMovies',{
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year,
      })
    }
  }
}
</script>