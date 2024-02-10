import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import toast, { Toaster } from "react-hot-toast";
import { fetchRoles } from "../../Redux/features/roles";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "../../Redux/features/issue";
import { fetchProject } from "../../Redux/features/projects";

export const Issues = () => {
  const dispatch = useDispatch<any>();
  const Navigate = useNavigate();
  const projects = useSelector(
    (state: any) => state?.projectsState?.projects?.Project
  );
  const issuesUser = useSelector((state: any) => state?.issue?.issues);
  const openIssues = issuesUser.filter((item: any) => item?.status_id);

  const renderedIssues = openIssues?.map((issue: any) => {
    const project = projects?.find(
      (project: any) => project.id === issue.project_id
    );

    if (project) {
      return {
        id: issue.id,
        projectName: project.projects,
        issues: issue.issues,
        status_id: issue.status_id === 1 ? "Open" : "Close",
      };
    }

    return null;
  });

  const rolesUser = useSelector((state: any) => state.roles?.roles);
  const totalPages = useSelector(
    (state: any) => state.roles?.roles?.totalPages
  );
  const [roles, setRoles] = useState<any>(rolesUser);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearchKeyDown = (e: any) => {
    if (e.key === "Enter" && search.trim() !== "") {
      dispatch(fetchRoles({ page, search }));
    }
  };

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchRoles({ page: page, search: search }));
    dispatch(fetchProject());
  }, [dispatch]);

  useEffect(() => {
    setRoles(rolesUser);
  }, [rolesUser]);

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  const handlePageClick = (e: any) => {
    setPage(e.selected + 1);
  };

  const HandleEdit = (id: any) => {
    Navigate("/admin/issues/edit", { state: { id } });
  };

  const HandleDelete = (e: any) => {
    Swal.fire({
      title: "Do you want to Delete this Record?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#DC3741",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed === true) {
        axios
          .delete(`${process.env.REACT_APP_URL}/admin/issues/delete/${e}`, {
            headers: { token: `${localStorage.getItem("Token")}` },
          })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted Sucessfully.",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
              dispatch(fetchIssues());
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const HandleShow = (e: any) => {
    Navigate("/admin/roles/show", { state: e });
  };

  return (
    <>
      <div className="w-100">
        <div className="breadcrumb-two mb-3 d-flex justify-content-between">
          <ul className="breadcrumb">
            <Toaster position="top-center" reverseOrder={false} />
            <li className="active">
              <a href="##">
                <h5 className="mb-0 text-white">Issues</h5>
              </a>
            </li>
            <li>
              <a href="##">.</a>
            </li>
          </ul>

          <button className="btn btn-primary btn-rounded py-0">
            <div className="d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-plus"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <h5
                className="text-white mb-0"
                onClick={() => Navigate("/admin/issues/store")}
              >
                Add
              </h5>
            </div>
          </button>
        </div>

        <div className="statbox widget box box-shadow">
          <div className="widget-content widget-content-area p-0 box-shadow-none">
            <div className="table-responsive">
              <div
                id="default-ordering_wrapper"
                className="dataTables_wrapper container-fluid dt-bootstrap4"
              >
                <div className="row">
                  <div className="col-sm-12 col-md-10">
                    <div
                      className="dataTables_length"
                      id="default-ordering_length"
                    ></div>
                  </div>
                  <div className="col-sm-12 col-md-2">
                    <div
                      id="default-ordering_filter"
                      className="dataTables_filter"
                    >
                      <label className="d-flex position-relative">
                        {/* <input type="search" className="form-control w-100" placeholder="Search..." aria-controls="default-ordering" onKeyDown={(e)=>{(e.key==="Enter" && search!=="") && fetchRoles({ page: page, search: search })}}  onChange={(e)=>setSearch(e.target.value)} style={{paddingRight:10}}/> */}
                        <input
                          type="search"
                          className="form-control w-100"
                          placeholder="Search..."
                          aria-controls="default-ordering"
                          onKeyDown={handleSearchKeyDown}
                          onChange={handleSearchChange}
                          style={{ paddingRight: 10 }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <table
                      id="default-ordering"
                      className="table table-hover dataTable"
                      style={{ width: "100%" }}
                      role="grid"
                      aria-describedby="default-ordering_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            className="sorting col-2"
                            tabIndex={0}
                            rowSpan={1}
                            colSpan={1}
                          >
                            Project Name
                          </th>
                          <th
                            className="sorting col-2"
                            tabIndex={0}
                            rowSpan={1}
                            colSpan={1}
                          >
                            Issue Title
                          </th>
                          <th
                            className="sorting col-3"
                            tabIndex={0}
                            rowSpan={1}
                            colSpan={1}
                            style={{ textAlign: "center" }}
                          >
                            Status
                          </th>
                          <th
                            className="sorting col-3"
                            tabIndex={0}
                            rowSpan={1}
                            colSpan={1}
                            style={{ textAlign: "center" }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderedIssues.length !== 0 ? (
                          <>
                            {renderedIssues.map((issue: any, index: number) => (
                              <tr role="row" key={index}>
                                <td>{issue?.projectName}</td>
                                <td>{issue?.issues}</td>
                                <td style={{ textAlign: "center" }}>
                                  {issue?.status_id}
                                </td>
                                <td className="text-center">
                                  {/* <svg  xmlns="http://www.w3.org/2000/svg" onClick={()=>HandleShow(user.id)} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye m-1 view_svg_color"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => HandleEdit(issue.id)}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-edit m-1 edit_svg_color"
                                  >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                  </svg>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => HandleDelete(issue.id)}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-trash m-1 delete_svg_color"
                                  >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line
                                      x1="10"
                                      y1="11"
                                      x2="10"
                                      y2="17"
                                    ></line>
                                    <line
                                      x1="14"
                                      y1="11"
                                      x2="14"
                                      y2="17"
                                    ></line>
                                  </svg>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="d-grid text-center fw-bold"
                            >
                              <h5>No Record Found</h5>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 d-flex justify-content-center">
                    <div
                      className="dataTables_paginate paging_full_numbers"
                      id="alter_pagination_paginate"
                    >
                      {roles?.length !== 0 ? (
                        <ReactPaginate
                          previousLabel={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-arrow-left"
                            >
                              <line x1="19" y1="12" x2="5" y2="12"></line>
                              <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                          }
                          nextLabel={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-arrow-right"
                            >
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          }
                          breakLabel={"..."}
                          pageCount={totalPages}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={2}
                          onPageChange={handlePageClick}
                          containerClassName={
                            "pagination justify-content-end m-0"
                          }
                          pageClassName={"page-item"}
                          pageLinkClassName={"page-link"}
                          previousClassName={"page-item"}
                          previousLinkClassName={"page-link"}
                          nextClassName={"page-item"}
                          nextLinkClassName={"page-link"}
                          breakClassName={"page-item"}
                          breakLinkClassName={"page-link"}
                          activeClassName={"active"}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

