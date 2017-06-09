import React from 'react';

export const LoginView = ({loginState, onChange, onSubmit}) => {
    const {errors, username, password, isLoading} = loginState;

    return (
        <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <form onSubmit={onSubmit}>
                    <h1>Login</h1>

                    <div className="form-group">
                        <label className="control-label">Username</label>
                        <input
                            name="username"
                            onChange={onChange}
                            className="form-control"
                        />
                        {errors.username && <span className="help-block">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={onChange}
                        />
                        {errors.password && <span className="help-block">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
