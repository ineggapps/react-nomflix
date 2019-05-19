import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { BackIcon } from "Components/Icons";

const Container = styled.div`
  padding-top: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  height: 4vh;
`;

const BackButton = styled.div`
  width: 5%;
  text-align: center;
  & svg {
    cursor: pointer;
    height: auto;
    fill: white;
  }
`;

const Title = styled.h1`
  width: 95%;
  font-size: 20px;
  &.center {
    text-align: center;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 88vh;
`;

const VideoViewerContainer = styled.div`
  width: 80%;
`;

const VideoPlayer = styled(YouTube)`
  width: 100%;
  height: 88vh;
`;

const VideoListContainer = styled.div`
  width: 20%;
  overflow-y: auto;
`;

const Videos = styled.ul``;

const Video = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 70px;
  font-size: 16px;
  :not(:last-child) {
    border-bottom: 1px solid #404040;
  }
  transition: all 0.2s ease-in-out;
  &.selected,
  &:hover {
    background-color: #404040;
  }
  a {
    widht: 100%;
    padding: 0 10px;
  }
`;

const VideoPresenter = ({ result, videoInfo, loading }) => {
  console.log("✌VideoPresenter called", result, videoInfo, loading);
  const { error } = videoInfo;
  //   return <>test</>;
  if (loading) {
    return <>loading....</>;
  } else if (error && error.length > 0) {
    return error;
  } else if (result !== null && result.results.length > 0) {
    return renderVideoList(result, videoInfo);
  } else {
    return renderNotFound();
  }
};

const renderErrorPage = error => (
  <Container>
    <TitleContainer>
      <Title className="center">Error Occured...</Title>
    </TitleContainer>
  </Container>
);

const renderNotFound = () => (
  <Container>
    <TitleContainer>
      <Title className="center">Video doesn't exist.</Title>
    </TitleContainer>
  </Container>
);

const renderVideoList = (result, videoInfo) => {
  const { results: videos } = result;
  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  };
  console.log("👿VideoId is", videoInfo);
  const { videoId, isMovie } = videoInfo;
  const currentVideo = videos.filter(video => videoId === video.key);
  const videoLink = isMovie ? `/movie/${result.id}/video` : `/show/${result.id}/video`;
  return (
    <Container>
      <TitleContainer>
        <BackButton>
          <Link to={`${videoLink.split("/video")[0]}`}>
            <BackIcon />
          </Link>
        </BackButton>
        <Title>{currentVideo.length > 0 && currentVideo[0].name}</Title>
      </TitleContainer>
      <VideoContainer>
        <VideoViewerContainer>
          <VideoPlayer videoId={videoInfo.videoId} opts={youtubeOpts} />
        </VideoViewerContainer>
        <VideoListContainer>
          <Videos>
            {videos &&
              videos.length > 0 &&
              videos.map(video => {
                // console.log(
                //   `videos map rendering...😊, video.key=== videoId, ${
                //     video.key
                //   }===${videoId}, ${video.key === videoId}`
                // );
                return (
                  <Video key={video.id} className={video.key === videoId && "selected"}>
                    <Link to={`${videoLink}/${video.key}`}>{video.name}</Link>
                  </Video>
                );
              })}
          </Videos>
        </VideoListContainer>
      </VideoContainer>
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
