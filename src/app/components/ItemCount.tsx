export default function ItemCount({ count, name }: { count: number; name: string }) {
    return (
        <div key={name}>
            {name} count: {count}
        </div>
    );
}
