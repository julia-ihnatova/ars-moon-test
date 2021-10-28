<template>
<div v-scroll="onScroll">
  <div class="image-list">
    <div class="image-item" v-for="(dog, index) in breeds" :key="index">
      <router-link  :to="{ name: 'Breed', params: {name: dog.name }}" >
        <BreedItem  :breedName="dog.name" :breedRandomImage="dog.randomImage" />
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
data(){
return {
  breeds:[],
  count: 0,
  loading: false
}
},
  computed: {
    ...mapGetters([
      "breedList",
      "sortAlphabet",
        "likedImages"
    ]),
  },
  components: {BreedItem},
  mounted(){
    this.loadBreedList()
  },
  methods:{
    async loadBreedList(){
      try {
        this.loading  = true;
        await this.getBreedList();
       await this.loadMoreBreeds();
      } catch (ex) {
        console.log(ex)
      }finally {
        this.loading  = false;
      }
    },
    onScroll(){
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;
      if(bottomOfWindow) {
        setTimeout(() => this.loadMoreBreeds(), 1000)
      }
    },
    async loadMoreBreeds(){
      this.loading  = true;
      this.breeds =[ ...this.breeds , ...this.breedList.slice(this.count, this.count+20)];
      this.breeds.sort(function(){return 0.5 - Math.random()});
      for(let breed of this.breeds){
        await this.getBreedRandomImage(breed.name);
      }

      this.count += 20;
      this.loading  = false;
    },
    ...mapActions(['getBreedList', 'getBreedRandomImage'])

  },
  watch:{
    sortAlphabet(newSort){
      if(newSort){
        this.breeds.sort((a, b) => a.name.localeCompare(b.name));
      }else{
        this.breeds.sort(function(){return 0.5 - Math.random()});
      }

    }
  }
}
</script>

<style scoped lang="scss">

.image-list >div:first-child {
  grid-column: 1 / -1;
}

</style>