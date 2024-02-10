import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RoleAddSchema} from "../../ValidationSchema";

interface Employer {
    name:string,
}

const RoleAdd = () =>{


    const Navigate = useNavigate();

const [initialValues] = useState<Employer>({ name:""})

const employer = useFormik({
    initialValues,
    validationSchema:RoleAddSchema,

    onSubmit : (values: Employer, action: any ) => {


        axios.post(`${process.env.REACT_APP_URL}/admin/roles/add`,values,{ headers: {'token':`${localStorage.getItem('Token')}`} })
        .then(res => {

      if(res.status===200)
      {   
          Navigate('/admin/roles',{state:res.data.msg});
      }
  })
  .catch(err => {
    toast.error(err.response.data.msg)
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
                            <form onSubmit={employer.handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Enter First Name" 
                                        value={employer.values.name}
                                        onChange={employer.handleChange}
                                        onBlur={employer.handleBlur}
                                        name="name"
                                    />
                                </div>
                                {employer.errors.name && employer.touched.name ? (
                                    <h6 className='text-danger mt-2 ml-1'>{employer.errors.name}</h6>
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

export default RoleAdd