<template>
  <div id="app">
    <Header />
    <div class="container">
      <div class="top-options">
        <Accordion />
        <SwitchSort v-if="$route.name !== 'Breed'"/>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Accordion from "@/components/Accordion";
import SwitchSort from "@/components/SwitchSort";
export default {
  name: 'App',
  components: {
    SwitchSort,
    Accordion,
    Header
  }
}
</script>

<style>
@import './app.css';

.top-options{
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 44px 0;
}

</style>

