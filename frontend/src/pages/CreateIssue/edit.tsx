import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { addIssues, editIssues, fetchIssues } from "../../Redux/features/issue";
import { useDispatch, useSelector } from "react-redux";
import { IssueSchema, UpdateIssueSchema } from "../../ValidationSchema";
import { useEffect, useState } from "react";

interface Issues {
  project_id:any,
  issues:string,
  status:string
}

const statusOptions = [
  { id:1, value: 'Open', label: 'Open' },
  { id:2, value: 'Close', label: 'Close' },
];
const IssueEdit = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const issuesUser = useSelector((state: any) => state.issue?.issues);
  const selectProject = useSelector((state: any) => state.projectsState?.projects);

  const [project, setProject] = useState(selectProject);
  const [issues, setIssues] = useState<any>(issuesUser);
  const selectedId = issues.find((issue: any) => issue.id)
  const selectedIssue = issues.find((issue: any) => issue.id === location.state?.id);

  useEffect(() => {
      dispatch(fetchIssues());
  }, [dispatch]);

  useEffect(() => {
      setIssues(issuesUser);
    }, [issuesUser]);


const editIssue = useFormik({
    initialValues: {
      project_id: selectedIssue?.project_id.toString(),
      issues: selectedIssue?.issues,
      status: selectedIssue?.status
    },
    validationSchema: UpdateIssueSchema,
    onSubmit: async (values:Issues) => {
      
      try {
        const id = location.state?.id;
        if (id) {
          const actionResult = await dispatch(editIssues({ values, issueId: id }) as any);
          navigate('/admin/issues');
        } else {
          console.error("ID not found in location state");
        }
      } catch (error) {
        toast.dismiss();
        toast.error("Invalid email or password. Please try again.");
      }
    },
});

  return (
    <>
      <div className="w-100">
        <div className="breadcrumb-two mb-3 d-flex justify-content-between">
          <ul className="breadcrumb">
            <Toaster position="top-center" reverseOrder={false} />
            <li className="active">
              <a href="##">
                <h5 className="mb-0 text-white">Edit Issue</h5>
              </a>
            </li>
            <li>
              <a href="##">.</a>
            </li>
          </ul>
        </div>

        <div className="statbox widget box box-shadow">
          <div className="widget-content widget-content-area p-0 box-shadow-none">
            <div className="row">
              <div className="col-lg-6 col-12">
                <form onSubmit={editIssue.handleSubmit}>
                <div className="form-group">
                                    <label>Select Project</label>
                                    <ReactSelect
                                        isMulti 
                                        options={project?.Project?.map((item:any)=>
                                            {return {id:item.id,label: item.projects, value: item.id }}
                                            )}
                                        isClearable={false}
                                        // styles={colourStyles}
                                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                                        placeholder="Select Project"
                                        name="project_id"
                                        onChange={(selectedOptions: any) => {
                                            const selectedRoleId = selectedOptions ? selectedOptions.map((option: any) => option.id) : null;
                                            editIssue.setFieldValue('project_id', selectedRoleId ? selectedRoleId[0] : null);
                                            
                                          }}
                                    />
                </div> 
                  <div className="form-group">
                    <label>Enter Title</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Title"
                      value={editIssue.values.issues}
                      onChange={editIssue.handleChange}
                      onBlur={editIssue.handleBlur}
                      name="issues"
                    />
                  </div>
                  {editIssue.errors.issues && editIssue.touched.issues ? (
                    <h6 className="text-danger mt-2 ml-1">
                      {editIssue.errors.issues}
                    </h6>
                  ) : null}

                <div className="form-group">
                    <label>Status</label>
                    <ReactSelect
                      isMulti 
                      options={statusOptions.map((item:any)=>
                      {return {id:item.id,label: item.value, value: item.value }}
                      )}
                      isClearable={false}
                      // styles={colourStyles}
                      components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                      placeholder="Select Status"
                      name="status_id"
                      onChange={(selectedOptions: any) => {
                      const selectedIssueId = selectedOptions ? selectedOptions.map((option: any) => option.id) : null;                                            
                      editIssue.setFieldValue('status_id', selectedIssueId ? selectedIssueId[0] : null);
                      }}
                    />                    
                </div>                                  
                  <div className="form-group mb-1">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueEdit;
