import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { commentListDataMock } from './__mocks__/commentDataMock';
import CommentList from '../src/components/CommentList';

describe('CommentListcomponent', () => {

  test('CommentList component render a list of comments', async () => {
    global.fetch = jest.fn().mockImplementation(() => new Promise(
      (resolve) => resolve({ json: () => commentListDataMock, ok: true }),
    ));
    render(<CommentList comments={commentListDataMock} />);
    const comments = await waitFor(() => screen.getAllByText('mock@ivanrobles.pro'));
    await expect(Array.isArray(comments)).toBe(true);
  });
});
