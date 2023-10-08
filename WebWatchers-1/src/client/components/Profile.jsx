import { useState, useEffect } from "react"
import { fetchMyData } from "../API/ajaxHelper"

export default function Profile({loggedIn, user}) {
    const [datas, setDatas] = useState([]);

    function renderMyData() {
        return datas.map((data) => {
          return (
            <div key={data.id}>
                <h1>{data.username}</h1>
            </div>
        )  
        })
        
    }

    useEffect(() => {
        async function myDataHandler() {
            const result = await fetchMyData();
            setDatas(result.data.data);
        } myDataHandler();
    }, [])

    return (
        <div>
            {renderMyData()}
        </div>
    )
}