import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import filterFactory, {
  textFilter,
  dateFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "../../../../styles/vaccinated.css";

// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export class VaccinatedList extends Component {
  linkFormatter = (cell, row, rowIndex) => {
    console.log(cell);
    console.log(row);
    //  console.log(cell);
    return (
      <Link to={"/vaccine/RegisterDetails?id=" + row.booking_id}>
        View Details
      </Link>
    );
  };
  state = {
    centers: [],
    name: [],
    columns: [
      {
        dataField: "nic",
        text: "NIC",
        headerStyle: {
          backgroundColor: "rgb(96, 79, 255)",
          justifyContent: "center",
        },
      },
      {
        dataField: "fullname",
        text: "Name",
        filter: textFilter(),
        headerStyle: {
          backgroundColor: "rgb(96, 79, 255)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        },
      },
      {
        dataField: "address",
        text: "Address",
        sort: true,
        headerStyle: {
          backgroundColor: "rgb(96, 79, 255)",
        },
      },
      {
        dataField: "vaccine_name",
        text: "Vaccine",
        headerStyle: {
          backgroundColor: "rgb(96, 79, 255)",
        },
      },
      {
        dataField: "link",
        text: "View",
        formatter: this.linkFormatter,
        headerStyle: {
          backgroundColor: "rgb(96, 79, 255)",
        },
      },
    ],
  };

  componentDidMount() {
    let data = sessionStorage.getItem("sessionStorageData");
    data = JSON.parse(data);
    console.log(data.user_name);

    axios
      .get("http://localhost:3002/vaccinatedList", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          centers: res.data,
        });
      });
    axios
      .get("http://localhost:3002/getvaccinecenter", {
        params: { id: data.user_id },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          name: res.data[0].name,
        });
      });
  }

  render() {
    const linkFormatter = (cell, row, rowIndex) => {
      return (
        <a href={cell} target="_blank">
          See mail
        </a>
      );
    };
    const selectRow = () => {
      console.log("row selected");
    };
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
          value: this.state.centers.length,
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
        console.log("nshhshhs");
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
      <div className="AddBody-req">
        <div className="heading">
          <h3>Vaccinated List</h3>
        </div>
        <div className="container">
          <div className="container" style={{ marginTop: "10px" }}>
            <div className="tabletitle">
              <h4 className="titlename">Center Name : {this.state.name}</h4>
            </div>
            <BootstrapTable
              bootstrap4
              hover
              // caption={this.state.name}
              keyField="id"
              data={this.state.centers}
              columns={this.state.columns}
              filter={filterFactory()}
              pagination={paginationFactory(options)}
              //   rowStyle={{ backgroundColor: "blue" }}
              rowEvents={tableRowEvents}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default VaccinatedList;
