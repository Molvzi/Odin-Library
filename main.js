const books = [
    {
        title: "JavaScript高级程序设计",
        author: "Nicholas C. Zakas",
        pages: 700,
        cover: "https://picsum.photos/250/300?random=1",
        description: "深入探讨JavaScript语言核心机制",
        isRead: true
    },
    {
        title: "算法导论",
        author: "Thomas H. Cormen",
        pages: 800,
        cover: "https://picsum.photos/250/300?random=2",
        description: "计算机算法的经典教材",
        isRead: false
    },
    {
        title: "设计模式",
        author: "Erich Gamma",
        pages: 400,
        cover: "https://picsum.photos/250/300?random=3",
        description: "软件开发中的设计模式指南",
        isRead: false
    }
]
// 图书类
function Book(title, author, pages, cover, description, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.cover = cover;
    this.description = description;
    this.isRead = isRead;
}

// 添加图书到图书馆
function addBookToLibrary(title, author, pages, cover, description, isRead) {
    const newBook = new Book(title, author, pages, cover, description, isRead);
    books.push(newBook);
    renderBooks();
}

// 渲染图书列表
function renderBooks() {
    const container = document.getElementById('booksContainer')
    container.innerHTML = books.map((book,index) => `
        <div class = "book-card">
            <button class="delete-btn" onclick="removeBook(${index})">&times</button>
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <h2 class="book-title">${book.title}</h2>
                <p class="book-author">作者: ${book.author}</p>
                <p class="book-pages">页数: ${book.pages}</p>
                <p class="book-description">${book.description}</p>
                <button
                    class="status-btn ${book.isRead ? 'read' : 'unread'}"
                    onclick="toggelReadStatus(${index})"
                >
                    ${book.isRead ? '已读' : '未读'}
                </button>
            </div>
        </div>
        `).join('');
}
window.onload = renderBooks;

function removeBook(index) {
    if(confirm('确定要删除这本书吗？')) {
        books.splice(index, 1);
        renderBooks();
    }
}

function toggelReadStatus(index) {
    books[index].isRead = !books[index].isRead;
    renderBooks();
}

function openModal() {
    document.getElementById('addBookModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addBookModal').style.display = 'none';
}

// 添加表单提交处理
document.getElementById('addBookForm').addEventListener('submit', function (e) {
    e.preventDefault();// 阻止表单默认提交行为

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const cover = document.getElementById('cover').value;
    const description = document.getElementById('description').value;
    const isRead = document.getElementById('isRead').checked;

    addBookToLibrary(title, author, pages, cover, description, isRead);
    closeModal();
    this.reset();
});

// 点击模态框外部关闭
window.onclick = function (event) {
    const modal = document.getElementById('addBookModal');
    if (event.target == modal) {
        closeModal();
    }
}