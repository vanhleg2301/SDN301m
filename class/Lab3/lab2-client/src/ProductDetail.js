import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState("");
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [rate, setRate] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9999/products/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setCategory(result.category.name);
        if (result.images && result.images.length > 0) {
          setImages(result.images[0].url);
        }
        setProduct(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchProduct();
  }, [id]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:9999/products/comments/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        setComments(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchProduct();
  }, [id]);

  const postComment = async (event) => {
    event.preventDefault();
    const comment = { author, text, rate };
    console.log(comment);
    try {
      const response = await fetch(`http://localhost:9999/comment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }
      const data = await response.json();
      console.log("Comment posted:", data);
      window.location.reload();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Link to={"/"} className="btn btn-danger float-start">
        Back Home
      </Link>

      <h2 className="text-2xl font-bold mb-4">Product Detail</h2>
      {error && <p className="text-danger">Error: {error.message}</p>}
      <Row>
        <Card.Title style={{ textAlign: "center", margin: "10px" }}>
          ID:{product._id}
        </Card.Title>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Card className="custom-card">
            <Card.Img
              style={{ height: "350px", width: "auto" }}
              src={images}
              alt={product.name}
            />
          </Card>
        </Col>

        <Col md={6}>
          <Card className="custom-card">
            <Card.Body style={{ height: "350px" }}>
              <Card.Text
                className="h3"
                style={{ textAlign: "center", margin: "20px", color: "black" }}
              >
                Name: {product.name}
              </Card.Text>
              <Card.Text style={{ textAlign: "center", margin: "20px" }}>
                Category: {category}
              </Card.Text>
              <Card.Text
                style={{ textAlign: "center", margin: "20px", color: "red" }}
              >
                Price: {product.price}
              </Card.Text>
              <Card.Text style={{ textAlign: "center", margin: "20px" }}>
                Description: {product.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h3 className="text-center mb-4">Leave a Comment</h3>
          {/* Đây là nơi bạn có thể thêm form để người dùng nhập bình luận và gửi đi */}
          {/* Ví dụ: */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rate:</Form.Label>
              <br />
              {[1, 2, 3, 4, 5].map((value) => (
                <Form.Check
                  key={value}
                  inline
                  type="radio"
                  label={
                    <label
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      {value}
                      <FontAwesomeIcon icon={faStar} />
                    </label>
                  }
                  name="rate"
                  value={value}
                  checked={parseInt(rate) === value}
                  onChange={(e) => setRate(e.target.value)}
                />
              ))}
            </Form.Group>
            <Button onClick={postComment} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h3 className="text-center mb-4">Comments</h3>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Card key={index} className="mb-3">
                <Card.Body className="d-flex flex-column">
                  <div className=" float-start">
                    <Card.Title style={{ textAlign: "start" }}>
                      {comment.author}
                    </Card.Title>
                    <Card.Text style={{ textAlign: "start" }}>
                      {comment.text}
                    </Card.Text>
                  </div>
                  <Card.Text className="mt-auto text-end">
                    Rate: {comment.rate}
                    <i className="fa-solid fa-star"></i>{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-muted">No comments yet</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
