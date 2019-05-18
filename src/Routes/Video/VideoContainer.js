import React from "react";
import VideoPresenter from "./VideoPresenter";
import { movieApi, tvApi } from "api";

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
      history
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      videoInfo: {
        isMovie: pathname.includes("/movie/")
      }
    };
    console.log("pathname", pathname.includes("/movie/"));
  }

  async componentDidMount() {
    console.log("VideoContainer ComponentDidMount");
    //Initialize Variables
    const {
      match: {
        params: { id, videoId }
      },
      history: { push },
      location: { pathname }
    } = this.props;

    //Initialize Settings to need for playing YouTube
    const isMovie = this.state.videoInfo.isMovie;
    console.log(isMovie);
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let parsedVideoId = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.videos(parsedId));
      } else {
        ({ data: result } = await tvApi.videos(parsedId));
      }
      if (result !== null && result.results.length > 0) {
        const { results: videos } = result;
        console.log("videos are", videos);
        if (videoId === undefined || videoId === null) {
          parsedVideoId = videos[0].key;
        } else {
          parsedVideoId = videos.filter(video => video.key === videoId) ? videoId : videos[0].key;
        }
        console.log("parsedVideoId is", parsedVideoId);
      }
      //DEBUGGING// parsedVideoId = videoId !== undefined && videoId !== null ? videoId : videos[0].key;
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        result,
        videoInfo: {
          isMovie,
          videoId: parsedVideoId
        },
        loading: false
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("왜 호출돼?", nextState.videoInfo.videoId, this.state.videoInfo.videoId);
    return nextState.result !== null;
  }

  componentWillReceiveProps(nextProps) {
    console.log("🔒", nextProps.match.params);
    const {
      match: {
        params: { videoId: newVideoId }
      }
    } = nextProps;
    if (this.state.videoInfo.videoId === newVideoId) {
      console.log("will return");
      return;
    } else {
      //fetchnewProduct and set state to reload
      this.setState({
        videoInfo: {
          videoId: newVideoId
        }
      });
    }
  }

  render() {
    const { result, videoInfo, loading } = this.state;
    if (result !== null) {
      return <VideoPresenter result={result} videoInfo={videoInfo} loading={loading} />;
    } else {
      return <>Loading...!!!</>;
    }
  }
}

export default VideoContainer;
