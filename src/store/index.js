import Vuex from "vuex";
import axios from "axios";
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        breedList: [],
        likedImages:[],
        sortAlphabet: false
    },
    mutations: {
        setBreedList(state, breedList){
            state.breedList = breedList
            state.breedList = [... state.breedList]
        },
      updateBreedRandomImage(state, {name, randomImage}){
        const breedIndex = state.breedList.findIndex(breed => breed.name === name)
        Object.assign(state.breedList[breedIndex], { randomImage: randomImage });
        state.breedList = [... state.breedList]
      },
        updateSort(state, sortAlphabet){
          state.sortAlphabet = sortAlphabet
        },
        updateLikedImages(state, likedImages){
          state.likedImages = likedImages
        },
      setSelectedBreedImages(state, {name, images}){
        const breedIndex = state.breedList.findIndex(breed => breed.name === name);
        Object.assign(state.breedList[breedIndex], { images: images });
        state.breedList = [... state.breedList]

        }
    },
    getters:{
        breedList: state =>  state.breedList,
        selectedBreed: state =>  state.selectedBreed,
        sortAlphabet: state =>  state.sortAlphabet,
        likedImages: state =>  state.likedImages,

    },
    actions:{
        getBreedList(context) {
          const breeds = [];
            return axios
              .get("https://dog.ceo/api/breeds/list/all")
              .then(async (response) =>  {
                for (let breedItem of Object.keys(response.data.message)) {
                  breeds.push({id: breedItem, name: breedItem, images: [], randomImage: '' } )
                }
                context.commit('setBreedList', breeds)

              }).catch(err => {
                  console.log(err)
              })
        },
        getBreedRandomImage(context, name){
            return axios
                .get(`https://dog.ceo/api/breed/${name}/images/random`)
                .then(response => {
                  context.commit('updateBreedRandomImage', {name, randomImage: response.data.message})
                }).catch(err => {
                  console.log(err)
                })
        },
      getSelectedBreedInfo(context, name){
          return axios.get(`https://dog.ceo/api/breed/${name}/images`).then(response => {
            const images  = response.data.message;
            // context.commit('setSelectedBreed', name)

            context.commit('setSelectedBreedImages', {
              name,
              images
            })

          })

      },
      getSelectedBreedImages(context, name){
        return axios
          .get(`https://dog.ceo/api/breed/${name}/images`)
          .then(response => {
            context.commit('setSelectedBreedImages', {
              name,
              images: response.data.message
            })
          }).catch(err => {
            console.log(err)
          })
      },
    }

});

