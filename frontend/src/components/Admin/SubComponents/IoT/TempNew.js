import React from "react";
import Papa from "papaparse";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

class FileReader extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
      data: [],
    };

    this.state = {
      centers: [],
      columns: [
        {
          dataField: "time",
          text: "Time",
          headerStyle: {
            backgroundColor: "rgb(96, 79, 255)",
            justifyContent: "center",
          },
        },
        {
          dataField: "Temprature",
          text: "Temprature",
          headerStyle: {
            backgroundColor: "rgb(96, 79, 255)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          },
        },
        {
          dataField: "status",
          text: "Status",
          sort: true,
          headerStyle: {
            backgroundColor: "rgb(96, 79, 255)",
          },
        },
        {
          dataField: "id",
          text: "ID",
          sort: true,
          headerStyle: {
            backgroundColor: "rgb(96, 79, 255)",
          },
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

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true,
    });
  };

  updateData(result) {
    var data = result.data;
    console.log(data);
    this.setState({
      data: data,
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
      <div className="AddBodyTemp">
        <div className="heding">
          <h3>Upload Temperature Reports</h3>
        </div>
        <div>
            <h5 style={{ marginTop: "30px",marginLeft:"30px" }}>Choose and upload yous files here</h5>
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
          <Button
            variant="contained"
            color="primary"
            component="span"
            // startIcon={<CloudUploadIcon />}
            // onClick={this.importCSV}
          >
           Save Data
          </Button>
          </div>
        </div>
        <div className="container" style={{ marginTop: "30px" }}>
          {this.state.data && (
            <BootstrapTable
              bootstrap4
              hover
              keyField="id"
              data={this.state.data}
              columns={this.state.columns}
              filter={filterFactory()}
              pagination={paginationFactory(options)}
              //   rowStyle={{ backgroundColor: "blue" }}
              //   rowEvents={tableRowEvents}
            />
          )}
        </div>
      </div>
    );
  }
}

export default FileReader;
