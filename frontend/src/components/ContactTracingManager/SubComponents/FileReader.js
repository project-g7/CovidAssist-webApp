import React from "react";
import Papa from "papaparse";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ContactTable from './ContactTable';
class FileReader extends React.Component {
  constructor() {
    super();
    this.state = {
      flag:false,
      csvfile: undefined,
      users: [],
      data: [],
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
      ],
    };

    this.updateData = this.updateData.bind(this);
  }

  handleChange = (event) => {

    this.setState({
      csvfile: event.target.files[0],
    });
  };
flagZero = ()=>{
  console.log(this.state.users);
  this.setState({
    flag:false,
  });
}
  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true,
    });
  };
  confirm=()=>{
    const data1 = [];
    {this.state.users.map(item => {
      data1.push(item.tracing_key)
    })}
    axios
    .post("http://localhost:3002/confirm", data1)
    .then((res) => {
      console.log(res.data);
      console.log("Successs fetch");
    })
    this.setState({
      flag:false,
    });

  }
  updateData(result) {
    const data1 = [];
    {result.data.map(item => {
      data1.push(item.nic)
    })}
    axios
      .post("http://localhost:3002/fetchusers", data1)
      .then((res) => {
        console.log(res.data);
        console.log("Successs fetch");
        this.setState({
          users: res.data,
          flag: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.csvfile);
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
          value: 20,
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
    return (
      <div style={{ paddingTop: "120px",paddingLeft: "350px" }}>

      <div className="AddBodyTemp" >
        <div className="heading">
          <h3>Upload Covid Patient Reports</h3>
        </div>
        <div>
          <h5 className="subhead">
            Choose and upload yous files here
          </h5>
          <div className="input-file">
            <input
              className="csv-input"
              type="file"
              ref={(input) => {
                this.filesInput = input;
              }}
              name="file"
              placeholder={null}
              onChange={this.handleChange}
            />

            {/* <button onClick={this.importCSV}> Upload now!</button> */}
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUploadIcon />}
              onClick={this.importCSV}
            >
              Upload File
            </Button>
          </div>
        </div>
        <div className="container" style={{ marginTop: "30px" }}>
    
            {this.state.flag &&(<div>
            <BootstrapTable
              bootstrap4
              hover
              keyField="id"
              data={this.state.users}
              columns={this.state.columns}
              filter={filterFactory()}
              pagination={paginationFactory(options)}
              //   rowStyle={{ backgroundColor: "blue" }}
              //   rowEvents={tableRowEvents}
            />
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={this.confirm}
            >
              Confirm as covid patients
            </Button>
            <Button
              style={{ marginLeft: "30px" }}
              variant="contained"
              color="primary"
              component="span"
               onClick={this.flagZero}
            >
              Back
            </Button>
            </div>)}
          {!this.state.flag &&(<ContactTable/>)}
            
          
        </div>
      
      </div>
      
      </div>

    );
  }
}

export default FileReader;