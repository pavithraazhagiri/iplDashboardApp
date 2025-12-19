import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {ResponsiveContainer, PieChart, Pie, Cell, Legend} from 'recharts'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamData: {teamBannerUrl: '', latestMatchDetails: {}, recentMatches: []},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamDetails()
  }

  getTeamDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    const {teamBannerUrl, latestMatchDetails, recentMatches} = updatedData
    const updatedLatestMatchDetails = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      id: latestMatchDetails.id,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      secondInnings: latestMatchDetails.second_innings,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
    }

    const updatedRecentMatches = recentMatches.map(eachMatch => ({
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      id: eachMatch.id,
      matchStatus: eachMatch.match_status,
      result: eachMatch.result,
    }))

    this.setState({
      teamData: {
        teamBannerUrl,
        latestMatchDetails: updatedLatestMatchDetails,
        recentMatches: updatedRecentMatches,
      },
      isLoading: false,
    })
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  getMatchStatistics = () => {
    const {teamData} = this.state
    const {latestMatchDetails, recentMatches} = teamData
    let matchStatistics = {won: 0, lost: 0, draw: 0}
    if (latestMatchDetails.matchStatus !== undefined) {
      if (latestMatchDetails.matchStatus === 'Won') {
        matchStatistics = {
          ...matchStatistics,
          won: matchStatistics.won + 1,
        }
      } else if (latestMatchDetails.matchStatus === 'Lost') {
        matchStatistics = {
          ...matchStatistics,
          lost: matchStatistics.lost + 1,
        }
      } else {
        matchStatistics = {
          ...matchStatistics,
          draw: matchStatistics.draw + 1,
        }
      }
    }

    recentMatches.forEach(eachMatch => {
      if (eachMatch.matchStatus === 'Won') {
        matchStatistics = {
          ...matchStatistics,
          won: matchStatistics.won + 1,
        }
      } else if (eachMatch.matchStatus === 'Lost') {
        matchStatistics = {
          ...matchStatistics,
          lost: matchStatistics.lost + 1,
        }
      } else {
        matchStatistics = {
          ...matchStatistics,
          draw: matchStatistics.draw + 1,
        }
      }
    })
    console.log(matchStatistics)
    const updatedMatchStatistics = [
      {name: 'won', value: matchStatistics.won},
      {name: 'lost', value: matchStatistics.lost},
      {name: 'draw', value: matchStatistics.draw},
    ]
    return updatedMatchStatistics
  }

  render() {
    const {teamData, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamData
    const updatedMatchStatistics = this.getMatchStatistics()
    const colors = ['rgb(48, 169, 121)', 'rgb(180, 62, 62)', 'blue']

    console.log(updatedMatchStatistics)
    const teamMatchesElement = isLoading ? (
      // eslint-disable-next-line
      <div testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className="team-matches-container">
        <button
          type="button"
          onClick={this.onClickBack}
          className="back-button"
        >
          Back
        </button>
        <img
          src={teamBannerUrl}
          alt="team banner"
          className="team-banner-image"
        />
        <h1 className="latest-matches-heading">Latest Matches</h1>
        <LatestMatch details={latestMatchDetails} />
        <ul className="latest-matches-ul-list">
          {recentMatches.map(eachMatch => (
            <MatchCard details={eachMatch} key={eachMatch.id} />
          ))}
        </ul>
        <h1 className="latest-matches-heading">Match Statistics</h1>
        <ResponsiveContainer height={300}>
          <PieChart>
            <Pie data={updatedMatchStatistics} dataKey="value" label>
              {updatedMatchStatistics.map((eachObj, index) => (
                <Cell key={`cell-${eachObj.name}`} fill={colors[index]} />
              ))}
            </Pie>
            <Legend height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
    return teamMatchesElement
  }
}
export default TeamMatches
