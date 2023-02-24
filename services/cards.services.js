import { isValidObjectId } from "mongoose";
import { CustomError } from "../helpers/errors.js";
import { Card } from "../models/cards.model.js";
import { List } from "../models/list.model.js";

const addCard = async (body, userId) => {
  const { message, listId } = body;
  const newCard = await Card.create({
    message,
    owner: userId,
    list: listId,
  });

  await List.findByIdAndUpdate(
    listId,
    { $push: { cards: newCard._id } },
    { new: true }
  );

  return { card: newCard };
};

const deleteCard = async (listId, cardId) => {
  if (!isValidObjectId(listId))
    throw new CustomError("Sorry, but listId is invalid");

  if (!isValidObjectId(cardId))
    throw new CustomError("Sorry, but cardId is invalid");

  const list = await List.findOne({ _id: listId });
  if (!list) throw new CustomError(`Sorry, but list with ${listId} not found`);

  const cards = list.cards;

  cards.pull(cardId);

  await list.save();

  await Card.findByIdAndRemove(cardId);

  return;
};

const updateCard = async (cardId, card) => {
  const updatedCard = await Card.findByIdAndUpdate(
    { _id: cardId },
    {
      ...card,
    },
    { new: true }
  );

  return updatedCard;
};

const moveCard = async (cardId, destListId, currentListId) => {
  if (!isValidObjectId(cardId))
    throw new CustomError("Sorry, but cardId is invalid");

  if (!isValidObjectId(destListId))
    throw new CustomError("Sorry, but destination ListId is invalid");

  if (!isValidObjectId(currentListId))
    throw new CustomError("Sorry, but current ListId is invalid");

  const currentList = await List.findById(currentListId);
  if (!currentList)
    throw new CustomError(`Sorry, but list with id ${currentListId} not found`);

  currentList.cards = currentList.cards.filter(
    (card) => card.toString() !== cardId
  );

  await currentList.save();

  const destList = await List.findById(destListId);
  if (!currentList)
    throw new CustomError(`Sorry, but list with id ${destListId} not found`);

  await Card.findByIdAndUpdate(cardId, { list: destListId });

  destList.cards.push(cardId);

  await destList.save();

  return destList;
};

export { addCard, deleteCard, moveCard, updateCard };
