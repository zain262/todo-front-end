import { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import ModalEdit from "./ModalEdit";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import "./Entry.css";

function Entry({ desc, text, doneI, favI, del, id, edit, favF, doneF }) {
  
  //Create states to manage the todo items features
  const [done, setDone] = useState(doneI);
  const [fav, setFav] = useState(favI);
  const [modal, setModal] = useState(false);
  const [showDesc, setShow] = useState(false);

  const newFav = () => {
    setFav(!fav);
    favF(id);
  };
  //function to set done and fav
  const newDone = () => {
    setDone(!done);
    doneF(id);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-around",
          width: "25rem",
        }}
        className="to-do"
      >
        {edit ? (
          <input
            type="checkbox"
            checked={done}
            onClick={newDone}
            className="input-box"
          ></input>
        ) : (
          <></>
        )}

        <h3
          style={{
            textDecoration: done ? "line-through" : "none",
            textAlign: "center",
          }}
          className="note"
        >
          {text}
        </h3>

        {edit ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="gold"
              style={{
                width: `20px`,
                height: `20px`,
                display: "block",
                cursor: "pointer",
              }}
              onClick={newFav}
              className={fav ? "star-active" : "star-class"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>

            <button
              onClick={() => setModal(!modal)}
              className="button-class-entry"
            >
              <CiEdit className="logo-class-entry" />
            </button>
            <button onClick={() => del(id)} className="button-class-entry">
              <CiTrash className="logo-class-entry" />
            </button>
            <button
              onClick={() => setShow(!showDesc)}
              className="button-class-entry"
            >
              {showDesc ? (
                <IoIosArrowDropup className="logo-class-entry" />
              ) : (
                <IoIosArrowDropdown className="logo-class-entry" />
              )}
            </button>
            {modal && (
              <ModalEdit
                modal={modal}
                setModal={setModal}
                edit={edit}
                id={id}
                text={text}
                descrip={desc}
              />
            )}
          </>
        ) : (
          <p></p>
        )}
      </div>
      <div>
        {showDesc ? (
          <h1
            style={{
              textAlign: "center",
              fontSize: "0.7rem",
              width: "100%",
            }}
            className="desc"
          >
            {desc}
          </h1>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Entry;
