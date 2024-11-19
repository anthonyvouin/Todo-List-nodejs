const TaskController = require("./TaskController");

test("all() - should return all tasks", async () => {
  const mockTaskModel = {
    find: jest
      .fn()
      .mockResolvedValue([{ task: "Sample Task", completed: false }]),
  };

  const req = { query: {} };
  const res = {
    json: jest.fn(), 
  };

  const taskController = new TaskController(mockTaskModel);

  await taskController.all(req, res);

  expect(mockTaskModel.find).toHaveBeenCalledWith(req.query); 
  expect(res.json).toHaveBeenCalledWith([
    { task: "Sample Task", completed: false },
  ]); 
});

test("update() - should update a task and return it", async () => {
  const mockTaskModel = {
    findOneAndUpdate: jest
      .fn()
      .mockResolvedValue({ task: "Updated Task", completed: true }),
  };

  const req = {
    params: { id: "123" },
    body: { task: "Updated Task", completed: true },
  };

  const res = {
    json: jest.fn(),
  };

  const taskController = new TaskController(mockTaskModel);

  await taskController.update(req, res);

  expect(mockTaskModel.findOneAndUpdate).toHaveBeenCalledWith(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  expect(res.json).toHaveBeenCalledWith({
    task: "Updated Task",
    completed: true,
  });
});
