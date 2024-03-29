import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Progress,
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import Footer from "../../components/Footer/Footer.js";

// packages
import { UncontrolledAlert } from "reactstrap";

import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState, useEffect } from "react";
import ProgressBar from "components/ProgressBar/ProgressBar.jsx";

const ForgotPassword = () => {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if(!loading && progress !== 0){
      setProgress(0);
    }
    const interval = setInterval(() => {
      setProgress((oldvalue) => {
        let newValue = oldvalue + 1;

        if (newValue > 98) {
          clearInterval(interval);
        }

        return newValue;
      });
    }, 80);
  }, []);

  useEffect(() => {
    if (error) {
      setIsError(true);
      setProgress(0);
      dispatch(clearErrors());
    }
    if (message) {
      setIsSent(true);
    }
  }, [dispatch, error, message]);

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  const forgotPassword1 = (e) => {
    e.preventDefault();
    if (email === "") {
      setIsError(true);
      return;
    }
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
    console.log("Frogot password succes");
  };

  return (
    <>
      <ExamplesNavbar />

      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />

          <div className="content">
            {isSent ? (
              <UncontrolledAlert color="danger">
                <strong>Link</strong> is emailed to you.
              </UncontrolledAlert>
            ) : isError ? (
              <UncontrolledAlert color="danger">
                <strong>Somethings not right!</strong> You should check in on
                some of those fields below.
              </UncontrolledAlert>
            ) : (
              <></>
            )}

            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="4" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png")}
                      />
                      <CardTitle tag="h5">Reset</CardTitle>
                    </CardHeader>
                    <CardBody>
                      {loading ? (
                        <ProgressBar
                          lable="loading"
                          completed={progress}
                          colorClass="info"
                        />
                      ) : (
                        <></>
                      )}
                      <Form className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            required
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={forgotPassword1}
                      >
                        Send
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ForgotPassword;
