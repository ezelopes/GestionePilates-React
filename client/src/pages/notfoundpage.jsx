import React from 'react';
import { Button } from 'react-bootstrap';

import Translation from '../components/common/Translation';

const NotFoundPage = () => (
  <div className="not-found-page">
    <h1>
      <Translation value="notFoundPage.title" />
    </h1>
    <div>
      <Button href="/paginaallieve" size="lg">
        <Translation value="buttons.notFoundPage" />
      </Button>
    </div>
  </div>
);

export default NotFoundPage;
