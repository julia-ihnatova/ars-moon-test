<template>
  <div class="container">
    <div class="image-list">
      <div class="image-item" v-for="(photo, index) in selectedBreed" :key="index">
        <BreedItem  :breedName="selectedBreed" :breedRandomImage="photo" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreedItem from "@/components/BreedItem";

export default {
name: "Breed",
data(){
return {
  loading: false,
  info:{}
}
},
  components:{ BreedItem },
  computed: {
    ...mapGetters([
      "selectedBreed",
    ]),
  },
  mounted(){
    this.loadBreed()

  },
  methods:{
    async loadBreed(){
      try {
        this.loading  = true;
        //если их нет, то надо сделать запрос

        this.info  =  await this.getSelectedBreedInfo(this.$route.params.name);
        //взять из return изображения


      } catch (ex) {
        console.log(ex)
      }finally {
        this.loading  = false;
      }
    },
    ...mapActions(["getSelectedBreedInfo"])
  }
}
</script>

<style scoped>

</style>