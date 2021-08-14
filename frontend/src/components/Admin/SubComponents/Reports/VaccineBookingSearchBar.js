import React from "react";
import Select from "react-select";
import "../../../../styles/VaccineBooking.css";

const options = [
  { value: "colombo", label: "Colombo" },
  { value: "galle", label: "Galle" },
  { value: "matara", label: "Matara " },
];

class VaccineBookingSearchBar extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
export default VaccineBookingSearchBar;
