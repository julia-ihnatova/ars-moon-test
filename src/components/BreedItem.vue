<template>
  <div class="breed-item">
    <img v-if="breedRandomImage" :src="breedRandomImage" :alt="breedName" class="breed-image"/>
    <div v-else>Load image...</div>
    <LikeButton  v-if="breedRandomImage" :isLiked="likedImages.includes(breedRandomImage) " @toggleLike="toggleLike" class="liked-button"/>
    <div class="breed-name">{{ howBreedCalls }}</div>
  </div>


</template>

<script>
import {  mapGetters, mapMutations } from "vuex";

import LikeButton from "@/components/LikeButton";

export default {
name: "BreedItem",
  props:{
    breedName: {required: true},
    breedRandomImage: {required: false}
  },
  data(){
    return {
    }
  },
  mounted() {
  },
  components:{ LikeButton },
  methods:{
    toggleLike( isLiked){
      if(isLiked){
        this.likedList.push(this.breedRandomImage);

      }
      console.log( this.likedList);
    },
    ...mapMutations(['updateLikedImages'])
  },
  computed: {
    howBreedCalls(){
      return this.breedName.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    },
    likedList:{
      get(){
        return this.likedImages
      },
      set(newVal){

        this.updateLikedImages(newVal)
      }
    },
    ...mapGetters([
      "likedImages"
    ]),
  },
}
</script>

<style scoped  lang="scss">

.breed-item{
  position: relative;
}

a img, img{
  max-width: 100%;
  width: 100%;
  border-radius: 9px;
}

.breed-name, .liked-button{
  position: absolute;
}

.breed-name{
  color: white;
  font-weight: 600;
  font-size: 25px;
  line-height: 28px;
  bottom: 25px;
  right: 25px;
}

.liked-button{
  top: 25px;
  left: 25px;
}

.image-list >div:first-child {
.breed-name{
  bottom: 50px;
  right: 50px;
}

  .liked-button{
    top: 35px;
    left: 35px;
  }
}

</style>