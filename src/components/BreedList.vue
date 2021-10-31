<template>
  <div v-scroll="onScroll">
    <div class="image-list">
      <div class="image-item" v-for="(dog, index) in breeds" :key="index">
        <router-link :to="{ name: 'Breed', params: {name: dog.name }}">
          <BreedItem :breedName="dog.name" :breedRandomImage="dog.randomImage"/>
        </router-link>
      </div>
    </div>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BreedItem from "@/components/BreedItem";

export default {
  name: "BreedList",
  data() {
    return {

      offset: 0,
      loading: false,
    }
  },
  computed: {
    breeds() {
      return this.breedList.slice(0, this.offset + 20);
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

      await Promise.all(this.breedList.slice(this.offset, this.offset + 20).map(async (breed) => {
        await this.getBreedRandomImage(breed.name);
      }));

      // Comment to work
      this.offset += 20;
      this.loading = false;
    },
    ...mapActions(['getBreedList', 'getBreedRandomImage'])

  },
  watch: {
    sortAlphabet(newSort) {
      if (newSort) {
        this.breeds.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        this.breeds.sort(function () {
          return 0.5 - Math.random()
        });
      }

    }
  }
}
</script>

<style scoped lang="scss">

.image-list > div:first-child {
  grid-column: 1 / -1;
}

</style>