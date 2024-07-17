
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
      document.location.replace('/event');
    } else {
      alert('Failed to search event');
    }
  }
};


