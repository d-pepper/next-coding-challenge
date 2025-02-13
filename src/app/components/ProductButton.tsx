import styles from '../page.module.css';

export default function ProductButton({
    addProduct,
    product,
}: {
    addProduct: (productName: string) => void;
    product: { name: string; desc: string };
}) {
    return (
        <button className={styles.card} onClick={() => addProduct(product.name)} aria-label="Add to basket">
            <h2>
                {product.name} <span>-&gt;</span>
            </h2>
            <p>{product.desc}</p>
        </button>
    );
}
