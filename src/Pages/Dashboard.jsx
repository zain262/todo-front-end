import "./Dashboard.css";
import { useState, useContext, useEffect } from "react";
import Entry from "../Components/Entry";
import ModalAdd from "../Components/ModalAdd";
import { CiMedicalCross } from "react-icons/ci";
import { CiFaceSmile } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../App";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Admin from "./Admin";
import axios from "axios";

function Dashboard() {
  //State variables to manage the to do list and modals
  const [originalList, setOriginalList] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { role, setRole } = useContext(RoleContext);
  const [user, setUser] = useState("");
  const [currentFilter, setCurrentFilter] = useState("All");

  const nav = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://todo-backend-teal-kappa.vercel.app/api/v1/todo/getList",
          { withCredentials: true }
        );
        setOriginalList(response.data.data.list);
        setUser(response.data.username);
      } catch (err) {
        alert(err);
        nav("/login");
      }
    };
    //Fetch the list pertaining to the user
    fetchData();
  }, []);

  useEffect(() => {
    //If the list changes send an update request with the list to the back end
    const updateList = async () => {
      try {
        await axios.patch(
          "https://todo-backend-teal-kappa.vercel.app/api/v1/todo/updateList",
          { list: originalList },
          { withCredentials: true }
        );
      } catch (err) {
        console.error("Error updating the list:", err);
      }
    };

    if (originalList.length > 0) {
      updateList();
    }
  }, [originalList]);

  const logout = async () => {
    //Upon log out send a logout request and redirect to login page
    try {
      await axios.get(
        "hhttps://todo-backend-teal-kappa.vercel.app/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      setRole("");
      nav("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  //Function to delete a item from the list by filtering it out
  const deleteFunc = (id) => {
    setOriginalList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const applyFilter = () => {
    let filtered = [...originalList];

    //Used to apply drop down filter
    switch (currentFilter) {
      case "Done":
        filtered = filtered.filter((item) => item.done === true);
        break;
      case "N-Done":
        filtered = filtered.filter((item) => item.done === false);
        break;
      case "Fav":
        filtered = filtered.filter((item) => item.fav === true);
        break;
      default:
        filtered = originalList;
    }

    if (searchTerm) {
      //If the user enters a search term filter the array further
      filtered = filtered.filter((el) =>
        el.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filter = (filterValue) => {
    setCurrentFilter(filterValue);
    //Used to get the filter value
  };

  const editFunc = (note, id) => {
    //Reset the orignal list to be alligned with the edit
    setOriginalList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, ...note } : item))
    );
  };

  const setFav = (id) => {
    //Reset the list to allign with a new item being favorited
    setOriginalList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, fav: !item.fav } : item
      )
    );
  };

  const setDone = (id) => {
    //Reset the list to allign with a new item being finished
    setOriginalList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const addNew = (el) => {
    //Add a new item to the list
    setOriginalList((prevList) => [...prevList, el]);
  };

  const search = (term) => {
    setSearchTerm(term);
  };

  const filteredList = applyFilter();

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#e8e5e5",
        color: "black",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "2rem",
        minHeight: "100vh",
      }}
    >
      <div className="header-class">
        <div className="header-title">
          <p>TO DO LIST 📃</p>
        </div>

        <div className="right-container">
          {role === "admin" ? <p>Hi Admin</p> : <p>Hi {user}!</p>}
          <button
            className="button-class"
            style={{
              width: "30px",
              height: "30px",
            }}
            onClick={() => logout()}
          >
            <CiLogout />
          </button>
          {role === "admin" ? (
            <button
              className="button-class"
              style={{
                width: "30px",
                height: "30px",
              }}
              onClick={() => nav("/admin")}
            >
              <MdOutlineAdminPanelSettings />
            </button>
          ) : null}
        </div>
      </div>
      {role !== "admin" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => search(e.target.value)}
            className="search-bar"
          />
          <select
            className="drop-down"
            onChange={(e) => filter(e.target.value)}
          >
            <option value={"All"}>All</option>
            <option value={"Done"}>Done</option>
            <option value="N-Done">Not Done</option>
            <option value={"Fav"}>Favorites</option>
          </select>
          <button onClick={() => setModal(!modal)} className="button-class">
            <CiMedicalCross className="plug-logo" />
          </button>
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {filteredList.length <= 0 && role !== "admin" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p>Nothing to do.. You Finished All Your Tasks</p>
            <CiFaceSmile />
          </div>
        ) : role === "admin" ? (
          <Admin />
        ) : (
          <>
            <p>{user}'s List:</p>
            {filteredList.map((el) => (
              <Entry
                doneI={el.done}
                favI={el.fav}
                text={el.text}
                desc={el.desc}
                key={el.id}
                del={deleteFunc}
                id={el.id}
                edit={editFunc}
                favF={setFav}
                doneF={setDone}
              />
            ))}
          </>
        )}
      </div>

      {modal && <ModalAdd modal={modal} setModal={setModal} addNew={addNew} />}
    </div>
  );
}

export default Dashboard;
