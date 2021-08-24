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

function VerifiedAdministrators(){

    
    return(
        <div>
            <div className="searchBar">
                <input type="text"  className = "searchBar" placeholder="Search User"  value=''></input>
                <button>Search</button>
            </div>
        </div>
    )
}
export default  VerifiedAdministrators