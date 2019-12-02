import React from 'react'
import './scoreboard.css'


function Rematch({teams, setGameType, setShowRematch, clearGameState}){
    
    function handleClick(e){
        e.preventDefault()
        if(e.target.name === "no"){
            clearGameState(e)
            return ''
        }
        let isTwoPlayer = teams.red_def === '-SELECT-' || teams.black_def === '-SELECT-'
        if(isTwoPlayer){
            setGameType("2Player")
            setShowRematch(false)
        } 
        else{
            setGameType("4Player")
            setShowRematch(false)
        }
    }

    return (
        <div className="final-score-container">
            <label>PLAY AGAIN?</label>
            <div className="rematch-btn-container">
                <button name="yes" onClick={handleClick}>YES</button>
                <button name="no" onClick={handleClick}>NO</button>
            </div>
        </div>
    )
}

export default Rematch