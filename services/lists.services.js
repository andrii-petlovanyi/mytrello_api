import { CustomError } from "../helpers/errors.js";
import { List } from "../models/list.model.js";

const addList = async (body, userId) => {
  console.log(body);

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

const allLists = async () => {
  const lists = await List.find().populate("cards");

  return lists;
};

export { addList, removeList, allLists };
