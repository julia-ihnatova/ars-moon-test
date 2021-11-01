<template>
  <div class="breed-item">
    <img v-if="imageSrc" :src="imageSrc" :alt="name" class="breed-image"/>
    <div v-else>Load image...</div>
    <LikeButton v-if="imageSrc" :isLiked="likedList.some(dog => dog.image === imageSrc)"
                @toggleLike="toggleLike" class="liked-button"/>
    <div class="breed-name">{{ name | capitalize }}</div>
  </div>


</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import LikeButton from "@/components/LikeButton";

export default {
  name: "BreedItem",
  props: {
    name: {required: true},
    image: {required: false}
  },
  data() {
    return {
      imageSrc: '',
    }
  },
  async mounted() {
    if(this.image){
      this.imageSrc = this.image
    }else{
      this.imageSrc = await this.getBreedRandomImage(this.name);
    }
  },
  components: {LikeButton},
  methods: {
    toggleLike(like) {
      if (like) {
        this.likedList = [{image: this.imageSrc, breed: this.name}, ...this.likedList]
      } else {
        this.likedList = this.likedList.filter(dog => dog.image !== this.image)
      }
    },
    ...mapMutations(['updateLikedImages']),
    ...mapActions(['getBreedRandomImage'])
  },
  computed: {
    likedList: {
      get() {
        return this.likedImages
      },
      set(newVal) {
        this.updateLikedImages(newVal)
      }
    },
    ...mapGetters([
      "likedImages"
    ]),
  },
}
</script>

<style scoped lang="scss">

.breed-item {
  position: relative;
}

a img, img {
  max-width: 100%;
  width: 100%;
  border-radius: 9px;
}

.breed-name, .liked-button {
  position: absolute;
}

.breed-name {
  color: white;
  font-weight: 600;
  font-size: 25px;
  line-height: 28px;
  bottom: 25px;
  right: 25px;
}

.liked-button {
  top: 25px;
  left: 25px;
}

.image-list > div:first-child {
  .breed-name {
    bottom: 50px;
    right: 50px;
  }

  .liked-button {
    top: 35px;
    left: 35px;
  }
}

</style>