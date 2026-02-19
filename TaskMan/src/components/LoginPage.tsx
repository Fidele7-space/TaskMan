import { useState } from "react";
import "../App.css";
export type FormEventType = React.FormEvent<HTMLFormElement>;

interface LoginPageProps {
  onLogin: (name: string) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEventType) => {
    e.preventDefault();
    // very light validation; you can extend it later
    if (!email || !password) return;
    onLogin(name || email.split("@")[0] || "Student");
  };

  return (
    <div className="login-root d-flex align-items-center justify-content-center">
      <div className="bg-blur-layer" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4 login-card">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="login-logo mb-2 d-inline-flex align-items-center justify-content-center">
                    🎓
                  </div>
                  <h3 className="fw-semibold mb-1">Student Task Manager</h3>
                  <p className="text-muted mb-0 small">
                    Organize your college life
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small">Name (optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label small">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check small">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberCheck"
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor="rememberCheck"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-link btn-sm text-decoration-none px-0"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-2">
                    Login
                  </button>

                  <p className="text-center text-muted small mb-0">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="text-decoration-none">
                      Sign Up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
