

const newSearchHandler = async (event) => {
  event.preventDefault();

  const search = document.querySelector('#search-form');
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
      document.location.replace('/events');
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

    if (response.ok) {
      document.location.replace('/api');
    } else {
      alert('Failed to delete event');
    }
  }
};

document
  .querySelector('.new-search-form')
  .addEventListener('submit', newSearchHandler);

document
  .querySelector('.event-list')
  .addEventListener('click', delButtonHandler);



// Post event handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

