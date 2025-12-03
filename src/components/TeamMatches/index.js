import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

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

  render() {
    const {teamData, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamData
    console.log(teamBannerUrl)
    const teamMatchesElement = isLoading ? (
      <div>
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div>
        <img src={teamBannerUrl} alt="team banner" />
        <h1>Latest Matches</h1>
        <LatestMatch details={latestMatchDetails} />
        <ul>
          {recentMatches.map(eachMatch => (
            <MatchCard details={eachMatch} key={eachMatch.id} />
          ))}
        </ul>
      </div>
    )
    return teamMatchesElement
  }
}
export default TeamMatches
