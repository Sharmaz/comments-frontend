import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { commentDataMock } from './__mocks__/commentDataMock';
import App from '../src/App';

describe('App component', () => {
  test('App component fetch error', async () => {
    // eslint-disable-next-line
    global.fetch = jest.fn().mockImplementation((): void => new (Promise.reject as any)(new Error('something bad happened')));
    render(<App />);
    const renderError = screen.getByText(/Error/);
    expect(renderError).toBeInTheDocument();
  });
  test('App component fetch loading', async () => {
    global.fetch = jest.fn().mockImplementation(() => new Promise(
      (resolve) => resolve({ json: () => commentDataMock, ok: true }),
    ));
    render(<App />);
    const renderLoading = screen.getByText(/Loading/);
    expect(renderLoading).toBeInTheDocument();
  });
  test('App component render', async () => {
    global.fetch = jest.fn().mockImplementation(() => new Promise(
      (resolve) => resolve({ json: () => commentDataMock, ok: true }),
    ));
    render(<App />);
    await waitFor(() => screen.getByText('Leave Comments'));
    await expect(screen.getByText('Leave Comments')).toBeInTheDocument();
  });
});

