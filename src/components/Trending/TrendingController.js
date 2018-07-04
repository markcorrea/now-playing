import { observable } from 'mobx'
import moment from 'moment'
import TrendingService from './TrendingService'

export class TrendingController {
  @observable posts = []
  @observable currentCity = 'searching...'
  @observable coords = { lat: 0, lng: 0 }
  trendingService = new TrendingService()
  getNearbyPosts
  postNewTweet

  constructor(store) {
    this.store = store
    this.getNearbyPosts = this.trendingService.getNearbyPosts
    this.postNewTweet = this.trendingService.postNewTweet
  }

  /* This function is called every time a response from the backend has to be added to the Posts. */
  /* It formats each item of the posts to the proper format to fit to the component. */
  formatPost = (post) => {
    let youtubeUrl = post.entities && post.entities.urls && post.entities.urls.length > 0 && post.entities.urls[0].expanded_url || ''
    return {
      _id: post.id,
      userImage: post.user.profile_image_url,
      youtubeUrl: youtubeUrl,
      text: post.text,
      createdAt: moment(post.created_at).format('MMM DD, HH:mm a'),
      userName: post.user.name,
      nickName: '@' + post.user.screen_name
    }
  }

  /* The Get Current City function basically unites the three functions (below, including it) that would bring the location information. */
  /* It first gets the Geolocation (latitude, longitude), then uses it to get the current city. */
  getCurrentCity = () => {
    return new Promise((resolveCurrentCity, reject) => {
      return this.getCurrentGeolocation().then((coordinates) => {
        return this.getCityFromGeolocation(coordinates).then((city) => {
          if (city.status === 'success') {
            this.coords.lat = coordinates.coords.latitude
            this.coords.lng = coordinates.coords.longitude
            this.currentCity = city.city
            resolveCurrentCity()
          } else {
            console.log('ERROR')
            reject(null)
          }
        })
      })
    })
  }

  /* This function uses the JavaScript to get the Geolocation thru the navigator. */
  getCurrentGeolocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position)
      }, () => {
        reject({ status: 'error' })
      })
    })
  }

  /* Here we use the Geolocation and, with it, use the Google Maps API to discover the city where it belongs. */
  getCityFromGeolocation = (coordinates) => {
    return new Promise((resolve, reject) => {
      let latlng = new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude);
      new google.maps.Geocoder().geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            let city = null;
            let c, lc, component;
            for (let r = 0, rl = results.length; r < rl; r += 1) {
              let result = results[r];

              if (!city && result.types[0] === 'locality') {
                for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                  component = result.address_components[c];

                  if (component.types[0] === 'locality') {
                    let cityName = component.long_name;
                    resolve({ status: 'success', city: cityName })
                  }
                }
              }
            }
          }
        }
      });
    }, () => { console.log('error') })
  }
}