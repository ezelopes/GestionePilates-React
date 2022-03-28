import React from 'react';
import { Button } from 'react-bootstrap';

const NotFoundPage = () => (
  <div className="not-found-page">
    <h1> Oops! Ti sei persa? </h1>
    <div>
      <Button href="/paginaallieve" size="lg">
        Torna alla Lista delle Allieve
      </Button>
    </div>
  </div>
);

export default NotFoundPage;
