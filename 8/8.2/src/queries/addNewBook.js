import { gql } from '@apollo/client'

const ADD_NEW_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author
      title
      published
    }
  }
`

export default ADD_NEW_BOOK
