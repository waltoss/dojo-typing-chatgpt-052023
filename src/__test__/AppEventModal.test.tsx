import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import AppEventModal from '../AppEventModal';

const queryClient = new QueryClient();

function renderWithMocks(children: JSX.Element) {
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('AppEventModal', () => {
  test('it should display a success message when an event is submitted', async () => {
    nock(process.env.API_ENDPOINT!).post('/patient').reply(200);
    renderWithMocks(<AppEventModal />);

    const name = await screen.findByPlaceholderText('Event name');
    userEvent.type(name, 'Hello');

    const date = await screen.findByLabelText('Event date');
    userEvent.type(date, '02/02/1995');

    const button = await screen.findByText('Add event');
    userEvent.click(button);

    const success = await screen.findByText('Event added');
    expect(success).toBeInTheDocument();
  });
});
