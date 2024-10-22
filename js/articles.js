var addArticleForm = document.getElementById('form-create-article')
var articleListsSection = document.getElementById('article-section')

// Initial article lists data 
var articles = [
    {
        id: 1,
        title: 'Israeli attack on northern Gaza hints at retired general\'s \'surrender or starve\' plan for war',
        description: 'Giora Eiland tells Jeremy Bowen that Israel should tell Palestinians to leave northern Gaza before sealing it off as a way of pressuring Hamas.',
        imageUrl: 'https://ichef.bbci.co.uk/news/480/cpsprodpb/41ce/live/e7d36fc0-888b-11ef-81f8-1f28bcc5be15.jpg.webp',
        createdAt: new Date('2024-10-12')
    },
    {
        id: 2,
        title: 'Inside Israel\'s combat zone in southern Lebanon',
        description: 'The BBC\'s Lucy Williamson travels with the Israeli military to a village destroyed during its fighting with Hezbollah.',
        imageUrl: 'https://ichef.bbci.co.uk/news/480/cpsprodpb/a5d6/live/a319fff0-88ab-11ef-b0c4-1f51bafce40e.jpg.webp',
        createdAt: new Date('2024-10-13')
    }
]

let articleToDelete = null

/**
 * Formats a given Date object into the format DD/MM/YYYY HH:mm.
 * 
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted date string in the format DD/MM/YYYY HH:mm.
 */
function formatDateTime(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Updates the article section with a list of articles.
 * Clears any existing content and creates a visual card for each article.
 * Each card includes the article's image, title, publication date, description, and a delete button.
 */
function getArticleLists() {
    articleListsSection.innerHTML = ''

    // Add conditional to check if articles are empty and replace articleListsSection with empty state
    if (articles.length === 0) {
        // Show Empty state
        articleListsSection.innerHTML = 
            `<div class="container mt-5">
                <div class="text-center" style="max-width: 400px; margin: 0 auto;">
                    <div class="empty-state">
                        <img src="/assets/images/not-found.webp" alt="not found image" class="img-fluid not-found-img">
                        <h3>No Articles Found</h3>
                        <p class="text-muted">It seems you haven't added any articles yet. Click button "Create New Article" to create your first article!</p>
                    </div>
                </div>
            </div>`
    } else {
        // Show Article Lists
        articles.forEach(element => {
            articleListsSection.innerHTML += 
                `<div class="col-12 col-md-6 col-lg-3">
                    <article class="d-flex h-100">
                        <div class="card w-100">
                            <img src="${element.imageUrl}" alt="${element.title} image" class="img-fluid rounded-start article-img">
                            <div class="card-body border-0 bg-white p-3">
                                <div class="entry-header mb-3">
                                    <span class="entry-summary text-secondary">${formatDateTime(element.createdAt)}</span>
                                    <h2 class="line-clamp-article-title card-title entry-title h4 mb-0">${element.title}</h2>
                                </div>
                                <p class="line-clamp-article-description card-text entry-summary text-secondary m-0 p-0">
                                    ${element.description}
                                </p>
                            </div>
                            <div class="d-flex justify-content-end align-items-center p-3">
                                <button class="btn btn-danger" onclick="confirmDeleteArticle(${element.id})">
                                    Delete
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </article>
                </div>`
        });
    }
}

/**
 * Shows the modal by adding the 'open' class and disables body scrolling.
 * 
 * @param {string} id - The ID of the modal element to show.
 */
function toggleFormAddArticle(id) {
    document.getElementById(id)?.classList.add('open');
    document.body.classList.add('modal-open');
}

/**
 * Closes the currently open modal by removing the 'open' class and restores body scrolling.
 */
function closeModal() {
    document.querySelector('.custom-modal.open')?.classList.remove('open');
    document.body.classList.remove('modal-open');
}

/**
 * Generates a unique numeric ID based on the current date and time.
 *
 * @returns {number} - A unique numeric ID.
 */
function randomNumberID() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);

    const uniqueID = Number(`${timestamp}${randomNum}`);
    return uniqueID;
}

/**
 * Adds a new article to the articles array and updates the DOM.
 * 
 * @param {string} title - The title of the article.
 * @param {string} description - The description of the article.
 * @param {string} imageUrl - The image URL for the article.
 */
function addArticle(title, description, imageUrl) {
    const newId = randomNumberID();
    articles.push({ id: newId, title, description, imageUrl, createdAt: new Date() });
    getArticleLists();
}

/**
 * Handles the form submission event for adding a new article.
 * 
 * @param {Event} event - The form submission event.
 */
function handleFormSubmitAddArticle(event) {
    event.preventDefault()

    // Get form values
    const title = document.getElementById('input-article-title')?.value
    const imageUrl = document.getElementById('input-article-image')?.value
    const description = document.getElementById('input-article-description')?.value

    // Add new article
    addArticle(title, description, imageUrl);

    // Clear form fields after submission
    document.getElementById('input-article-title').value = '';
    document.getElementById('input-article-image').value = '';
    document.getElementById('input-article-description').value = '';

    closeModal();
}

/**
 * Opens the confirmation modal and sets the article to delete.
 * 
 * @param {number} articleId - The ID of the article to delete.
 */
function confirmDeleteArticle(articleId) {
    articleToDelete = articleId;
    toggleFormAddArticle('confirm-delete-modal');
}

/**
 * Deletes the article if confirmed and closes the modal.
 */
function deleteArticle() {
    articles = articles.filter(article => article.id !== articleToDelete);
    articleToDelete = null;
    closeModal();
    getArticleLists();
}

function main() {
    // Generate article lists initially
    getArticleLists()
}

main()
