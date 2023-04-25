import * as React from 'react';

import './index.scss';

const Contents = ({ html }: { html: string }) => {
  return <div className="post-contents" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Contents;
