import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router"
import { RAW_ROUTES } from ".";
import { ResultSearchRoute } from "./ResultSearchRoute";
import { ResultDisplayRoute } from "./ResultDisplayRoute";

export function PlatformRouter() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          {}
          <Route path={RAW_ROUTES.RESULT_SEARCH} element={resultSearchRouteRender()} />
          <Route path={RAW_ROUTES.RESULT_DISPLAY} element={resultDisplayRouteRender()} />
          <Route element={fallbackRouteRender()} />
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

function resultSearchRouteRender() {
  return (
    <ResultSearchRoute/>
  );
}

function resultDisplayRouteRender() {
  return (
    <ResultDisplayRoute/>
  );
}

function fallbackRouteRender() {
  return (
    <ResultSearchRoute/>
  );
}