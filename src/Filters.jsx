
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
        console.log(name + " is " + checked);
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
        console.log(name + " is " + checked);
    }
    const resetAll = ()=>{
        setFilters({status: {done: true, notdone: true}, dates:{upcoming: true, overdue: true}})
    }

    return (
        <div className="filters" style={{backgroundColor: theme.popup, color: theme.text}}>
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