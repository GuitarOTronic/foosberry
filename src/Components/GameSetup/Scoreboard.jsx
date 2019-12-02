import React, { useState, useEffect } from 'react'
import './scoreboard.css'

function Scoreboard({gameOver, finalScore, teams, resetGame}) {
  
    const [score, setScore] = useState({ red: 0, black: 4 })
    useEffect(()=>{
        if((score.black === 5 || score.red === 5) && !finalScore){
            gameOver(score)
        }
    }, [score])

    useEffect(()=>{
        if(finalScore){
            setScore(finalScore)
        }
    }, [])

    function handleSubmit(e){
        e.preventDefault()
        e.preventDefault()
        const payload = {
            red_off: teams.red_off,
            red_def: teams.red_def,
            black_off: teams.black_off,
            black_def: teams.black_def,
            red_points: parseInt(score.red, 10),
            black_points: parseInt(score.black, 10)
          }
        resetGame(teams)
    }

    return (
        <div className="scoreboard-container">
            <div className="black-score">
                <label>BLACK</label>
                <span>{score.black}</span>
                <div className="row score-btn-container">
                    <button onClick={() => setScore({ ...score, black: score.black - 1 })} className="minus">-</button>
                    <button onClick={() => setScore({ ...score, black: score.black + 1 })} className="plus">+</button>
                </div>
            </div>
            <div className="red-score">
                <label>RED</label>
                <span>{score.red}</span>
                <div className="row score-btn-container">
                    <button onClick={() => setScore({ ...score, red: score.red - 1 })} className="minus">-</button>
                    <button onClick={() => setScore({ ...score, red: score.red + 1 })} className="plus">+</button>
                </div>
            </div>
            {finalScore && <button className="submit-edit-score-btn" onClick={handleSubmit}>SUBMIT</button>}
        </div>
    )
}


export default Scoreboard