// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /heroes
// https://docs.opendota.com/#tag/heroes%2Fpaths%2F~1heroes%2Fget
export interface ProPlayer {
  account_id: number
  steamid: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  profileurl: string
  personaname: string
  last_login?: any
  full_history_time?: any
  cheese: number
  fh_unavailable: boolean
  loccountrycode: string
  name: string
  country_code: string
  fantasy_role: number
  team_id: number
  team_name: string
  team_tag: string
  is_locked: boolean
  is_pro: boolean
  locked_until: number
}

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum ProPlayersActionTypes {
  FETCH_REQUEST = '@@proPlayers/FETCH_REQUEST',
  FETCH_SUCCESS = '@@proPlayers/FETCH_SUCCESS',
  FETCH_ERROR = '@@proPlayers/FETCH_ERROR'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ProPlayersState {
  readonly loading: boolean
  readonly data: ProPlayer[]
  readonly errors?: string
}
