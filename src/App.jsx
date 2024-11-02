import { useState } from "react"
import "./App.css"

function App() {
  const [focusPlayerOne, setFocusPlayerOne] = useState(true)
  const [focusPlayerTwo, setFocusPlayerTwo] = useState(false)

  const [playerOneScore, setPlayerOneScore] = useState(0)
  const [playerTwoScore, setPlayerTwoScore] = useState(0)

  const [playerOneHistory, setPlayerOneHistory] = useState([])
  const [playerTwoHistory, setPlayerTwoHistory] = useState([])

  //single history
  //{ word,isCorrect} : {string,bool}
  const [previousWord, setPreviousWord] = useState("")

  const [playeOneGuessedWord, setPlayeOneGuessedWord] = useState("")
  const [playeTwoGuessedWord, setPlayeTwoGuessedWord] = useState("")

  let [timerOne, setTimerOne] = useState(15)
  let [timerTwo, setTimerTwo] = useState(15)

  if (focusPlayerOne) {
    const intervalOne = setInterval(() => {
      setTimerOne((timerOne = timerOne - 1))
      if (timerOne == 0) {
        setFocusPlayerOne(!focusPlayerOne)
        setFocusPlayerTwo(!focusPlayerTwo)
        clearInterval(intervalOne)
        setTimerOne(15)
      }
    }, 1000)
  }

  if (focusPlayerTwo) {
    const intervalTwo = setInterval(() => {
      setTimerTwo((timerTwo = timerTwo - 1))
      if (timerTwo == 0) {
        setFocusPlayerOne(!focusPlayerOne)
        setFocusPlayerTwo(!focusPlayerTwo)
        clearInterval(intervalTwo)
        setTimerTwo(15)
      }
    }, 1000)
  }

  const handlePlayerOneGuessedWord = async () => {
    if (playeOneGuessedWord.length < 4) {
      alert("please enter a word, thats length is more than 4")
    } else {
      console.log("player 1 guessed")
      if (!previousWord) {
        setPreviousWord(playeOneGuessedWord)
        await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${playeOneGuessedWord}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data[0]?.meanings) {
              console.log("correct word")
              setPlayerOneScore(playerOneScore + 2)
              setFocusPlayerOne(!focusPlayerOne)
              setFocusPlayerTwo(!focusPlayerTwo)
            } else {
              console.log("wrong word")
            }
          })
      } else {
        if (previousWord.slice(-1) === playeOneGuessedWord.charAt(0)) {
          await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${playeOneGuessedWord}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data[0]?.meanings) {
                console.log("correct word")
                setPlayerOneScore(playerOneScore + 2)
                setFocusPlayerOne(!focusPlayerOne)
                setFocusPlayerTwo(!focusPlayerTwo)
              } else {
                console.log("wrong word")
              }
            })
        } else {
          setFocusPlayerOne(!focusPlayerOne)
          setFocusPlayerTwo(!focusPlayerTwo)
          setPlayerOneScore(playerOneScore - 1)
          alert(
            "First char of your word does not match previous words last char"
          )
        }
      }
    }
  }
  const handlePlayerTwoGuessedWord = async () => {
    if (playeTwoGuessedWord.length < 4) {
      alert("please enter a word, thats length is more than 4")
    } else {
      console.log("player 2 guessed")
      if (playeTwoGuessedWord.charAt(0) === previousWord.slice(-1)) {
        setPreviousWord(playeTwoGuessedWord)
        await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${playeTwoGuessedWord}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data[0]?.meanings) {
              console.log("correct word")
              setPlayerTwoScore(playerTwoScore + 2)
              setFocusPlayerOne(!focusPlayerOne)
              setFocusPlayerTwo(!focusPlayerTwo)
            } else {
              console.log("wrong word")
            }
          })
      } else {
        setFocusPlayerOne(!focusPlayerOne)
        setFocusPlayerTwo(!focusPlayerTwo)
        setPlayerTwoScore(playerTwoScore - 1)
        alert("First char of your word does not match previous words last char")
      }
    }
  }
  return (
    <>
      <main className="main-container">
        <div className="player-1">
          <div>
            {focusPlayerOne && (
              <div className="timer">
                <h1>Timer</h1>
                <div className="timer-value">{timerOne}</div>
                <p className="time-left-message">seconds left</p>
              </div>
            )}
          </div>
          <h1>{focusPlayerOne && "Your turn"}</h1>
          <p className="score">Score : {playerOneScore}</p>
          <div>
            <h2 className="player-name">Player 1</h2>
            <input
              disabled={true && !focusPlayerOne}
              type="text"
              className="word-input-field"
              placeholder="word for player 1"
              value={playeOneGuessedWord}
              onChange={(e) => setPlayeOneGuessedWord(e.target.value)}
            />
            <button
              onClick={handlePlayerOneGuessedWord}
              disabled={true && !focusPlayerOne}
              className="enter-button"
            >
              Enter
            </button>
            <div>
              <ul className="word-history-container">
                <li>Word 1</li>
                {/* {playerOneHistory &&
                  playerOneHistory.map((word) => (
                    <li key={word?.word}>
                      {word} <span>{word?.isCorrect ? "✔" : "X"}</span>
                    </li>
                  ))} */}
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="timer">
          <h1>Timer</h1>
          <div className="timer-value">{15}</div>
          <p className="time-left-message">seconds left</p>
        </div> */}
        <div className="player-2">
          <div>
            {focusPlayerTwo && (
              <div className="timer">
                <h1>Timer</h1>
                <div className="timer-value">{timerTwo}</div>
                <p className="time-left-message">seconds left</p>
              </div>
            )}
          </div>
          <h1>{focusPlayerTwo && "Your turn"}</h1>
          <p className="score">Score : {playerTwoScore}</p>
          <div>
            <h2 className="player-name">Player 2</h2>
            <input
              disabled={true && !focusPlayerTwo}
              type="text"
              className="word-input-field"
              placeholder="word for player 2"
              value={playeTwoGuessedWord}
              onChange={(e) => setPlayeTwoGuessedWord(e.target.value)}
            />
            <button
              onClick={handlePlayerTwoGuessedWord}
              disabled={true && !focusPlayerTwo}
              className="enter-button"
            >
              Enter
            </button>
            <div>
              <ul className="word-history-container">
                <li>Word 1</li>
                {/* {playerTwoHistory &&
                  playerTwoHistory.map((word) => (
                    <li key={word?.word}>
                      {word} <span>{word?.isCorrect ? "✔" : "X"}</span>
                    </li>
                  ))} */}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
