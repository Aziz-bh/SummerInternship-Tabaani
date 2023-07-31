import React from "react";
import { Route } from "react-router-dom";

import LandingNavBar from "components/LandingNavbar";
import LandingPage from "views/LandingPage/LandingPage";

export default function Landing() {
  return (
    <div>
      <div>
        <main>
          <div>
            <div>
              <LandingNavBar />
              <LandingPage />
            </div>
            {/*<Footer />*/}
          </div>
        </main>
      </div>
    </div>
  );
}
