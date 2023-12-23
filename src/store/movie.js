import axios from 'axios';

// 중복되는 내용 제거
import _uniqBy from 'lodash/uniqBy';
const _defaultMsg = 'Search for the movie title!'
export default{
    namespaced: true,
    state: () => {
        return{
            movies: [],
            message:_defaultMsg,
            loading: false,
            theMovie: {}
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
            state.message = _defaultMsg
            state.loading = false
        }
    },
    actions:{
        async searchMovies({state , commit}, payload){
            if(state.loading) return

            commit('updateState',{
                message:'',
                loading: true
            });

            try{
                const res = await _fetchMovie({
                    ...payload,page:1
                })
                const {Search, totalResults} = res.data
    
                commit('updateState',{
                    movies: _uniqBy(Search,'imdbID')
                });
    
                const total = parseInt(totalResults,10);
                const pageLength = Math.ceil(total/10)
    
                if(pageLength > 1 ){
                    for(let page = 2; page<= pageLength; page += 1){
                        if(page > (payload.number / 10))break;
                        const res = await _fetchMovie({
                            ...payload,page
                        })
                        const { Search } = res.data;
    
                        commit('updateState',{
                            movies: [...state.movies, ..._uniqBy(Search,'imdbID')]
                        });
                    }
                }
            }catch(message){
                commit('updateState',{
                    movies:[],
                    message
                })
            } finally {
                commit('updateState',{
                    loading: false
                });
            }
        },
        async searchMovieWithId({state,commit}, payload){
            if(state.loading) return

            commit('updateState',{
                theMovie:{},
                loading: true
            });

            try{
                const res = await _fetchMovie(payload)
                console.log(res.data)
                commit('updateState',{
                    theMovie: res.data
                });
            } catch(error){
                commit('updateState',{
                    theMovie: {}
                });
            } finally {
                commit('updateState',{
                    loading: false
                });
            }
        }
    }
}



function _fetchMovie(payload){
    const {title,type,year,page,id} = payload
    const OMDB_API_KEY = 'c4603bb9'
    const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

    // `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=tt3896198&s=${title}&type=${type}&y=${year}&page=${page}`

    return new Promise((resolve, reject)=>{
        axios.get(url)
        .then((res)=>{
            console.log(res)
            if(res.data.Error){
                reject(res.data.Error)
            }
            resolve(res)
        })
        .catch((error)=>{
            reject(error.message)
        })
    })
}