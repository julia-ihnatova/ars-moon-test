<template>
  <div id="app">
    <Header/>
    <div class="container">
      <div class="top-options">
        <BreedSelector/>
        <SwitchSort v-if="$route.name !== 'Breed'"/>
      </div>
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import BreedSelector from "@/components/BreedSelector";
import SwitchSort from "@/components/SwitchSort";

export default {
  name: 'App',
  components: {
    SwitchSort,
    BreedSelector,
    Header
  }
}
</script>

<style>
@import './app.css';

.top-options {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 44px 0;
}

</style>

