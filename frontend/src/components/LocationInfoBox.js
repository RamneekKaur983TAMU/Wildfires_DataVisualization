const LocationInfoBox =({info})=>{
    return (
        <div className="location-info">
            <h2> Event Location Info</h2>
            <ul>
            <li>Id: <strong> {info.id}</strong></li>
            <l1> Title: <strong>{info.title}</strong></l1>
            <l1>Date: <strong>{info.date}</strong> </l1>
            </ul>
        </div>
    )
}

export default LocationInfoBox