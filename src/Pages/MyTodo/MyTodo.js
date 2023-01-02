import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ToDoCard from "./ToDoCard/ToDoCard";

const MyTodo = () => {
  const [mytoDos, setMyToDos] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch("https://genopi-server.vercel.app/todo-list")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMyToDos(data);
      });
  }, [post]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const date = new Date().toLocaleString();

    const newTodo = {
      date,
      title,
      description,
    };

    fetch("https://genopi-server.vercel.app/todo-list-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("ToDo item added successfully");
          setPost(data);
          form.reset();
        }
      });
  };

  return (
    <>
      <div
        className="card lg:w-2/4 bg-base-100 mt-6 m-6 lg:mx-auto"
        style={{ boxShadow: "0px 0px 5px 5px rgba(40, 160, 148, 0.2)" }}
      >
        <div className="card-body">
          <h2 className="card-title text-4xl">My ToDo !</h2>
          <hr />

          <div className="add-section mt-4 p-4 border rounded-lg">
            <h2 className="text-2xl pb-2">Add a ToDo Item !</h2>
            <form onSubmit={handleAddTodo}>
              <div className="mb-3">
                <label>ToDo title</label>
                <input
                  name="title"
                  type="text"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Todo Description</label>
                <textarea
                  className="w-full pt-3 input input-bordered min-h-[120px]"
                  name="description"
                  required
                ></textarea>
              </div>
              <div className="text-end">
                <input type="submit" value="Add Item" className="btn w-full" />
              </div>
            </form>
          </div>

          <div className="add-section mt-4 p-4 pb-0 border rounded-lg">
            <h2 className="text-2xl pb-2">ToDo List !</h2>
            <hr />
            <div>
              {mytoDos.map((todo, i) => (
                <ToDoCard key={i} todo={todo} setPost={setPost}></ToDoCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTodo;
