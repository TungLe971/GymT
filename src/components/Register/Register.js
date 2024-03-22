import React from 'react';

const Register = () => {
  return (
    <div id="layoutAuthentication" className="bg-primary">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4" style={{ color: 'white', fontSize: '2.5rem' }}>
                      Create Account
                    </h3>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <label for="inputFirstName">First name</label>
                            <input
                              className="form-control"
                              id="inputFirstName"
                              type="text"
                              placeholder="Enter your first name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <label for="inputLastName">Last name</label>
                            <input
                              className="form-control"
                              id="inputLastName"
                              type="text"
                              placeholder="Enter your last name"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <label for="inputEmail">Email address</label>
                        <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <label for="inputPassword">Password</label>
                            <input
                              className="form-control"
                              id="inputPassword"
                              type="password"
                              placeholder="Create a password"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <label for="inputPasswordConfirm">Confirm Password</label>
                            <input
                              className="form-control"
                              id="inputPasswordConfirm"
                              type="password"
                              placeholder="Confirm password"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 mb-0">
                        <div className="d-grid">
                          <a className="btn btn-primary btn-block" href="login">
                            Create Account
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* <div className="card-footer text-center py-3">
                    <div className="small">
                      <a href="login.html">Have an account? Go to login</a>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;
