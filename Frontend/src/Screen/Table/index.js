import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useCallback } from "react";
import TableComponent from "./../../Component/Table";
import axios from "axios";
import "../../Component/Table/table.scss";
import { getDetails, setLoading, setPageCount } from "../../redux/actions";
import { compose } from "redux";
const Table = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Email",
        accessor: "Email",
      },
      {
        Header: "PinCode",
        accessor: "Zipcode",
      },
      {
        Header: "Age",
        accessor: "Age",
      },
      {
        Header: "Contact Number",
        accessor: "contactInfo.Mob",
      },
      {
        Header: "Address",
        accessor: "contactInfo.Address",
      },
    ],
    []
  );
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const fetchIdRef = useRef(0);
  const details = useSelector((state) => state.detailsReducer.details);
  const loading = useSelector((state) => state.loadingReducer.state);
  const pageCount = useSelector((state) => state.pageCountReducer.state);
  useMemo(() => {
    if (details && details.length) {
      setData(details);
    }
  }, [details]);

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    dispatch(setLoading(true));
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        // console.log(">>>>>>>>>", { pageSize });
        // console.log(pageIndex);
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        // console.log(startRow);
        // console.log(endRow);
        axios
          .get("http://localhost:8081/fetch", { params: { startRow, endRow } })
          .then((res) => {
            dispatch(getDetails(res.data.result));
            dispatch(setPageCount(Math.ceil(res.data.count / pageSize)));
          })
          .catch((err) => {
            console.log("error", err);
          });

        dispatch(setLoading(false));
      }
    }, 1000);
  }, []);

  return (
    <>
      <TableComponent
        classname="header"
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </>
  );
};

export default Table;
