import { render, screen, act } from '@testing-library/react';
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
        render(<Home />);

        const buttons = screen.getAllByRole('button', {
            name: /Add to basket/i,
        });

        await act(async () => {
            buttons[0].click();
        });

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });

        expect(basketButton).toHaveTextContent(/Basket: 1 item$/);
    });

    it('renders a basket with 1 of item 1 and 2 of item 2', async () => {
        render(<Home />);

        const buttons = screen.getAllByRole('button', {
            name: /Add to basket/i,
        });

        await act(async () => {
            buttons[0].click();
            buttons[1].click();
            buttons[1].click();
        });

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });

        expect(basketButton).toHaveTextContent(/Basket: 2 items$/);
    });
});
