<template>
<div>
  <span @click="isOpen = !isOpen" class="accordion-button">Породы <img :src="require(`../assets/${isOpen ? 'arrow_up.png' : 'arrow_down.png'}`)" alt="arrow"/></span>
  <transition name="accordion">
    <div v-show="isOpen">
        <router-link :to="{name: 'Home'}" class="item-label all-breeds">Все породы</router-link>
      <div class="alphabet-names">
<!--        <div class="letter-names">-->
          <h1 class="item-label">A</h1>
          <router-link  :to="{ name: 'Breed', params: {name: 'affenpinscher' }}" class="item-label">Affenpinscher</router-link>
          <router-link  :to="{ name: 'Breed', params: {name: 'african' }}" class="item-label">African</router-link>
          <router-link  :to="{ name: 'Breed', params: {name: 'airedale' }}" class="item-label">Airedale</router-link>
          <router-link  :to="{ name: 'Breed', params: {name: 'akita' }}" class="item-label last">Akita</router-link>

<!--        </div>-->

<!--        <div class="letter-names">-->
          <h1 class="item-label">B</h1>
          <router-link  :to="{ name: 'Breed', params: {name: 'affenpinscher' }}" class="item-label">Affenpinscher</router-link>
          <router-link  :to="{ name: 'Breed', params: {name: 'african' }}" class="item-label">African</router-link>
          <router-link  :to="{ name: 'Breed', params: {name: 'airedale' }}" class="item-label">Airedale</router-link>
          <router-link  :to="{ name: 'Breed', params: {name: 'akita' }}" class="item-label">Akita</router-link>
          <router-link  :to="{ name: 'Breed', params: {name: 'akita' }}" class="item-label last">Akita</router-link>

<!--        </div>-->

<!--        <div class="letter-names">-->
          <h1 class="item-label">C</h1>
        <router-link  :to="{ name: 'Breed', params: {name: 'affenpinscher' }}" class="item-label">Affenpinscher</router-link>
        <router-link  :to="{ name: 'Breed', params: {name: 'african' }}" class="item-label">African</router-link>
        <router-link  :to="{ name: 'Breed', params: {name: 'airedale' }}" class="item-label">Airedale</router-link>
        <router-link  :to="{ name: 'Breed', params: {name: 'akita' }}" class="item-label">Akita</router-link>
        <router-link  :to="{ name: 'Breed', params: {name: 'akita' }}" class="item-label">Akita</router-link>
        <router-link  :to="{ name: 'Breed', params: {name: 'akita' }}" class="item-label">Akita</router-link>
        <router-link  :to="{ name: 'Breed', params: {name: 'akita' }}" class="item-label last">Akita</router-link>
<!--        </div>-->
<!--          <div class="letter-names">-->
        <h1 class="item-label">C</h1>
        <router-link  :to="{ name: 'Breed', params: {name: 'affenpinscher' }}" class="item-label">Affenpinscher</router-link>
        <router-link  :to="{ name: 'Breed', params: {name: 'african' }}" class="item-label">African</router-link>
        <router-link  :to="{ name: 'Breed', params: {name: 'airedale' }}" class="item-label">Airedale</router-link>
        <router-link  :to="{ name: 'Breed', params: {name: 'akita' }}" class="item-label last">Akita</router-link>
<!--          </div>-->
        </div>
    </div>
  </transition>

</div>
</template>

<script>
export default {
name: "Accordion",
  data(){
    return {
      isOpen: false
    }
  },
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
.accordion-leave-to
{
  opacity: 0;
  max-height: 0;
}

.accordion-button{
  color: #fff;
  border-bottom: 1px dashed #fff;
  padding-bottom: 2px;
}

.alphabet-names{
  display: flex;
  flex-wrap: wrap;
}

.letter-names{
  display: flex;
  flex-wrap: wrap;
}

.all-breeds{
  display: inline-block;
  margin-top: 32px;
}

h1.item-label{
  border: none;
  font-size: 20px;
}

.item-label{
  border: 1px solid #626262;
  border-radius: 20px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  padding: 4px 12px;
  margin-right: 16px;
  margin-bottom: 16px;
  color: #626262;

  &.last{
    margin-right: 32px;
  }


  &.router-link-active{
    border-color: #3C59F0;
    color: #3C59F0;
  }
}

</style>