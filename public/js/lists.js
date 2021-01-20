document.addEventListener("DOMContentLoaded", (e) => {
  if (e) {
    console.log("DOM Loaded");

    //creates a new List Member

    const createListMemberBtn = document.getElementById("create-list-btn");

    createListMemberBtn.addEventListener("click", (e) => {
      console.log("clicked");
      e.preventDefault();
      console.log("clicked");
      console.log("loading");

      const newListMember = {
        member: document.getElementById("add-list-member").value.trim(),
      };

      console.log(newListMember);
      fetch("api/lists", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newListMember),
      }).then(() => {
        document.getElementById("add-list-member").value = "";

        console.log("added list member");
        location.reload();
      });
    });

    //deletes a List Member
    document.querySelectorAll(".delete-btn").forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("clicked");

        const id = e.target.getAttribute("data-id");
        console.log(id);

        fetch(`api/lists/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then(() => {
          console.log("deleted list member");
          location.reload();
        });
      });
    });
  }
});
