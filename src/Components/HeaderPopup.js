import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  font-family: "Fredoka One", cursive;
  font-size: 16px;
  text-transform: uppercase;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  background-color: rgba(20, 20, 20, 0.8);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const BackButton = styled.span``;

const Title = styled.h1``;

const HeaderComponent = ({ location: { pathname } }) => (
  <Header>
    <BackButton>←</BackButton>
    <Title>Videos...</Title>
  </Header>
);

export default withRouter(HeaderComponent);
