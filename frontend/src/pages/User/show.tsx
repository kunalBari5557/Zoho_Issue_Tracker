import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const UsersShow = () =>{
    const location = useLocation();
    const Navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [profile, setProfile] = useState("");

    const GetUserData=()=>{
        axios.get(`${process.env.REACT_APP_URL}/admin/users/edit/${location.state}`,{ headers: {'token':`${localStorage.getItem('Token')}`} })
                  .then(res => {

                      if(res.status===200)
                      {  
                        setName(res.data.users.firstName);
                        setEmail(res.data.users.email);
                        setNumber(res.data.users.phone_no);
                        // setProfile(res.data.employers.profile_picture);
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
            Navigate("/admin/employer");
        }else{
            GetUserData();
        }
    }, []);

    return (
        <>
        <div className='w-100'>
        <div className="breadcrumb-two mb-3 d-flex justify-content-between" >
            <ul className="breadcrumb">
                <li className="active">
                    <a href="##">
                        <h5 className='mb-0 text-white'>Details Users</h5>
                    </a>
                </li>
                <li><a href="##">.</a></li>
            </ul>
            
        </div>
            <div className="statbox widget box box-shadow">
                <div className="widget-content widget-content-area p-0 box-shadow-none">

                    <div className="row col-lg-12 col-12">
                        <div className="col-lg-4 col-4">
                            <form>
                                <div className="form-group">
                                    <label>Name</label>
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                </div>

                                <div className="form-group">
                                    <label>Mobile No</label>
                                </div>  
                                
                            </form>
                        </div>
                        <div className="col-lg-4 col-4">
                            <form>
                                <div className="form-group">
                                    <label>{name}</label>
                                </div>

                                <div className="form-group">
                                    <label>{email}</label>
                                </div>

                                <div className="form-group">
                                    <label>{number}</label>
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

export default UsersShow