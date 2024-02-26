import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProducts = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [nameProduct, setNameProduct] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [productImage, setProductImage] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:9999/category");
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Handle error appropriately (e.g., show error message to the user)
            }
        };

        fetchCategories();
    }, []);

    const IsValidate = () => {
        let isproceed = true;

        if (!nameProduct || nameProduct.trim() === "") {
            isproceed = false;
        }
        if (!price || price.trim() === "" || price <= 0) {
            isproceed = false;
        }
        if (!description || description.trim() === "") {
            isproceed = false;
        }
        if (!selectedCategory || selectedCategory.trim() === "") {
            isproceed = false;
        }

        return isproceed;
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        if (IsValidate()) {
            const product = { name: nameProduct, price, description, category: selectedCategory, images: productImage };
            console.log(product);
            fetch('http://localhost:9999/products', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add product');
                }
                return response.json();
            })
            .then(() => {
                toast.success("Add successful")
                navigate("/");
            })
            .catch(error => {
                console.error('Error adding product:', error);
                // Xử lý lỗi
            });
        }
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        const reader = new FileReader();
        reader.onloadend = () => {
            const image = {
                url: reader.result, 
                name: "hiihi", 
                caption: "Your Caption Here" 
            };
            setProductImage([image]);
        };
        reader.readAsDataURL(file);
    };
    
    



    return (
        <Col className="offset-md-2 col-md-8" style={{ border: "1px solid red", marginTop: "100px", padding: "30px" }}>
            <Row>
                <Col style={{ textAlign: "center" }}>
                    <h3>Add Product</h3>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form onSubmit={handelSubmit}>
                        <Row>
                            <Col md={6} className="offset-md-3">
                                <Form.Group>
                                    <Form.Text>
                                        Name <span style={{ color: "red" }}>*</span>
                                    </Form.Text>
                                    <Form.Control
                                        value={nameProduct}
                                        onChange={(e) => setNameProduct(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} className="offset-md-3">
                                <Form.Group>
                                    <Form.Text>
                                        Description <span style={{ color: "red" }}>*</span>
                                    </Form.Text>
                                    <Form.Control
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="offset-md-3">
                                <Form.Group>
                                    <Form.Text>
                                        Category <span style={{ color: "red" }}>*</span>
                                    </Form.Text>
                                    <Form.Control
                                        as="select"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category._id}>{category.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="offset-md-3">
                                <Form.Group>
                                    <Form.Text>Price</Form.Text>
                                    <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} />
                                    {price <= 0 && <Form.Text style={{ color: 'red' }}>Please enter product price &gt; 0</Form.Text>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="offset-md-3">
                                <Form.Group>
                                    <Form.Text>Image</Form.Text>
                                    <Form.Control type="file" onChange={handleImageChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="offset-md-3" style={{ textAlign: "center", paddingTop: "20px" }}>
                                <Button className="btn btn-success" type="submit">Save</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Link to={"/"} className="btn btn-danger">Back Home</Link>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
};

export default AddProducts;
