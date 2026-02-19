import { useMemo, useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import LoginPage from "./components/LoginPage";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export interface Task{
  id: string;
  title: string;
  completed: boolean;
  deadline: Date;
}

type Page= "dashboard" | "tasks";
function App() {

  const [tasks, setTasks]=useState<Task[]>([]);
  const [currentPage, setCurrentPage]= useState<Page>("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Student");

  const addTask = (title: string, deadline: Date) =>{
    const newTask: Task={
      id: crypto.randomUUID(),
      title,
      completed: false,
      deadline,
    };

    setTasks((prev) => [...prev, newTask]);
  };
    const deleteTask = (id: string) =>{
      setTasks((prev) => prev.filter((task) => task.id !== id));
    };
    const toggleTask = (id: string)=>{
      setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    };

    const {completedCount, todayTasks, upcoming}= useMemo(()=>{
      const today= new Date();
      today.setHours(0, 0, 0, 0);
      const completedCount=tasks.filter((t)=> t.completed).length;

      const todayTasks= tasks.filter((t)=>{
        const d= new Date(t.deadline);
        d.setHours(0,0,0,0);
        return d.getTime()=== today.getTime();
      });

      const upcoming= tasks.filter((t)=>{
        const d = new Date(t.deadline);
        d.setHours(0,0,0,0);
        return d.getTime()> today.getTime() && !t.completed;
      }).sort((a, b) =>
      a.deadline.getTime() - b.deadline.getTime())
      .slice(0, 4);

      return {completedCount, todayTasks, upcoming};
    }, [tasks]);

    const totalTasks=tasks.length;

    const handleLogin = (name: string) => {
      setUserName(name || "Student");
      setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
    }


  return(
    /**Bootstrap Container*/
    <div className='app-root'>
      <div className='bg-blur-layer' />
      <div className='container-xl py-4'>
        <div className='app-shell shadow-lg rounded-4 overflow-hidden'>
          {/*Side Bar*/}
          <aside className='app-sidebar d-flex flex-column justify-content-between'>
            <div>
              <div className='d-flex align-items-center gap-2 mb-4'>
                <div className='logo-circle d-flex align-items-center justify-content-center'>
                  <span className='fs-5'>🎓</span>
                </div>
                <div>
                  <div className='fw-semibold'>Student Task</div>
                  <div className='text-muted small'>Manager</div>
                </div>
              </div>
              <div className='list-group'>
                <button className={
                  "list-group-item list-group-item-action border-0 rounded-3 mb-2"
                   + (currentPage === "dashboard"?"active": "")
                } onClick={()=> setCurrentPage('dashboard')}
                >Dashboard
                </button>
                <button 
                className={
                  'list-group-item list-group-item-action border-0 rounded-3'
                  + (currentPage==="tasks"?"active":"")}
                  onClick={()=> setCurrentPage("tasks")}
                >Tasks</button>
              </div>
            </div>
            <button className='btn btn-link text-muted px-0'>
              Logout
            </button>
          </aside>

          <main className='app-main p-4'>
            {currentPage==="dashboard" ? (
              <> 
              <header className='mb-4'>
                <h2 className='fw-semibold mb-1'> Welcome, {userName}</h2>
                <p className='text-muted mb-0'>
                  Coming up today!
                </p>
              </header>

              <div className='row g-3'>
                 {/* Today's tasks card */}
                 <div className='col-md-7'>
                  <div className='card border-0 shadow-sm h-100'>
                    <div className='card-body'>
                      <div className='d-flex justify-content-between align-items-center mb-2'>
                        <h5 className='card-title mb-0'> Today&apos;s Tasks</h5>
                        <span className='badge bg-light text-muted'>
                          {todayTasks.length} task
                          {todayTasks.length === 1? "": "s"}
                        </span>
                      </div>
                      {todayTasks.length === 0? (
                        <p className='text-muted small mb-0'>
                          No tasks scheduled. Enjoy the break!
                        </p>
                      ): (
                        <ul className='list-unstyled mb-0'>
                          {todayTasks.map((t)=>(
                            <li key={t.id}
                            className='d-flex justify-content-between align-items-center py-2 border-bottom small'>
                              <span>{t.title}</span>
                              <span className='badge rounded-pill bg-info-subtle text-info-emphasis'>
                                Today
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                 </div>
              </div>
              {/*Upcoming Deadlines*/}
              <div className='col-md-5'>
                <div className='card border-0 shadow-sm mb-3'>
                  <div className='card-body'>
                    <h5 className='card-title mb-3'>
                      Upcoming Deadlines
                    </h5>
                    {upcoming.length === 0 ?(
                      <p className='text-muted small mb-0'>
                        No upcoming deadlines!
                      </p>
                    ): (
                      <ul className='list-unstyled mb-0 small'>
                        {upcoming.map((t)=>(
                          <li key={t.id} 
                          className='d-flex justify-content-between align-items-center py-1'>
                            <span>{t.title}</span>
                            <span className='text-muted'>
                              {new Date(t.deadline).toLocaleDateString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {/*Progress Bar*/}
                <div className='card border-0 shadow-sm'>
                  <div className='card-body'>
                    <h5 className='card-title mb-3'>
                      Progress</h5>
                    <div className='progress mb-2'
                    style={{height: 14}}>
                      <div className='progress-bar bg-success'
                        role="progressbar"
                        style={{
                          width: totalTasks===0? "0%" : `${(completedCount/totalTasks)*100}%`,
                        }} />
                    </div>
                    <small className='text-muted'>
                      {completedCount} of {totalTasks} tasks completed
                    </small>
                  </div>
                </div>
              </div>
            </>
            ): ( <>
            <header className='mb-3 d-flex justify-content-between align-items-center'>
              <h2 className='fw-semibold mb-0'>My Tasks</h2>
            </header>
             {/* Add Task form at top */}
            <div className='mb-4'>
              <AddTask onAddTask={addTask}/>
            </div>
             {/* Tasks list */}
            <TaskList
            tasks={tasks}
            onDeleteTask={deleteTask}
            onToggleTask={toggleTask} 
            />
            </>
          )}
          </main>
        </div>
      </div>
    </div>
  );
}
export default App;