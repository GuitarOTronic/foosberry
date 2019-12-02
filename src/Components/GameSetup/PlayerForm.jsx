import React, { Fragment, useState, useEffect } from 'react'
import './gamesetup.css'

function PlayerForm({ gameType, startGame, teams, clearGameState }) {
    const defaultFormState = teams || {
        black_off: "-SELECT-",
        black_def: "-SELECT-",
        red_off: "-SELECT-",
        red_def: "-SELECT-"
    }

    const [formState, setFormState] = useState(defaultFormState)
    const [validForm, setValidForm] = useState(false)
    const [players, setPlayers] = useState([])

    useEffect(() => {

        async function fetchData() {
            try {
                let allPlayers = await fetch("https://dashboard.collineargroup.com/foosball-api/users")
                let jsonPlayers = await allPlayers.json()
                setPlayers(jsonPlayers.users)
            }
            catch (err) {
                console.log(err)
            }
        }

        fetchData()
        if(teams){
            setFormState(teams)
        }
    }, [teams])

    useEffect(() => {
        validateForm()
    }, [formState])

    function handleSelect(e) {
        let position = e.target.id
        let name = e.target.value
        setFormState({ ...formState, [position]: name })
    }

    function validateForm() {
        let values = Object.values(formState)
        if (values.find(val => val === "-SELECT-") && gameType === "4Player") {
            setValidForm(false)
        }
        else if(values.filter(val => val === "-SELECT-").length > 2 && gameType === "2Player"){
            setValidForm(false)
        }
        else {
            setValidForm(true)
        }
    }

    function startGameHandler(e, formState, players){
        e.preventDefault()
        if(validForm){
            startGame(e, formState, players)
        }
    }

    return (
        <form className="player-form">
            {gameType === "4Player" &&
                <Fragment>
                    <h2>4 PLAYER</h2>
                    <div className="teams-container">
                        <div className="column form-team-container">
                            <label className="team-label black">BLACK</label>
                            <label htmlFor="black_off" className="position-label" >OFFENSE</label>
                            <select id="black_off" onChange={handleSelect} value={formState.black_off}>
                                <option value="-SELECT-" disabled >-SELECT-</option>
                                {players.map((player) => {
                                    return <option value={player.id} key={player.id}>{player.first_name} {player.last_name}</option>
                                })}
                            </select>
                            <label htmlFor="black_def" className="position-label">DEFENSE</label>
                            <select id="black_def" onChange={handleSelect} value={formState.black_def}>
                                <option value="-SELECT-" disabled >-SELECT-</option>
                                {players.map((player) => {
                                    return <option value={player.id} key={player.id}>{player.first_name} {player.last_name}</option>
                                })}
                            </select>
                        </div>
                        <div className="column form-team-container">
                            <label className="team-label red">RED</label>
                            <label htmlFor="red_off" className="position-label">OFFENSE</label>
                            <select id="red_off" onChange={handleSelect} value={formState.red_off}>
                                <option value="-SELECT-" disabled >-SELECT-</option>
                                {players.map((player) => {
                                    return <option value={player.id} key={player.id}>{player.first_name} {player.last_name}</option>
                                })}
                            </select>
                            <label htmlFor="red_def" className="position-label">DEFENSE</label>
                            <select id="red_def" onChange={handleSelect} value={formState.red_def}>
                                <option value="-SELECT-" disabled >-SELECT-</option>
                                {players.map((player) => {
                                    return <option value={player.id} key={player.id}>{player.first_name} {player.last_name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </Fragment>
            }
            {gameType === "2Player" &&
                <Fragment>
                    <h2>2 PLAYER</h2>
                    <div className="teams-container">
                        <div className="column form-team-container">
                            <label className="team-label black">BLACK</label>
                            <select id="black_off" value={formState.black_off} onChange={handleSelect}>
                                <option value="-SELECT-"  disabled>-SELECT-</option>
                                {players.map((player) => {
                                    return <option value={player.id} key={player.id}>{player.first_name} {player.last_name}</option>
                                })}
                            </select>
                        </div>
                        <div className="column form-team-container">
                            <label className="team-label red">RED</label>
                            <select id="red_off" value={formState.red_off} onChange={handleSelect}>
                                <option value="-SELECT-"  disabled>-SELECT-</option>
                                {players.map((player) => {
                                    return <option value={player.id} key={player.id}>{player.first_name} {player.last_name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </Fragment>
            }
            <div className="flex-center">
                <button onClick={(e) => startGameHandler(e, formState, players)} className={validForm ? "play-btn-enabled play-btn" : "play-btn-disabled play-btn"}>PLAY</button>
            </div>
            <button className="cancel-btn" onClick={clearGameState}>CANCEL</button>
        </form>
    )
}

export default PlayerForm