const apiKey = "C0NJt4j56BBitHJtpLSS4SzzV9Cm3cNVUR2ARI79ogsBenEM2NicGIOd";
    
      // Funzione per caricare le immagini dalla query specificata
      function loadImages(query) {
        const endpoint = `https://api.pexels.com/v1/search?query=${query}`;
        const headers = {
          Authorization: apiKey
        };
    
        fetch(endpoint, { headers })
        .then(response => response.json())
        .then(data => {
        const imagesContainer = document.querySelector('.album .container .row');

    // Rimuovi le immagini esistenti prima di aggiungere quelle nuove
    imagesContainer.innerHTML = '';

    // Per ogni foto ottenuta dall'API, crea una card e aggiungila al container
    data.photos.forEach(photo => {
        const card = document.createElement('div');
        card.classList.add('col-md-4');
        card.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${photo.src.large}" alt="${photo.photographer}" class="bd-placeholder-img card-img-top view-image" width="100%" height="225">
            <div class="card-body">
              <h5 class="card-title view-artist">${photo.photographer}</h5>
              <p class="card-text">${photo.url}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary view-btn">
                    View
                  </button>
                  <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">
                    Hide
                  </button>
                </div>
                <small class="text-muted">${photo.id}</small>
              </div>
            </div>
          </div>
        `;
        imagesContainer.appendChild(card);
      
        // Aggiungi un gestore per il click sull'immagine
        const viewImage = card.querySelector('.view-image');
        viewImage.addEventListener('click', () => {
          // Reindirizza l'utente alla pagina di dettaglio dell'immagine quando clicca sull'immagine
          window.location.href = `image_detail.html?id=${photo.id}`;
        });
      
        // Aggiungi un gestore per il click sul nome dell'artista
        const viewArtist = card.querySelector('.view-artist');
        viewArtist.addEventListener('click', () => {
          // Reindirizza l'utente alla pagina di dettaglio dell'immagine quando clicca sul nome dell'artista
          window.location.href = `image_detail.html?id=${photo.id}`;
        });

  // Aggiungi un gestore per il click sul pulsante "Hide"
  const hideButton = card.querySelector('.hide-btn');
  hideButton.addEventListener('click', () => {
    card.style.display = 'none';
  });

  // Aggiungi un gestore per il click sul pulsante "View"
  const viewButton = card.querySelector('.view-btn');
viewButton.addEventListener('click', () => {

  const detailPageURL = `https://www.example.com/image/${photo.id}`;

  window.location.href = detailPageURL;
});

});

  })
  .catch(error => {
    console.error("Errore nel caricamento delle immagini:", error);
  });
      }
    
      // Gestore per il click su "Load Images"
      document.getElementById("loadImagesBtn").addEventListener("click", function() {
        loadImages("[your-query]");
      });
    
      // Gestore per il click su "Load Secondary Images"
      document.getElementById("loadSecondaryImagesBtn").addEventListener("click", function() {
        loadImages("[your-secondary-query]");
      });

      