import { Card } from "../models/cards.model.js";
import { List } from "../models/list.model.js";

const addCard = async (card, listId, userId) => {
  const newCard = await Card.create({
    ...card,
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
  const list = await List.findOne({ _id: listId });
  const cards = list.cards;

  cards.pull(cardId);

  await list.save();

  await Card.findByIdAndRemove(cardId);

  return;
};

const updateCard = async (cardId, card, userId) => {
  const updatedCard = await Card.findByIdAndUpdate(
    { _id: cardId },
    {
      ...card,
      updatedBy: userId,
    },
    { new: true }
  );

  return updatedCard;
};

const moveCard = async (cardId, destListId, currentListId) => {
  const currentList = await List.findById(currentListId);

  currentList.cards = currentList.cards.filter(
    (card) => card.toString() !== cardId
  );

  await currentList.save();

  const destList = await List.findById(destListId);

  await Card.findByIdAndUpdate(cardId, { list: destListId });

  destList.cards.push(cardId);

  await destList.save();

  return destList;
};

export { addCard, deleteCard, moveCard, updateCard };
