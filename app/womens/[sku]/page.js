"use client"

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import Sale from "@/components/Sale";
import Toolbar from "@/components/Toolbar";
import MainDetail from "@/components/detail/MainDetail";

export default function Page() {
    const [isSale, setIsSale] = useState(true);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { sku } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${sku}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [sku]);

    return (
        <div>
           
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <MainDetail product={product} />
            )}
        </div>
    );
}