const { ApolloServer, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid');
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
}

type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String]!
}

  type Query {
    authorCount:Int!
    allAuthors:[Author!]!
    findAuthor(name: String!):Author
    bookCount:Int!
    allBooks(genre:String!, author:String!):[Book!]!
    findBook(title:String!): Book
  }

  type Mutation {
    addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author   
  }
`

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    allAuthors: () => authors,
    findAuthor: (root, args) =>
    authors.find(a=> a.name ===args.name),
    allBooks: (root, args) => books.filter(book =>book.genres.includes(args.genre)&&book.author===args.author),
    findBook: (root, args) =>
    books.find(a=> a.title ===args.title)

  },
  Author:{
    bookCount: (root)=> {
      const booksByAuthor = books.filter(book =>book.author ===root.name)

      return booksByAuthor.length;
    }

  },

  Mutation: {
    addBook: (root, args) => {
      if (!books.find(book => book.name === args.name)) {
       let author = {
        "name": args.name,
        "born": null,
        "bookCount": 1
       }
      authors = authors.concat(author);
      let bookToAdd = { ...args, id:uuidv4() }
       books.concat(bookToAdd)
        console.log(books)
        return book
        }
      else{
      let book = { ...args, id:uuidv4() }
       books = books.concat(book)
        console.log(books)
        return book
      }
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      if (!author) {
        return null
      }
  
      const updatedAuthor = { ...author, born: args.setBornTo}
      authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
      return updatedAuthor
    }       
    
  },
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
console.log(books);
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})