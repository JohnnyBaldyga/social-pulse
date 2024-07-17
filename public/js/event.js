
const newFormHandler = async (event) => {
  event.preventDefault();

  const search = document.querySelector('#search-form').value.trim();
  const location = document.querySelector('#location').value.trim();
  const eventsList = document.querySelector('#event-list').value.trim();

  if (search && location && eventsList) {
    const response = await fetch(`/api/event`, {
      method: 'POST',
      body: JSON.stringify({ search, location, eventsList }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('api/event');
    } else {
      alert('Failed to search event');
    }
  }
};
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/event/${id}`, {
      method: 'DELETE',
    });



