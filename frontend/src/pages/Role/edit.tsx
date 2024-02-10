import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoleUpdateSchema, UserUpdateSchema } from '../../ValidationSchema';

interface Roles {
    name:string,

}

const RoleEdit = () =>{

    const location = useLocation();

    const Navigate = useNavigate();

    const [initialValues,setInitialValues] = useState<Roles>({ name:""})
    console.log("initialValues",initialValues);

    const GetRolesData=()=>{
        axios.get(`${process.env.REACT_APP_URL}/admin/roles/edit/${location.state}`,{ headers: {'token':`${localStorage.getItem('Token')}`} })
                  .then(res => {
                      if(res.status===200)
                      {  
                        setInitialValues({name:res.data.roles.name})
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
            // Navigate("/admin/employer");
        }else{
            GetRolesData();
        }
    }, []);


    const users = useFormik({
        initialValues,
        enableReinitialize:true,
        validationSchema:RoleUpdateSchema,
    
        onSubmit : (values: Roles, action: any ) => {
            axios.put(`${process.env.REACT_APP_URL}/admin/roles/update/${location.state}`,values,{ headers: {'token':`${localStorage.getItem('Token')}`} })
            .then(res => {
                if(res.status===200)
                {   
                    Navigate('/admin/roles',{state:res.data.msg});
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
                        <h5 className='mb-0 text-white'>Edit Roles</h5>
                    </a>
                </li>
                <li><a href="##">.</a></li>
            </ul>
            
        </div>

            <div className="statbox widget box box-shadow">
                <div className="widget-content widget-content-area p-0 box-shadow-none">

                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <form onSubmit={users.handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Enter Name" 
                                        value={users.values.name}
                                        onChange={users.handleChange}
                                        onBlur={users.handleBlur}
                                        name="name"
                                    />
                                </div>

                                <div className="form-group mb-1">
                                    <button type="submit" className="btn btn-primary">Save</button>
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

export default RoleEdit