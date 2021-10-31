export default {

  methods: {
    sort(direction, array) {
      if (direction) {
        this.selectedBreed.images.sort((a, b) => a.localeCompare(b));
      } else {
        this.selectedBreed.images.sort(function () {
          return 0.5 - Math.random()
        });
      }
    },
  }
};