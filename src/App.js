import React from 'react';
import './App.css';
import { Layout, Navigation, Header, Content } from 'react-mdl';
import { Link } from 'react-router-dom';

import Main from './components/main';

function App() {
  return (
    <div className="demo-big-content">
      <Layout>
        <Header
          className="header-color"
          title={
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'white',
                fontFamily: 'Roboto, monospace',
                fontSize: '1.2em'
              }}
            >
              PilArt
            </Link>
          }
          scroll
        >
          <Navigation>
            <Link
              className="nav-link"
              style={{ fontFamily: 'Roboto, monospace', fontSize: '1.2em' }}
              to="/paginaallieve"
            >
              Allieve
            </Link>
            <Link
              className="nav-link"
              style={{ fontFamily: 'Roboto, monospace', fontSize: '1.2em' }}
              to="/iscrizioneallieve"
            >
              Iscrizione Allieve
            </Link>
            <Link
              className="nav-link"
              style={{ fontFamily: 'Roboto, monospace', fontSize: '1.2em' }}
              to="/modificaeliminaallieva"
            >
              Modifica / Elimina Allieva
            </Link>
            <Link
              className="nav-link"
              style={{ fontFamily: 'Roboto, monospace', fontSize: '1.2em' }}
              to="/paginainsegnanti"
            >
              Insegnanti
            </Link>
          </Navigation>
        </Header>
        {/* <Drawer
          title={
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              My Portfolio
            </Link>
          }
        >
          <Navigation>
            <Link to="/resume">Resume</Link>
            <Link to="/aboutme">About Me</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
          </Navigation>
        </Drawer> */}
        <Content>
          <Main />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
