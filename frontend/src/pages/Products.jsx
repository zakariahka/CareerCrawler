import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "1", title: "socks" },
  { id: "2", title: "shirts" },
  { id: "3", title: "pants" },
];

export default function Products() {
  return (
    <>
      <h1>Products Page!</h1>
      <ul>
        {PRODUCTS.map((prod) => (
          <li key={prod.id}>
            <Link to={prod.id}>{prod.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
