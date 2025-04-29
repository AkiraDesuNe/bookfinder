document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchType = document.getElementById('searchType');
    const bookResults = document.getElementById('bookResults');
    const newBooks = document.getElementById('newBooks');
    const sellerResults = document.getElementById('sellerResults');
  
    // Mock Data
    const mockBooks = Array.from({ length: 20 }, (_, i) => ({
      title: `Livro ${i + 1}`,
      description: `Descrição do Livro ${i + 1}. Um resumo interessante do conteúdo deste livro fictício.`,
      author: `Autor ${i + 1}`,
      image: `https://via.placeholder.com/150x200?text=Livro+${i + 1}`
    }));
  
    const mockSellers = [
      { name: "Biblioteca Central", description: "Uma biblioteca pública com uma vasta coleção de livros clássicos e modernos." },
      { name: "Livraria Cultura", description: "Uma das maiores livrarias com eventos culturais frequentes..." },
      { name: "Sebinho do Bairro", description: "Especializado em livros usados, ótimos preços e raridades..." }
    ];
  
    function renderBooks(books, container) {
      container.innerHTML = books.map(book => `
        <div class="book-card">
          <img src="${book.image}" alt="${book.title}">
          <div class="book-popup">
            <strong>${book.title}</strong><br>
            ${book.description}<br>
            <em>${book.author}</em>
          </div>
        </div>
      `).join('');
    }
  
    function renderSellers(sellers) {
      sellerResults.innerHTML = sellers.map(seller => `
        <div class="seller-card">
          <h3>${seller.name}</h3>
          <p>${seller.description}</p>
        </div>
      `).join('');
    }
  
    function search() {
      const query = searchInput.value.toLowerCase();
      const type = searchType.value;
  
      if (type === 'books') {
        const filtered = mockBooks.filter(b => b.title.toLowerCase().includes(query));
        renderBooks(filtered, bookResults);
      } else {
        const filtered = mockSellers.filter(s => s.name.toLowerCase().includes(query));
        renderSellers(filtered);
      }
    }
  
    searchInput.addEventListener('input', search);
  
    // Load mock data initially
    renderBooks(mockBooks.slice(0, 10), bookResults); // Recomendados
    renderBooks(mockBooks.slice(10), newBooks);       // Novidades
    renderSellers(mockSellers);
  });
  