import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import {url} from "../../../config"

export class IotLocations extends Component{
  
  state = {
    iotCenters: [],
    columns : [
        {
            dataField : "place_id",
            text : "ID",
            headerStyle:{
                backgroundColor: "rgb(96, 79, 255)",
                justifyContent:"center"
            },
        },
        {
            dataField : "place",
            text : "Name",
            filter: textFilter(),
            headerStyle: {
                backgroundColor: "rgb(96, 79, 255)",
                justifyContent:"flex",
                justifyContent:"space-around",
                alignItems: "center",
            }
        },
        {
            dataField: "district",
            text: "district",
            sort: true,
            headerStyle: {
            backgroundColor: "rgb(96, 79, 255)",
            }
        },
    ]
};

componentDidMount() {
  axios.get(`${url.BASE_URL}/iotCenters`).then((res) => {
      // console.log(res.data);
      this.setState({
          iotCenters: res.data,
      });
      console.log(res.data);
  });
}


    render(){
      const options = {
        page: 0,
        sizePerPageList: [
            {
                text: "5",
                value: 5,
            },
            {
                text: "10",
                value: 10,
            },
            {
                text: "All",
                value: this.state.iotCenters.length,
            },
        ],
        sizePerPage: 8,
        pageStartIndex: 0,
        paginationSize: 3,
        prePage: "Prev",
        nextPage: "Next",
        firstPage: "First",
        lastPage: "Last",
        paginationPosition: "top",
    };

    const tableRowEvents = {
        onClick: (e, row, rowIndex) => {
            console.log(`clicked on row with index: ${rowIndex}`);
            console.log(row);
          // console.log(e);
        },
        onMouseEnter: (e, row, rowIndex) => {
          // console.log(`enter on row with index: ${rowIndex}`);
        },
    }

    return (
      <div className="AddBody">
        <div className="heading">
          <h3>IoT Locations</h3>
        </div>
        <div className="container">
          <div className="continer" style={{marginTop:"30px"}}>
            <BootstrapTable 
              bootstrap4
              hover
              keyField="id"
              data={this.state.iotCenters}
              columns={this.state.columns}
              filter={filterFactory()}
              pagination={paginationFactory(options)}
              rowEvents={tableRowEvents}
            /> 
          </div>
        </div>
      
      </div>
    )
    }
}

export default IotLocations
