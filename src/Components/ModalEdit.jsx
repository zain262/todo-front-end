import "./ModalEdit.css";
import { useState, useEffect } from "react";

function ModalEdit({ modal, setModal, edit, id, text, descrip }) {
  //Create states to edit a post
  const [desc, setDesc] = useState(descrip || "");
  const [title, setTitle] = useState(text || "");

  //On load fill the initial form with current values
  useEffect(() => {
    setDesc(descrip);
    setTitle(text);
  }, [descrip, text]);

  //Function to update the states to ensure they relfect the users input
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  //on update send the new content to the edit function and turn the modal off
  const update = () => {
    const note = {
      text: title,
      desc: desc,
    };

    edit(note, id);
    setModal(!modal);
  };

  return (
    <>
      <div className="modal">
        <div onClick={() => setModal(!modal)} className="overlay"></div>
        <div className="modal-content">
          <h2>Edit Note</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <input
              type="text"
              style={{ minHeight: "10%" }}
              onChange={handleTitle}
              value={title}
            />
            <textarea
              type="text"
              style={{ minHeight: "50%" }}
              onChange={handleDesc}
              value={desc}
            ></textarea>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => setModal(!modal)}
              className="edit-button-class"
            >
              Cancel
            </button>
            <button onClick={update} className="edit-button-class">
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalEdit;
