import React from "react";
import Select from "react-select";
import "../../../../styles/VaccineBooking.css";

const options1 = [
  { value: "colombo", label: "Colombo" },
  { value: "galle", label: "Galle" },
  { value: "matara", label: "Matara " },
];
const options2 = [
  { value: "colombo", label: "Colombo" },
  { value: "galle", label: "Galle" },
  { value: "matara", label: "Matara " },
];

class VaccineBookingSearchBar extends React.Component {
  state = {
    selectedOption1: null,
    selectedOption2: null,
  };
  handleChange1 = (selectedOption1) => {
    this.setState({ selectedOption1 });
    console.log(`Option selected:`, selectedOption1);
  };
  handleChange2 = (selectedOption2) => {
    this.setState({ selectedOption2 });
    console.log(`Option selected:`, selectedOption2);
  };
  render() {
    const { selectedOption1 } = this.state;
    const { selectedOption2 } = this.state;
    return (
      <div>
        <div className="DistrictSearchbar">
          <Select
            value={selectedOption1}
            onChange={this.handleChange1}
            options={options1}
          />
        </div>
        <div className="CenterSearchbar">
          <Select
            value={selectedOption2}
            onChange={this.handleChange2}
            options={options2}
          />
        </div>
      </div>
    );
  }
}
export default VaccineBookingSearchBar;
