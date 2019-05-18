import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/")
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push },
      location: { pathname }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
        if (result.runtime === null || result.runtime === undefined) {
          result.runtime = "unknown";
        }
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        if (result.episode_run_time === null || result.episode_run_time[0] === undefined) {
          result.episode_run_time = ["unknown"];
        }
      }
      console.log("😊👍", result);
    } catch {
      this.setState({
        error: "Can't find anything you want looking for."
      });
    } finally {
      this.setState({
        loading: false,
        result
      });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    console.log(this.state);
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
