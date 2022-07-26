import React from 'react';
import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProjectDetail from './pages/ProjectDetail';
const cache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        clients:{
          merge(existing,incoming){
            return incoming;
          }
        },
        projects:{
          merge(existing, incoming){
            return incoming
          }
        }
      }
    }
  }
})
const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
  cache: cache
})
const App=()=>{
  return(
    <div>
      <ApolloProvider client = {client}>
        <Router>
          <Header/>
          <div className='container'>
            <Routes>
              <Route path="/" element ={<Home/>}/>
              <Route path="/project/:id" element={<ProjectDetail/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
        
      </ApolloProvider>
      
    </div>
  )
}

export default App;