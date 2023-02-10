/*I add the active nav bar function*/
const activePage = window.location.pathname;

const navLinks = document.querySelectorAll('.navBarItem a').forEach(link => {    
    if(link.href.includes(`${activePage}`)){
      link.classList.add('active');
    }
    else{
        link.classList.remove('active');
    }
  });

function toRecipe(recepieName) {
  window.location = `/${recepieName}`
}