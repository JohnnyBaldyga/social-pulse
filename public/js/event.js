
const newFormHandler = async (event) => {
  event.preventDefault();

  const search = document.querySelector('#search-form').value.trim();
  const location = document.querySelector('#location').value.trim();
  const eventsList = document.querySelector('#event-list').value.trim();

 
