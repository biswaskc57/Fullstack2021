
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from "./components/loginform"
import NewBook from './components/NewBook'
import {  useQuery,useMutation, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS} from './components/Queries'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const result2 = useQuery(ALL_BOOKS)
  const client = useApolloClient()

console.log("result is", result)
console.log("result2 is", result2)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (result.loading)  {
    return <div>loading...</div>
  }
  if (!token) {
    return ( 
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }
   
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors = {result.data.allAuthors}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
      setError={setErrorMessage}
        show={page === 'add'}
      />

    </div>
  )
}

export default App