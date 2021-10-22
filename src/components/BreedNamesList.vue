<template>
  <div>
    <a class="collapsed" href="#">
      <i class="fas fa-fw fa-folder"></i>
      <span>Породы</span>
    </a>
    <transition name="slide">
      <div v-if="isActive" class="">

      </div>
    </transition>
  </div>

</template>

<script>
export default {
name: "BreedNamesList",
data(){
return {
  isActive: false;
}
}
}
</script>

<style scoped>

</style>