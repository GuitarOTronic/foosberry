import React from 'react'
import './scoreboard.css'


function FinalScore({ score, teams, players, gameType, editScore, resetGame, clearGameState }) {

    const redOff = players.find(player => parseInt(player.id, 10) === parseInt(teams.red_off, 10))
    const redDef = players.find(player => parseInt(player.id, 10) === parseInt(teams.red_def, 10))

    const blackOff = players.find(player => parseInt(player.id, 10) === parseInt(teams.black_off, 10))
    const blackDef = players.find(player => parseInt(player.id, 10) === parseInt(teams.black_def, 10))

    function showWinner() {
        if (score.red > score.black) {
            return <div className="final-score-results">
                <h2>RED WINS</h2>
                <h3>{score.red} - {score.black}</h3>
                <div className="teams-results-container">
                    <div className="teams">
                        <label className="red">RED TEAM</label>
                        <span>{redOff.first_name} {redOff.last_name}</span>
                        {gameType === "4Player" && <span>{redDef.first_name} {redDef.last_name}</span>}
                    </div>
                    <div className="teams">
                        <label>BLACK TEAM</label>
                        <span>{blackOff.first_name} {blackOff.last_name}</span>
                        {gameType === "4Player" && <span>{blackDef.first_name} {blackDef.last_name}</span>}
                    </div>
                </div>
            </div>
        } else {
            return <div className="final-score-results">
                <h2>BLACK WINS</h2>
                <h3>{score.black} - {score.red}</h3>
                <div className="teams-results-container">
                    <div className="teams">
                        <label>BLACK TEAM</label>
                        <span>{blackOff.first_name} {blackOff.last_name}</span>
                        {gameType === "4Player" && <span>{blackDef.first_name} {blackDef.last_name}</span>}
                    </div>
                    <div className="teams">
                        <label className="red">RED TEAM</label>
                        <span>{redOff.first_name} {redOff.last_name}</span>
                        {gameType === "4Player" && <span>{redDef.first_name} {redDef.last_name}</span>}
                    </div>
                </div>
            </div>
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const payload = {
            red_off: teams.red_off,
            red_def: teams.red_def,
            black_off: teams.black_off,
            black_def: teams.black_def,
            red_points: parseInt(score.red, 10),
            black_points: parseInt(score.black, 10)
          }
          //TODO: post to backend
          resetGame(teams)
    }

    function handleEdit(e, score){
        e.preventDefault()
        editScore(score)
    }

    return (
        <div className="final-score-container ">
            {showWinner()}
            <div>
                <button className="submit-score-btn" onClick={handleSubmit}>SUBMIT</button>
                <button className="edit-score-btn" onClick={(e)=>handleEdit(e, score)}>EDIT</button>
            </div>
            <button className="reset-btn" onClick={clearGameState}>RESET</button>
        </div>
    )
}

export default FinalScore