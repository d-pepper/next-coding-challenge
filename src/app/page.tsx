'use client';
import { useState } from 'react';
import styles from './page.module.css';

function ItemCount({ count, name }: { count: number; name: string }) {
    return (
        <div key={name}>
            {name} count: {count}
        </div>
    );
}

export default function Home() {
    const [items, setItems] = useState<{ name: string; quantity: number }[]>([]);
    const [itemCount, setItemCount] = useState<number>(0);

    const productArray = [
        { name: 'Item 1', desc: 'Foo' },
        { name: 'Item 2', desc: 'Bar' },
        { name: 'Item 3', desc: 'Baz' },
        { name: 'Item 4', desc: 'Qux' },
    ];

    const addToCart = (product: string) => {
        const alreadyInCart = items.find((item) => item.name === product);
        if (alreadyInCart) {
            const updatedItems = items.map((item) => {
                if (item.name === product) {
                    return {
                        name: item.name,
                        quantity: item.quantity + 1,
                    };
                } else return item;
            });
            setItems(updatedItems);
        } else {
            setItems([...items, { name: product, quantity: 1 }]);
        }
        setItemCount(itemCount + 1);
    };

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>Michael&apos;s Amazing Web Store</p>
                <div>
                    <button className={styles.basket}>
                        Basket: {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </button>
                    {productArray.map((product) => {
                        return (
                            <div key={product.name}>
                                <ItemCount
                                    name={product.name}
                                    count={items.find((item) => item.name === product.name)?.quantity || 0}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.grid}>
                <button className={styles.card} onClick={() => addToCart('Item 1')} aria-label="Add to basket">
                    <h2>
                        Item 1 <span>-&gt;</span>
                    </h2>
                    <p>Foo</p>
                </button>
                <button className={styles.card} onClick={() => addToCart('Item 2')} aria-label="Add to basket">
                    <h2>
                        Item 2 <span>-&gt;</span>
                    </h2>
                    <p>Bar</p>
                </button>
                <button className={styles.card} onClick={() => addToCart('Item 3')} aria-label="Add to basket">
                    <h2>
                        Item 3 <span>-&gt;</span>
                    </h2>
                    <p>Baz</p>
                </button>
                <button className={styles.card} onClick={() => addToCart('Item 4')} aria-label="Add to basket">
                    <h2>
                        Item 4 <span>-&gt;</span>
                    </h2>
                    <p>Qux</p>
                </button>
            </div>
        </main>
    );
}
