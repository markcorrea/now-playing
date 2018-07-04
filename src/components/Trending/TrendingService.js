import axios from 'axios'

export default class TrendingService {
    headers = { 'Content-Type': 'application/json' }
    API = 'https://ancient-coast-63668.herokuapp.com/twitter/'

    /* This function gets the 5 most recent posts in a 100Km range */
    /* If the 'lastId' variable is informed, it means that it is beind called by the Infinite Scrolling. */
    getNearbyPosts = (latlng, lastId = null) => {
        let body = {
            "q": "url:youtube #nowplaying filter:media",
            "count": 5,
            "geocode": latlng.lat + "," + latlng.lng + ",100km"
        }
        if (lastId) body.max_id = lastId
        return axios.post(this.API + 'search/tweets', body, { headers: this.headers })
    }

    /* Here we post a new tweet to BInowplaying. */
    postNewTweet = (status) => {
        return axios.post(this.API + 'tweet', { status: status }, { headers: this.headers })
    }
}



