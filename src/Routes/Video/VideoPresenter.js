import React from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

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

const renderVideoList = videos => {
  const youtubeOpts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1
    }
  };
  return (
    <Container>
      <VideoViewerContainer>
        <YouTube videoId={videos[0].key} opts={youtubeOpts} />
      </VideoViewerContainer>
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
};

export default VideoPresenter;
