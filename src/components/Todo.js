import React, { useEffect, useState } from 'react'
const getTaskFromLocal = (ListName) =>{
    let list = localStorage.getItem(ListName)
    if(!list){
        return []
    }else{
        return JSON.parse(list)
    }
  
}
const Todo = () => {
    const [Task, setTask] = useState('')
    const [Description, SetDescription] = useState('')
    const [TaskList, setTaskList] = useState(getTaskFromLocal('TodoList'))
    const [InProgress, setInProgress] = useState(getTaskFromLocal('InProgressList'))
    const [Completed, setCompleted] = useState(getTaskFromLocal('CompletedList'))

const addData=() =>{
    if(!Task || !Description){
alert("Please add task and description")
    }else if (TaskList.find(o => o.Task === Task)){
        alert("Task already Exist")
    }else{
        let temp={
            Task:Task,
            Description:Description,
            Date: new Date().toLocaleString('en-US'),
            updatedDate:new Date().toLocaleString('en-US'),
            
        }
        setTaskList([...TaskList,temp])
        setTask('')
        SetDescription('')
    }
   
    
}




    const getInProgressOj=(id)=>{
        let updatedTaskList = TaskList[id]
            updatedTaskList.updatedDate=new Date().toLocaleString('en-US')
        setInProgress([...InProgress,updatedTaskList])   
            onDelete(id) 
    }
    const getCompletedOj=(id,isCompleted)=>{
        let updatedTaskList = InProgress[id]
        if(isCompleted){
            updatedTaskList.Date=new Date().toLocaleString('en-US')
            setCompleted([...Completed,updatedTaskList]) 
               
        }
        else{
            setTaskList([...TaskList,updatedTaskList])
        }
        onInProgressDelete(id) 
    }

const onDelete=(id)=>{
    const updatedTaskList = TaskList.filter((elem,ind)=>{
        return ind!==id
    });
    setTaskList(updatedTaskList)
}

const onInProgressDelete=(id)=>{
    const updatedTaskList = InProgress.filter((elem,ind)=>{
        return ind!==id
    });
    setInProgress(updatedTaskList)
}
const onDragOver = (e)=>{
    e.preventDefault()
}
const onDragStart = (id)=>{
    getInProgressOj(id)
    console.log(id)
}

useEffect(()=>{
    localStorage.setItem('TodoList',JSON.stringify(TaskList))
    localStorage.setItem('InProgressList',JSON.stringify(InProgress))
    localStorage.setItem('CompletedList',JSON.stringify(Completed))
},[TaskList,Completed,InProgress])


    return (
        <>
            <div>
                <h1 id="header">My Todo App</h1>
                <hr></hr>
            </div>
            <div style={{marginLeft:'600px',marginRight:'600px'}}>
                <form>
                    <div className="form-group"style={{margin:'20px'}}>
                        
                        <input  className="form-control" id="Task" placeholder="Add task here..." value={Task} onChange={(e)=>{setTask(e.target.value)}}/>
                    </div>
                    <div className="form-group"style={{margin:'20px'}}>
                        
                        <input  className="form-control" id="desc" placeholder="Add Description here..." value={Description} onChange={(e)=>{SetDescription(e.target.value)}}/>
                    </div>

                    <div style={{margin:'20px'}} >
                    <button type="button" className="btn btn-default" style={{background:"#F94F5E",width:100,color:'white'}} onClick={addData}>Add</button>

                        </div>
                   

                </form>
            </div>
            <div className='row' style={{margin:'10px'}}>
                <div className='col-lg-3 col-md-3' style={{padding:48,background:"#F94F5E",margin:'30px'}}>
                    <h1>Todo</h1>
                    
                        {TaskList.map((item,index)=>{
                            return(
                                <div style={{background:'wheat',margin:8,borderRadius:5}} key={index} draggable={true} onDragStart={(e)=>{onDragStart(index)}}>
                            <div style={{padding:4}}>
                                Task:{" "}<span style={{fontFamily:'Circular TT',fontSize:25}}>{item.Task}</span>
                                <button style={{float:'right',borderRadius:50,fontSize:12}} onClick={()=>{onDelete(index)}}>X</button>
                            </div>
                            <div style={{padding:4}}>
                                Description:{" "}<span style={{fontFamily:'Circular TT',fontSize:22}}>{item.Description}</span>
                                <button style={{float:'right',borderRadius:50,fontSize:12}} onClick={()=>{getInProgressOj(index)}}>-{'>'}</button>

                            </div>

                            <div style={{padding:4}}>
                                setAt: {" "}<span style={{float:'right'}}>{item.Date.toString()}</span>
                            </div>
                            </div>
                            )
                        })}
                    

                </div>
                <div className='col-lg-3 col-md-3'style={{padding:48,background:"#B7B7BB",margin:'30px'}} >
                    <h1>InProgress</h1>
                    {InProgress.map((item,index)=>{
                            return(
                                <div style={{background:'wheat',margin:8,borderRadius:5}} key={index}onDragOver={(e)=>{onDragOver()}}>
                            <div style={{padding:4}}>
                                Task:{" "}<span style={{fontFamily:'Circular TT',fontSize:25}}>{item.Task}</span>
                                <button style={{float:'right',borderRadius:50,fontSize:12}} onClick={()=>{getCompletedOj(index,false)}}>X</button>
                            </div>
                            <div style={{padding:4}}>
                                Description:{" "}<span style={{fontFamily:'Circular TT',fontSize:22}}>{item.Description}</span>
                                <button style={{float:'right',borderRadius:50,fontSize:12}} onClick={()=>{getCompletedOj(index,true)}}>-{'>'}</button>

                            </div>

                            <div style={{padding:4}}>
                                setAt: {" "}<span style={{float:'right'}}>{item.updatedDate.toString()}</span>
                            </div>
                            </div>
                            )
                        })}
                </div>
                <div className='col-lg-3 col-md-3'style={{padding:48,margin:'30px',background:"#e9ebe8"}}>
                    <h1>Completed</h1>
                    {Completed.map((item,index)=>{
                            return(
                                <div style={{background:'wheat',margin:8,borderRadius:5}} key={index}>
                            <div style={{padding:4}}>
                                Task:{" "}<span style={{fontFamily:'Circular TT',fontSize:25}}>{item.Task}</span>
                            </div>
                            <div style={{padding:4}}>
                                Description:{" "}<span style={{fontFamily:'Circular TT',fontSize:22}}>{item.Description}</span>
                            </div>

                            <div style={{padding:4}}>
                                Completed At: {" "}<span style={{float:'right'}}>{item.Date.toString()}</span>
                            </div>
                            </div>
                            )
                        })}
                </div>

            </div>

        </>
    )
}

export default Todo
