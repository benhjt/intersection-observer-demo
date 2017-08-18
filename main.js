fetch('https://randomuser.me/api?results=250&nat=gb&inc=name,picture').then(response => {
  return response.json();
}).then(response => {
  renderUsers(response.results);
}).catch(error => {
  console.error(error);
});

const io = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting && !entry.target.src) {
      entry.target.src = entry.target.getAttribute('data-src');
      entry.target.onload = function () {
        entry.target.removeAttribute('data-src');
      };
    }
  }
});

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const renderUsers = (userList) => {
  let userListMarkup = `<ul class="user-list">`;

  for (let i = 0; i < userList.length; i++) {
    let contact = userList[i];
    userListMarkup += `
      <li class="contact">
        <span class="contact__picture-container">
          <img class="contact__picture" data-src="${contact.picture.thumbnail}">
        </span>
        <span class="contact__info">${capitalize(contact.name.first)} ${capitalize(contact.name.last)}</span>
      </li>
    `;
  }

  userListMarkup += `</ul>`;

  document.querySelector('.container').innerHTML = userListMarkup;
  document.querySelectorAll('.contact__picture').forEach(elem => io.observe(elem));
};
