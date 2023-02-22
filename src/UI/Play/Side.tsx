import { List, Segment, Transition } from "semantic-ui-react";
import { Minion, MinionContainer } from "../../models";

import DnDMinion from "./DnDMinion";
import React from "react";
import _ from "lodash/fp";

export interface SideProps {
  active?: boolean;
  board: MinionContainer;
}

const Side: React.FC<SideProps> = ({ active, board }) => (
  <Segment basic style={{ minHeight: 120 }} disabled={!active}>
    <Transition.Group
      as={List}
      animation="pulse"
      duration={800}
      relaxed
      horizontal
      size="small"
    >
      {_.map(
        (minion: Minion) => (
          <List.Item key={minion.id}>
            <List.Content>
              <DnDMinion character={minion} />
            </List.Content>
          </List.Item>
        ),
        board
      )}
    </Transition.Group>
  </Segment>
);

export default Side;
