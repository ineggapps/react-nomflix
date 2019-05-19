import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";

const Container = styled.div``;

const Title = styled.h1`
  font-size: 50px;
`;

const VideoViewerContainer = styled.div``;

const VideoListContainer = styled.div``;

const Videos = styled.ul``;

const Video = styled.li`
  font-size: 16px;
  :not(last-child) {
    margin: 16px;
  }
`;

const VideoPresenter = ({ result, videoInfo, loading }) => {
  console.log("VideoPresenter", result, videoInfo, loading);
  const { error } = videoInfo;
  //   return <>test</>;
  if (loading) {
    return <>loading....</>;
  } else if (error && error.length > 0) {
    return error;
  } else if (result !== null && result.results.length > 0) {
    return renderVideoList(result, videoInfo);
  } else {
    return renderNotFound;
  }
};

const renderErrorPage = error => <Container>{error}</Container>;

const renderNotFound = () => <Container>Videos not found</Container>;

const renderVideoList = (result, videoInfo) => {
  const { results: videos } = result;
  const youtubeOpts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1
    }
  };
  console.log("👿VideoId is", videoInfo);
  const { videoId, isMovie } = videoInfo;
  const videoLink = isMovie ? `/movie/${result.id}/video` : `/show/${result.id}/video`;
  return (
    <Container>
      <Title>{videoId}</Title>
      <VideoViewerContainer>
        <YouTube videoId={videoInfo.videoId} opts={youtubeOpts} />
      </VideoViewerContainer>
      <VideoListContainer>
        <Videos>
          {videos &&
            videos.length > 0 &&
            videos.map(video => (
              <Video key={video.id}>
                <Link to={`${videoLink}/${video.key}`}>
                  {video.key} || {video.name}
                </Link>
              </Video>
            ))}
        </Videos>
      </VideoListContainer>
    </Container>
  );
};

VideoPresenter.propTypes = {
  result: PropTypes.object,
  videoInfo: PropTypes.shape({
    videoId: PropTypes.string.isRequired,
    isMovie: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

export default VideoPresenter;
