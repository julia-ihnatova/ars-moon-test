<template>
<div @click.prevent="toggleLike()" class="like">
  <img :src="isLiked ? require('../assets/heart.svg') : require( '../assets/heart.svg')" alt="heart"/>
</div>
</template>

<script>
export default {
name: "LikeButton",
  props:[
  'isLiked'
  ],
data(){
return {
}
},
  mounted(){
  },
  methods:{
    toggleLike(){
      this.$emit('toggleLike',!this.isLiked);
    }
  },

}
</script>

<style scoped>
.like{
  position: absolute;
  z-index: 2;
}

</style>