import React from 'react';
import { Button } from 'react-bootstrap';

import Translation from '../components/common/Translation';

import '../styles/not-found-page.css';

const NotFoundPage = () => (
  <div className="not-found-page">
    <h1>
      <Translation value="notFoundPage.title" />
    </h1>
    <div>
      <Button href="/students" size="lg">
        <Translation value="buttons.notFoundPage" />
      </Button>
    </div>
  </div>
);

export default NotFoundPage;
