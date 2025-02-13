'use client';
import { useState } from 'react';
import styles from './page.module.css';
import ItemCount from './components/ItemCount';
import ProductButton from './components/ProductButton';

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
                <div className={styles.basketContainer}>
                    <button className={styles.basket}>
                        Basket: {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </button>
                    {productArray.map((product) => {
                        return (
                            <ItemCount
                                key={product.name}
                                name={product.name}
                                count={items.find((item) => item.name === product.name)?.quantity || 0}
                            />
                        );
                    })}
                </div>
            </div>

            <div className={styles.grid}>
                {productArray.map((product, i) => {
                    return <ProductButton key={product.name + i} addProduct={addToCart} product={product} />;
                })}
            </div>
        </main>
    );
}
