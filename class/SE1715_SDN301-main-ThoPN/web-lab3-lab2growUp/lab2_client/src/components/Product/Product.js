import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9999/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <Table>
        <thead>
          <tr>
            <th>_id</th>
            <th>name</th>
            <th>price</th>
            <th>description</th>
            <th>images</th>
            <th>comments</th>
            <th>category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <ul>
                  {product.images.map((image) => (
                    <li key={image._id}>
                      <img src={image.url} alt="Product" />
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {product.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </td>
              <td>{product.category.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Product;
