import './style.css'
import { ReactComponent as Alarm } from '../../assets/alarm.svg';
import { ReactComponent as List } from '../../assets/list.svg';
import { ReactComponent as Help } from '../../assets/help.svg';

const NavBar = () => {
  const white = "#F5F6F7";
  const purple = "#AC83FF"
  return (
    <section className="navBarContainer">
      <section className="navBarItemContainer">
        <div className="navBarItem">
          <Alarm fill={white} width="70%" height="70%" />
        </div>
        <div className="navBarItem" style={{background: white}}>
          <List fill={purple} width="70%" height="70%" />
        </div>
        <div className="navBarItem" style={{background: white}}>
          <Help fill={purple} width="70%" height="70%" />
        </div>
      </section>
    </section>
  )
}

export default NavBar;