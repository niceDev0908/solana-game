import "toastr/build/toastr.css";

import {
  Container,
  Grid,
  GridColumn,
  GridRow,
  Header
} from "semantic-ui-react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React from "react";
import TargetableBattlefield from "./Play/Battlefield";
import Toastr from "toastr";
import { TouchBackend } from "react-dnd-touch-backend";
import { isTouchDevice } from "./utils";
import { siteUrl } from "../config";

Toastr.options.timeOut = 3000;

const DnDBackend = isTouchDevice() ? TouchBackend : HTML5Backend;

const App: React.FC = (props) => (
  <Grid>
    <GridRow>
      <GridColumn>
        <Container textAlign="center">

          <DndProvider backend={DnDBackend}>
            <TargetableBattlefield />
          </DndProvider>
        </Container>
      </GridColumn>
    </GridRow>
  </Grid>
);

export default App;
