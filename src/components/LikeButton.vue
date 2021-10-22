<template>
<button @click.prevent="toggleLike()" class="like">
  <span>{{isLiked ? 	"\u2665" : "\u2661" }} </span>
</button>
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