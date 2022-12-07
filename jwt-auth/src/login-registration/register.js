import React from "react";

const Register = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState({
    nameErrorMsg: "",
    accountNumberErrorMsg: "",
    aadharNumberErrorMsg: "",
    panNumberErrorMsg: "",
    balanceErrorMsg: "",
  });

  const name = useRef();
  const accountNumber = useRef();
  const aadharNumber = useRef();
  const panNumber = useRef();
  const balance = useRef();

  // useEffect(()=>{
  //   const tocken = localStorage.getItem('token')
  //   if(tocken){
  //     navigate("/teams");
  //   }
  // })

  // const login =(e)=>{
  //   e.preventDefault();
  //   axiox.post("http://localhost:5000/api/auth/login",{
  //     email,
  //     password
  //   }).then((response)=>{
  //     localStorage.setItem("login",JSON.stringify({
  //       userLogin:true,
  //       token:response.data.access_token
  //     }))
  //     setErrorMsg({
  //             nameErrorMsg: "responseOfData.error.message",
  //           });
  //   }).catch((error)=>  setErrorMsg({
  //           nameErrorMsg: error,
  //         }));

  // }

  const onLogin = (aEvent) => {
    aEvent.preventDefault();
    // const enteredEmail = email.current.value;
    // const enteredPassword = password.current.value;
    if (!isFormValid()) {
      console.log("jsjshshshshshshshshsh");
      return;
    }
    /* const blog = { enteredEmail, enteredPassword };
    fetchLogin(blog); */
  };

  /* const fetchLogin = async (blog) => {
    const responseOfApi = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseOfData = await responseOfApi.json();
    if (!responseOfApi.ok) {
      setErrorMsg({
        nameErrorMsg: responseOfData.error.message,
      });
      return;
    }

    // dispatch(authActions.login(responseOfData.idToken));
    // navigate("/teams");
  }; */

  const isFormValid = () => {
    const nameErrorMsg = validateAccount(name);
    const accountNumberErrorMsg = validateName(accountNumber);
    const aadharNumberErrorMsg = validatePan_AdharNumber(aadharNumber);
    const panNumberErrorMsg = validatePan_AdharNumber(panNumber);
    const balanceErrorMsg = validateBalance(balance);

    setErrorMsg({
      nameErrorMsg: nameErrorMsg,
      accountNumberErrorMsg: accountNumberErrorMsg,
      aadharNumberErrorMsg: aadharNumberErrorMsg,
      panNumberErrorMsg: panNumberErrorMsg,
      balanceErrorMsg: balanceErrorMsg,
    });

    if (
      (nameErrorMsg ||
        accountNumberErrorMsg ||
        aadharNumberErrorMsg ||
        panNumberErrorMsg ||
        balanceErrorMsg) === ""
    ) {
      return true;
    }
  };

  const validateField = (aUserInput) => {
    return !aUserInput ? `Please Enter Valid Input` : "";
  };

  phoneNoValidator = (aUserInput) => {
    return aUserInput === ""
      ? "Phone is required"
      : this.state.user.phone.length !== 10
      ? "Phone no is 10 digit"
      : "";
  };

  return <h1>"hghg</h1>;
};
export default Register;
