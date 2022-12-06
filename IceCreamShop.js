const { readFileSync, promises: fsPromises } = require("fs");

// create a graph class
class Graph {
  // defining vertex array and
  // adjacent list
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  // add vertex to the graph
  addVertex(v) {
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
  }

  // add edge to the graph
  addEdge(v, w) {
    // get the list for vertex v and put the
    // vertex w denoting edge between v and w
    this.AdjList.get(v).push(w);
  }

    // Recursive function which process and explore
  // all the adjacent vertex of the vertex with which it is called
  DFSUtil(vert, visited) {
    visited[vert] = vert;
    // console.log(vert);

    var get_neighbours = this.AdjList.get(vert);

    for (var i in get_neighbours) {
      var get_elem = get_neighbours[i];
      //console.log(get_elem);
      if (!(visited[get_elem]==vert)) this.DFSUtil(get_elem, visited);
    }
  }


  // Main DFS method
  dfs(startingNode) {
    var visited = [];

    this.DFSUtil(startingNode, visited);
    var count2 = -1;
    var count3 = -1;
    for (var i in visited) {
      if (visited[i]) {
        count2++;
        let visited2 = [];
        this.DFSUtil(visited[i], visited2);
        //console.log(visited2);
        for (var j in visited2) {
          if (visited2[j] && j!=i) {
          count3++;
          }
        }
      }
    }
    const result = {
      count2,
      count3
    }
    return result;
  }
}

//reads file --- change test file number when testing
const arquivo = "./casocohen10.txt";
const contents = readFileSync(arquivo, "utf-8");
const combinacoes = contents.split("\n");
var vertices = [];
var n = [];
var n1 = [];
var n2 = [];
combinacoes.forEach((el) => {
  n = el.split(" -> ");
  n1 = n[0];
  n2 = n[1];

  if (!vertices.includes(n1)) {
    vertices.push(n1);
  }
  if (!vertices.includes(n2)) {
    vertices.push(n2);
  }
});

// Using the above implemented graph class
var g = new Graph(vertices.length);

for (var i = 0; i < vertices.length; i++) {
  g.addVertex(vertices[i]);
}

combinacoes.forEach((el) => {
  n = el.split(" -> ");
  n1 = n[0];
  n2 = n[1];
  g.addEdge(n1, n2);
});

var doisSabores = 0;
for (let i = 0; i < vertices.length; i++) {
  doisSabores += (g.dfs(vertices[i])).count2;
}

var tresSabores = 0;
for (let i = 0; i < vertices.length; i++) {
  tresSabores += (g.dfs(vertices[i])).count3;
}

console.log(`Copos de dois sabores para o arquivo "${arquivo}": ` + doisSabores);
console.log(`Copos de tres sabores para o arquivo "${arquivo}": ` + tresSabores);
