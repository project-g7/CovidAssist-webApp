import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ReactFileReader from "react-file-reader";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const TemperatureReport = () => {
  const classes = useStyles();

const handleFiles = (e) => {
  console.log(e.target.files);
  let files = e.target.files;
  let reader = new FileReader();
  reader.readAsBinaryString(files[0]);
  reader.onload=(e)=>{
      console.log(e.target.result[0]);
  }
};

  return (
    <div>
      <div className="AddBody">
        <div className="heding">
          <h3>Upload Temperature Reports</h3>
        </div>
        <div>
          <div className={classes.root}>
            <input
              accept="/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange = {(e)=>{handleFiles(e)}}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload File
              </Button>
            </label>
            {/* <ReactFileReader handleFiles={handleFiles}>
              <button className="btn">Upload</button>
            </ReactFileReader> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureReport;
