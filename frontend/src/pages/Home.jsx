import { useState, useEffect } from 'react'
import { api } from '../api'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      item => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      existingCart.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("Added to cart");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/getproducts')
        setProducts(response.data.data.products)
      } catch (err) {
        setError('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <div className="header-info"><h2>Loading awesome products...</h2></div>
  if (error) return <div className="alert">{error}</div>

  return (
    <div>
      <div className="header-info">
        <h1>Discover Premium Products</h1>
        <p style={{ color: '#94a3b8' }}>Upgrade your lifestyle with our exclusive collection.</p>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="glass product-card">
            <div className="product-title">{product.name}</div>
            <img src={product.imageUrl} alt=""  />
            <p style={{ color: '#cbd5e1', marginBottom: '1rem', flex: 1 }}>{product.description}</p>
            <div className="product-price">${product.price}</div>
            <button className="btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {products.length === 0 && <p style={{ textAlign: 'center' }}>No products found. Run the seed script in your backend!</p>}
   
    </div>
  )
}

export default Home
