import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Header from "Components/Header";
import HeaderPopup from "Components/HeaderPopup";
import Detail from "Routes/Detail";
import Video from "Routes/Video";

export default () => {
  const header = () => {
    const pathname = window.location.pathname;
    if (pathname && pathname.length > 0 && pathname.includes("/video")) {
      return <HeaderPopup />;
    } else {
      return <Header />;
    }
  };

  return (
    <Router>
      <>
        {header()}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tv" component={TV} />
          <Route path="/search" component={Search} />
          <Route path="/movie/:id/video/:videoId" component={Video} />
          <Route path="/movie/:id/video" component={Video} />
          <Route path="/movie/:id" component={Detail} />
          <Route path="/show/:id/video/:videoId" component={Video} />
          <Route path="/show/:id/video" component={Video} />
          <Route path="/show/:id" component={Detail} />
          <Redirect from="*" to="/" />
        </Switch>
      </>
    </Router>
  );
};
