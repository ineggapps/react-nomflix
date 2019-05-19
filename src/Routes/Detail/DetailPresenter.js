import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 45vh;
  height: 66.7vh;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px 20px;

  :after {
    content: "▪";
  }
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.5;
  width: 50%;
`;

const Imdb = styled.a`
  display: inline-block;
  position: relative;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-image: url(${props => props.src});
  background-position: center center;
  background-size: cover;
`;

const DetailPresenter = ({ result, error, loading, pathname }) => {
  console.log(pathname);
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message text={"Can't find."} />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name} | Nomflix
        </title>
      </Helmet>
      <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>{result.original_title ? result.original_title : result.original_name}</Title>
          <ItemContainer>
            <Item>{result.release_date ? result.release_date : result.first_air_date}</Item>
            <Divider />
            <Item>{result.runtime ? result.runtime : result.episode_run_time[0]} min</Item>
            <Divider />
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1 ? genre.name : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id && (
              <>
                <Divider />
                <Item>
                  <Imdb
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target={"_blank"}
                    src={require("../../assets/logoImdb.png")}
                  />
                </Item>
              </>
            )}
          </ItemContainer>
          <Overview>
            <Link to={`${pathname}/video`}>Go to Videos</Link>
          </Overview>
          <Overview>{result.overview && result.overview}</Overview>
        </Data>
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;
