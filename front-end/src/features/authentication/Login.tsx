import { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from 'react-router-dom';
import { loginAsync, reset, selectIsError } from "./authenticationSlice"
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';



const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });

      const { username, password } = formData;

      const navigate = useNavigate();
      const dispatch = useAppDispatch();

      const { userName, isSuccess } = useAppSelector(
        (state) => state.authentication
      );


      useEffect(() =>
      {
          if (isSuccess)
          {
            window.location.href = "/";
          }

          dispatch(reset())

      }, [userName, isSuccess, navigate, dispatch])


      const onChange = (e:any) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
      };

      let isError = useAppSelector(selectIsError)
      

      const onSubmit = (e: any) => {
        e.preventDefault();
      
        const userData = {
          username,
          password,
        };
      
        dispatch(loginAsync(userData))
          .then(() => {
            if (!isError) {
              toast.success(`Welcome, ${username}!`, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
              });
            }
          })
          if (isError) {
            toast.error('Wrong information. Try again later.');
          };
      };
      


  return (
    <div style = {{backgroundColor: "white"}}>
    <div className="container d-flex justify-content-center">
      
  <form className="form-group col-md-6" onSubmit={onSubmit}>
  <div style = {{height: "200px"}} />
  <h1 className="text-center" style = {{color: "black"}}>
      <FaSignInAlt /> Login
    </h1>
    <p className="text-center" style = {{color: "black"}}>Enter user details</p>

    <div className="form-group">
      <input
      style = {{textAlign: "left"}}
        type="text"
        className="form-control"
        id="username"
        name="username"
        value={username}
        placeholder="Username"
        onChange={onChange}
      />
    </div><br/>

    <div className="form-group">
      <input
      style = {{textAlign: "left"}}
        type="password"
        className="form-control"
        id="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={onChange}
      />
    </div><br/>

    <div className="form-group text-center">
      <Button type="submit" className="btn btn-warning">
        Login
      </Button><br/><br/>
    </div>
  </form>
  
</div>
<div style = {{height: 400}}/>
</div>


  )
}

export default Login