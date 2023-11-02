import { AiOutlineLogout } from "react-icons/ai";
import { BiEdit, BiSolidTrashAlt } from "react-icons/bi";
import "./TodoList.css";
import { Ring } from "@uiball/loaders";
import { useEffect, useState } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../Firebase/Firebaseconfig";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [listTask, setListTask] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [isError, setIsError] = useState("");
  const [noInternetError, setnoInternetError] = useState("");

  /// navigate
  const navigate = useNavigate();
  //???????????????????Function which will send Data to Firebase **************

  const AddData = async (event) => {
    event.preventDefault();

    try {
      const TodosReference = collection(db, "Todos");
      if (inputValue.length === 0) return setIsError("!Please Enter the Text");
      setIsloading(true);
      await addDoc(TodosReference, {
        Todos: inputValue,
        time: Timestamp.now(),
      });
      setInputValue("");
      GetData();
      setIsloading(false);
    } catch (error) {
      setnoInternetError("! Something went Wrong");

      setIsloading(false);
    }
  };
  //???????????????????Function which will Recieve Data from Firebase **************

  const GetData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Todos"));
      setIsloading(true);
      const tasks = [];
      querySnapshot.forEach((docs) => {
        tasks.push({ id: docs.id, ...docs.data() });
      });
      setIsloading(false);
      const filteredData = tasks;
      setListTask(filteredData);
    } catch (error) {
      setnoInternetError("! Something went Wrong");
      setIsloading(false);
    }
  };
  useEffect(() => {
    try {
      setIsloading(true);
      GetData();
      setIsloading(false);
    } catch (error) {
      setnoInternetError("! Something went Wrong");
      setIsloading(false);
    }
  }, []);
  //???????????????????Function which will DeleteTask  from Firebase **************
  const DeleteTask = async (id) => {
    try {
      if (listTask.length >= 0 || listTask.length <= 0) {
        const deleteDocs = doc(db, "Todos", id);
        setIsloading(true);
        const updatedList = listTask.filter((item) => item.id !== id);
        setListTask(updatedList);
        await deleteDoc(deleteDocs);

        GetData();
        setIsloading(false);
      }
    } catch (error) {
      setnoInternetError("! Something went Wrong");
      setIsloading(false);
    }
  };
  //********************?The funtion will take the value from tasklist ***********
  const EditTask = (id) => {
    setIsEdit(true);
    setEditTaskId(id);
    let taskToUpdate = listTask.find((task) => task.id === id);
    setInputValue(taskToUpdate.Todos);
  };
  // ******************************?This function will update the new inputValue****

  const UpdateTask = async () => {
    setIsEdit(false);

    try {
      if (editTaskId !== null) {
        if (inputValue.length !== 0) {
          setIsloading(true);
          const UpdatedTaskRef = doc(db, "Todos", editTaskId);
          await updateDoc(UpdatedTaskRef, {
            Todos: inputValue,
            time: Timestamp.now(),
          });
          GetData();
          setInputValue("");
          setIsloading(false);
          setEditTaskId(null);
        } else {
          setIsEdit(true);
          setIsError("!Please Enter the Text");
        }
      }
    } catch (error) {
      setnoInternetError("! Something went Wrong");
      setIsloading(false);
    }
  };
  const handleOnchange = (event) => {
    setIsError("");
    setInputValue(event.target.value);
  };
  // localStorage
  const dataUser = localStorage.getItem("user");
  const user = JSON.parse(dataUser);
  // Logout funtion

  const Logout = async () => {
    signOut(auth);
    localStorage.clear("user");
    navigate("/");
  };

  return (
    <>
      {noInternetError ? (
        <div className="h-[90vh] flex items-center justify-center   w-full ">
          <span className="text-xl font-semibold text-yellow-400 ">
            🦕{noInternetError} ...
          </span>
        </div>
      ) : (
        <div className="main bg-[#28282b] h-[90vh] max-w-[70vw] m-auto mt-10 shadow-md shadow-gray-700 rounded-xl text-yellow-400 font-semibold overflow-hidden">
          <div className="input_title_controll h-[25vh] w-full flex flex-col justify-center items-center p-5">
            <div className="title w-fit m-auto p-3 flex gap-4 items-center justify-center ">
              <h1 className="text-5xl font-bold">TodoList</h1>
              {user && (
                <AiOutlineLogout
                  color="yellow"
                  size={25}
                  onClick={Logout}
                  className="cursor-pointer"
                />
              )}
            </div>
            <div className="input_controller">
              <input
                value={inputValue}
                onChange={(event) => {
                  handleOnchange(event);
                }}
                type="text"
                placeholder="Please Add Task"
                className="py-[5px] px-[15px] outline-none font-bold text-[1.125rem] text-black placeholder:text-sm placeholder:text-center"
              />
              {isEdit ? (
                <button onClick={UpdateTask} className="buttons update">
                  Update
                </button>
              ) : (
                <button onClick={AddData} className="buttons">
                  Add
                </button>
              )}
            </div>

            <div className="h-[12vh]  w-fit mt-4  m-auto">{isError}</div>
          </div>
          {isloading ? (
            <div className="loadingdiv flex justify-center items-center h-[40vh]">
              <Ring size={60} lineWeight={6} speed={2} color="yellow" />
            </div>
          ) : (
            <div className="custom_scroll h-[65vh] bg-black/30 overflow-auto">
              <ol className="tasklist">
                {listTask.map((todosItem) => (
                  <li
                    key={todosItem.id}
                    className="bg-[#28282b]  py-3 font-bold text-xl rounded-md  px-4 relative cursor-default select-none"
                  >
                    <span className="text-[0.75rem] font-normal text-center block text-blue-300">
                      <span className="font-bold text-[0.875rem]">
                        LastUpdate:-
                      </span>
                      {todosItem.time &&
                        new Date(todosItem.time.toDate()).toLocaleString()}
                    </span>
                    <div className="flex items-center justify-center">
                      <span className="icon">
                        <BiSolidTrashAlt
                          color="white"
                          className="cursor-pointer"
                          size={25}
                          onClick={() => {
                            DeleteTask(todosItem.id);
                          }}
                        />
                      </span>
                      <span className="list_text px-10 text-justify  w-fit m-auto">
                        {todosItem.Todos}
                      </span>

                      <span className="edit absolute right-5 flex flex-row-reverse gap-2">
                        <BiEdit
                          color="white"
                          className="cursor-pointer"
                          size={25}
                          onClick={() => EditTask(todosItem.id)}
                        />
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TodoList;
