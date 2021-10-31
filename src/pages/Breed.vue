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
import { mapActions, mapGetters } from 'vuex';
import BreedItem from "@/components/BreedItem";

export default {
  name: "Breed",
  data() {
    return {
      loading: false,
      images: [],
      count: 20,
      name: '',
    }
  },
  components: {BreedItem},
  computed: {
    breedIndex(){
      return this.breedList.findIndex(breed => breed.name === this.name);
    },
    ...mapGetters([
      "breedList",
    ]),
  },
  mounted(){
    this.name = this.$route.params.name;
     this.loadBreed();
  },
  methods: {

    onScroll() {

    },
    async loadBreed() {
      try {
        this.loading = true;

        if(this.breedList < 0 || this.breedList.length === 0) return;

        if (this.breedList[this.breedIndex].images) {
          this.images = this.breedList[this.breedIndex].images;
        } else {
          this.images = await this.getSelectedBreedImages(this.$route.params.name);
        }
      } catch (ex) {
        console.log(ex);
      } finally {
        this.loading = false;
      }
    },
    ...mapActions(["getSelectedBreedImages"]),
  },
  watch:{
     breedIndex(){
       this.loadBreed()
    }
  }

}
</script>

<style scoped>

</style>