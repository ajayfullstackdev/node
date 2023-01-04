import EventEmitter from "events";

class Snake extends EventEmitter {
  constructor() {
    super();
  }
}

const python = new Snake();

python.on("chicken", () => {
  console.log("Python is busying eating the chicken!");
});

python.on("chicken", () => {
  console.log("Python is super happy post the food!");
});

python.emit("chicken");
python.emit("chicken");
python.emit("chicken");
