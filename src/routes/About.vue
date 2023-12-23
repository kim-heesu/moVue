<template>
    <div class="about">
        <div class="photo">
            <Loader v-if="imageLoading" absolute />
            <img :src="image" :alt="name">
        </div>
        <div class="name">
            {{ name }}
        </div>
        <div class="email">
            {{ email }}
        </div>
        <div class="blog">
            <a :href="blog" target="_blank">{{ blog }}</a>
        </div>
        <div class="phone">
            {{ phone }}
        </div>
    </div>
</template>
<script>
import Loader from '~/components/Loader.vue';
import {mapState} from 'vuex';
export default{
    components:{
        Loader
    },
    data(){
        return{
            imageLoading:true,
        }
    },
    computed: {
        ...mapState('about',[
            'image',
            'name',
            'email',
            'blog',
            'phone',
        ])
    },
    mounted(){
        this.init()
    },
    methods:{
        async init(){
            await this.$loadImage(this.image)
            this.imageLoading = false
        }}
}
</script>
<style lang="scss" scoped>
.about{
    text-align: center;
    .photo{
        position: relative;
        width: 250px;
        height: 250px;
        margin: 40px auto 20px;
        border:10px solid $gray-300;
        border-radius: 50%;
        box-sizing: border-box;
        background: $gray-200;
        img {
            width: 100%;
            border-radius: 50%;
        }
    }
    .name{
        font-size: 40px;
        font-family: "oswald", sans-serif;
        margin-bottom: 20px;
    }
}
</style>