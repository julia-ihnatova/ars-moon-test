<template>
  <div class="container" v-scroll="onScroll">
    <div class="image-list">
      <div class="image-item" v-for="(photo, index) in images" :key="index">
        <BreedItem :name="name" :image="photo"/>
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
      allImages: [],
      offset: 0,
      name: '',
      images:[]
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
    async loadBreed() {
      try {
        this.loading = true;

        if(this.breedList < 0 || this.breedList.length === 0) return;
        if (this.breedList[this.breedIndex].images) {
          this.allImages = this.breedList[this.breedIndex].images;
        } else {
          this.allImages = await this.getSelectedBreedImages(this.$route.params.name);
        }

        this.loadMoreImages();

      } catch (ex) {
        console.log(ex);
      } finally {
        this.loading = false;
      }
    },
    loadMoreImages(){
        this.loading = true;
        this.images =  this.allImages.slice(0, this.offset + 20);

      // Increase offset
        this.offset += 20;
        this.loading = false;

    },
    onScroll() {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.loadMoreImages();
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