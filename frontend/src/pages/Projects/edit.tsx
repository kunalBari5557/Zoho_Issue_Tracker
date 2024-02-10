import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { ProjectUpdateSchema} from "../../ValidationSchema";

interface Project {
    projects:string,
}

const ProjectEdit = () =>{
    const location = useLocation();

    const Navigate = useNavigate();

    const [initialValues,setInitialValues] = useState<Project>({ projects:""})

    const GetProjectsData=()=>{
        axios.get(`${process.env.REACT_APP_URL}/admin/projects/edit/${location.state}`,{ headers: {'token':`${localStorage.getItem('Token')}`} })
                  .then(res => {
                    console.log("res",res);
                    
                      if(res.status===200)
                      {  
                        setInitialValues({projects:res.data.projects.projects})
                      }
                  })
                  .catch(err => {
                    if(err.response.data.msg === 'Unauthorized!'){
                        localStorage.clear();
                        Navigate("/admin/login");
                    }else{
                    //   setApierror1(err.response.data.msg);
                    }
                  });
        }


    
    useEffect(() => {
        if(location.state===null){
        }else{
            GetProjectsData();
        }
    }, []);

    const updateProjects = useFormik({
        initialValues,
        enableReinitialize:true,
        validationSchema:ProjectUpdateSchema,
    
        onSubmit : (values: Project, action: any ) => {
            axios.put(`${process.env.REACT_APP_URL}/admin/projects/update/${location.state}`,values,{ headers: {'token':`${localStorage.getItem('Token')}`} })
            .then(res => {
                if(res.status===200)
                {   
                    Navigate('/admin/projects',{state:res.data.msg});
                }
            })
                .catch(err => {
                    toast.error(err.response.data.msg)
                    // Navigate('/admin/users');
                });
    
        }
        
    })
    
    return (
        <>
        <div className='w-100'>
        <div className="breadcrumb-two mb-3 d-flex justify-content-between" >
            <ul className="breadcrumb">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
                <li className="active">
                    <a href="##">
                        <h5 className='mb-0 text-white'>Add Roles</h5>
                    </a>
                </li>
                <li><a href="##">.</a></li>
            </ul>
        </div>

            <div className="statbox widget box box-shadow">
                <div className="widget-content widget-content-area p-0 box-shadow-none">

                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <form onSubmit={updateProjects.handleSubmit}>
                                <div className="form-group">
                                    <label>Project Name</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Enter Project Name" 
                                        value={updateProjects.values.projects}
                                        onChange={updateProjects.handleChange}
                                        onBlur={updateProjects.handleBlur}
                                        name="projects"
                                    />
                                </div>
                                {updateProjects.errors.projects && updateProjects.touched.projects ? (
                                    <h6 className='text-danger mt-2 ml-1'>{updateProjects.errors.projects}</h6>
                                ) : null}

                                <div className="form-group mb-1">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>                                        
                    </div>

                </div>
            </div>
        </div>
    </>
    )

}

export default ProjectEdit