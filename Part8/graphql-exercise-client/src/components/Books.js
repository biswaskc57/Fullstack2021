import React from 'react'
import { ALL_BOOKS} from './Queries'
import {  useQuery,useMutation } from '@apollo/client';

const Books = (props) => {

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
 console.log("result is", result)

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books