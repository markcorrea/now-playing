import { observable } from "mobx";
import moment from "moment";
import TrendingService from "./TrendingService";

export class TrendingController {
  @observable posts = [];
  @observable currentCity = "searching...";
  @observable coords = { lat: 0, lng: 0 };
  trendingService = new TrendingService();
  getNearbyPosts;
  postNewTweet;

  constructor(store) {
    this.store = store;
    this.getNearbyPosts = this.trendingService.getNearbyPosts;
    this.postNewTweet = this.trendingService.postNewTweet;
  }

  /* This function is called every time a response from the backend has to be added to the Posts. */
  /* It formats each item of the posts to the proper format to fit to the component. */
  formatPost = post => {
    const url =
      (post.entities &&
        post.entities.urls &&
        post.entities.urls.length > 0 &&
        post.entities.urls[0].expanded_url) ||
      "";
    return {
      _id: post.id,
      userImage: post.user.profile_image_url,
      url: url,
      text: post.text,
      createdAt: moment(post.created_at).format("MMM DD, HH:mm a"),
      userName: post.user.name,
      nickName: "@" + post.user.screen_name
    };
  };

  /* The Get Current City function basically unites the three functions (below, including it) that would bring the location information. */
  /* It first gets the Geolocation (latitude, longitude), then uses it to get the current city. */
  getCurrentCity = async () => {
    try {
      const coordinates = await this.getCurrentGeolocation();
      const city = await this.getCityFromGeolocation(coordinates);
      if (city.status === "success") {
        this.coords.lat = coordinates.coords.latitude;
        this.coords.lng = coordinates.coords.longitude;
        this.currentCity = city.city;
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* This function uses the JavaScript to get the Geolocation thru the navigator. */
  getCurrentGeolocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        () => reject({ status: "error" })
      );
    });
  }

  /* Here we use the Geolocation and, with it, use the Google Maps API to discover the city where it belongs. */
  getCityFromGeolocation = coordinates => {
    return new Promise(resolve => {
      const latlng = new google.maps.LatLng(
        coordinates.coords.latitude,
        coordinates.coords.longitude
      );
      new google.maps.Geocoder().geocode(
        { latLng: latlng },
        (locations, status) => {
          if (status == google.maps.GeocoderStatus.OK && locations.length > 0) {
            const location = locations.find(
              location => location.types.some(type => type === "locality")
            );
            if (location && location !== undefined) {
              const component = location.address_components.find(
                component => component.types.some(type => type === "locality")
              );
              if (component && component !== undefined) {
                resolve({
                  status: "success",
                  city: component.long_name
                });
              }
            }
          }
        }
      );
    });
  };
}
