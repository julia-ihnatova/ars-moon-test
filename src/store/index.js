import Vuex from "vuex";
import axios from "axios";
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breedList: [],
    likedImages: [],
    sortAlphabet: false
  },
  mutations: {
    setBreedList(state, breedList) {
      state.breedList = breedList;
      state.breedList = [...state.breedList];
    },
    addBreedToList(state, name) {
      state.breedList = [{id: name, name}, ...state.breedList];
    },
    updateBreedRandomImage(state, {name, randomImage}) {
      const breedIndex = state.breedList.findIndex(breed => breed.name === name);
      Object.assign(state.breedList[breedIndex], {randomImage: randomImage});
      state.breedList = [...state.breedList];
    },
    updateSort(state, sortAlphabet) {
      state.sortAlphabet = sortAlphabet
    },
    updateLikedImages(state, likedImages) {
      state.likedImages = likedImages;
      state.likedImages = [...state.likedImages];
    },
    setSelectedBreedImages(state, {name, images}) {
      const breedIndex = state.breedList.findIndex(breed => breed.name === name);
      Object.assign(state.breedList[breedIndex], {images: images});
      state.breedList = [...state.breedList];
    }
  },
  getters: {
    breedList: state => state.breedList,
    selectedBreed: state => state.selectedBreed,
    sortAlphabet: state => state.sortAlphabet,
    likedImages: state => state.likedImages,

  },
  actions: {
    async getBreedList(context) {
      const breeds = [];

      try {
        const response = await axios.get("https://dog.ceo/api/breeds/list/all");

        for (let breedItem of Object.keys(response.data.message)) {
          breeds.push({id: breedItem, name: breedItem});
        }
        context.commit("setBreedList", breeds);
      } catch (ex) {
        console.log(ex)
      }
    },
    async getBreedRandomImage(context, name) {
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${name}/images/random`);
        context.commit('updateBreedRandomImage', {name, randomImage: response.data.message})
      } catch (ex) {
        console.log(ex)
      }
    },
    async getSelectedBreedImages(context, name) {
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${name}/images`);
        const images = response.data.message;

        context.commit('setSelectedBreedImages', {
          name,
          images
        })

        return images;
      } catch (ex) {
        console.log(ex)
      }

    },
  }

});

