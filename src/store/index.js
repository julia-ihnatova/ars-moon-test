import Vuex from "vuex";
import axios from "axios";
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breedList: [],
    likedImages: [],
    sortAlphabet: false,
    breedsLoading: false,
  },
  mutations: {
    setBreedList(state, breedList) {
      state.breedList = breedList;
      state.breedList = [...state.breedList];
    },
    addBreedToList(state, name) {
      state.breedList = [{name}, ...state.breedList];
    },
    updateBreedRandomImage(state, {name, randomImage}) {
      const breedIndex = state.breedList.findIndex(breed => breed.name === name);
      Object.assign(state.breedList[breedIndex], {randomImage: randomImage});
      state.breedList = [...state.breedList];
    },
    updateSort(state, sortAlphabet) {
      state.sortAlphabet = sortAlphabet;
    },
    updateLikedImages(state, likedImages) {
      state.likedImages = likedImages;
      state.likedImages = [...state.likedImages];
    },
    setSelectedBreedImages(state, {name, images}) {
      const breedIndex = state.breedList.findIndex(breed => breed.name === name);
      Object.assign(state.breedList[breedIndex], {images: images});
      state.breedList = [...state.breedList];
    },
    setBreedsLoading(state, loadingStatus){
      state.breedsLoading = loadingStatus;
    }
  },
  getters: {
    breedList: state => state.breedList,
    sortAlphabet: state => state.sortAlphabet,
    likedImages: state => state.likedImages,
    breedsLoading: state => state.breedsLoading,
  },
  actions: {
    async getBreedList(context) {
      const breeds = [];

      try {
        context.commit("setBreedsLoading", true);
        const response = await axios.get("https://dog.ceo/api/breeds/list/all");

        for (let breedItem of Object.keys(response.data.message)) {

          breeds.push({
            name: breedItem
          });
        }

        context.commit("setBreedList", breeds);
        context.commit("setBreedsLoading", false);

        return breeds;

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

