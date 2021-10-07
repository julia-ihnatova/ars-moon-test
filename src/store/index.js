import Vuex from "vuex";
import axios from "axios";
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        breedList: [],
        breed: {
            name:  null,
            image: null
        },
    },
    mutations: {
        setBreedList(state, breedList){
            state.breedList = breedList
        },
        setBreed(state, name, image){
            state.breed.name = name
            state.breed.image = image
        },
    },
    getters:{
        breedList: state =>  state.breedList,
    },
    actions:{
      getBreedList(context) {
          const breeds = [];
            return axios
              .get("https://dog.ceo/api/breeds/list/all")
              .then(async (response) =>  {
                  for (let breedItem of Object.entries(response.data.message)) {
                    if(!breedItem[1].length){
                      const image = await context.dispatch('getBreedImage', breedItem[0])
                      breeds.push({name: breedItem[0], image: image})
                    }else{
                      for(let breed of breedItem[1]){
                        const breedName = `${breedItem[0]} ${breed}`;
                        const breedNameCapitalized = breedName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
                        const image = await context.dispatch('getBreedImage', `${breedItem[0]}/${breed}`)
                        breeds.push({name: breedNameCapitalized, image: image})
                      }
                    }
                  }
                  context.commit('setBreedList', breeds)
              }).catch(err => {
                  console.log(err)
              })
        },
        getBreedImage(context, name){
            return axios
                .get(`https://dog.ceo/api/breed/${name}/images/random`)
                .then(response => {
                  return  response.data.message
                 }).catch(err => {
                  console.log(err)
              })
        },
    }

});

