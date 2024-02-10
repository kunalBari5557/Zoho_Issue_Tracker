import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserUpdateSchema } from '../../ValidationSchema';
// import { EmployerUpdateSchema } from '../../../Validation Schema';

interface Employer {
    firstName:string,
    lastName:string,
    email: string,
    phone_no:string,
    image:string,
    role_id:number,

}

const UserEdit = () =>{

    const location = useLocation();
    const Navigate = useNavigate();
const [userRole, setUserRole] = useState([]);


const [initialValues,setInitialValues] = useState<Employer>({ firstName:"", email: "",image:"",phone_no:"",lastName:"",role_id:1})


    const GetUserData=()=>{
        axios.get(`${process.env.REACT_APP_URL}/admin/users/edit/${location.state}`,{ headers: {'token':`${localStorage.getItem('Token')}`} })
                  .then(res => {
                      if(res.status===200)
                      {  
                        setInitialValues({firstName:res.data.users.firstName,lastName:res.data.users.lastName, email: res.data.users.email,image:"", phone_no:res.data.users.phone_no,role_id:1})
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
            GetUserData();
        }
    }, []);


    const users = useFormik({
        initialValues,
        enableReinitialize:true,
        validationSchema:UserUpdateSchema,
    
        onSubmit : (values: Employer, action: any ) => {
    
            let formData = new FormData()
            formData.append('firstName', values.firstName);   //append the values with key, value pair
            formData.append('lastName', values.lastName);   //append the values with key, value pair
            formData.append('email', values.email);
            formData.append('phone_no', values.phone_no);
            formData.append('profile', values.image);


            axios.put(`${process.env.REACT_APP_URL}/admin/users/update/${location.state}`,formData,{ headers: {'token':`${localStorage.getItem('Token')}`} })
            .then(res => {
                if(res.status===200)
                {   
                    Navigate('/admin/users',{state:res.data.msg});
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
                        <h5 className='mb-0 text-white'>Edit Users</h5>
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
                                    <label>First Name</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Enter Name" 
                                        value={users.values.firstName}
                                        onChange={users.handleChange}
                                        onBlur={users.handleBlur}
                                        name="firstName"
                                    />
                                </div>
                                {users.errors.firstName && users.touched.firstName ? (
                                    <h6 className='text-danger mt-2 ml-1'>{users.errors.firstName}</h6>
                                ) : null}

                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Enter Last Name" 
                                        value={users.values.lastName}
                                        onChange={users.handleChange}
                                        onBlur={users.handleBlur}
                                        name="lastName"
                                    />
                                </div>
                                {users.errors.lastName && users.touched.lastName ? (
                                    <h6 className='text-danger mt-2 ml-1'>{users.errors.lastName}</h6>
                                ) : null}

                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Enter Email" 
                                        value={users.values.email}
                                        onChange={users.handleChange}
                                        onBlur={users.handleBlur}
                                        name="email"
                                    />
                                </div>
                                {users.errors.email && users.touched.email ? (
                                    <h6 className='text-danger mt-2 ml-1'>{users.errors.email}</h6>
                                ) : null}

                                <div className="form-group">
                                    <label>Mobile No</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Enter Mobile No" 
                                        value={users.values.phone_no}
                                        onChange={users.handleChange}
                                        onBlur={users.handleBlur}
                                        name="phone_no"
                                    />
                                </div>
                                {users.errors.phone_no && users.touched.phone_no ? (
                                    <h6 className='text-danger mt-2 ml-1'>{users.errors.phone_no}</h6>
                                ) : null}

                                <div className="form-group">
                                    <label>Profile</label>
                                    <label className="custom-file-container__custom-file mt-0">
                                      <input type="file" className="custom-file-container__custom-file__custom-file-input" name="profile" onChange={(e)=>users.setFieldValue('profile', e.target.files && e.target.files[0])}
                                        onBlur={users.handleBlur} accept="image/*"/>
                                      <span className="custom-file-container__custom-file__custom-file-control outline-none">Choose Profile...<span className="custom-file-container__custom-file__custom-file-control__button"> Browse </span></span>
                                    </label>
                                </div>
                                {users.errors.image && users.touched.image ? (
                                    <h6 className='text-danger mt-2 ml-1'>{users.errors.image}</h6>
                                ) : null}

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

export default UserEdit