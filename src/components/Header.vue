<template>
  <header class="flex ">
    <div class="logo">
      <router-link :to="{ name: 'Home'}"><img src="../assets/logo.png" alt="песель"/></router-link>
    </div>
    <div class="chosen">
      <router-link :to="{ name: 'Liked'}"><span class="text">Избранные песели </span> <img
          src="../assets/heart-header.svg" alt="liked_pesels"/></router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">

header {
  height: 100px;
  padding: 35px 60px;
  display: flex;
  justify-content: center;
  background: #151419;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.55);

  .logo {
    color: #3C59F0;
  }

  .chosen {
    margin-left: auto;

    .text {
      position: relative;
      bottom: 3px;
    }

    img {
      margin-left: 10px;
    }

    .router-link-active{
      color: #fff;
    }
  }


}

</style>