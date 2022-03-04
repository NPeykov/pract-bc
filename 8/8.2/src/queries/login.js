import { gql  } from '@apollo/client'

const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export default LOGIN 

