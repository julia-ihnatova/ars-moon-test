<template>
  <div>
    <router-link  :to="{ name: 'Breed', params: {name: breedName }}" >
      <img v-if="breedRandomImage" :src="breedRandomImage" :alt="breedName" class="breed-image"/>
      <div v-else>Load image...</div>
<!--      <LikeButton :isliked="likedImages.includes(dog.randomImage) " @toggleLike="toggleLike(dog.randomImage)"/>-->

    </router-link>
  </div>


</template>

<script>
import {  mapGetters } from "vuex";

// import LikeButton from "@/components/LikeButton";

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
  components:{},
  methods:{
    toggleLike(){

    }
  },
  computed: {
    ...mapGetters([
      "likedImages"
    ]),
  },
}
</script>

<style scoped>

</style>