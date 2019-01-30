import React from "react";
import { observer } from "mobx-react";

@observer
export class Posts extends React.Component {
  constructor(props) {
    super(props);
  }

  /* This function filters the incoming youtubeURL and delivers only the video ID, so that we can */
  /* insert it at the iframe tag. */
  youtubeCode = youtubeUrl => {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

    let match = youtubeUrl.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return "error";
    }
  };

  /* Just like the function above, this function gets a spotifyUrl to render on screen. */
  /* In all cases, it treats the track, album and playlist, but will always render only the first song on each. */
  spotifyCode = spotifyUrl => {
    if (spotifyUrl.search("track") != "-1") {
      let regExp = /^.*(track\/)([^#\&\?]*).*/;
      let match = spotifyUrl.match(regExp);
      if (match && match[2].length == 22) {
        return "https://open.spotify.com/embed?uri=spotify:track:" + match[2];
      } else {
        return "error";
      }
    }

    if (spotifyUrl.search("album") != "-1") {
      let regExp = /^.*(album\/)([^#\&\?]*).*/;
      let match = spotifyUrl.match(regExp);
      if (match && match[2].length == 22) {
        return "https://open.spotify.com/embed?uri=spotify:album:" + match[2];
      } else {
        return "error";
      }
    }

    if (spotifyUrl.search("playlist") != "-1") {
      let userRegExp = /^.*(user\/)([^#\/\?]*).*/;
      let codeRegExp = /^.*(playlist\/)([^#\&\?]*).*/;
      let matchUser = spotifyUrl.match(userRegExp);
      let matchCode = spotifyUrl.match(codeRegExp);
      if (
        matchUser &&
        matchUser[2].length == 11 &&
        (matchCode && matchCode[2].length == 22)
      ) {
        return (
          " https://embed.spotify.com/?uri=spotify:user:" +
          matchUser[2] +
          ":playlist:" +
          matchCode[2]
        );
      } else {
        return null;
      }
    }
    return;
  };

  /* Check whether the incoming media is a youtube video or spotify item, and renders it accordingly. */
  renderMedia = url => {
    if (url && url.toLowerCase().search("youtube") != "-1") {
      return (
        <div className="post-media">
          <iframe
            width="100%"
            height="400px"
            src={
              "https://www.youtube.com/embed/" +
              this.youtubeCode(url) +
              "?showinfo=0"
            }
            frameBorder="0"
            allowFullScreen
          />
        </div>
      );
    } else if (url && url.toLowerCase().search("spotify") != "-1") {
      return (
        <div className="spotify-embeds">
          <div className="spotify-embed">
            <iframe
              src={this.spotifyCode(url)}
              width="100%"
              height="80"
              frameborder="0"
              allowtransparency="true"
            />
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.props.data.map((post, index) => (
          <div key={"post_" + index} className="post-container">
            <div className="post-card">
              <div className="post-user-image">
                <img alt="user" src={post.userImage} />
              </div>
              <div className="post-header">
                <div>
                  <span className="card-username">{post.userName}</span>{" "}
                  <span className="card-nick">{post.nickName}</span>
                </div>
              </div>
              {post.url &&
                post.url !== null &&
                post.url !== undefined &&
                this.renderMedia(post.url)}
              <div className="post-content mt-15">
                <div className="card-description">{post.text}</div>
              </div>
              <div className="post-content mt-20">
                <div className="card-info">Posted at: {post.createdAt}</div>
              </div>
              <div className="post-footer mt-10">
                <div className="card-notes">
                  <div className="card-icon">
                    <i className="far fa-heart" />
                  </div>
                  <div className="card-icon">
                    <i className="fa fa-retweet" />
                  </div>
                  <div className="card-icon">
                    <i className="far fa-comment" />
                  </div>
                  <div className="card-icon">
                    <i className="fa fa-share-square" />
                  </div>
                  <div style={{ clear: "both" }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
