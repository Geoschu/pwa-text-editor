import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jate = await openDB("jate", 1);
  const tx = jate.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  // await store.put({ content });
  const request = store.put({ jate: content });
  const result = await request;
  console.log("Content added to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jate = await openDB("jate", 1);
  const tx = jate.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;

  if (!result.length) {
    console.log("No content found in the database");
    return "";
  }
  console.log("Content retrieved from the database");
  return result.pop().jate;
};

initdb();
