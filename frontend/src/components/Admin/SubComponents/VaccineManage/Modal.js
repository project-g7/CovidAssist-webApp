import React, { Component } from "react";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      vaccine_id:0,
      vaccine_name: "",
      dose_1_quantity: 0,
      dose_2_quantity: 0,
      dose_3_quantity: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      vaccine_id:nextProps.vaccine_id,
      vaccine_name: nextProps.vaccine_name,
      dose_1_quantity: nextProps.dose_1_quantity,
      dose_2_quantity: nextProps.dose_2_quantity,
      dose_3_quantity: nextProps.dose_3_quantity,
    });
  }

  titleHandler(e) {
    this.setState({ vaccine_name: e.target.value });
  }

  dose1Handler(e) {
    this.setState({ dose_1_quantity: e.target.value });
  }
  dose2Handler(e) {
    this.setState({ dose_2_quantity: e.target.value });
  }
  dose3Handler(e) {
    this.setState({ dose_3_quantity: e.target.value });
  }

  handleSave() {
    const item = this.state;
    this.props.saveModalDetails(item);
  }

  render() {
    return (
      <div
        className="modal"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Details
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <span className="modal-lable">Title:</span>
                <input
                  value={this.state.vaccine_name}
                  onChange={(e) => this.titleHandler(e)}
                />
              </p>
              <p>
                <span className="modal-lable">Dose 1</span>
                <input
                  value={this.state.dose_1_quantity}
                  onChange={(e) => this.dose1Handler(e)}
                />
              </p>
              <p>
                <span className="modal-lable">Dose 2</span>
                <input
                  value={this.state.dose_2_quantity}
                  onChange={(e) => this.dose2Handler(e)}
                />
              </p>
              <p>
                <span className="modal-lable">Dose 3</span>
                <input
                  value={this.state.dose_3_quantity}
                  onChange={(e) => this.dose3Handler(e)}
                />
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  this.handleSave();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
