import { useState } from "react";
import "./ModalEdit.css";

function ModalAdd({ modal, setModal, addNew }) {
  //States to manage form input
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  //Update descripion and title
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  //Function to add a new todo item by first creating it and sending it to addNew function
  const add = () => {
    setModal(!modal);
    const note = {
      id: Date.now(),
      text: title,
      desc: desc,
      done: false,
      fav: false,
      createdAt: new Date().toISOString(),
    };
    addNew(note);
  };
  return (
    <>
      <div className="modal">
        <div onClick={() => setModal(!modal)} className="overlay"></div>
        <div className="modal-content">
          <h2>Add To Do</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <input
              type="text"
              style={{ minHeight: "10%" }}
              onChange={handleTitle}
              placeholder="Title"
            ></input>
            <textarea
              type="text"
              style={{ minHeight: "50%" }}
              onChange={handleDesc}
              placeholder="Description"
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
            <button onClick={add} className="edit-button-class">
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalAdd;
