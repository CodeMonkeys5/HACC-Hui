import React from "react";
import { Grid, Image } from "semantic-ui-react";

/**
 * A simple static component to render some text for the landing page.
 * @memberOf ui/pages
 */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          xs={12}
        >
          <h1>Hawaii Annual Code Challenge 2020</h1>
        </Grid>
      </div>
    );
  }
}

export default Landing;
