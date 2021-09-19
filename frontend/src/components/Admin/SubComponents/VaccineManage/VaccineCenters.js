import React,{useState, useEffect} from "react";
import Axios from "axios";
import CenterTable from './CenterTable'


const VaccineCenters = () => {
    const[centerList, setCenterList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        // loadDataOnlyOnce();
        Axios.get("http://localhost:3002/vaccineCenters").then(res => {
        console.log(res.data);
        setCenterList(res.data);
        });
    }, [])

  return (
    <div className="AddBody">
      <div className="heading">
        <h3>Vaccine Centers</h3>
      </div>
      <CenterTable/>
      {/* <div className="table_container">
        <table>
          <thead>
            <th>Center ID</th>
            <th>Center Name</th>
            <th>District</th>
          </thead>
          <tbody>
            {centerList.filter((value) => {
                if (searchTerm == "") {
                  return value;
                } else if (
                  value.name
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
                ) {
                  return value;
                } else if (
                  value.district
                    .toLocaleLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
                ) {
                  return value;
                }
              })
              .map((value, i) => {
                const key = `name${i}`;
                return (
                  <tr key={key}>
                    <td>{value.center_id}</td>
                    <td>{value.name}</td>
                    <td>{value.district}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default VaccineCenters;
