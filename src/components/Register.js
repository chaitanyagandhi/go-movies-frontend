import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Input from "./form/Input";

const Register = () => {
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setJwtToken } = useOutletContext();
    const { setAlertClassName } = useOutletContext();
    const { setAlertMessage } = useOutletContext();
    const { toggleRefresh } = useOutletContext();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // build the request payload
        let payload = {
            first_name:fname,
            last_name:lname,
            email: email,
            password: password,
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        }

        fetch(`${process.env.REACT_APP_BACKEND}/register`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setAlertClassName("alert-danger");
                    setAlertMessage(data.message);
                } else {
                    setJwtToken(data.access_token);
                    setAlertClassName("d-none");
                    setAlertMessage("");
                    toggleRefresh(true);
                    navigate("/");
                }
            })
            .catch(error => {
                setAlertClassName("alert-danger");
                setAlertMessage(error);
            })
    }

    return(
        <div className="col-md-6 offset-md-3">
            <h2>Register</h2>
            <hr />

            <form onSubmit={handleSubmit}>

                <Input
                    title="First Name"
                    type="text"
                    className="form-control"
                    name="fname"
                    autoComplete="first-name"
                    onChange={(event) => setFname(event.target.value)}
                />
                <Input
                    title="Last Name"
                    type="text"
                    className="form-control"
                    name="lname"
                    autoComplete="last-name"
                    onChange={(event) => setLname(event.target.value)}
                />
                <Input
                    title="Email Address"
                    type="email"
                    className="form-control"
                    name="email"
                    autoComplete="email-new"
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Input
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <hr />

                <input 
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                />


            </form>
        </div>
    )
}

export default Register;