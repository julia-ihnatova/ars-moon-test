<template>
  <div>
    <span @click="isOpen = !isOpen" class="accordion-button">Породы <img
        :src="require(`../assets/${isOpen ? 'arrow_up.png' : 'arrow_down.png'}`)" alt="arrow"/></span>
    <transition name="accordion">
      <div v-show="isOpen">

        <router-link :to="{name: 'Home'}" class="item-label all-breeds">Все породы</router-link>
        <div class="alphabet-names" >
          <template v-for="(breeds, letter) in byAlphabet">
            <h1 class="item-label" :key="letter">{{ letter | capitalize }}</h1>
            <router-link v-for="name in breeds" :key="name" :to="{ name: 'Breed', params: {name: name }}" class="item-label">
              {{ name | capitalize }}
            </router-link>
          </template>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "BreedSelector",
  data() {
    return {
      isOpen: false,
      allBreedsList: [],
      byAlphabet:{}
    }
  },
  async mounted() {
    await this.ensureBreedListLoaded();
    this.createAlphabetChankedList();
    this.isOpen = false;
  },
  methods: {
    async ensureBreedListLoaded() {
      try {
        this.loading = true;
        if(!this.breedList.length && !this.breedsLoading){
          this.allBreedsList = await this.getBreedList();
        }else{
          this.allBreedsList = this.breedList;
        }
      }catch(e){
        console.log(e)
      }finally {
        this.loading = false;
      }
    },
    createAlphabetChankedList(){
      for(const breed of this.allBreedsList){
         if(breed.name[0] in this.byAlphabet){
           this.byAlphabet[breed.name[0]].push(breed.name)
         }else{
           this.byAlphabet[breed.name[0]] = [breed.name]
         }
      }
    },
    ...mapActions(["getBreedList"])
  },
  computed:{
    ...mapGetters(["breedList"])
  }
}
</script>

<style scoped lang="scss">

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.5s;
  max-height: 1000px;
  opacity: 1;
}

.accordion-enter,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}

.accordion-button {
  color: #fff;
  border-bottom: 1px dashed #fff;
  padding-bottom: 2px;
}

.alphabet-names {
  display: flex;
  flex-wrap: wrap;
}

.letter-names {
  display: flex;
  flex-wrap: wrap;
}

.all-breeds {
  display: inline-block;
  margin-top: 32px;
}

h1.item-label {
  border: none;
  font-size: 20px;
  margin-left: 16px;
}

.item-label {
  border: 1px solid #626262;
  border-radius: 20px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  padding: 4px 12px;
  margin-right: 16px;
  margin-bottom: 16px;
  color: #626262;


  &.router-link-active {
    border-color: #3C59F0;
    color: #3C59F0;
  }
}

</style>