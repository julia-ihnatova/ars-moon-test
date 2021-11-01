<template>
  <div v-scroll="onScroll">
    <div class="image-list">
      <div class="image-item" v-for="dog in breeds" :key="dog.name">
        <router-link :to="{ name: 'Breed', params: {name: dog.name }}">
          <BreedItem :name="dog.name"/>
        </router-link>
      </div>
    </div>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BreedItem from "@/components/BreedItem";

const OFFSET_STEP = 20;

export default {
  name: "BreedList",
  data() {
    return {
      offset: 0,
      loading: false,
      sortedBreeds:[]
    }
  },
  computed: {
    breeds(){
      return this.getBreedsForShow()
    },
    ...mapGetters([
      "breedList",
      "sortAlphabet",
      "likedImages",
      "breedsLoading"
    ]),
  },
  components: {BreedItem},
  beforeMount() {
    this.loadBreedList();
  },
  methods: {
    async loadBreedList() {
      try {
        this.loading = true;
        if(!this.breedList.length && !this.breedsLoading){
          await this.getBreedList();
        }

        //load images for breeds  that are showing on the page
        await this.loadMoreBreeds();
      } catch (ex) {
        console.log(ex)
      }finally{
        this.loading = false;
      }
    },
    onScroll() {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.loadMoreBreeds();
      }
    },
    async loadMoreBreeds() {
      this.loading = true;

      // Increase offset
      this.offset += OFFSET_STEP;
      this.loading = false;
    },
    getBreedsForShow(){
      const br = this.breedList.slice(0, this.offset + OFFSET_STEP);
      if (this.sortAlphabet) {
        br.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        br.sort(() => {return 0.5 - Math.random()});
      }

      return br
    },

    ...mapActions(['getBreedList', 'getBreedRandomImage'])
  },
}
</script>

<style scoped lang="scss">

.image-list > div:first-child {
  grid-column: 1 / -1;
}

</style>