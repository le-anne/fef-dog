if (window.location.protocol != "https:") {
  window.location.protocol = "https:";
  window.location.reload();
}

ocnst app = new Vue({
  el: "#app",
  data: {
    currentDogUrl: null,
    favourites: [],
    online: true,
  },
  methods: {
    loadDog: async function() {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const asJson = await response.json();
      this.currentDogUrl = asJson.message;
      console.log(this.currentDogUrl);
    },
    addFavourite: async function() {
      if (!this.favourites.includes(this.currentDogUrl)) {
              this.favourites.push(this.currentDogUrl);
        
        const imageCache = await caches.open("favouriteImageCache")
        imageCache.add(this.currentDogUrl);
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
    
    const onlineStatus = navigator.onLine;
    addEventListener("offline", () => {
      this.online = false;
    })
    addEventListener.online("online", () => {
      this.online = true;
    })
  },
  watch: {
    favourites(updatedFavourites) {
      localStorage.favourites = JSON.stringify(updatedFavourites)
    },
    online(isOnline) {
      if(isOnline) {
        this.loadDog();
      }
    }
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
}
