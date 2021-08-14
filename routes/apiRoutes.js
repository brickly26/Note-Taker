const fs = require("fs");
const {v4 : uuidv4} = require('uuid')


//GET /api/notes should read the db.json file and return all saved notes as JSON.

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).


module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    const data = fs.readFileSync("./db/db.json", "utf8");
    const jsonData = JSON.parse(data);
    
    res.json(jsonData)
  })
  
  app.post("/api/notes", (req, res) => {
    const data = fs.readFileSync("./db/db.json", "utf8");
    const jsonData = JSON.parse(data);
    const userID = uuidv4();
    req.body.id = userID;
    jsonData.push(req.body);
    const data11 = JSON.stringify(jsonData);
    fs.writeFileSync("./db/db.json", data11);
    res.json(jsonData);
  })

  app.delete('/api/notes/:id', (req, res) => {
    const chosen = req.params.id;
    const data = fs.readFileSync("./db/db.json", "utf8");
    const jsonData = JSON.parse(data);
    let arr1;
    let arr2;
    let arr3;
    for (let i = 0; i<jsonData.length; i++) {
      if (chosen === jsonData[i].id) {
        switch(i) {
          case 0:
            jsonData.shift();
            arr3 = jsonData;
            break;
          case jsonData.length -1:
            jsonData.pop();
            arr3 = jsonData;
            break;
          default:
            arr1 = jsonData.slice(0, i);
            arr2 = jsonData.slice(i+1);
            arr3 = arr1.concat(arr2);
        }
        break;  
      }
    }
    
    const data11 = JSON.stringify(arr3);
    fs.writeFileSync("./db/db.json", data11);
    res.json(arr3);
  })
}