interface Props {
  decisions: string[]
}

export default function Deadlines({ decisions }: Props) {
  return (
    <div style={{border:"1px solid #ccc", padding:"16px"}}>
      <h2>Decisions</h2>

      <ul>
        {decisions.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  )
}