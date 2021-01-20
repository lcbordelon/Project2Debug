// Helper functions to show/hide elements
const show = (el) => {
  el.style.display = "block";
};

// Wait for the DOM to completely load before we run our JS
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");

  // Get references to the description, name, form and list member
  const descInput = document.getElementById("itemdesc");
  const nameInput = document.getElementById("itemname");
  const itemForm = document.getElementById("itemInput");
  const listSelect = document.getElementById("listMemb");

  // Get query parameter
  const url = window.location.search;
  let itemId;
  let listId;
  let updating = false;

  console.log(url);

  // Get item data for editing/adding
  const getItemData = (id, type) => {
    const queryUrl = type === "item" ? `/api/items/${id}` : `/api/lists/${id}`;

    fetch(queryUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("Success in getting item:", data);

          // Populate the form for editing
          nameInput.value = data.name;
          descInput.value = data.desc;
          listId = data.ListId || data.id;

          // We are updating
          updating = true;
        }
      })
      .catch((err) => console.error(err));
  };

  // If item exists, grab the content of the item
  if (url.indexOf("?items_id=") !== -1) {
    itemId = url.split("=")[1];
    getItemData(itemId, "item");
  }
  // Otherwise if we have a listmember_id in our url, preset the listmember select box to be our list
  else if (url.indexOf("?lists_id=") !== -1) {
    listId = url.split("=")[1];
  }

  // Event handler for when the item is submitted
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Make sure the form isn't empty
    // if (
    //   !nameInput.value.trim() ||
    //   !descInput.value.trim() ||
    // //   !listSelect.value
    // ) {
    //   return;
    // }

    // Object that will be sent to the db
    const newItem = {
      name: nameInput.value.trim(),
      desc: descInput.value.trim(),
      ListId: listSelect.value,
    };

    submitItem(newItem);
    // Update an item if flag is true, otherwise create a new one
    if (updating) {
      newItem.id = itemId;
      updateItem(newItem);
    } else {
      submitItem(newItem);
    }
  };

  // Attach an event listener to the form on submit
  itemForm.addEventListener("submit", handleFormSubmit);

  // Submits new item then redirects
  const submitItem = (newItem) => {
    fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    //     .then(() => {
    //       window.location.href = "/lists";
    //     })
    //     .catch((err) => console.error(err));
    // };

    // Render a list of lists or redirect if no lists
    const renderListList = (data) => {
      console.log("renderListList -> data", data);
      if (!data.length) {
        window.location.href = "/lists";
      }
      if (document.querySelector(".hidden")) {
        show(document.querySelector(".hidden"));
      }

      const rowsToAdd = [];

      data.forEach((list) => rowsToAdd.push(createListRow(list)));

      listSelect.innerHTML = "";
      console.log("renderListList -> rowsToAdd", rowsToAdd);
      console.log("listSelect", listSelect);

      rowsToAdd.forEach((row) => listSelect.append(row));
      listSelect.value = listId;
    };

    // Build listmember dropdown
    const createListRow = ({ id, name }) => {
      const listOption = document.createElement("option");
      listOption.value = id;
      listOption.textContent = name;
      return listOption;
    };

    // A function to get Lists and then call the render function
    const getLists = () => {
      fetch("api/lists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => renderListList(data))
        .catch((err) => console.error(err));
    };

    // Get the lists, and their items
    getLists();

    // Update an item then redirect to lists
    // const updateItem = (item) => {
    //   fetch("/api/items", {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(post),
    //   })
    //     .then(() => {
    //       window.location.href = "/lists";
    //     })
    //     .catch((err) => console.error(err));
    // };
  };
});
