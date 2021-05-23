export default function Filter(props) {
  console.log(props.handler);
  return (
    <div>
      <input onChange={props.handler} />
    </div>
  );
}
