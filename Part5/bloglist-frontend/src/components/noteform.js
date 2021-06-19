export default function Noteform(props) {
  return (
    <div>
      <p>
        title:
        <input onChange={props.title} />
      </p>
      <p>
        Author:
        <input onChange={props.author} />
      </p>
      <p>
        Url:
        <input onChange={props.url} />
      </p>
      <p>
        <button type="submit" onClick={props.create}>
          create
        </button>
      </p>
    </div>
  );
}
