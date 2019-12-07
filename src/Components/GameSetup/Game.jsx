import React, { Fragment, useState } from 'react'
import GameTypes from './GameTypes'
import PlayerForm from './PlayerForm'
import Scoreboard from './Scoreboard'
import FinalScore from './FinalScore'
import Rematch from './Rematch'

function Game({...props}) {

    const [gameType, setGameType] = useState(null)
    const [showGameTypes, setShowGameTypes] = useState(null)
    const [gameInProgress, setGameInProgress] = useState(false)
    const [teams, setTeams] = useState(null)
    const [players, setPlayers] = useState(null)
    const [finalScore, setFinalScore] = useState(null)
    const [showRematch, setShowRematch] = useState(false)

    function startGame(e, formState, players) {
        e.preventDefault()
        setGameInProgress(true)
        setTeams(formState)
        setPlayers(players)
        props.socket.emit("start game")
    }

    function gameOver(score) {
        setGameInProgress(false)
        setFinalScore(score)

    }

    function chooseGameType() {
        setShowGameTypes(true)
    }

    function editScore(score) {
        setGameInProgress(true)
        setFinalScore(score)
    }

    function resetGame(teams) {
        setFinalScore(null)
        setGameInProgress(false)
        setGameType(null)
        setShowRematch(true)
    }

    function clearGameState(e){
        e.preventDefault()
        setFinalScore(null)
        setGameInProgress(false)
        setGameType(null)
        setShowRematch(false)
        setTeams(null)
    }

    return (
        <Fragment>
            {(!gameInProgress && !finalScore && !showRematch) && <div className="flex-container">
                <h1 className="title-header" id="title-header">FOOSBALL</h1>
            </div>}
            <div className="flex-container" id="start-container">
                <div className="flex-container start-btn-container" id="start-container">
                    {(!showGameTypes && !gameType && !gameInProgress && !finalScore && !showRematch) &&
                        <button id="start-btn" onClick={chooseGameType}>
                            START
                        </button>
                    }
                </div>
                <GameTypes
                    setShowGameTypes={setShowGameTypes}
                    showGameTypes={showGameTypes}
                    setGameType={setGameType} />
                {(gameType && !gameInProgress && !finalScore) &&
                    <PlayerForm
                        gameType={gameType}
                        teams={teams}
                        startGame={startGame}
                        clearGameState={clearGameState}
                        socket={props.socket}
                    />}
                {gameInProgress &&
                    <Scoreboard
                        setGameInProgress={setGameInProgress}
                        gameOver={gameOver}
                        finalScore={finalScore}
                        teams={teams}
                        resetGame={resetGame}
                        goalSensed={props.goalSensed}
                    />}
                {(finalScore && !gameInProgress) &&
                    <FinalScore
                        clearGameState={clearGameState}
                        score={finalScore}
                        resetGame={resetGame}
                        teams={teams}
                        players={players}
                        gameType={gameType}
                        editScore={editScore}
                    />}
                {showRematch && 
                    <Rematch 
                        clearGameState={clearGameState}
                        teams={teams} 
                        setGameType={setGameType}
                        setShowRematch={setShowRematch}
                        />}
            </div>
        </Fragment>
    )
}

export default Game