import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export class UnverifiedAdministratorTable extends Component {
    linkFormatter = (cell, row, rowIndex) => {
        console.log(cell);
        console.log(row);
        //  console.log(cell);
        return (
            <Link to={"/admin/requests/unverifiedAdministrators?id=" + row.user_id}>
                View Details
            </Link>
        );
    };

state = {
    verifiedAdministrators: [],
    columns : [
        {
            dataField : "user_id",
            text : "ID",
            headerStyle:{
                backgroundColor: "rgb(96, 79, 255)",
                justifyContent:"center"
            },
        },
        {
            dataField : "name",
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
            dataField: "user_role",
            text: "Role",
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
        }
    ]
};

componentDidMount() {
    axios.get("http://localhost:3002/unverifiedAdministrators").then((res) => {
        console.log(res.data);
        this.setState({
            verifiedAdministrators: res.data,
        });
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
                    value: this.state.verifiedAdministrators.length,
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
        return(
            <div>
                <div className="container">
                    <div className="continer" style={{marginTop:"30px"}}>
                        <BootstrapTable 
                            bootstrap4
                            hover
                            keyField="id"
                            data={this.state.verifiedAdministrators}
                            columns={this.state.columns}
                            filter={filterFactory()}
                            pagination={paginationFactory(options)}
                            rowEvents={tableRowEvents}
                        /> 
                    </div>
                </div>
            </div>
        );
    }
}
export default UnverifiedAdministratorTable