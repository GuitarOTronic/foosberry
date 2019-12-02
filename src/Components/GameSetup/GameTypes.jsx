import React from 'react'

export function GameTypes({setGameType, showGameTypes, setShowGameTypes}){
    
    if(!showGameTypes){
        return ""
    }

    function handleClick(e){
        e.preventDefault()
        setGameType(e.target.name)
        setShowGameTypes(false)
    }

    return (
        <div className="buttons-container">
            <button className="select-game-btn" name="4Player" onClick={handleClick}>4 Player</button>
            <button className="select-game-btn" name="2Player" onClick={handleClick}>2 Player</button>
        </div>
    )
}

export default GameTypes