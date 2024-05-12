import ReactPlayer from 'react-player';

const VideoPlayer = () => {
    return (
        <ReactPlayer
            url="https://api.themoviedb.org/3/movie/967847/videos?api_key=c90fce0238bd9075c4071a3ebf4448c1&language=en-US&include_adult=false&include_video=true"
            controls
            width="100%"
            height="100%"
        />
    );
};

export default VideoPlayer;
