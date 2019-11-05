import App from './App.js';

// Attach App to the root div.  If there were other pages to this application 
// besides the table view of data I would need to create a real router at this 
// point.
document.getElementById('root').appendChild(new App().getElement());
