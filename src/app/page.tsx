'use client';
import { useState } from 'react';
import styles from './page.module.css';
import ItemCount from './components/ItemCount';

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
                {productArray.map((product, i) => {
                    return (
                        <div key={product.name + i}>
                            <button
                                className={styles.card}
                                onClick={() => addToCart(product.name)}
                                aria-label="Add to basket"
                            >
                                <h2>
                                    {product.name} <span>-&gt;</span>
                                </h2>
                                <p>{product.desc}</p>
                            </button>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
