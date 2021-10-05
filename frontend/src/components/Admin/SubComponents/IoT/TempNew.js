import React from "react";
import Papa from "papaparse";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Dialog, InputLabel } from "@material-ui/core";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {url} from "../../../config"

class FileReader extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
      data: [],
      open : false,
    };

    this.state = {
      centers: [],
      columns: [
         {
          dataField: "Id",
          text: "Place ID",
          sort: true,
          headerStyle: {
            backgroundColor: "rgb(96, 79, 255)",
          },
        },
        {
          dataField: "Date",
          text: "Date",
          headerStyle: {
            backgroundColor: "rgb(96, 79, 255)",
            justifyContent: "center",
          },
        },
        {
          dataField: "Temprature",
          text: "Temperature",
          headerStyle: {
            backgroundColor: "rgb(96, 79, 255)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          },
        },
        {
          dataField: "Status",
          text: "Status",
          headerStyle: {
            backgroundColor: "rgb(96, 79, 255)",
            justifyContent: "center",
          },
        },
      ],
    };

    this.updateData = this.updateData.bind(this);
  }

  handleCloseSuccess = () => {
    this.setState({
            open:false,
          })
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

  saveData = () => {
    // for (let i = 0; i < this.state.data.length; i++) {
    let formdata = new FormData();
    formdata.append("data", JSON.stringify(this.state.data));
    console.log("Save data");
    axios
      .post(`${url.BASE_URL}/addTemperatureReport`, this.state.data)
      .then((res) => {
        console.log(res.data);
        if(res.data == "Success"){
          this.setState({
            open:true,
          })
        }
        console.log("Successs temp");
      })
      .catch((err) => {
        console.log(err);
      });
    // }
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
        <div className="heading">
          <h3>Upload Temperature Reports</h3>
        </div>
        <div>
          <h5 style={{ marginTop: "30px", marginLeft: "30px" }}>
            Choose and upload your files here
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
            <Button
              variant="contained"
              color="primary"
              component="span"
              // startIcon={<CloudUploadIcon />}
              onClick={this.saveData}
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

        <Dialog
        open={this.state.open}
        onClose={this.handleCloseSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Successful!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Report Uploaded Successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseSuccess} color="primary" autoFocus>
            {" "}
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

export default FileReader;
