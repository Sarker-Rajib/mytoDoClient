import React from "react";
import { toast } from "react-hot-toast";

const ToDoCard = ({ todo, setPost }) => {
  const { title, description, _id, date, status, completedDate } = todo;

  const updateStatus = (id) => {
    const date = new Date().toLocaleString();
    const updated = {
      date,
      status: true,
    };
    fetch(`https://genopi-server.vercel.app/todo-list-up-status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setPost(data);
          toast.success("Todo updated successfully");
        }
      });
  };

  const handleDelete = (id) => {
    fetch(`https://genopi-server.vercel.app/todo-list-delete/${id}`, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setPost(data);
          toast.success("Item deleted successfully");
        }
      });
  };

  return (
    <div className="my-4 shadow-md border p-3 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">{title}</h2>
        <div>
          <button
            onClick={() => updateStatus(_id)}
            className="btn mr-2"
            disabled={status}
          >
            {status ? "Completed" : "Complete Now"}
          </button>
          <button onClick={() => handleDelete(_id)} className="btn">
            Delete
          </button>
        </div>
      </div>
      <span className="text-amber-500">Created At : {date}</span>
      <p className="text-xl">{description}</p>
      {completedDate && (
        <p className="text-green-500">Completed at : {completedDate}</p>
      )}
    </div>
  );
};

export default ToDoCard;
