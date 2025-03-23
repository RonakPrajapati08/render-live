// // // LoginPage.js
// import React, { useState, useEffect } from "react";
// import { auth } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (auth.currentUser) {
//       navigate("/chat"); // Redirect to chat if the user is already logged in
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/chat"); // Redirect to ChatPage after successful login
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <a href="/signup">Sign up here</a>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;

//This Code Bandh

// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState(""); // Add state for name
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (auth.currentUser) {
//       navigate("/chat"); // Redirect to chat if the user is already logged in
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear any previous error

//     try {
//       // Authenticate the user with email and password using Firebase Authentication
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Retrieve the user's document from Firestore to check if the user data exists
//       const userDocRef = doc(db, "users", user.uid);
//       const userDoc = await getDoc(userDocRef);

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         // Check if user has name and email in Firestore
//         if (userData.name && userData.email === email) {
//           // Redirect to ChatPage after successful login
//           navigate("/chat");
//         } else {
//           // Sign out and show an error if the profile is incomplete
//           await auth.signOut();
//           setError("Your profile information is incomplete or incorrect.");
//         }
//       } else {
//         // If no document is found, create a new document for the user in Firestore
//         await setDoc(doc(db, "users", user.uid), {
//           name: name, // Set the name field when creating the user document
//           email: email,
//           isOnline: true,
//         });
//         // Redirect to ChatPage after successful login
//         navigate("/chat");
//       }
//     } catch (error) {
//       setError("Invalid login credentials.");
//       console.error("Login error:", error.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <a href="/signup">Sign up here</a>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;

//FOR UI CODE UPDATED CODE

// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleImageUpload = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setProfileImage(e.target.result); // Save Base64 string
//       localStorage.setItem("profileImage", e.target.result); // Save image in local storage
//     };
//     reader.readAsDataURL(file);
//   };

//   useEffect(() => {
//     if (auth.currentUser) {
//       navigate("/chat");
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       const userDocRef = doc(db, "users", user.uid);
//       const userDoc = await getDoc(userDocRef);

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         if (userData.name && userData.email === email) {
//           navigate("/chat");
//         } else {
//           await auth.signOut();
//           setError("Your profile information is incomplete or incorrect.");
//         }
//       } else {
//         await setDoc(doc(db, "users", user.uid), {
//           name: name,
//           email: email,
//           isOnline: true,
//         });
//         navigate("/chat");
//       }
//     } catch (error) {
//       setError("Invalid login credentials.");
//       console.error("Login error:", error.message);
//     }
//   };

//   return (
//     <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-dark">
//       <div className="col-md-6 col-lg-4">
//         <div className="card shadow-sm p-4 shadow-lg">
//           <h2 className="text-center mb-4 fw-bold">R-Login</h2>
//           {error && <p className="text-danger text-center">{error}</p>}
//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 className="form-control"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control show"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="profileImage" className="form-label">
//                 Profile Image
//               </label>
//               <input
//                 type="file"
//                 id="profileImage"
//                 className="form-control"
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e.target.files[0])}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary w-100">
//               Login
//             </button>
//           </form>
//           <p className="text-center mt-3">
//             Don't have an account? <a href="/r-chat-app/signup">Sign up here</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleImageUpload = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setProfileImage(e.target.result); // Save Base64 string
//       localStorage.setItem("profileImage", e.target.result); // Save image in local storage
//     };
//     reader.readAsDataURL(file);
//   };

//   useEffect(() => {
//     if (auth.currentUser) {
//       navigate(`/chat/${auth.currentUser.uid}`, {
//         state: { successMessage: "Successfully logged in!" }, // Pass message on login
//       });
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       const userDocRef = doc(db, "users", user.uid);
//       const userDoc = await getDoc(userDocRef);

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         if (userData.name && userData.email === email) {
//           // Redirect to /chat with success message
//           navigate(`/chat/${user.uid}`, {
//             state: { successMessage: "Successfully logged in!" }, // Pass message on login
//           });
//         } else {
//           await auth.signOut();
//           setError("Your profile information is incomplete or incorrect.");
//         }
//       } else {
//         await setDoc(doc(db, "users", user.uid), {
//           name: name,
//           email: email,
//           isOnline: true,
//         });
//         // Redirect to /chat with success message
//         navigate(`/chat/${user.uid}`, {
//           state: { successMessage: "Successfully logged in!" }, // Pass message on login
//         });
//       }
//     } catch (error) {
//       setError("Invalid login credentials.");
//       console.error("Login error:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-dark">
//       <div className="col-md-6 col-lg-4">
//         <div className="card shadow-sm p-4 shadow-lg">
//           <h2 className="text-center mb-4 fw-bold">R-Login</h2>
//           {error && <p className="text-danger text-center">{error}</p>}
//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 className="form-control"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control show"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="profileImage" className="form-label">
//                 Profile Image
//               </label>
//               <input
//                 type="file"
//                 id="profileImage"
//                 className="form-control"
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e.target.files[0])}
//               />
//             </div>

//             <button type="submit" disabled={loading} className="btn btn-primary w-100">
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//           <p className="text-center mt-3">
//             Don't have an account? <Link to="/SignUp">Sign up here</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target.result);
      localStorage.setItem("profileImage", e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // 🔥 Fix: Ensure authentication state is correctly set
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(`/chat/${user.uid}`, {
          state: { successMessage: "Successfully logged in!" },
        });
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.name && userData.email === email) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          sessionStorage.setItem("successMessage", "Successfully logged in!");
          navigate(`/chat/${user.uid}`);
        } else {
          await auth.signOut();
          setError("Your profile information is incomplete or incorrect.");
        }
      } else {
        await setDoc(userDocRef, {
          name: name,
          email: email,
          isOnline: true,
        });

        localStorage.setItem("currentUser", JSON.stringify(user));
        sessionStorage.setItem("successMessage", "Successfully logged in!");
        navigate(`/chat/${user.uid}`);
      }
    } catch (error) {
      setError("Invalid login credentials.");
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-dark">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm p-4 shadow-lg">
          <h2 className="text-center mb-4 fw-bold">R-Login</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control show"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profileImage" className="form-label">
                Profile Image
              </label>
              <input
                type="file"
                id="profileImage"
                className="form-control"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/SignUp">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// LoginPage.js
// import React, { useState, useEffect } from "react";
// import { auth } from "../firebaseConfig"; // Ensure Firebase is configured properly in firebaseConfig.js
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState(""); // Track email input
//   const [password, setPassword] = useState(""); // Track password input
//   const [error, setError] = useState(""); // Track any login error messages
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect if already logged in
//     if (auth.currentUser) {
//       navigate("/chat"); // Redirect to chat if the user is already logged in
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       // Authenticate using Firebase
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/chat"); // Redirect to ChatPage after successful login
//     } catch (error) {
//       setError("Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <a href="/signup">Sign up here</a>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig"; // Firebase config
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ setChatUser }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (auth.currentUser) {
//       navigate("/chat");
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Fetch the user's name from Firestore
//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       const userData = userDoc.data();

//       // Pass user name to ChatPage
//       setChatUser({ uid: user.uid, name: userData.name });
//       navigate("/chat");
//     } catch (error) {
//       setError("Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <a href="/signup">Sign up here</a>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;
