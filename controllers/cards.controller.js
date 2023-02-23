import {
  addCard,
  deleteCard,
  moveCard,
  updateCard,
} from "../services/cards.services.js";

const addCardCtrl = async (req, res) => {
  const body = req.body;
  const { id: userId } = req.user;

  const newCard = await addCard(body, userId);

  res.status(201).json({ message: "Card created!", newCard });
};

const deleteCardCtrl = async (req, res) => {
  const { listId, cardId } = req.body;

  const newCard = await deleteCard(listId, cardId);

  res.status(201).json({ message: "Card deleted successfully!", newCard });
};

const updateCardCtrl = async (req, res) => {
  const card = req.body;
  const cardId = req.params.cardId;
  const { id: userId } = req.user;

  const newCard = await updateCard(cardId, card, userId);

  res.status(201).json({ message: "Card updated successfully!", newCard });
};

const moveCardCtrl = async (req, res) => {
  const { cardId, currentListId, destListId } = req.body;
  const destList = await moveCard(cardId, destListId, currentListId);

  res.status(200).json({ message: "Card moved successfully", destList });
};

export { addCardCtrl, deleteCardCtrl, updateCardCtrl, moveCardCtrl };
