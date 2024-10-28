import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import commentDataMock from './__mocks__/commentDataMock';
import App from '../src/App';

test('App component render', async () => {
  global.fetch = jest.fn().mockImplementation(() => new Promise(
    (resolve) => resolve({ json: () => commentDataMock, ok: true }),
  ));
  render(<App />);
  await waitFor(() => screen.getByText('Leave Comments'));
  await expect(screen.getByText('Leave Comments')).toBeInTheDocument();
});
