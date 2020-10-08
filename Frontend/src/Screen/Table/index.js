import React, { useRef } from "react";
import styled from "styled-components";
import { useState, useMemo, useCallback } from "react";
import TableComponent from "./../../Component/Table";
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

const Table = () => {
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  // const Response = (startRow, endRow) => {
  //   axios
  //     .get("http://localhost:8081/fetch", {})
  //     .then((res) => {
  //       setData(res.data.slice(startRow, endRow));
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //     });
  // };

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        console.log(">>>>>>>>>", { pageSize });
        console.log(pageIndex);
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        console.log(startRow);
        console.log(endRow);
        axios
          .get("http://localhost:8081/fetch", { params: { startRow, endRow } })
          .then((res) => {
            // console.log(">>>>", res.data);
            setData(res.data.result);
            // console.log(res.data.slice(startRow, endRow));
            setPageCount(Math.ceil(res.data.count / pageSize));
          })
          .catch((err) => {
            console.log("error", err);
          });

        // setPageCount(Math.ceil())
        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <>
      <Styles>
        <TableComponent
          columns={columns}
          data={data}
          fetchData={fetchData}
          loading={loading}
          pageCount={pageCount}
        />
      </Styles>
    </>
  );
};

export default Table;
