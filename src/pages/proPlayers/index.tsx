import * as React from 'react'
import { connect } from 'react-redux'

import styled from '../../utils/styled'
import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'
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
