<template>
  <div class="image-list">
    <div class="image-item" v-for="(dog, index) in likedImages" :key="index">
      <BreedItem :breedName="dog.breed" :breedRandomImage="dog.image"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BreedItem from "@/components/BreedItem";

export default {
  name: "Liked",
  data() {
    return {}
  },
  components: {BreedItem},
  computed: {
    ...mapGetters([
      "likedImages"
    ]),
  }
}
</script>

<style scoped>

</style>