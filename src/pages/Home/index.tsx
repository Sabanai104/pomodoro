/* eslint-disable react-hooks/exhaustive-deps */
import { BaseSyntheticEvent, useState, useEffect } from 'react';
import './styles.css'
import { ReactComponent as Edit } from '../../assets/edit.svg';
import { ReactComponent as Play } from '../../assets/play.svg';
import { ReactComponent as Restart } from '../../assets/restart.svg';

// Componentes
import NavBar from "../../components/NavBar";

const Home = () => {
  //Typescript
  const white = "#F5F6F7";
  const [min, setMin] = useState(1);
  const [seg, setSeg] = useState(0);
  const [fullTime, setFullTime] = useState(min * 60 + seg)
  const [barProgress, setbarProgress] = useState(100);
  const [stoping, setStoping] = useState(false)
  const [start, setStart] = useState(false);
  const [toPause, setToPause] = useState(false);
  const [onEditMode, setOnEditMode] = useState(false);

  const minValidation = `${stoping ? "01" : min < 10 ? `0${min}` : min}`

  const handleTime = () => {
    setOnEditMode(false)
    if (toPause) {
      setToPause(false);
      return
    }
    setStart(true)
    if (seg === 0) {
      if (min === 0) {
        return
      } else {
        setMin(min - 1)
        setSeg(59)
      }
    } else {
      setTimeout(() => {
        setSeg(seg - 1);
      }, 1000)
    }
  }

  const handleMin = (e: BaseSyntheticEvent) => {
    const value = e.target.value
    if (!value) {
      setMin(0)
      return
    }
    if(value > 99){
      setMin(99)
      return
    }
    setMin(parseInt(value))
  }
  const handleSeg = (e: BaseSyntheticEvent) => {
    const value = e.target.value
    if (!value) {
      setSeg(0)
      return
    }
    if(value > 59){
      setSeg(59)
      return
    }
    setSeg(parseInt(value))
  }

  const handleBarProgress = () => {
    const time = min * 60 + seg
    const progress = (time * 100) / fullTime
    setbarProgress(progress)
  }

  const pauseTime = () => {
    setToPause(false)
    setStart(false)
  }

  const reset = () => {
    pauseTime()
    setStoping(true)
    setTimeout(() => {
      setMin(1)
      setSeg(0)
      setFullTime(60)
      setbarProgress(100)
      setStoping(false)
    }, 1000)
  }
  useEffect(() => {
    if (start) {
      handleTime()
      handleBarProgress()
    }
  }, [seg])

  //Html
  return (
    <>
      <NavBar />
      <section className="homeContainer">
        <div className="anotherProgress" style={{height: `${barProgress}%`}} />
        {
          onEditMode ? (
            <div className="homeMainText">
              <input type="text" value={min} onChange={e => handleMin(e)} placeholder={minValidation} />
              <input type="text" value={seg} onChange={e => handleSeg(e)} placeholder={`${stoping ? "01" : seg < 10 ? `0${seg}` : seg}`} />
            </div>
          ) : (
            <div className="homeMainText" onClick={() => setOnEditMode(true)}>
              {`${minValidation} : ${stoping ? "00" : seg < 10 ? `0${seg}` : seg}`}
            </div>
          )
        }
        <div className="homeBackProgressBar">
          <div className="homeProgressBar" style={{ width: `${stoping ? 100 : barProgress}%` }} />
        </div>
        <section className="homeButtonsContainer">
          <div className="homeButton">
            <Edit fill={white} width="69.2%" height="69.2%" />
          </div>
          <div className="homeButton" onClick={start ? pauseTime : handleTime}>
            <Play fill={white} width="69.2%" height="69.2%" />
          </div>
          <div className="homeButton" onClick={reset}>
            <Restart fill={white} width="69.2%" height="69.2%" />
          </div>
        </section>
      </section>
    </>
  )
}

export default Home
