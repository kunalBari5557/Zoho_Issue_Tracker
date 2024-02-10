import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { addIssues } from "../../Redux/features/issue";
import { useDispatch, useSelector } from "react-redux";
import { IssueSchema } from "../../ValidationSchema";
import { useEffect, useState } from "react";
import { fetchProject } from "../../Redux/features/projects";

const statusOptions = [
  { id:1, value: 'Open', label: 'Open' },
  { id:2, value: 'Close', label: 'Close' },
];
const IssueAdd = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const selectProject = useSelector((state: any) => state.projectsState?.projects);

  const [project, setProject] = useState(selectProject);
  const addIssue = useFormik({
    initialValues: {
      issues: "",
      status_id: "",
      project_id:""
    },
    validationSchema: IssueSchema,
    onSubmit: async (values) => {
      try {
        const actionResult = await dispatch(addIssues(values) as any);
        navigate('/admin/dashboard'); 
      } catch (error) {
        toast.dismiss();
        toast.error("Invalid email or password. Please try again.");
      }
    },
  });

  useEffect(() => {
    dispatch(fetchProject());
}, [dispatch]);

useEffect(() => {
  setProject(selectProject);
}, [selectProject]);

  return (
    <>
      <div className="w-100">
        <div className="breadcrumb-two mb-3 d-flex justify-content-between">
          <ul className="breadcrumb">
            <Toaster position="top-center" reverseOrder={false} />
            <li className="active">
              <a href="##">
                <h5 className="mb-0 text-white">Add Issues</h5>
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
                <form onSubmit={addIssue.handleSubmit}>
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
                                            addIssue.setFieldValue('project_id', selectedRoleId ? selectedRoleId[0] : null);
                                            
                                          }}
                                    />
                </div> 

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
                      addIssue.setFieldValue('status_id', selectedIssueId ? selectedIssueId[0] : null);
                      }}
                    />                    
                </div>
                  <div className="form-group">
                    <label>Enter Title</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Title"
                      value={addIssue.values.issues}
                      onChange={addIssue.handleChange}
                      onBlur={addIssue.handleBlur}
                      name="issues"
                    />
                  </div>
                  {addIssue.errors.issues && addIssue.touched.issues ? (
                    <h6 className="text-danger mt-2 ml-1">
                      {addIssue.errors.issues}
                    </h6>
                  ) : null}
                                                  
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

export default IssueAdd;
