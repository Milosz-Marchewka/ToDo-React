
import "./Filters.css"; 

function Filters({theme, filters, setFilters}){

    const handleStatus = (e)=>{
        const {name, checked} = e.target;
        setFilters(prev => ({
            ...prev,
            status: {
                ...prev.status,
                [name]: checked
            }
        }));
    }
    const handleDates = (e)=>{
        const {name, checked} = e.target;
        setFilters(prev=>({
            ...prev,
            dates:{
                ...prev.dates,
                [name]: checked
            }
        }));
    }

    const handleTask = (e)=>{
        setFilters(prev=>({
            ...prev,
            task: e.target.value
        }))
    }

    const handlePriority = (e)=>{
        const {name, checked} = e.target;
        setFilters(prev=>({
            ...prev,
            priority:{
                ...prev.priority,
                [name]: checked
            }
        }))
    }

    const resetAll = ()=>{
        setFilters({task:"", priority:{high: true, medium: true, low:true}, status: {done: true, notdone: true}, dates:{upcoming: true, overdue: true}})
    }

    return (
        <div className="filters" style={{backgroundColor: theme.popup, color: theme.text}}>
            <label className="group-label">Task</label>
            <input type="text" value={filters.task} name="task" onChange={handleTask} placeholder="Search"/>
            <label className="group-label">Priority</label>
            <label><input type="checkbox" checked={filters.priority.high} name="high" onChange={handlePriority}/>High</label>
            <label><input type="checkbox" checked={filters.priority.medium} name="medium" onChange={handlePriority}/>Medium</label>
            <label><input type="checkbox" checked={filters.priority.low} name="low" onChange={handlePriority}/>Low</label>
            <label className="group-label">Status</label>
            <label><input type="checkbox" checked={filters.status.done} name="done" onChange={handleStatus}/> Done</label>
            <label><input type="checkbox" checked={filters.status.notdone} name="notdone" onChange={handleStatus}/> Not done</label>
            <label className="group-label">Dates</label>
            <label><input type="checkbox" checked={filters.dates.upcoming} name="upcoming" onChange={handleDates} /> Upcoming</label>
            <label><input type="checkbox" checked={filters.dates.overdue} name="overdue" onChange={handleDates} /> Overdue</label>
            <button style={{backgroundColor: theme.buttons.reset, color: theme.text}}className="reset-filters" onClick={resetAll}>Reset</button>
        </div>
    )
}

export default Filters;