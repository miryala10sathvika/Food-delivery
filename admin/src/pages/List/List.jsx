import React, {useEffect, useState} from 'react'
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = ({url}) => {
    const [list,setList] = useState([]);
    const fetchList = async () =>{
        const response = await axios.get(`${url}/api/food/list`);
        if(response.data.success){
            setList(response.data.data);
        }
        else{
            toast.error("Error");
        }
    }

    const removeFood = async(foodId) => {
        console.log(foodId);
        const response = await axios.post(`${url}/api/food/remove/`,{id: foodId});
        await fetchList();
        if(response.data.success){
            toast.success("Food item removed successfully");
        }
        else{
            toast.error("Failed to remove food item");
        }
    }

 

    useEffect (() => {
        fetchList();
    }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format">
            <b>Image</b>
            <b>Name</b>
            <b>Price</b>
            <b>Category</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/`+item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{item.category}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default List
