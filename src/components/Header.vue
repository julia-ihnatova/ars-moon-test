<template>
  <header class="flex ">
    <div class="logo">
      <router-link :to="{ name: 'Home'}"><img src="../assets/logo.png" alt="песель"/></router-link></div>
    <div class="chosen">Избранные</div>
  </header>
</template>

<script>
export default {
name: "Header",
data(){
return {}
}
}
</script>

<style scoped lang="scss">

header{
  height: 100px;
  padding: 35px 60px;
  justify-content: center;
  background: #151419;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.55);

  .logo{
    color: #3C59F0;
  }

  .chosen{
    margin-left: auto;
  }
}

</style>