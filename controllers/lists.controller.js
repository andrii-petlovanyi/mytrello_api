import { addList, allLists, removeList } from "../services/lists.services.js";

const addListCtrl = async (req, res) => {
  const body = req.body;
  const { _id: userId } = req.user;

  const list = await addList(body, userId);

  res.status(201).json({
    message: "List created successfully",
    list,
  });
};

const removeListCtrl = async (req, res) => {
  const listId = req.params.listId;

  await removeList(listId);

  res.status(200).json({
    message: "List deleted successfully!",
  });
};

const allListsCtrl = async (req, res) => {
  const lists = await allLists();

  res.status(200).json({
    lists,
  });
};

export { addListCtrl, removeListCtrl, allListsCtrl };
