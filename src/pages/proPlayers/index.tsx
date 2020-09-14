import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactCountryFlag from 'react-country-flag'

import styled from '../../utils/styled'
import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'
import DataTable from '../../components/layout/DataTable'
import LoadingOverlay from '../../components/data/LoadingOverlay'
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner'
import LoadingSpinner from '../../components/data/LoadingSpinner'
import ProPlayersTable from '../../components/proPlayers/Table'

import { ApplicationState } from '../../store'
import { ProPlayer } from '../../store/proPlayers/types'
import { fetchRequest } from '../../store/proPlayers/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: ProPlayer[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch

class ProPlayersIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { fetchRequest: fr } = this.props
    fr()
  }

  private renderData() {
    const { data } = this.props

    return (
      <DataTable columns={['Player', 'Country', 'Team']} widths={['auto', '', '']}>
        {data.slice(0, 100).map(proPlayer => (
          <tr key={proPlayer.account_id}>
            <HeroDetail>
              <HeroIcon src={proPlayer.avatar} alt={proPlayer.personaname} />
              <HeroName>
                <a href={proPlayer.profileurl}>{proPlayer.personaname}</a>
              </HeroName>
            </HeroDetail>
            <td>
              <ReactCountryFlag countryCode={proPlayer.loccountrycode} svg aria-label={proPlayer.country_code} />
            </td>
            <td>
              <ProPlayerTeam>
                {proPlayer.team_id ? (
                  <Link to={`/teams/${proPlayer.team_id}`}>{proPlayer.team_name || '(no name)'}</Link>
                ) : (
                  proPlayer.team_name
                )}
              </ProPlayerTeam>
            </td>
          </tr>
        ))}
      </DataTable>
    )
  }

  public render() {
    const { loading, data } = this.props

    return (
      <Page>
        <Container>
          <TableWrapper>
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            <ProPlayersTable data={data} />
          </TableWrapper>
        </Container>
      </Page>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ proPlayers }: ApplicationState) => ({
  loading: proPlayers.loading,
  errors: proPlayers.errors,
  data: proPlayers.data
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps, mapDispatchToProps)(ProPlayersIndexPage)

const TableWrapper = styled('div')`
  position: relative;
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  min-height: 200px;
`

const HeroDetail = styled('td')`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const HeroIcon = styled('img')`
  width: 32px;
  height: 32px;
`

const HeroName = styled('div')`
  flex: 1 1 auto;
  height: 100%;
  margin-left: 1rem;

  a {
    color: ${props => props.theme.colors.brand};
  }
`

const ProPlayerTeam = styled('div')`
  a {
    text-decoration: underline;
  }
`
