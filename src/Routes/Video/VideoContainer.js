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
      isMovie: pathname.includes("/movie/")
    };
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
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let parsedVideoId = null;
    let videos = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.videos(parsedId));
      } else {
        ({ data: result } = await tvApi.videos(parsedId));
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        result
      });
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("왜 호출돼?", nextState.result, nextState.result === null);
  //   return nextState.result !== null;
  // }

  render() {
    const { result } = this.state;
    return <VideoPresenter result={result} />;
  }
}

export default VideoContainer;
