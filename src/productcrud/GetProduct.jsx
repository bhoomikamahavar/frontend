import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const GetProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const getProduct_ = async (s) => {
        try {
            const res = await fetch("http://localhost:7777/api/products", {
                credentials: "include"
            });

            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                setProducts(data);
            }

        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        getProduct_();
    }, []);
    return (
        <>
            <div>
                <div className="container py-5">
                    <div className="row">
                        {products.map((product) => {
                            return (
                                <div className="col-4 mb-5" key={product._id}>
                                    <div className="card">
                                        <img src={product.image} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <Link to={`/product/${product._id}`} className="btn btn-primary">Go somewhere</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetProducts