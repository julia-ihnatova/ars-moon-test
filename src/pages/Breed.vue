<template>
  <div>
    <h1>{{ selectedBreed.name}}</h1>
    <div>
      <img v-for="(photo, index) in selectedBreed.images" :key="index" :src="photo" :alt="selectedBreed.name"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
name: "Breed",
data(){
return {
  loading: false,
  info:{}

}
},
  components:{

  },
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
        this.info  =  await this.getSelectedBreedInfo(this.$route.params.name);
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