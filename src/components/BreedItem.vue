<template>
  <div class="breed-item">
    <img v-if="breedRandomImage" :src="breedRandomImage" :alt="breedName" class="breed-image"/>
    <div v-else>Load image...</div>
    <LikeButton v-if="breedRandomImage" :isLiked="likedList.some(dog => dog.image === breedRandomImage)"
                @toggleLike="toggleLike" class="liked-button"/>
    <div class="breed-name">{{ breedName | capitalize }}</div>
  </div>


</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import LikeButton from "@/components/LikeButton";

export default {
  name: "BreedItem",
  props: {
    breedName: {required: true},
    breedRandomImage: {required: false}
  },
  data() {
    return {}
  },
  mounted() {
  },
  components: {LikeButton},
  methods: {
    toggleLike(like) {
      if (like) {
        this.likedList = [{image: this.breedRandomImage, breed: this.breedName}, ...this.likedList]
      } else {
        this.likedList = this.likedList.filter(dog => dog.image !== this.breedRandomImage)
      }
    },
    ...mapMutations(['updateLikedImages'])
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