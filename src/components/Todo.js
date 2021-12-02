import React, { useEffect, useState } from "react";
const getTaskFromLocal = (ListName) => {
  let list = localStorage.getItem(ListName);
  if (!list) {
    return [];
  } else {
    return JSON.parse(list);
  }
};
const Todo = () => {
  const [Task, setTask] = useState("");
  const [Description, SetDescription] = useState("");
  const [TaskList, setTaskList] = useState(getTaskFromLocal("TodoList"));
  const [InProgress, setInProgress] = useState(
    getTaskFromLocal("InProgressList")
  );
  const [Completed, setCompleted] = useState(getTaskFromLocal("CompletedList"));

  const addData = () => {
    if (!Task || !Description) {
      alert("Please add task and description");
    } else if (TaskList.find((o) => o.Task === Task)) {
      alert("Task already Exist");
    } else {
      let temp = {
        Task: Task,
        Description: Description,
        Date: new Date().toLocaleString("en-US"),
        updatedDate: new Date().toLocaleString("en-US"),
      };
      setTaskList([...TaskList, temp]);
      setTask("");
      SetDescription("");
    }
  };

  const getInProgressOj = (id) => {
    let updatedTaskList = TaskList[id];
    updatedTaskList.updatedDate = new Date().toLocaleString("en-US");
    setInProgress([...InProgress, updatedTaskList]);
    onDelete(id,'Todo');
  };
  const getCompletedOj = (id, isCompleted) => {
    let updatedTaskList = InProgress[id];
    if (isCompleted) {
      updatedTaskList.Date = new Date().toLocaleString("en-US");
      setCompleted([...Completed, updatedTaskList]);
    } else {
      setTaskList([...TaskList, updatedTaskList]);
    }
    onInProgressDelete(id);
  };

  const onDelete = (id,type) => {
 if(type === "Todo"){
    const updatedTaskList = TaskList.filter((elem, ind) => {
        return ind !== id;
      });
      setTaskList(updatedTaskList);
 }else{
    const updatedTaskList = Completed.filter((elem, ind) => {
        return ind !== id;
      });
      setCompleted(updatedTaskList);
 }
  };

  const onInProgressDelete = (id) => {
    const updatedTaskList = InProgress.filter((elem, ind) => {
      return ind !== id;
    });
    setInProgress(updatedTaskList);
  };
  const onDragOver = (e) => {
      console.log(e)
    e.preventDefault();
  };
  const onDragStart = (id,e) => {
    // getInProgressOj(id);
    console.log(id,e);
  };
  const onDropDown = ()=>{

  }

  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(TaskList));
    localStorage.setItem("InProgressList", JSON.stringify(InProgress));
    localStorage.setItem("CompletedList", JSON.stringify(Completed));
  }, [TaskList, Completed, InProgress]);

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>My Todo App</h2>
        <hr></hr>
      </div>
      <div className="textarea">
        <form>
          <div className="form-group" style={{ margin: "20px" }}>
            <input
              className="form-control"
              id="Task"
              placeholder="Add task here..."
              value={Task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
          </div>
          <div className="form-group" style={{ margin: "20px" }}>
            <input
              className="form-control"
              id="desc"
              placeholder="Add Description here..."
              value={Description}
              onChange={(e) => {
                SetDescription(e.target.value);
              }}
            />
          </div>

          <div style={{ margin: "20px" }}>
            <button
              type="button"
              className="btn btn-default"
              style={{ background: "#F94F5E", width: 100, color: "white" }}
              onClick={addData}
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="row" style={{ margin: "20px" }}>
        <div
          className="col-lg-3 col-md-3 todo"
          onDragOver={(e)=>onDragOver(e)}
          
        >
          <div>
            <h3 style={{ textAlign: "center" }}>Todo</h3>
          </div>
          <div className=" scroll"
           
          >
            {TaskList.map((item, index) => {
              return (
                <div className='list'
                
                 
                  key={index}
                  draggable={true}
                  onDragStart={(e) => {
                    onDragStart(index,e);
                  }}
                >
                  <div style={{ padding: 4 }}>
                    Task:{" "}
                    <span style={{ fontFamily: "Circular TT", fontSize: 20 }}>
                      {item.Task}
                    </span>
                    <button
                      style={{ float: "right", borderRadius: 50, fontSize: 10 }}
                      onClick={() => {
                        onDelete(index,'Todo');
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div style={{ padding: 4 }}>
                    Description:{" "}
                    <span style={{ fontFamily: "Circular TT", fontSize: 18 }}>
                      {item.Description}
                    </span>
                    <button
                      style={{ float: "right", borderRadius: 50, fontSize: 10 }}
                      onClick={() => {
                        getInProgressOj(index);
                      }}
                    >
                      -{">"}
                    </button>
                  </div>

                  <div>
                    setAt:{" "}
                    <span style={{ float: "right", fontSize: 10 }}>
                      {item.Date.toString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="col-lg-3 col-md-3 inprogg"
          onDragOver={(e)=>onDragOver(e)}
      
        >
          <div>
            <h3 style={{ textAlign: "center" }}>In Progress</h3>
          </div>
          <div className=" scroll"
           
          >
            {InProgress.map((item, index) => {
              return (
                <div className="list"
                draggable={true}
                  key={index}
                >
                  <div style={{ padding: 4 }}>
                    Task:{" "}
                    <span style={{ fontFamily: "Circular TT", fontSize: 18 }}>
                      {item.Task}
                    </span>
                    <button
                      style={{ float: "right", borderRadius: 50, fontSize: 10 }}
                      onClick={() => {
                        getCompletedOj(index, false);
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div style={{ padding: 4 }}>
                    Description:{" "}
                    <span style={{ fontFamily: "Circular TT", fontSize: 18 }}>
                      {item.Description}
                    </span>
                    <button
                      style={{ float: "right", borderRadius: 50, fontSize: 10 }}
                      onClick={() => {
                        getCompletedOj(index, true);
                      }}
                    >
                      -{">"}
                    </button>
                  </div>

                  <div style={{ padding: 4 }}>
                    setAt:{" "}
                    <span style={{ float: "right", fontSize: 10 }}>
                      {item.updatedDate.toString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="col-lg-3 col-md-3 completed"
          onDragOver={(e)=>onDragOver(e)}
          
        >
          <div>
            <h3 style={{ textAlign: "center" }}>Completed</h3>
          </div>
          <div className="scroll"
          
          >
            {Completed.map((item, index) => {
              return (
                <div className="list"
                draggable={true}
                  key={index}
                >
                  <div style={{ padding: 4 }}>
                    Task:{" "}
                    <span style={{ fontFamily: "Circular TT", fontSize: 18 }}>
                      {item.Task}
                    </span>
                    <button
                      style={{ float: "right", borderRadius: 50, fontSize: 10 }}
                      onClick={() => {
                        onDelete(index,'completed');
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div style={{ padding: 4 }}>
                    Description:{" "}
                    <span style={{ fontFamily: "Circular TT", fontSize: 16 }}>
                      {item.Description}
                    </span>
                  </div>

                  <div style={{ padding: 4 }}>
                    Completed At:{" "}
                    <span style={{ float: "right", fontSize: 10 }}>
                      {item.Date.toString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
