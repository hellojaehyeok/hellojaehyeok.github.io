import * as React from 'react';
import { ReactNode } from 'react';

import './index.scss';

const Title = ({ children }: { children: ReactNode }) => {
  return <h1 className="post-title">{children}</h1>;
};

export default Title;
