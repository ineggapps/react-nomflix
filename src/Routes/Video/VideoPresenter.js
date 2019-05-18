import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const VideoViewerContainer = styled.div``;

const VideoListContainer = styled.div``;

const Videos = styled.ul``;

const Video = styled.li``;

const VideoPresenter = ({ result }) => {
  //   return <>test</>;
  let videos = result && result.results.length > 0 && result.results;
  if (videos !== null && videos.length > 0) {
    return renderVideoList(videos);
  } else {
    return renderNotFound();
  }
};

const renderNotFound = () => <Container>Videos not found</Container>;

const renderVideoList = videos => (
  <Container>
    <VideoViewerContainer>youtube</VideoViewerContainer>
    <VideoListContainer>
      <Videos>
        {videos &&
          videos.length > 0 &&
          videos.map(video => (
            <Video key={video.id}>
              {video.name}/{video.key}
            </Video>
          ))}
      </Videos>
    </VideoListContainer>
  </Container>
);

export default VideoPresenter;
