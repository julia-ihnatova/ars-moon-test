<template>
  <div class="container" v-scroll="onScroll">
    <div class="image-list">
      <div class="image-item" v-for="(photo, index) in images" :key="index">
        <BreedItem :breedName="name" :breedRandomImage="photo"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BreedItem from "@/components/BreedItem";

export default {
  name: "Breed",
  data() {
    return {
      loading: false,
      name: '',
      images: [],
      count: 20
    }
  },
  components: {BreedItem},
  computed: {
    ...mapGetters([
      "breedList",
    ]),
  },
  mounted() {
    this.name = this.$route.params.name;
    this.loadBreed()
  },
  methods: {
    async loadBreed() {
      try {
        this.loading = true;
        let breedIndex = this.breedList.findIndex(breed => breed.name === this.name);
        if (breedIndex < 0) {
          this.addBreedToList(this.name);
          breedIndex = this.breedList.findIndex(breed => breed.name === this.name);
        }
        if (this.breedList[breedIndex].images) {
          this.images = this.breedList[breedIndex].images
        } else {
          this.images = await this.getSelectedBreedImages(this.$route.params.name);
        }
      } catch (ex) {
        console.log(ex)
      } finally {
        this.loading = false;
      }
    },
    onScroll() {

    },
    ...mapActions(["getSelectedBreedImages"]),
    ...mapMutations(["addBreedToList"])
  },

}
</script>

<style scoped>

</style>