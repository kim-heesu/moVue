<template>
    <HeadLine />
    <Search />
    <MovieList />
</template>

<script>
import HeadLine from '../components/HeadLineView.vue';
import Search from '../components/Search.vue';
import MovieList from '../components/MovieList.vue';
export default{
    components:{
        HeadLine,
        Search,
        MovieList
    }
}
</script>