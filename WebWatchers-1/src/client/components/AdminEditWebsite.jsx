import { useState } from "react";

export default function AdminEditWebsite() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  async function editWebsite({ websiteId }) {
    try {
      const response = await fetch(
        `http://localhost3000/api/websites/${websiteId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            website: {
              name: "",
              url: "",
              description: "",
              image: "",
            },
          }),
        }
      );
      const result = await response.json();
      console.log("Updating the website", result);
      return result;
    } catch (error) {
      console.error("Error when editing your website", error);
    }
  }

  return (
    <div>
      <h2>Edit Website</h2>
      <form onSubmit={editWebsite}>
        <label>
          Name: {""}
          <input
            type="text"
            name="name"
            placeholder="Name of the website"
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          URL: {""}
          <input
            type="text"
            name="url"
            placeholder="URL"
            required={true}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <label>
          Description: {""}
          <input
            type="text"
            name="description"
            placeholder="Description"
            required={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Image URL: {""}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <button className="post-button">Edit Website</button>
      </form>
    </div>
  );
}