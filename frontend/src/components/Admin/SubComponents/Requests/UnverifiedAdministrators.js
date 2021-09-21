import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import "../../../../styles/verifiedAdministrators.css";
import Axios from "axios";
import  { useEffect, useState } from "react";
import UnverifiedAdministratorTable from "./UnverifiedAdministratorTable"


function UnverifiedAdministrators(){
    const[employeeList, getEmployeeList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // useEffect(() => {
    //     // loadDataOnlyOnce();
    //     Axios.get("http://localhost:3002/unverifiedAdministrators").then(res => {
    //     // console.log(res.data);
    //     getEmployeeList(res.data);
    //     });
    // }, [])
    return(
        <div className="AddBody-req">
            <div>
                <div className="heading">
                    <h3>Unverified Users</h3>
                </div>
            </div>
            <UnverifiedAdministratorTable />
        </div>
        // <div>
        //     <div className="searchBar">
        //         <input 
        //             type="text"  
        //             className = "searchBar" 
        //             placeholder="Search User" 
        //             onChange={(event)=>{
        //                 setSearchTerm(event.target.value);
        //         }}>
        //         </input>
        //     </div>
        //     <div className="table_container">
        //         <table>
        //             <thead>
        //                 <th>User ID</th>
        //                 <th>User Name</th>
        //                 <th>User Role</th>
        //             </thead>
        //             <tbody>
        //                 {employeeList.filter(value=>{
        //                     if(searchTerm==""){
        //                         return value;
        //                     }else if(value.user_name.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
        //                         return value;
        //                     }else if(value.user_role.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
        //                         return value;
        //                     }
        //                 }).map((value,i)=>{
        //                     const key = `employee${i}`;
        //                     return( 
        //                         <tr key={key}>
        //                             <td>{value.user_id}</td>
        //                             <td>{value.user_name }</td>
        //                             <td>{value.user_role}</td>
        //                         </tr>
        //                         );
        //                     })}
        //                 </tbody>
        //         </table>
        //     </div>
                
            
        // </div>
    )
}
export default  UnverifiedAdministrators