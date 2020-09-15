import * as React from 'react'
import { Link } from 'react-router-dom'

import styled from '../../utils/styled'

const TeamCell: React.FC<any> = ({ row: { original } }) => (
  <ProPlayerTeam>
    {original.team_id ? <Link to={`/teams/${original.team_id}`}>{original.team_name || '(no name)'}</Link> : original.team_name}
  </ProPlayerTeam>
)

export default TeamCell

const ProPlayerTeam = styled('div')`
  a {
    text-decoration: underline;
  }
`
