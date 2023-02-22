import { Card, PLAYABLE_CARDS, canPlayCard } from "../../models";
import { Divider, Grid, Segment } from "semantic-ui-react";
import { endTurn, nextTurn } from "../../redux/modules/gameStateReducer";
import {
  useGameState,
  useIsGameOver,
  useIsOpponentActive,
  useIsPlayerActive,
  useOpponent,
  useOpponentDeck,
  useOpponentHand,
  useOpponentHero,
  useOpponentMinions,
  usePlayer,
  usePlayerDeck,
  usePlayerHand,
  usePlayerHero,
  usePlayerMinions
} from "../hooks";

import Deck from "../Deck/Deck";
import DnDHero from "./DnDHero";
import EndGameScreen from "../EndGameScreen";
import Hand from "../Hand/Hand";
import NextTurn from "./NextTurn";
import React from "react";
import Side from "./Side";
import classNames from "classnames";
import { playerUseCard } from "../../redux/modules/handReducer";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

// TODO: split up
const Battlefield: React.FC = (props) => {
  const dispatch = useDispatch();
  const { turn } = useGameState();
  const isPlayer = useIsPlayerActive();
  const isOpponent = useIsOpponentActive();
  const playerHero = usePlayerHero();
  const opponentHero = useOpponentHero();
  const player = usePlayer();
  const opponent = useOpponent();
  const playerMinions = usePlayerMinions();
  const opponentMinions = useOpponentMinions();
  const playerDeck = usePlayerDeck();
  const opponentDeck = useOpponentDeck();
  const playerHand = usePlayerHand();
  const opponentHand = useOpponentHand();
  const isGameOver = useIsGameOver();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: PLAYABLE_CARDS,
    drop: (item: Card, monitor) => dispatch(playerUseCard(item)),
    canDrop: (item: Card, monitor) => canPlayCard(item, player),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const nextTurnHandler = () => dispatch(endTurn());

  return (
    <Segment style={{ border: 0, boxShadow: 'none', background: 'transparent' }}>
      <EndGameScreen
        player={player}
        opponent={opponent}
        open={isGameOver}
        dimmer="blurring"
      />
      <Grid>
        <Grid.Column computer={14} mobile={16}>
          <Hand active={isOpponent} hand={opponentHand} />
          <DnDHero hero={opponentHero} player={opponent} active={isOpponent} />

          <div ref={drop}>
            <Segment
              basic
              className={classNames({
                "inverted green raised": isOver && canDrop
              })}
              style={{ padding: 0 }}
            >
              <Side board={opponentMinions} active={isOpponent} />
              <Divider section={false} style={{ margin: -20 }} />
              <Side board={playerMinions} active={isPlayer} />
            </Segment>
          </div>

          <DnDHero hero={playerHero} player={player} active={isPlayer} />
          <Hand active={isPlayer} hand={playerHand} />
        </Grid.Column>

        <Grid.Column
          computer={2}
          mobile={16}
          verticalAlign="middle"
          stretched={true}
        >
          <Deck deck={opponentDeck} />
          <NextTurn onClick={nextTurnHandler} turn={turn} />
          <Deck deck={playerDeck} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default Battlefield;
