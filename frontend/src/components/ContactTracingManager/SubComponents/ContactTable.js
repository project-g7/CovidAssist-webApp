import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import FileReader from "./FileReader";
import {url} from "../../config"

// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export class ContactTable extends Component {
  linkFormatter = (cell, row, rowIndex) => {
    console.log(cell);
    console.log(row);
    //  console.log(cell);
    return (
      <Link to={"/contactTracing/mobileUser?id=" + row.mobile_user_id+"&ve=0"}>
        View Users
      </Link>
    );
  };
  state = {
    users: [],
    columns: [
      {
        dataField: "nic",
        text: "NIC",
        filter: textFilter(),
        headerStyle: {
          backgroundColor: "rgb(96, 79, 255)",
          justifyContent:"space-around",
          display:"flex",
          alignItems: "center",
          // width: "300px",
          margin: "0px",
          padding: "0px"
        },
      },
      {
        dataField: "first_name",
        text: "Name",
        
        headerStyle: {
          backgroundColor: "rgb(96, 79, 255)",
          justifyContent:"center"
         
        }
      },
      {
        dataField: "address",
        text: "Address",
        sort: true,
        headerStyle: {
          backgroundColor: "rgb(96, 79, 255)",
        }
      },
      {
        dataField: "link",
        text: "View",
        formatter: this.linkFormatter,
        headerStyle: {
          backgroundColor: "rgb(96, 79, 255)",
        }
      },
    ],
  };

  componentDidMount() {
    axios.get(`${url.BASE_URL}/mobileUsers`).then((res) => {
      console.log(res.data);
      this.setState({
        users: res.data,
      });
    });
  }

  render() {
    // const linkFormatter = (cell, row, rowIndex) => {
    //   return (
    //     <a href={cell} target="_blank">
    //       See mail
    //     </a>
    //   );
    // };
    // const selectRow = () => {
    //   console.log("row selected");
    // };

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
          value: this.state.users.length,
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
    };

    // var rowOptions = {
    //   onRowClick: {selectRow}
    // };
    return (
      <div>
        <div className="container" >
          <div className="container" >
          <div className="tabletitle">
              <h4 className="titlename">All Mobile Users</h4>
            </div>
            <BootstrapTable
              bootstrap4
              hover
              keyField="id"
              data={this.state.users}
              columns={this.state.columns}
              filter={filterFactory()}
              pagination={paginationFactory(options)}
              //   rowStyle={{ backgroundColor: "blue" }}
              rowEvents={tableRowEvents}
            />
          </div>
        </div>
      </div>
    //   <div></div>
    );
  }
}

export default ContactTable;
