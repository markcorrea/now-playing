import React from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import socketIOClient from "socket.io-client";
import { Posts } from "../ui/Posts";
import Loader from "../ui/Loader";
import MessageBox from "../ui/MessageBox";

@inject("TrendingController")
@observer
export class TrendingList extends React.Component {
  @observable posts = [];
  @observable coords = {};
  @observable url = "";
  @observable post = "";
  @observable loading = false;
  @observable showSuccessPost = false;
  @observable showInfoPost = false;
  socket = socketIOClient("https://ancient-coast-63668.herokuapp.com/");

  constructor(props) {
    super(props);
    this.TrendingController = props.TrendingController;
    this.posts = this.TrendingController.posts;
    this.coords = this.TrendingController.coords;
    this.formatPosts = props.TrendingController.formatPosts;
    this.youtubeCode = props.TrendingController.youtubeCode;
  }

  /* First function called when the page finishes loading */
  /* At first we get the coordinates and the actual city. Then the screen is filled with the 5 most recent posts. */
  /* Once the posts are loaded, the Websocket is started, and then we start the Infinite Scroll. */
  componentDidMount() {
    this.loading = true;
    this.TrendingController.getCurrentCity().then(
      () => {
        this.TrendingController.getNearbyPosts(this.coords, null).then(
          result => {
            this.posts = result.data.statuses.map(status => {
              return this.TrendingController.formatPost(status);
            });
            this.loading = false;
            this.startSocket();
          }
        );
      },
      () => {
        console.log("An error ocurred while getting the current city");
        this.loading = false;
      }
    );
    this.setInfiniteScroll();
  }

  /* Function called everytime we change an input. In this case, the Youtube URL input or the Comment textarea. */
  handleInputChange = event => {
    let key = event.target.name;
    let value = event.target.value;
    return (this[key] = value);
  };

  /* Here we post the tweets. */
  /* To post a new tweet, we neet to have a url OR a comment, at least one of them. */
  /* Otherwise an alert is shown to the user to fill one of them, or both. */
  /* Once the tweet is posted, the two fields are erased. */
  postTweet = () => {
    if (!this.url && !this.post) {
      this.showInfoPost = true;
      return;
    }

    this.loading = true;
    this.TrendingController.postNewTweet(this.url + " " + this.post).then(
      () => {
        this.loading = false;
        this.showSuccessPost = true;
      },
      () => {
        this.loading = false;
      }
    );

    this.post = "";
    this.url = "";
  };

  /* Here we render the fields to post a new tweet. */
  renderFormContainer = () => {
    return (
      <div className="form-container mt-20">
        <input
          className="form-input"
          name="url"
          value={this.url}
          onChange={this.handleInputChange}
          placeholder="http://www.youtube..."
        />
        <div className="youtube-icon">
          <i className="fab fa-youtube" />
        </div>
        <textarea
          className="form-textarea mt-10"
          name="post"
          value={this.post}
          onChange={this.handleInputChange}
          placeholder="Hey, tell us what you've been listening!"
        />
        <button
          className="primary-button"
          onClick={this.postTweet}
          type="button"
        >
          Publish
        </button>
        <div style={{ clear: "both" }} />
        {this.showSuccessPost && (
          <MessageBox
            type="success"
            message="Item posted successfully!"
            show={() => (this.showSuccessPost = false)}
          />
        )}
        {this.showInfoPost && (
          <MessageBox
            type="info"
            message="Please insert a Youtube URL or post a comment!"
            show={() => (this.showInfoPost = false)}
          />
        )}
      </div>
    );
  };

  /* Here we render the posts component. */
  renderPosts = () => {
    return <Posts data={this.posts} />;
  };

  /* Here we put the elements together and render the page. */
  render() {
    return (
      <div>
        {this.loading && <Loader />}
        <div className="container mt-20">
          <div className="row">
            <div className="col-md-8">{this.renderPosts()}</div>
            <div className="col-md-4">
              <div className="section-title">Post on #nowPlaying</div>
              {this.renderFormContainer()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* This is the function which starts the Websocket inside the componentDidMount function. */
  /* As the posts have to be filtered by the location of the user, the filtering has to be done on the UI, once the servers on the backend */
  /* hardly ever will be on the same place as the user. So, for each item brought by the websocket, we check if it belongs to the user's location. */
  /* If so, it is added to the posts. Else, it is ignored. */
  startSocket = () => {
    this.socket.on("tweet", data => {
      if (
        data.user &&
        data.user.location &&
        data.user.location !== undefined &&
        data.user.location
          .toLowerCase()
          .search(this.TrendingController.currentCity.toLowerCase()) != "-1"
      ) {
        this.posts.splice(0, 0, this.TrendingController.formatPost(data));
      }
    });
  };

  /* This is the function which sets the Infinite Scrolling inside the componentDidMount function. */
  /* Every time the user reaches the bottom of the page, a request to the backend is made to check if there are */
  /* more items to be loaded. If so, it brings 5 more registers. Else, it is ignored. */
  setInfiniteScroll = () => {
    return window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop + document.body.clientHeight >=
        document.body.scrollHeight
      ) {
        let idx = this.posts.length - 1;
        let lastId = this.posts[idx]._id;
        this.TrendingController.getNearbyPosts(this.coords, lastId).then(
          result => {
            result.data.statuses.map(status =>
              this.posts.push(this.TrendingController.formatPost(status))
            );
          }
        );
      }
    });
  };
}
