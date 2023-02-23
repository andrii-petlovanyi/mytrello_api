import { CustomError } from "../helpers/errors.js";
import { List } from "../models/list.model.js";

const addList = async (body, userId) => {
  const list = await List.create({ ...body, owner: userId });

  return list;
};

const removeList = async (listId) => {
  const deletedList = await List.findOneAndDelete({ _id: listId });

  if (!deletedList) {
    throw new CustomError(`Sorry, but list with id ${listId} not found`);
  }

  return;
};

const allLists = async (sortBy) => {
  const sortType = sortBy == "desc" ? 0 : -1;

  const lists = await List.find().populate({
    path: "cards",
    options: { sort: { createdAt: sortType } },
  });

  return lists;
};

export { addList, removeList, allLists };
