import React, { Component } from "react";
//import Select from "react-select";
import "../../../../styles/VaccineBooking.css";
import InputLabel from "@material-ui/core/InputLabel";
import Picker from "react-picker";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

// const options1 = [
//   { value: "colombo", label: "Colombo" },
//   { value: "galle", label: "Galle" },
//   { value: "matara", label: "Matara " },
// ];
// const options2 = [
//   { value: "colombo", label: "Colombo" },
//   { value: "galle", label: "Galle" },
//   { value: "matara", label: "Matara " },
// ];

class VaccineBookingSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      district: "",
      vaccine_center: "",
      name: "",
    };
  }

  componentDidMount() {
    this.apicall();
  }
  async apicall() {
    const response = await fetch(
      `http://localhost:3002/districtAndVaccinecenter`,
      { method: "GET" }
    );
    const users = await response.json();
    this.setState({ data: users });
  }

  // state = {
  //   selectedOption1: null,
  //   selectedOption2: null,
  // };

  // handleChange1 = (selectedOption1) => {
  //   this.setState({ selectedOption1 });
  //   console.log(`Option selected:`, selectedOption1);
  // };
  // handleChange2 = (selectedOption2) => {
  //   this.setState({ selectedOption2 });
  //   console.log(`Option selected:`, selectedOption2);
  // };
  handleChange1 = (event) => {
    this.setState({ district: event.target.value });
    this.props.updateDistrict({ district: event.target.value });
    console.log(`Option selected:`, this.state.district);
  };
  handleChange2 = (event) => {
    this.setState({ name: event.target.value });
    this.props.updateVaccineCenter({ name: event.target.value });
    console.log(`Option selected:`, this.state.name);
  };
  render() {
    // const { selectedOption1 } = this.state;
    // const { selectedOption2 } = this.state;
    const data = this.state.data;
    const district = this.state.district;

    const filterDropdown = data.filter(function (result) {
      return result.district === district;
    });
    console.log(filterDropdown);

    return (
      <div>
        <div className="DistrictSearchbar">
          {/* <Select
            value={selectedOption1}
            onChange={this.handleChange1}
            options={options1}
            labelId="demo-simple-select-label"
          /> */}
          <div>
            <FormControl>
              <InputLabel id="demo-simple-select-label">District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ minWidth: 450, maxWidth: 450 }}
                value={this.district}
                onChange={
                  this.handleChange1
                  // this.setState({ district: text });
                  // this.props.updateDistrict({ district: text });
                }
              >
                {this.state.data.map((district, index) => {
                  return (
                    <MenuItem value={district.district}>
                      {district.district}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="CenterSearchbar">
          <div>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Vaccine Center
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ minWidth: 450, maxWidth: 450 }}
                value={district.name}
                onChange={this.handleChange2}
              >
                {filterDropdown.map((district, index) => {
                  return (
                    <MenuItem value={district.name}>{district.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          {/* <InputLabel id="demo-simple-select-label">Vaccine Center</InputLabel> */}

          {/* <Select
            value={selectedOption2}
            onChange={this.handleChange2}
            options={options2}
            labelId="demo-simple-select-label"
            label="Vaccine Center"
          /> */}
        </div>
      </div>
    );
  }
}
export default VaccineBookingSearchBar;
