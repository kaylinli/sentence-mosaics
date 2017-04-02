'use strict';

import { ActionConst } from 'react-native-router-flux';
import { words } from '../words';

const initialState = {
  activeSentence: [{word: '', type: 'pronoun'}, {word: '', type: 'aux verb'}, {word: '', type: 'main verb'}],
  activeURI: '',
  editIndex: 0,
  inputWord: '',
  modalType: null,
  wordPicker: null,
};

export default function sentences(state = initialState, action) {
  switch (action.type) {
    case 'ADD_WORD':
      return {
        ...state,
        activeSentence: state.activeSentence.concat([{word: action.word, type: action.wordType}])
      }
    case 'CLEAR_SENTENCE':
      return {
        ...state,
        activeSentence: initialState.activeSentence
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
      return {
        ...state,
        wordPicker: null,
        modalType: null,
        activeSentence: updatedSentence
      }
    case 'INPUT_WORD':
      return {
        ...state,
        inputWord: action.word
      }
    case 'SELECT_PHOTO':
      return {
        ...state,
        activeURI: action.uri
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