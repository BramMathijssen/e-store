import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async() => {
      const res = await fetch('http://localhost:5245/api/products');
      const data = await res.json();
      setProducts(data)
    }
    fetchProducts();
  }, [])

  return (
      <div>
        <ul>
          {products.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
  )
}

export default App
