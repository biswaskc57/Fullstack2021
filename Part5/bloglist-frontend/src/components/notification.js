import "../style/app.css";

export default function Notification(props) {
  if (props.message === null) {
    return <div></div>;
  } else if (props.message.includes("a new blog"))
    return (
      <div className="addMessage ">
        <p>{props.message}</p>
      </div>
    );
  else
    return (
      <div className="error">
        <p>{props.message}</p>
      </div>
    );
}
