import React from "react";
import styled from "styled-components";
import { useState, useMemo, useEffect } from "react";
import Table from "./../../Component/Table"
import axios from "axios";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
const Screen = () => {
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: "Details",
        columns: [
          {
            Header: "Name",
            accessor: "Name",
          },
          {
            Header: "Email",
            accessor: "Email",
          },
          {
            Header: "ZipCode",
            accessor: "Zipcode",
          },
          {
            Header: "Age",
            accessor: "Age",
          },
        ],
      },
      {
        Header: "ContactInfo",
        columns: [
          {
            Header: "MobileNum",
            accessor: "contactInfo.Mob",
          },
          {
            Header: "Address",
            accessor: "contactInfo.Address",
          },
        ],
      },
    ],
    []
  );
  const Response = (e) => {
    axios
      .get("http://localhost:8081/fetch", {})
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    Response();
  }, []);

  console.log(">>>", data);

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
};

export default Screen;
