import React, { useRef, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import ReusablePopup from "./ReusablePopup";
import FormBuilder from "./FormBuilder";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { FaUserEdit, FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import { API_ENDPOINTS } from "../../redux/utils/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AiOutlineDoubleRight } from "react-icons/ai";
import {
  APPROVED,
  BF_ADMIN,
  CHANNEL_PARTNER,
  DELETE,
  GET,
  NEED_APPROVAL_BY,
  POST,
  PROFILE,
  REJECTED,
} from "./Const";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../../redux/utils/apiActions";
import BasicTablePagination from "../customComponents/TablePagination";
import { selectApiData } from "../../redux/utils/selectors";
import { useEffect } from "react";
import { FcApproval, FcRemoveImage } from "react-icons/fc";
import _ from "lodash";
import HomeCard from "../customComponents/HomeCard";
import SearchCard from "../customComponents/SearchCard";
import DetailDataCard from "../customComponents/DetailedDataCard";
import { selectApiStatus } from "./../../redux/utils/selectors";
import { useNavigate } from "react-router-dom";
import { sanitizeFormData } from "./reusableMethods";
import { USER_ROLE } from "../../ScreenJson";
import SnackBar from "../customComponents/SnackBar";

const ListingTable = ({
  headersDesktop = [],
  headersMobile = [],
  roleSpecificDesktopHeaders,
  fieldConst,
  editApi,
  deleteApi,
  getDataApi,
  approveApi,
  itemCount,
  isproperty,
  removeApi,
  filterDataUrl,
  onRefreshApiType,
  hideActions,
  showViewAllListing,
  hideAlterActions,
  refreshDataApi,
  refreshMethod,
  disableRowModal,
  showEditAction,
  showColumnFilter,
}) => {
  const finalizeRef = useRef(null);
  const [snackbar, setSnackbar] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showRowModal, setShowRowModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState({});
  const [activePage, setActivePage] = useState(0);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(10);
  const [sortType, setSortType] = useState("asc");
  const [sortColumn, setSortColumn] = useState("id");
  const [tableData, setTableData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [tableFilter, setTableFilter] = useState({});
  const apiStatus = useSelector((state) => selectApiStatus(state, getDataApi));
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as per your needs
  const tableHeaders = isMobile ? headersMobile : headersDesktop;
  const dispatch = useDispatch();
  const getApiDataFromRedux = useSelector((state) =>
    selectApiData(state, getDataApi)
  );
  const userProfile = useSelector((state) => state[PROFILE]);
  const navigateTo = useNavigate();
  let allowedTableColumns = roleSpecificDesktopHeaders
    ? roleSpecificDesktopHeaders[userProfile.role]
    : tableHeaders;

  const applyFilters = (sortingFilter = "") => {
    const filterQuery =
      Object.entries(tableFilter)
        .map(([key, value]) => `&${key}=${value}`)
        .join("") || "";
    dispatch(
      callApi({
        url: filterDataUrl + sortingFilter + filterQuery,
        method: onRefreshApiType || GET,
        headers: { "Content-Type": "application/json" },
        data: { sortType, sortColumn, activePage, itemsCountPerPage },
      })
    );
  };

  useEffect(() => {
    if (!_.isEmpty(getApiDataFromRedux)) {
      if (getApiDataFromRedux.pageNumber !== activePage)
        setActivePage(getApiDataFromRedux.pageNumber);
      if (getApiDataFromRedux.nbHits !== itemsCountPerPage) {
        setItemsCountPerPage(getApiDataFromRedux.nbHits);
      }
      if (getApiDataFromRedux.totalItems !== totalItems)
        setTotalItems(getApiDataFromRedux.totalItems);
      setTableData(getApiDataFromRedux.data);
      allowedTableColumns = roleSpecificDesktopHeaders
        ? roleSpecificDesktopHeaders[userProfile.role]
        : tableHeaders;
    }
  }, [getApiDataFromRedux]);

  const refreshData = () => {
    try {
      const options = {
        url: refreshDataApi,
        method: refreshMethod ? refreshMethod : POST,
        headers: { "Content-Type": "application/json" },
        data: {},
      };
      dispatch(callApi(options));
    } catch (error) {}
  };

  const handleSave = () => {
    const formData = finalizeRef.current();
    if (formData) {
      console.log("Received validated data:", formData);
      try {
        const err = {};
        fieldConst.forEach((field) => {
          if (
            field.isRequired &&
            ((typeof formData[field.name] === "object" &&
              formData[field.name]?.length === 0) ||
              !formData[field.name])
          ) {
            err[field.name] = "This is required";
          }
        });
        const options = {
          url: API_ENDPOINTS[editApi],
          method: POST,
          headers: { "Content-Type": "application/json" },
          data: sanitizeFormData(formData),
        };

        if (Object.keys(err).length === 0) {
          dispatch(callApi(options))
            .then(() => {
              setSnackbar({ open: true, message: `Saved.`, status: 0 });
            })
            .catch(() => {
              setSnackbar({ open: true, message: `Failed.`, status: -1 });
            });
        } else {
          setSnackbar({
            open: true,
            message: `Fields are missing.`,
            status: -1,
          });
        }
        refreshData();
      } catch (error) {
        setSnackbar({ open: true, message: `Failed.`, status: -1 });
        console.log(error);
      }
    }
  };

  const handleDelete = () => {
    try {
      const options = {
        url: API_ENDPOINTS[deleteApi] + "?id=" + currentRowData._id,
        method: DELETE,
        headers: { "Content-Type": "application/json" },
      };
      dispatch(callApi(options)).then(() => {
        setSnackbar({ open: true, message: `Deleted.`, status: 0 });
      });
    } catch (error) {
      console.log(error);
      setSnackbar({ open: true, message: `Deletion Failed.`, status: -1 });
    }
  };
  const handleApprove = (rowId) => {
    try {
      const options = {
        url: API_ENDPOINTS[approveApi],
        method: POST,
        headers: { "Content-Type": "application/json" },
        data: {
          _id: rowId,
          [NEED_APPROVAL_BY]: userProfile.parentId || APPROVED,
        },
      };
      dispatch(callApi(options)).then(() => {
        setSnackbar({ open: true, message: `Approved.`, status: 0 });
      });
    } catch (error) {
      console.log(error);
      setSnackbar({ open: true, message: `Approval Failed.`, status: -1 });
    }
  };

  const handleRemove = (rowId) => {
    const formData = finalizeRef.current();
    if (formData) {
      try {
        const options = {
          url: API_ENDPOINTS[removeApi],
          method: POST,
          headers: { "Content-Type": "application/json" },
          data: {
            id: rowId,
            userId: userProfile._id,
            rejectedByBFAdmin:
              userProfile.role === USER_ROLE[BF_ADMIN]
                ? userProfile._id
                : undefined,
            rejectedByCP:
              userProfile.role === USER_ROLE[CHANNEL_PARTNER]
                ? userProfile._id
                : undefined,
            rejectedByBFAdminComments: formData.rejectedByBFAdminComments,
            rejectedByCPComments: formData.rejectedByCPComments,
          },
        };
        dispatch(callApi(options)).then(() => {
          setSnackbar({ open: true, message: `Removed.`, status: 0 });
        });
      } catch (error) {
        console.log(error);
        setSnackbar({ open: true, message: `Removal Failed.`, status: -1 });
      }
    }
  };

  const filterData = ({
    activePage,
    itemsCountPerPage,
    sortType,
    sortColumn,
  }) => {
    applyFilters(
      `&page=${activePage}&limit=${itemsCountPerPage}&sortType=${sortType}&sortColumn=${sortColumn}`
    );
  };

  const toogleRowClick = () => {
    setShowRowModal(!showRowModal);
  };

  const snackbarClose = (status) => {
    setSnackbar({
      open: false,
      message: "",
    });
    // if status == 0, refresh
    if (status === 0) {
      refreshData();
    }
  };

  const toogleEdit = () => {
    setShowEditModal(!showEditModal);
  };
  const toogleDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const tooglePreview = () => {
    setShowPreviewModal(!showPreviewModal);
  };
  const toogleApproval = () => {
    setShowApprovalModal(!showApprovalModal);
  };

  const toggleRemove = () => {
    setShowRemoveModal(!showRemoveModal);
  };

  const handleSort = (column) => {
    const newSortType = sortType === "asc" ? "desc" : "asc";
    setSortType(newSortType);
    setSortColumn(column);
    filterData({
      activePage,
      itemsCountPerPage,
      sortColumn: column,
      sortType: newSortType,
    });
  };

  const handlePageChange = (action, pageNumber) => {
    if (pageNumber > 0) setActivePage(pageNumber);
    filterData({
      activePage: pageNumber,
      itemsCountPerPage,
      sortColumn,
      sortType,
    });
  };

  const handleRecordPerPage = (action) => {
    setItemsCountPerPage(action.target.value);
    filterData({
      activePage,
      itemsCountPerPage: action.target.value,
      sortColumn,
      sortType,
    });
  };

  return (
    <>
      {showEditModal && (
        <ReusablePopup
          onSave={() => {
            handleSave();
            toogleEdit();
          }}
          onHide={toogleEdit}
          onCancel={toogleEdit}
        >
          <div className="formheadingcontainer">Edit User</div>
          <FormBuilder
            ref={finalizeRef}
            propsFormData={currentRowData}
            fields={fieldConst}
          />
        </ReusablePopup>
      )}

      {showDeleteModal && (
        <ReusablePopup
          onYes={() => {
            handleDelete();
            toogleDelete();
          }}
          onHide={toogleDelete}
          onCancel={toogleDelete}
        >
          <p className="lbel">Are you sure want to Delete?</p>
        </ReusablePopup>
      )}

      {showPreviewModal && (
        <ReusablePopup onHide={tooglePreview} onClose={tooglePreview}>
          <HomeCard
            element={currentRowData}
            disableOnClickNavigate={true}
          ></HomeCard>
          <SearchCard
            element={currentRowData}
            disableOnClickNavigate={true}
          ></SearchCard>
          <DetailDataCard singledata={currentRowData}></DetailDataCard>
          {approveApi &&
            currentRowData[NEED_APPROVAL_BY] &&
            userProfile._id === currentRowData[NEED_APPROVAL_BY] && (
              <>
                <Button
                  variant="success"
                  onClick={(e) => {
                    e.stopPropagation();
                    toogleApproval();
                  }}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRemove();
                  }}
                >
                  Reject
                </Button>
              </>
            )}
        </ReusablePopup>
      )}

      {!disableRowModal && showRowModal && (
        <ReusablePopup onHide={toogleRowClick} onClose={toogleRowClick}>
          <FormBuilder
            ref={finalizeRef}
            propsFormData={currentRowData}
            fields={fieldConst}
          />
        </ReusablePopup>
      )}
      {showApprovalModal && (
        <ReusablePopup
          onYes={() => {
            handleApprove(currentRowData._id);
            toogleApproval();
          }}
          onHide={toogleApproval}
          onCancel={toogleApproval}
        >
          <p className="lbel">Are you sure want to Approve?</p>
        </ReusablePopup>
      )}
      {showRemoveModal && (
        <ReusablePopup
          onYes={() => {
            handleRemove(currentRowData._id);
            toggleRemove();
          }}
          onHide={toggleRemove}
          onCancel={toggleRemove}
        >
          <p className="lbel">Are you sure want to Remove?</p>
          <FormBuilder
            ref={finalizeRef}
            fields={[
              {
                name:
                  userProfile.role === USER_ROLE[BF_ADMIN]
                    ? "rejectedByBFAdminComments"
                    : "rejectedByCPComments",
                label: "Comments",
                type: "textarea",
                parentclassName: "property-w-3 column-property",
                className: "column-property",
                textLimit: 100,
                isRequired: true,
              },
            ]}
          />
        </ReusablePopup>
      )}
      <div className="tablediv ">
        <div className="filter-container-listing" >
          <input
            type="text"
            onChange={(e) => {
              setTableFilter({
                search: e.target.value,
              });
            }}
            value={[tableFilter["search"]] || ""}
          />
          <Button onClick={() => applyFilters()}>Filter Data</Button>
          {showColumnFilter && (
            <Button onClick={() => setShowFilters(!showFilters)}>Filter</Button>
          )}
        </div>
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              {Object.keys(allowedTableColumns).map((headerLabel, index) => (
                <th key={index} className="tablehead text">
                  <div
                    onClick={() => handleSort(allowedTableColumns[headerLabel])}
                  >
                    {headerLabel}
                  </div>
                  {sortColumn === allowedTableColumns[headerLabel] &&
                    (sortType === "asc" ? <FaCaretUp /> : <FaCaretDown />)}
                  {showFilters && (
                    <input
                      type="text"
                      onChange={(e) =>
                        setTableFilter({
                          ...tableFilter,
                          [allowedTableColumns[headerLabel]]: e.target.value,
                        })
                      }
                      value={
                        tableFilter[allowedTableColumns[headerLabel]] || ""
                      }
                    />
                  )}
                </th>
              ))}
              {!hideActions && <th className="tablehead text">Actions</th>}
              {showViewAllListing && (
                <th className="tablehead text">View all Listing</th>
              )}
            </tr>
          </thead>
          <tbody className="tablebody text">
            {tableData.map((element) => (
              <tr
                className="tableborder text"
                key={element.id}
                onClick={() => {
                  if (!showViewAllListing) {
                    setCurrentRowData(element);
                    toogleRowClick();
                  }
                }}
              >
                {Object.keys(allowedTableColumns).map((headerLabel, index) => (
                  <td className="bodytext" key={index}>
                    {element[allowedTableColumns[headerLabel]]}
                  </td>
                ))}
                {!hideActions && (
                  <td className="tablebody tableborder text actionColumn">
                    {!hideAlterActions && (
                      <>
                        <Button
                          className="ListingEditbtn"
                          variant="success"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentRowData(element);
                            toogleEdit();
                          }}
                        >
                          <FaUserEdit size={20} />
                        </Button>
                        &nbsp;
                        <Button
                          className="ListingDeletebtn"
                          variant="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentRowData(element);
                            toogleDelete();
                          }}
                        >
                          <FaRegTrashAlt size={20} />
                        </Button>
                        &nbsp;
                      </>
                    )}
                    {isproperty && ( // Conditionally render the Preview button
                      <Button
                        className="ListingPreviewbtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentRowData(element);
                          tooglePreview(); // Add a function to handle the preview logic
                        }}
                      >
                        <FaRegEye size={20} />
                      </Button>
                    )}
                    &nbsp;
                    {approveApi &&
                      element[NEED_APPROVAL_BY] &&
                      userProfile._id === element[NEED_APPROVAL_BY] && (
                        <>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentRowData(element);
                              toogleApproval();
                            }}
                          >
                            <FcApproval size={12} />
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentRowData(element);
                              toggleRemove();
                            }}
                          >
                            <FcRemoveImage size={12} />
                          </Button>
                        </>
                      )}
                  </td>
                )}
                {showViewAllListing && (
                  <td>
                    <Button
                      onClick={(e) => {
                        navigateTo(showViewAllListing + "?id=" + element._id);
                      }}
                    >
                      <AiOutlineDoubleRight size={12} />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {apiStatus === "loading" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        tableData.length > 0 && (
          <BasicTablePagination
            dataLength={totalItems}
            currentPage={activePage}
            handlePageChange={handlePageChange}
            rowPerPage={itemsCountPerPage}
            handleRowPerPagChange={handleRecordPerPage}
          />
        )
      )}
      <SnackBar
        open={snackbar?.open}
        message={snackbar?.message}
        onClose={(status) => snackbarClose(status)}
      />
    </>
  );
};

export default ListingTable;
