
const trash = document.querySelector('.trash')
document.addEventListener('DOMContentLoaded', function() {
    // nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
    // add thing form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});
  });

  //render thing data
  const renderRecipe =(data,id)=>{
    const html =`
    <div class="card-panel thing white row" data-id="${id}">
      <img src="/img/needy.png" alt="help thumb">
      <div class="thing-details">
        <div class="thing-title">${data.title}</div>
        <div class="thing-ingredients">${data.details}</div>
      </div>
      <div class="thing-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;
  trash.innerHTML+=html;
  }

// remove thing
const removeRecipe = (id) => {
  const thing = document.querySelector(`.thing[data-id=${id}]`);
  thing.remove();
};