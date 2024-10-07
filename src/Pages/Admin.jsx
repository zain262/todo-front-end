import { useState, useEffect } from "react";
import axios from "axios";
import Entry from "../Components/Entry";

function Admin() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/v1/todo/getAll");
      console.log(res.data.data);
      setList(res.data.data);
    };

    getData();
  }, []);

  return (
    <div>
      <>
        {list.map((ele) => (
          <div key={ele.username}>
            {!ele.list[0] ? <></> : <p>{ele.username}'s List:</p>}
            {ele.list.map((el) => (
              <Entry
                doneI={el.done}
                favI={el.fav}
                text={el.text}
                key={el.id}
                id={el.id}
              />
            ))}
          </div>
        ))}
      </>
    </div>
  );
}

export default Admin;
