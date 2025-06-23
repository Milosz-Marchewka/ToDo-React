import "./Status.css";
function Status({ svg, msg }){
    return (
        <div className='status'>
            {svg}
            {/* capitalize first letter */}
            {String(msg).charAt(0).toUpperCase() + String(msg).slice(1)}
        </div>
    )
}

export default Status;