
// Add scroll animation
const fadeIns = document.querySelectorAll('.fade-in' );

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

fadeIns.forEach((fadeIn) => {
  observer.observe(fadeIn);
});

  
  // Fonction pour ajouter une histoire aux favoris
  function addToFavorites(title, url) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const story = { title, url };

    // Vérifier si l'histoire est déjà dans les favoris
    if (!favorites.some(fav => fav.title === title)) {
      favorites.push(story);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('تمت إضافة القصة إلى المفضلة بنجاح!');
      displayFavorites();
    } else {
      alert('القصة موجودة بالفعل في المفضلة.');
    }
  }

  // Fonction pour afficher les histoires favorites
  function displayFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
      favoritesContainer.innerHTML = '<p class="text-gray-700">لا توجد قصص مفضلة بعد.</p>';
    } else {
      favorites.forEach(favorite => {
        const storyElement = document.createElement('div');
        storyElement.className = 'bg-white rounded-lg shadow-md p-4 hover:scale-105 transition-all duration-300';
        storyElement.innerHTML = `
          <h3 class="text-xl font-semibold mb-2">${favorite.title}</h3>
          <a href="${favorite.url}" class="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">اقرأ المزيد</a>
        `;
        favoritesContainer.appendChild(storyElement);
      });
    }
  }

  // Afficher les favoris au chargement de la page
  document.addEventListener('DOMContentLoaded', displayFavorites);


  // Sélectionner le formulaire et la liste des commentaires
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

// Charger les commentaires existants depuis Local Storage
function loadComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  commentsList.innerHTML = ''; // Nettoyer les anciens commentaires
  comments.forEach(comment => {
    displayComment(comment.username, comment.comment);
  });
}

// Afficher un commentaire dans la liste
function displayComment(username, commentText) {
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('border', 'border-gray-300', 'p-4', 'rounded', 'bg-gray-50');

  commentDiv.innerHTML = `
    <p class="font-bold text-blue-500">${username}</p>
    <p>${commentText}</p>
  `;

  commentsList.appendChild(commentDiv);
}

// Sauvegarder un commentaire dans Local Storage
function saveComment(username, commentText) {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push({ username, comment: commentText });
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Gérer l'envoi du formulaire
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Récupérer les valeurs du formulaire
  const username = document.getElementById('username').value;
  const comment = document.getElementById('comment').value;

  // Afficher et sauvegarder le commentaire
  displayComment(username, comment);
  saveComment(username, comment);

  // Réinitialiser le formulaire
  commentForm.reset();
});

// Charger les commentaires au démarrage
loadComments();
