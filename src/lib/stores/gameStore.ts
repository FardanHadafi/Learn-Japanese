// lib/stores/gameStore.js
import { writable, derived } from 'svelte/store';
import { hiraganaData } from '../data/hiragana.js';

// Helper function to get random hiragana
function getRandomHiragana(usedCharacters = []) {
	const availableChars = hiraganaData.filter((h) => !usedCharacters.includes(h.char));

	if (availableChars.length === 0) {
		return hiraganaData[Math.floor(Math.random() * hiraganaData.length)];
	}

	return availableChars[Math.floor(Math.random() * availableChars.length)];
}

// Initial game state
const initialState = {
	currentHiragana: getRandomHiragana(),
	userInput: '',
	mistakes: 0,
	correctAnswers: 0,
	currentRound: 1,
	totalRounds: 10,
	maxMistakes: 3,
	gameStatus: 'playing', // 'playing' | 'finished' | 'reset'
	usedCharacters: [],
	results: [], // Array of { char, romanji, userAnswer, isCorrect }
	showFeedback: false,
	feedbackMessage: '',
	feedbackType: '' // 'success' | 'error' | 'warning'
};

// Create the writable store
function createGameStore() {
	const { subscribe, set, update } = writable(initialState);

	return {
		subscribe,

		// Initialize or reset the game
		resetGame: () => {
			const newHiragana = getRandomHiragana();
			set({
				...initialState,
				currentHiragana: newHiragana,
				usedCharacters: [newHiragana.char]
			});
		},

		// Update user input
		setUserInput: (value) => {
			update((state) => ({
				...state,
				userInput: value.toLowerCase().trim()
			}));
		},

		// Check the user's answer
		checkAnswer: () => {
			update((state) => {
				const isCorrect = state.userInput === state.currentHiragana.romanji;

				// Record the result
				const newResult = {
					char: state.currentHiragana.char,
					romanji: state.currentHiragana.romanji,
					userAnswer: state.userInput,
					isCorrect
				};

				if (isCorrect) {
					// Correct answer - increment round and score
					const newCorrectAnswers = state.correctAnswers + 1;
					const newRound = state.currentRound + 1;

					// Check if game is finished (completed 10 rounds)
					if (newCorrectAnswers >= state.totalRounds) {
						return {
							...state,
							correctAnswers: newCorrectAnswers,
							results: [...state.results, newResult],
							gameStatus: 'finished',
							showFeedback: true,
							feedbackMessage: '🎉 Game Complete!',
							feedbackType: 'success',
							userInput: ''
						};
					}

					// Get next hiragana
					const newUsedChars = [...state.usedCharacters, state.currentHiragana.char];
					const nextHiragana = getRandomHiragana(newUsedChars);

					return {
						...state,
						correctAnswers: newCorrectAnswers,
						currentRound: newRound,
						currentHiragana: nextHiragana,
						usedCharacters: [...newUsedChars, nextHiragana.char],
						results: [...state.results, newResult],
						userInput: '',
						showFeedback: true,
						feedbackMessage: '✓ Correct!',
						feedbackType: 'success'
					};
				} else {
					// Wrong answer - increment mistakes only, do NOT change character
					const newMistakes = state.mistakes + 1;

					// Check if mistakes reached limit
					if (newMistakes >= state.maxMistakes) {
						return {
							...state,
							mistakes: 0, // Reset mistakes for next game
							correctAnswers: 0, // Reset score
							currentRound: 1, // Reset round
							results: [], // Clear results
							usedCharacters: [],
							gameStatus: 'reset',
							showFeedback: true,
							feedbackMessage: '❌ Too many mistakes! Game reset.',
							feedbackType: 'error',
							userInput: ''
						};
					}

					const newUsedChars = [...state.usedCharacters, state.currentHiragana.char];
					const nextHiragana = getRandomHiragana(newUsedChars);

					// If user make a mistake then getRandomHiragana();
					return {
						...state,
						mistakes: newMistakes,
						currentHiragana: nextHiragana,
						usedCharacters: [...newUsedChars, nextHiragana.char],
						results: [...state.results, newResult],
						userInput: '',
						showFeedback: true,
						// Updated feedback message to show the correct answer
						feedbackMessage: `✗ Wrong! The correct answer was "${state.currentHiragana.romanji}". (${newMistakes}/${state.maxMistakes} mistakes)`,
						feedbackType: 'warning'
					};
				}
			});
		},

		// Hide feedback message
		hideFeedback: () => {
			update((state) => ({
				...state,
				showFeedback: false
			}));
		},

		// Continue after reset
		continueAfterReset: () => {
			const newHiragana = getRandomHiragana();
			update((state) => ({
				...initialState,
				currentHiragana: newHiragana,
				usedCharacters: [newHiragana.char],
				gameStatus: 'playing'
			}));
		},

		// Restart from results screen
		restartGame: () => {
			const newHiragana = getRandomHiragana();
			set({
				...initialState,
				currentHiragana: newHiragana,
				usedCharacters: [newHiragana.char]
			});
		}
	};
}

// Create the store instance
export const gameStore = createGameStore();

// Derived store for calculated values
export const gameStats = derived(gameStore, ($gameStore) => ({
	accuracy:
		$gameStore.results.length > 0
			? Math.round(($gameStore.correctAnswers / $gameStore.results.length) * 100)
			: 0,
	totalAttempts: $gameStore.results.length,
	mistakeIndicators: Array.from({ length: $gameStore.maxMistakes }, (_, i) =>
		i < $gameStore.mistakes ? '❌' : '⭕'
	).join(' ')
}));
