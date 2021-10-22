<template>
    <div class="container">
      <div>
        <SwitchSort/>
      </div>
      <BreedList />
    </div>
</template>

<script>

import SwitchSort from "@/components/SwitchSort";
import BreedList from "@/components/BreedList";

export default {
  name: "Home",
  components: { SwitchSort, BreedList},
  data(){
    return {
    }
  },


}
</script>

<style scoped>

</style>