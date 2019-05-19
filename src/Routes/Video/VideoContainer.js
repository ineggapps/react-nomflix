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
    console.log(`pathname is ${pathname}, isMovie==`, pathname.includes("/movie/"));
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
    const isMovie = pathname.includes("/movie/");
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
      this.setState({
        videoInfo: {
          error
        }
      });
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
    // console.log(
    //   `shouldComponentUpdate 메소드에서 버그를 찾자 \n`,
    //   `nextState= ${JSON.stringify(nextState)}\n`,
    //   `thisState = ${JSON.stringify(this.state)}\n`,
    //   `제발 돼라...`
    // );
    return nextState.videoInfo.videoId === undefined ? false : true;
  }

  componentWillReceiveProps(nextProps) {
    console.log("🔒", nextProps.match.params);
    console.log(JSON.stringify(nextProps));
    const {
      match: {
        params: { videoId: newVideoId }
      },
      location: { pathname }
    } = nextProps;
    if (this.state.videoInfo.videoId === newVideoId) {
      console.log("will return");
      return;
    } else {
      //fetchnewProduct and set state to reload
      this.setState({
        videoInfo: {
          videoId: newVideoId,
          isMovie: pathname.includes("/movie")
        }
      });
    }
  }

  render() {
    const { result, videoInfo, loading } = this.state;
    // console.log(`⏰ will be fowarded VideoPresenter: isMovie=${videoInfo.isMovie}`);
    return <VideoPresenter result={result} videoInfo={videoInfo} loading={loading} />;
  }
}

export default VideoContainer;
