const products = fetch("localhost:5000/api/filter/products").
then(response => data).then(data.json())

console.log(products)
  
  // Function to display products
  function displayProducts(productList) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    productList.forEach(product => {
      const productCard = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Rating: ${product.rating} ⭐</p>
          <p class="price">$${product.price.toFixed(2)}</p>
        </div>
      `;
      productsContainer.innerHTML += productCard;
    });
  }
  
  // Sorting Function
  function sortProducts(criteria) {
    let sortedProducts = [...products];
    if (criteria === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (criteria === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (criteria === 'rating-desc') {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    displayProducts(sortedProducts);
  }
  
  // Filtering Function
  function filterProducts(minRating) {
    const filteredProducts = products.filter(product => product.rating >= minRating);
    displayProducts(filteredProducts);
  }
  
  // Event Listeners for Sorting and Filtering
  document.getElementById('sort').addEventListener('change', (event) => {
    sortProducts(event.target.value);
  });
  
  document.getElementById('filter').addEventListener('change', (event) => {
    filterProducts(parseFloat(event.target.value));
  });
  
  // Initial display of products
  displayProducts(products);
  