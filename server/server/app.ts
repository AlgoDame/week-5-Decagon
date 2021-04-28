import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from "fs";
import path from "path";
// import database from "./database.json";
/*
implement your server code here
*/

let database: PostBody[];
const databasePath = path.join(__dirname, "database.json");
fs.readFile(databasePath, "utf-8", (err, data) => {
  if (err) return;
  database = JSON.parse(data);
});
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === "/api/database" && req.method === "GET") {
      getData(req, res);
    } else if (
      req.url &&
      req.url.match(/\/api\/database\/([0-9]+)/) &&
      req.method === "GET"
    ) {
      const id = Number(req.url.split("/")[3]);
      getSinglePost(req, res, id);
    } else if (req.url === "/api/database" && req.method === "POST") {
      createPost(req, res);
    } else if (
      req.url &&
      req.url.match(/\/api\/database\/([0-9]+)/) &&
      req.method === "PUT"
    ) {
      const id = Number(req.url.split("/")[3]);
      updatePost(req, res, id);
    } else if (
      req.url &&
      req.url.match(/\/api\/database\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = Number(req.url.split("/")[3]);
      deletePost(req, res, id);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  }
);

// Creating a server port to listen on
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});

// Find all content in the database
function findAll(): Promise<object> {
  return new Promise((resolve, reject) => {
    resolve(database);
  });
}

// Displays all content of database
async function getData(req: IncomingMessage, res: ServerResponse) {
  try {
    const databaseDetails = await findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(databaseDetails));
  } catch (error) {
    console.log(error);
  }
}

// Function to find post by id
function findById(id: number) {
  return new Promise((resolve, reject) => {
    const thePost = database.find((post) => post.id === id);
    resolve(thePost);
  });
}

// @desc Gets single post
// @route Get /api/database/id
async function getSinglePost(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const singlePost = await findById(id);
    if (!singlePost) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "ID not Found  " }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(singlePost));
    }
  } catch (error) {
    console.log(error);
  }
}

// Definig an interface for my database
interface PostBody {
  id?: number;
  organization: string;
  createdAt?: Date;
  updatedAt?: Date;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  noOfEmployees: number;
  employees: string[];
}

// Function to get post from user
function getPostData(req: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

// Creating a post
async function createPost(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getPostData(req);
    console.log("Body is", typeof body);
    if (typeof body === "string") {
      const {
        organization,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees,
      } = JSON.parse(body);
      const postInfo: PostBody = {
        organization,
        createdAt: new Date(),
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees,
      };
      const newPost = await create(postInfo);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newPost));
    }
  } catch (error) {
    console.log(error);
  }
}

// Adding id and writing post to database
function create(postInfo: PostBody) {
  return new Promise((resolve, reject) => {
    const lastIndex: number | undefined = database[database.length - 1].id;
    let addOne: number = 1;
    if (lastIndex) {
      addOne += lastIndex;
    }
    console.log(addOne);
    const newPost = { id: addOne, ...postInfo };
    console.log(database);
    database.push(newPost);
    writeNewPostToFile(databasePath, database);
    console.log(newPost);
    resolve(postInfo);
  });
}

//@ desc Update a Post
//@ route PUT /api/database/id
async function updatePost(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    //find the post by id
    const post = await findById(id);
    if (!post) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "ID not Found  " }));
    } else {
      const body = await getPostData(req);
      console.log("request is ", req);
      if (typeof body === "string") {
        const dataBody = JSON.parse(body);
        const postInfo = { ...dataBody, updatedAt: new Date() };
        const updatedPost = await update(id, postInfo);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(updatedPost));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

//Updating the database
function update(id: number, postInfo: PostBody) {
  return new Promise((resolve, reject) => {
    console.log(postInfo);
    const index = database.findIndex((post) => post.id === id);
    database[index] = { ...database[index], ...postInfo };
    writeNewPostToFile(databasePath, database);
    resolve(database[index]);
  });
}

// @desc  Delete Post
// @route DELETE /api/database/id
async function deletePost(req: IncomingMessage, res: ServerResponse, id: number) {
  try {
    const singlePost = await findById(id);
    if (!singlePost) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "ID not Found  " }));
    } else {
      await remove(id)
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({message: `Post ${id} removed`}));
    }
  } catch (error) {
    console.log(error);
  }
}
// Function to remove post by id
function remove(id: number) {
  return new Promise((resolve, reject) => {
    database = database.filter((post) => post.id !== id);
    writeNewPostToFile(databasePath, database);
    resolve(database);
  });
}

function writeNewPostToFile(filePath: string, content: {}) {
  fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
}
