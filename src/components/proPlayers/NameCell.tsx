import * as React from 'react'
import styled from '../../utils/styled'

const NameCell: React.FC<any> = ({ row: { original } }) => (
  <HeroDetail>
    <HeroIcon src={original.avatar} alt={original.personaname} />
    <HeroName>
      <a href={original.profileurl}>{original.personaname}</a>
    </HeroName>
  </HeroDetail>
)

export default NameCell

const HeroDetail = styled('div')`
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
