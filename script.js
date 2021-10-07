const app = new Vue({
  el: "#app",
  data: {
    currentDogUrl: null,
    favourites: []
  },
  methods: {
    loadDog: async function() {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const asJson = await response.json();
      this.currentDogUrl = asJson.message;
      console.log(this.currentDogUrl);
    },
    addFavourite: function() {
      if (!this.favourites.includes(this.currentDogUrl)) {
              this.favourites.push(this.currentDogUrl);
      }
      this.loadDog();
    },
    removeFav: function(dog) {
      this.favourites = this.favourites.filter(item => item !== dog);
    }
  },
  created() {
    this.loadDog();
},
  mounted() {
    if (localStorage.favourites) {
      this.favourites = JSON.parse(localStorage.favourites);
    }
  },
  watch: {
    favourites(updatedFavourites) {
      localStorage.favourites = JSON.stringify(updatedFavourites)
    }
  }
});


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
}
