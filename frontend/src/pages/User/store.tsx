import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserAddSchema } from "../../ValidationSchema";
// import { EmployerAddSchema } from "../../../ValidationSchema";
import ReactSelect from 'react-select';


const colourStyles= {
    control: (styles:any) => ({ 
            ...styles,
            border:'1px solid #bfc9d4',
            boxShadow: '#000 !important',
            borderRadius:'6px',
            padding:'4px',
            '&:hover': {
                border:'1px solid #bfc9d4',
            }
    }),
    multiValue: (styles:any) => {
      return {
        ...styles,
        backgroundColor: "#606060",
      };
    },
    multiValueLabel: (styles :any) => ({
      ...styles,
      color: "#fff",
    }),
    multiValueRemove: (styles:any, { data }:any) => ({
      ...styles,
      color: "#000",
      '& > svg': {
        backgroundColor: "#fff",
        borderRadius: '10px',
        marginLeft: '2px',
        marginRight: '2px',
      },
      ':hover': {
        backgroundColor: data.color,
        color: data.color,
      },
    }),
    option: (styles:any, { data } :any) => {
        return {
          ...styles,
          backgroundColor: 'white',
          color: '#000',
          ':hover': {
            backgroundColor: '#f5f5f5',
          },
        };
      },
};


interface Users {
    firstName:string,
    lastName:string,
    email: string,
    password: string,
    passwordConfirmation: string,
    phone_no:string,
    image:string,
    role_id:any

}

const UserAdd = () =>{


const Navigate = useNavigate();
const [userRole, setUserRole] = useState([]);
const [initialValues] = useState<Users>({ firstName:"", lastName:"",email: "", password: "",image:"",phone_no:"",passwordConfirmation:"",role_id:0})

const AddUser = useFormik({
    initialValues,
    validationSchema:UserAddSchema,

    onSubmit : (values: Users, action: any ) => {
        let formData = new FormData()
        formData.append('firstName', values.firstName);   
        formData.append('lastName', values.lastName);   
        formData.append('email', values.email);
        formData.append('phone_no', values.phone_no);
        formData.append('password', values.password);
        formData.append('image', values.image);
        formData.append('confirm_password', values.passwordConfirmation);
        formData.append('role_id', values?.role_id);

        axios.post(`${process.env.REACT_APP_URL}/admin/users/add`,formData,{ headers: {'token':`${localStorage.getItem('Token')}`} })
        .then(res => {

      if(res.status===200)
      {   
          Navigate('/admin/users',{state:res.data.msg});
      }
  })
  .catch(err => {
    toast.error(err.response.data.msg)
    // Navigate('/admin/employer');
  });

    }
    
})

const UserRoles = () =>{
    axios.get(`${process.env.REACT_APP_URL}/common/roles`,)
    .then(res => {
        setUserRole(res.data.roles)

    })
    .catch(err => {
      if(err.response.data.message === 'Unauthorized!'){
        Navigate('/admin/login');
      }
    });
}

useEffect(() => {
    UserRoles();
}, []);
    
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
                        <h5 className='mb-0 text-white'>Add Users</h5>
                    </a>
                </li>
                <li><a href="##">.</a></li>
            </ul>
            
        </div>

            <div className="statbox widget box box-shadow">
                <div className="widget-content widget-content-area p-0 box-shadow-none">

                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <form onSubmit={AddUser.handleSubmit}>


                            <div className="form-group">
                                    <label>Role</label>
                                    <ReactSelect
                                        isMulti 
                                        options={userRole.map((item:any)=>
                                            {return {id:item.id,label: item.name, value: item.id }}
                                            )}
                                        isClearable={false}
                                        styles={colourStyles}
                                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                                        placeholder="Select Role"
                                        name="role_id"
                                        onChange={(selectedOptions: any) => {
                                            const selectedRoleId = selectedOptions ? selectedOptions.map((option: any) => option.value) : null;
                                            AddUser.setFieldValue('role_id', selectedRoleId ? selectedRoleId[0] : null);
                                          }}
                                    />
                                </div>  

                                <div className="form-group">
                                    <label>First tName</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Enter First Name" 
                                        value={AddUser.values.firstName}
                                        onChange={AddUser.handleChange}
                                        onBlur={AddUser.handleBlur}
                                        name="firstName"
                                    />
                                </div>
                                {AddUser.errors.firstName && AddUser.touched.firstName ? (
                                    <h6 className='text-danger mt-2 ml-1'>{AddUser.errors.firstName}</h6>
                                ) : null}

                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Enter Last Name" 
                                        value={AddUser.values.lastName}
                                        onChange={AddUser.handleChange}
                                        onBlur={AddUser.handleBlur}
                                        name="lastName"
                                    />
                                </div>
                                {AddUser.errors.lastName && AddUser.touched.lastName ? (
                                    <h6 className='text-danger mt-2 ml-1'>{AddUser.errors.lastName}</h6>
                                ) : null}

                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Enter Email" 
                                        value={AddUser.values.email}
                                        onChange={AddUser.handleChange}
                                        onBlur={AddUser.handleBlur}
                                        name="email"
                                    />
                                </div>
                                {AddUser.errors.email && AddUser.touched.email ? (
                                    <h6 className='text-danger mt-2 ml-1'>{AddUser.errors.email}</h6>
                                ) : null}

                                <div className="form-group">
                                    <label>Password</label>
                                    <input 
                                        className="form-control" 
                                        type="password" 
                                        placeholder="Enter Password" 
                                        value={AddUser.values.password}
                                        onChange={AddUser.handleChange}
                                        name="password"
                                        onBlur={AddUser.handleBlur}
                                    />
                                </div>
                                {AddUser.errors.password && AddUser.touched.password ? (
                                    <h6 className='text-danger mt-2 ml-1'>{AddUser.errors.password}</h6>
                                ) : null}

                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input 
                                        className="form-control" 
                                        type="password" 
                                        placeholder="Enter Confirm Password" 
                                        value={AddUser.values.passwordConfirmation}
                                        onChange={AddUser.handleChange}
                                        onBlur={AddUser.handleBlur}
                                        name="passwordConfirmation"

                                    />
                                </div>
                                {AddUser.errors.passwordConfirmation && AddUser.touched.passwordConfirmation ? (
                                    <h6 className='text-danger mt-2 ml-1'>{AddUser.errors.passwordConfirmation}</h6>
                                ) : null}

                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        placeholder="Enter Mobile Number" 
                                        value={AddUser.values.phone_no}
                                        onChange={AddUser.handleChange}
                                        onBlur={AddUser.handleBlur}
                                        name="phone_no"

                                    />
                                </div>
                                {AddUser.errors.phone_no && AddUser.touched.phone_no ? (
                                    <h6 className='text-danger mt-2 ml-1'>{AddUser.errors.phone_no}</h6>
                                ) : null}

                                <div className="form-group">
                                    <label>Image</label>
                                    <label className="custom-file-container__custom-file mt-0">
                                      <input type="file" name="image" className="custom-file-container__custom-file__custom-file-input"
                                        onChange={(e)=>AddUser.setFieldValue('image', e.target.files && e.target.files[0])}

                                        onBlur={AddUser.handleBlur} accept="image/*"/>
                                      <span className="custom-file-container__custom-file__custom-file-control outline-none">Choose Image...<span className="custom-file-container__custom-file__custom-file-control__button"> Browse </span></span>
                                    </label>
                                </div>
                                {AddUser.errors.image && AddUser.touched.image ? (
                                    <h6 className='text-danger mt-2 ml-1'>{AddUser.errors.image}</h6>
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

export default UserAdd