'use strict';

import { ActionConst } from 'react-native-router-flux';
import { words } from '../words';

const initialState = {
  activeSentence: [{word: '', type: 'pronoun'}, 
                   {word: '', type: 'aux verb'}, 
                   {word: '', type: 'main verb'}],
  activeImageIndex: -1, 
  editIndex: 0,
  inputWord: '',
  modalType: null,
  wordPicker: null,
  itemOrder: [0,1,2],
  sentenceScrollEnabled: true,
};

export default function sentences(state = initialState, action) {
  switch (action.type) {
    case 'ADD_WORD':
      return {
        ...state,
        activeSentence: state.activeSentence.concat([{word: action.word, type: action.wordType}]),
        itemOrder: state.itemOrder.concat([state.activeSentence.length])
      }
    case 'DELETE_WORD':
      var deleteIndex = state.itemOrder.indexOf(action.wordIndex)
      var newItemOrder = [
        ...state.itemOrder.slice(0, deleteIndex),
        ...state.itemOrder.slice(deleteIndex + 1)
      ];
      var updatedSentence = [
        ...state.activeSentence.slice(0, action.wordIndex),
        {word: 'NULL', type: 'NULL'},
        ...state.activeSentence.slice(action.wordIndex + 1)
      ];
      return {
        ...state,
        activeSentence: updatedSentence,
        itemOrder: newItemOrder
      }
    case 'SHOW_DEFAULT_SENTENCE':
      return {
        ...state,
        activeSentence: initialState.activeSentence,
        itemOrder: initialState.itemOrder
      }
    case 'CLEAR_SENTENCE':
      return {
        ...state,
        activeSentence: [],
        itemOrder: []
      }
    case 'CLICK_WORD':
      if (words[action.wordType]['custom']) {
        return {
          ...state,
          modalType: action.wordType,
          editIndex: action.wordIndex
        }
      }
      else {
        return {
          ...state,
          wordPicker: action.wordType,
          editIndex: action.wordIndex
        }
      }
    case 'EDIT_WORD':
      var wordType = state.activeSentence[action.wordIndex].type;
      var updatedSentence = [
        ...state.activeSentence.slice(0, action.wordIndex),
        {word: action.word, type: wordType},
        ...state.activeSentence.slice(action.wordIndex + 1)
      ];
      if (updatedSentence[action.wordIndex]['word'] == '+') {
        return {
          ...state,
          wordPicker: null,
          editIndex: action.wordIndex,
          modalType: wordType,
        }
      } else {
        return {
          ...state,
          wordPicker: null,
          modalType: null,
          activeSentence: updatedSentence
        }
      }
    case 'GO_BACK':
      return {
        ...state,
        wordPicker: null,
        modalType: null,
        activeSentence: state.activeSentence
      }
    case 'CLEAR_WORDPICKER':
      return {
        ...state, 
        wordPicker: null
      }
    case 'INPUT_WORD':
      return {
        ...state,
        inputWord: action.word
      }
    case 'SENTENCE_DRAG_IN_PROGRESS':
      return {
        ...state,
        sentenceScrollEnabled: false
      }
    case 'REORDER_SENTENCE':
      var newItemOrder = action.itemOrder.map(function(item) {
          return ( parseInt(item.key) )
      });

      return {
        ...state,
        itemOrder: newItemOrder,
        sentenceScrollEnabled: true
      }
    case 'SELECT_PHOTO':
      return {
        ...state,
        activeImageIndex: action.index
      }
    case 'SET_MODAL':
      return {
        ...state,
        modalType: action.modalType
      }
    default:
      return state
  }
}