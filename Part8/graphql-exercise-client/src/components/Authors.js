  
import React, {useState} from 'react'
import { EDIT_AUTHOR,ALL_AUTHORS,ALL_BOOKS} from './Queries'
import {  useMutation } from '@apollo/client'
import { fieldNameFromStoreName } from '@apollo/client/cache';
const Authors = ({authors, show}) => {
const [year, setYear] = useState();
const [name, setName] = useState();
const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
  refetchQueries: [  {query: ALL_BOOKS},{query: ALL_AUTHORS} ],
})




  if (!show) {
    return null
  }
  

  const submit =  (event) => {
    event.preventDefault()
    
    console.log('edit author...', name, year)
    editAuthor({  variables: { name, year} })
    setName("");
    setYear("");
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>

      <select
            style={{
              width: "100%",
              height: "50%",
              marginTop: "5%",
              border: "collapse",
            }}
            value= {name}
            name="author"
            onChange ={(e)=>setName(e.target.value)}
            defaultValue={""}
            required
          >
            <option value="" disabled hidden>
              Select author
            </option>
            {authors.map((author, index) => (
              <option key={index} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          year:<input
            type='number'
            value={year}
            onChange={({ target }) => setYear(Number(target.value))}
          />

          <button  type='submit'>edit born</button>
          </form>
        </div>
        
    </div>
  )
}

export default Authors
