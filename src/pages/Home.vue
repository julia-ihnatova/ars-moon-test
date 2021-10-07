<template>
    <div  v-scroll="onScroll">
      <div v-if="!loading">
        Сортировка по алфавиту
        <label class="switch">
          <input type="checkbox" v-model="alphabet" @change="sortBreeds">
          <span class="slider round"></span>
        </label>
      </div>
      <div>
        <router-link v-for="dog in breeds" :to="{ name: 'Breed', params: {name: dog.name }}" :key="dog.name">
          <img :src="dog.image" :alt="dog.name"/>
        </router-link>
      </div>
      <div v-if="loading">Loading...</div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "Home",
  data(){
    return {
      breeds:[],
      count: 0,
      loading: false,
      alphabet: false
    }
  },
  mounted(){
    this.loadBreedList()

  },
  computed: {
    ...mapGetters([
      "breedList",
    ]),
  },
  methods:{
    async loadBreedList(){
      try {
        this.loading  = true;
        await this.getBreedList();
        this.loadMoreBreeds()
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

    loadMoreBreeds(){
      this.loading  = true;
      this.breeds =[ ...this.breeds , ...this.breedList.slice(this.count, this.count+20)];
      this.breeds.sort(function(){return 0.5 - Math.random()});
      this.count += 20;
      this.loading  = false;
    },
    sortBreeds(){
      if(this.alphabet){
        this.breeds.sort((a, b) => a.name.localeCompare(b.name));
      }else{
         this.breeds.sort(function(){return 0.5 - Math.random()});
      }
    },
    ...mapActions(['getBreedList'])
  }
}
</script>

<style scoped>

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>