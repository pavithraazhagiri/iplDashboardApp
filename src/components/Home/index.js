import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const formattedTeamsList = teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({teamsList: formattedTeamsList, isLoading: false})
  }

  render() {
    const {isLoading, teamsList} = this.state
    const homeElement = isLoading ? (
      // eslint-disable-next-line
      <div testid="loader" className="loader-container">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className="teams-container">
        <ul className="teams-matchcard-container">
          {teamsList.map(eachTeam => (
            <TeamCard key={eachTeam.id} details={eachTeam} />
          ))}
        </ul>
      </div>
    )
    return (
      <div className="home-bg-container">
        <div className="home-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="home-ipl-logo-image"
          />
          <h1 className="home-ipl-heading">IPL Dashboard</h1>
        </div>
        {homeElement}
      </div>
    )
  }
}
export default Home
