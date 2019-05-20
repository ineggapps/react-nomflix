import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import { YoutubeIcon } from "Components/Icons";
import PosterSeason from "Components/PosterSeason";

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
  margin: 20px 0;
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
  & svg {
    fill: white;
  }
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

const ProductionCompanies = styled.ul`
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  & > h2 {
    font-size: 14px;
    margin: 12px;
  }
`;
const Production = styled.li`
  display: inline-block;
  margin: 20px;
`;
const ProductionLogo = styled.img`
  width: 100px;
`;

const Seasons = ProductionCompanies;
const Season = Production;

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
          <Overview>
            <span role="img" aria-label="Go to videos">
              <Link to={`${pathname}/video`}>
                <YoutubeIcon />
              </Link>
            </span>
          </Overview>
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
          <Overview>{result.overview && result.overview}</Overview>
          {result.production_companies && result.production_companies.length > 0 && (
            <ProductionCompanies>
              <h2>Production Companies</h2>
              {result.production_companies.map(company => (
                <Production>
                  {company.logo_path ? (
                    <ProductionLogo
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      title={company.name}
                    />
                  ) : (
                    company.name
                  )}
                </Production>
              ))}
            </ProductionCompanies>
          )}

          {result.seasons && result.seasons.length > 0 && (
            <Seasons>
              <h2>Seasons</h2>
              {result.seasons.map(s => (
                <Season>
                  <PosterSeason
                    id={s.id}
                    imageUrl={s.poster_path}
                    title={s.name}
                    year={s.air_date ? s.air_date.substring(0, 4) : "Unknown"}
                  />
                </Season>
              ))}
            </Seasons>
          )}
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
