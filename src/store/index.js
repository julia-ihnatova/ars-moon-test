import Vuex from "vuex";
import axios from "axios";
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        breedList: [],
        selectedBreed: {
            name:  null,
            images: []
        },
      likedImages:[],
      sortAlphabet: false
    },
    mutations: {
        setBreedList(state, breedList){
            state.breedList = breedList
        },
        setSelectedBreed(state, {name, images}){
            state.selectedBreed.name = name
            state.selectedBreed.images = images
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
          state.sortAlphabet = likedImages
        },
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
                for (let breedItem of Object.entries(response.data.message)) {
                  breeds.push({id: breedItem[0], name: breedItem[0], subBreed: breedItem[1], images: [] } )
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
                  // return  response.data.message
                }).catch(err => {
                  console.log(err)
                })
        },
      getSelectedBreedInfo(context, name){

          return axios.get(`https://dog.ceo/api/breed/${name}/images`).then(response => {
            const images  = response.data.message;
            context.commit('setSelectedBreed', {
              name,images
            })
          })

      },
      getSelectedBreedImages(context, name){
        return axios
          .get(`https://dog.ceo/api/breed/${name}/images`)
          .then(response => {
            const images = response.data.message

            context.commit('setSelectedBreed', {
              name,
              images
            })
          }).catch(err => {
            console.log(err)
          })
      },
      // updateLikedImages(context, {imageName, isLiked}){
      //     this.context.state.likedImages.filter()
      // }
    }

});

