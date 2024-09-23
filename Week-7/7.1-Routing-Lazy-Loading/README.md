# Routing

1) Client side bundle : The single large js file you get from the backend.

2) Client side routing : Making sure to serve the right set of code files, depending on the page, the user is on.

## Ways of implementing the Client side routing : 

#### Way 1 : Creating the routes in App.jsx file, using BrowserRouter, Routes and Route(utilities) provided by react-router-dom. 
```javascript
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
```

__NOTE :__ No changes should be made in the main.jsx file.

#### Way 2 : Creating the routes in main.jsx file, using createBrowserRouter and RouterProvider(utilities) provided by react-router-dom.
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
```

### useNavigate hook : 
    - The useNavigate hook is a new addition to React Router 6. 
    
    - It's a replacement for the useHistory and useLocation hooks in previous versions of React Router. 

    - The useNavigate hook provides a simple and intuitive API for navigating between pages in your React application. 

    - It's designed to be used with functional components and hooks, and it simplifies the process of handling URL changes in your application.

```javascript
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Contact() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

  return (
    <div>
        <h1>Contact us : +91 6361670056</h1>
        <button onClick={handleClick}>Back to Home</button>
    </div>
  )
}

export default Contact;
```
### NOTE : 
1) To set the path using the window object : (not the right way) window.locaation.href = "/";

2) useNavigate hook must be used inside/within the `<BrowserRouter> </BrowserRouter>`, or else useNavigate hook will not work

## Lazy Loading : 
    - Lazy loading is a performance optimization technique used to improve the efficiency and speed of web applications.

    - Lazy loading in React allows you to split your code into smaller chunks, loading only the code that is needed for a particular part of your application when it is actually required.

    - Lazy loading in React is a technique used to improve performance by delaying the loading of components or other assets until they are actually needed.

    - This can help reduce the initial load time of your application and improve user experience, especially for larger applications with many components or heavy assets.

__NOTE :__ When you're sending the request to backend, you receive the response in the form of JSON, through Lazy Loading, we're getting the actual data and not the JSON data.