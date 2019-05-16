import React from "react";
import HomePresenter from "./HomePresenter";
import { movieApi } from "api";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    try {
      //getting nowPlaying
      const {
        data: { results: nowPlaying }
      } = await movieApi.nowPlaying();
      //getting upcoming
      const {
        data: { results: upcoming }
      } = await movieApi.upcoming();
      //gettting popular
      const {
        data: { results: popular }
      } = await movieApi.popular();
      this.setState({
        nowPlaying,
        upcoming,
        popular
      });
    } catch {
      this.setState({
        error: "Can't find movie information."
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    console.log(this.state);
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
