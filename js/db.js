// enable offline data
db.enablePersistence().catch(function(err){
    if(err.code=='failed-precondition'){
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });
//real-time listener
db.collection('trash').onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(change=>{
        if(change.type=='added'){
        renderRecipe(change.doc.data(),change.doc.id);
        }
        if(change.type=='removed'){
        // remove the document data from the web page
        removeRecipe(change.doc.id);
        }
    });
});

// add new thing
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const trash = {
    title : form.title.value,
    details: form.details.value
  };

  db.collection('trash').add(trash)
    .catch(err => console.log(err));

  form.title.value = '';
  form.details.value = '';
});

// remove a thing
const recipeContainer = document.querySelector('.trash');
recipeContainer.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('trash').doc(id).delete();
  }
})