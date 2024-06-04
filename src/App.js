import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route,Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PdfPreview from './pages/PdfPreview';
import ImageUpload from './pages/ImageUpload';
import PreviewPage from './pages/PreviewPage';
import ImageUpload2 from './pages/ImageUpload2';


const App = () =>{
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ImageUpload2} />
        <Route path="/file" exact component={PdfPreview}/>
        <Route path="/image" exact component={ImageUpload}/>
      </Switch>
    </Router>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
