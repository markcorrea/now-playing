import React from 'react'
import { observer } from 'mobx-react'

@observer
export class Posts extends React.Component {
    constructor(props) {
        super(props)
    }

    /* This function filters the incoming youtubeURL and delivers only the video ID, so that we can */
    /* insert it at the iframe tag. */
    youtubeCode = (youtubeUrl) => {
        let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        let match = youtubeUrl.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }

    render() {
        return (
            <div>
                {this.props.data.map((post, index) => (
                    <div key={'post_' + index} className='post-container'>
                        <div className='post-card'>
                            <div className='post-user-image'>
                                <img alt='user' src={post.userImage} />
                            </div>
                            <div className='post-header'>
                                <div><span className='card-username'>{post.userName}</span>  <span className='card-nick'>{post.nickName}</span></div>
                            </div>
                            {post.youtubeUrl && post.youtubeUrl !== null && post.youtubeUrl !== undefined && <div className='post-media'>
                                <iframe width='100%' height='400px' src={'https://www.youtube.com/embed/' + this.youtubeCode(post.youtubeUrl) + '?showinfo=0'} frameBorder='0' allowFullScreen></iframe>
                            </div>}
                            <div className='post-content mt-15'>
                                <div className='card-description'>
                                    {post.text}
                                </div>
                            </div>
                            <div className='post-content mt-20'>
                                <div className='card-info'>
                                    Posted at: {post.createdAt}
                                </div>
                            </div>
                            <div className='post-footer mt-10'>
                                <div className='card-notes'>
                                    <div className='card-icon'><i className="far fa-heart"></i></div>
                                    <div className='card-icon'><i className="fa fa-retweet"></i></div>
                                    <div className='card-icon'><i className="far fa-comment"></i></div>
                                    <div className='card-icon'><i className="fa fa-share-square"></i></div>
                                    <div style={{ clear: 'both' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}