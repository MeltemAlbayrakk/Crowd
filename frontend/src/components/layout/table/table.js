import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

export default function Table(props) {
  return (
    props.data &&
    props.data.length > 0 && (
      <table className={props.loading ? "table loading" : "table"}>
        <thead>
          <tr>
            {props.headline.map((item) => (
              <th>{item}</th>
            ))}
            {props.onRemove && <th className="delete">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {props.data.map((row) => (
            <tr>
              {Object.keys(row).map(
                (item) => item !== "id" && <td>{row[item]}</td>
              )}
              {props.onRemove && (
                <td className="delete" onClick={() => props.onRemove(row.id)}>
                  <FontAwesomeIcon icon={faRemove} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
}
