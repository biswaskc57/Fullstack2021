import React, { useState, useEffect, useRef } from "react";

import Note from "./Note";
import Notification from "./Notification";

import noteService from "./services/notes";
import loginService from "./services/login";
import LoginForm from "./loginform";
import NoteForm from "./Noteform";
import Togglable from "./Togglable";

import "../App.css";
export default function NoteComponent() {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const noteFormRef = useRef();
  const toggleImportanceOf = (id) => {
    console.log(id);
    console.log(notes);
    const note = notes.find((n) => n.id === id);

    console.log(note);
    const changedNote = { ...note, important: !note.important };
    console.log(changedNote);

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  console.log("render", notes.length, "notes");
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  console.log(showAll);

  const notesToShow = showAll
    ? notes
    : notes.filter((notes) => notes.important === true);
  console.log(showAll);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    console.log("logging in with", username, password);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <p>{user.name} logged in</p>
            {noteForm()}
          </div>
          <div>
            <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? "important" : "all"}
            </button>
            <button onClick={handleLogout}>logout</button>
          </div>
          <ul>
            {notesToShow.map((note, i) => (
              <Note
                key={i}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
