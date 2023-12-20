import axios from 'axios';
export default{
    namespaced: true,
    state: () => {
        return{
            movies: [],
            message:'',
            loading: false
        }
    },
    getters:{},
    mutations:{
        updateState(state,payload){
            Object.keys(payload).forEach(key=>{
                state[key] = payload[key]
            })
        },
        resetMovies(state){
            state.movies = []
        }
    },
    actions:{
        async searchMovies({state , commit}, payload){
            const {title,type,number,year} = payload
            const OMDB_API_KEY = 'c4603bb9'
            const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=tt3896198&s=${title}&type=${type}&y=${year}&page=1`)
            const {Search, totalResults} = res.data

            commit('updateState',{
                movies: Search
            });

            const total = parseInt(totalResults,10);
            const pageLength = Math.ceil(total/10)

            if(pageLength > 1 ){
                for(let page = 2; page<= pageLength; page += 1){
                    if(page > (number / 10))break;
                    const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=tt3896198&s=${title}&type=${type}&y=${year}&page=${page}`)
                    const { Search } = res.data;

                    commit('updateState',{
                        movies: [...state.movies, ...Search]
                    });
                }
            }
        }
    }
}



