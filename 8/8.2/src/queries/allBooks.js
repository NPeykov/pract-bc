import { gql  } from '@apollo/client'

const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      title
      published
    }
  }
`

export default ALL_BOOKS
