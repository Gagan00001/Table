import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useCallback } from "react";
import TableComponent from "./../../Component/Table";
import "../../Component/Table/table.scss";
import { getDetailsFetch, setLoading } from "../../redux/actions";
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
  const details = useSelector((state) => state.dataReducer.data);
  const loading = useSelector((state) => state.loadingReducer.isLoading);
  const pageCount = useSelector(
    (state) => state.pageCountReducer.currentPageCount
  );
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
        dispatch(
          getDetailsFetch({ url: "/fetch", params: { startRow, endRow } })
        );
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
