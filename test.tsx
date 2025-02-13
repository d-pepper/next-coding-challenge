import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Home from '@/app/page';

describe('Home', () => {
    it('renders an empty basket', () => {
        render(<Home />);

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });

        expect(basketButton).toHaveTextContent('Basket: 0 items');
    });

    it('renders a basket with 1 item', async () => {
        const user = userEvent.setup();

        render(<Home />);

        const buttons = screen.getAllByRole('button', {
            name: /Add to basket/i,
        });

        await user.click(buttons[0]);

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });

        expect(basketButton).toHaveTextContent(/Basket: 1 item$/);
    });

    it('renders a basket with 1 of item 1 and 2 of item 2', async () => {
        const user = userEvent.setup();

        render(<Home />);

        const buttons = screen.getAllByRole('button', {
            name: /Add to basket/i,
        });

        await user.click(buttons[0]);
        await user.click(buttons[1]);
        await user.click(buttons[1]);

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });

        const item1Count = screen.getByText(/Item 1 count/);
        const item2Count = screen.getByText(/Item 2 count/);

        expect(item1Count).toHaveTextContent(/Item 1 count: 1$/);
        expect(item2Count).toHaveTextContent(/Item 2 count: 2$/);
        expect(basketButton).toHaveTextContent(/Basket: 3 items$/);
    });
});
