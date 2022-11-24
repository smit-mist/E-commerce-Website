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
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import Footer from "../../components/Footer/Footer.js";

// packages
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { UncontrolledAlert } from "reactstrap";

export default function ResetPassword() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const token = useParams().token;

  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const passwords = { password: pass, confirmPassword: pass };
    dispatch(resetPassword(token, passwords));
  };

  useEffect(() => {
    if (error) {
      setIsError(true);
      dispatch(clearErrors());
    }

    if (success) {
      setIsComplete(true);
      //   navigate("/login");
    }
  }, [dispatch, error, success]);

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

  return (
    <>
      <ExamplesNavbar />

      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />

          <div className="content">
            {isComplete ? (
              <UncontrolledAlert color="info">
                <strong>Password</strong> updated successfully.
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
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
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
                      <CardTitle tag="h4">reset</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="New Password"
                            type="password"
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                            onChange={(e) => setPass(e.target.value)}
                          />
                        </InputGroup>
                        <FormGroup className="text-left">
                          <span className="form-check-sign" />
                          All set? <a href="/login-page">Login</a>.
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={resetPasswordSubmit}
                      >
                        Reset
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
}
