<script>
	import { gameStore, gameStats } from '$lib/stores/gameStore.js';

	let inputElement;

	// Auto-hide feedback after 2 seconds
	$: if ($gameStore.showFeedback) {
		setTimeout(() => {
			gameStore.hideFeedback();
		}, 2000);
	}

	// Handle form submission
	function handleSubmit(event) {
		event.preventDefault();

		if ($gameStore.userInput.trim() === '') return;

		gameStore.checkAnswer();

		// Focus back on input after submission
		setTimeout(() => {
			if (inputElement && $gameStore.gameStatus === 'playing') {
				inputElement.focus();
			}
		}, 100);
	}

	// Handle input change
	function handleInput(event) {
		gameStore.setUserInput(event.target.value);
	}

	// Handle restart after game finished
	function handleRestart() {
		gameStore.restartGame();
		setTimeout(() => {
			if (inputElement) inputElement.focus();
		}, 100);
	}

	// Handle continue after reset
	function handleContinue() {
		gameStore.continueAfterReset();
		setTimeout(() => {
			if (inputElement) inputElement.focus();
		}, 100);
	}

	// Initialize game on mount
	import { onMount } from 'svelte';
	onMount(() => {
		gameStore.resetGame();
		if (inputElement) inputElement.focus();
	});
</script>

<main>
	<h1 class="header">Test Your Hiragana</h1>

	{#if $gameStore.gameStatus === 'playing'}
		<!-- Playing State -->
		<div class="container">
			<div class="card-container">
				<!-- Status Bar -->
				<div class="status-bar">
					<span class="round-counter"
						>Round: {$gameStore.currentRound}/{$gameStore.totalRounds}</span
					>
					<span class="mistake-counter">{$gameStats.mistakeIndicators}</span>
				</div>

				<!-- Hiragana Card -->
				<div class="card">
					<span class="hiragana">{$gameStore.currentHiragana.char}</span>
				</div>

				<!-- Feedback Message -->
				{#if $gameStore.showFeedback}
					<div class="feedback {$gameStore.feedbackType}">
						{$gameStore.feedbackMessage}
					</div>
				{/if}

				<!-- Input Form -->
				<form on:submit={handleSubmit}>
					<label for="input" class="label">
						<input
							bind:this={inputElement}
							class="input"
							type="text"
							id="input"
							name="input"
							placeholder="Enter romanji (e.g., 'a', 'ka')"
							value={$gameStore.userInput}
							on:input={handleInput}
							autocomplete="off"
						/>
						<button type="submit" class="btn-submit">Enter</button>
					</label>
				</form>
			</div>
		</div>
	{:else if $gameStore.gameStatus === 'reset'}
		<!-- Reset State (3 mistakes) -->
		<div class="container">
			<div class="card-container result-container">
				<h2 class="result-title">⚠️ Game Reset!</h2>
				<p class="result-text">You made 3 mistakes.</p>
				<p class="result-text">The game has been reset to round 1.</p>
				<p class="result-text">All progress has been cleared.</p>
				<button class="btn-submit" on:click={handleContinue}>Start Over</button>
			</div>
		</div>
	{:else if $gameStore.gameStatus === 'finished'}
		<!-- Finished State (Completed 10 rounds) -->
		<div class="container">
			<div class="card-container result-container">
				<h2 class="result-title">🎉 Complete!</h2>
				<div class="result-stats">
					<div class="stat-item">
						<span class="stat-label">Score:</span>
						<span class="stat-value">{$gameStore.correctAnswers}/{$gameStore.totalRounds}</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">Accuracy:</span>
						<span class="stat-value">{$gameStats.accuracy}%</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">Total Attempts:</span>
						<span class="stat-value">{$gameStore.results.length}</span>
					</div>
				</div>

				<!-- Results List -->
				<div class="results-list">
					<h3>Your Answers:</h3>
					{#each $gameStore.results as result, i}
						<div class="result-item {result.isCorrect ? 'correct' : 'incorrect'}">
							<span class="result-char">{result.char}</span>
							<span class="result-romanji">
								{result.isCorrect ? '✓' : '✗'}
								{result.userAnswer}
								{!result.isCorrect ? `(${result.romanji})` : ''}
							</span>
						</div>
					{/each}
				</div>

				<button class="btn-submit" on:click={handleRestart}>Play Again</button>
			</div>
		</div>
	{/if}
</main>

<style>
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.header {
		text-align: center;
		padding-top: 5rem;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		margin-top: -15rem;
	}

	.card-container {
		border: 1px solid black;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		width: 300px;
		min-height: 450px;
		padding-bottom: 20px;
	}

	/* Status Bar */
	.status-bar {
		display: flex;
		justify-content: space-between;
		padding: 15px 20px;
		background-color: #f5f5f5;
		border-bottom: 1px solid #ddd;
		font-size: 14px;
		font-weight: bold;
	}

	.round-counter {
		color: #333;
	}

	.mistake-counter {
		font-size: 12px;
	}

	/* Card */
	.card {
		margin: 20px auto;
		border: 1px solid black;
		width: 250px;
		height: 250px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}

	.hiragana {
		font-size: 120px;
		font-weight: bold;
		color: #333;
	}

	/* Feedback */
	.feedback {
		text-align: center;
		padding: 10px;
		margin: 10px 20px;
		border-radius: 5px;
		font-weight: bold;
		animation: fadeIn 0.3s ease-in;
	}

	.feedback.success {
		background-color: #d4edda;
		color: #155724;
		border: 1px solid #c3e6cb;
	}

	.feedback.warning {
		background-color: #fff3cd;
		color: #856404;
		border: 1px solid #ffeeba;
	}

	.feedback.error {
		background-color: #f8d7da;
		color: #721c24;
		border: 1px solid #f5c6cb;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Input Form */
	form {
		padding: 0 20px;
	}

	.input {
		text-align: center;
		margin-top: 1rem;
		width: 100%;
		height: 50px;
		border: 2px solid #ddd;
		border-radius: 5px;
		font-size: 16px;
		transition: border-color 0.3s;
	}

	.input:focus {
		outline: none;
		border-color: #333;
	}

	.btn-submit {
		margin-top: 15px;
		border-style: none;
		cursor: pointer;
		width: 100%;
		height: 50px;
		background-color: black;
		color: white;
		font-weight: bold;
		font-size: large;
		border-radius: 5px;
		transition: background-color 0.3s;
	}

	.btn-submit:hover {
		background-color: #333;
	}

	.btn-submit:active {
		background-color: #555;
	}

	/* Results Container */
	.result-container {
		padding: 30px 20px;
		text-align: center;
		min-height: auto;
	}

	.result-title {
		font-size: 28px;
		margin-bottom: 20px;
		color: #333;
	}

	.result-text {
		font-size: 16px;
		margin: 10px 0;
		color: #666;
	}

	.result-stats {
		margin: 25px 0;
		padding: 20px;
		background-color: #f5f5f5;
		border-radius: 8px;
	}

	.stat-item {
		display: flex;
		justify-content: space-between;
		margin: 10px 0;
		font-size: 16px;
	}

	.stat-label {
		font-weight: bold;
		color: #555;
	}

	.stat-value {
		font-weight: bold;
		color: #333;
	}

	/* Results List */
	.results-list {
		margin: 20px 0;
		max-height: 300px;
		overflow-y: auto;
		text-align: left;
	}

	.results-list h3 {
		font-size: 16px;
		margin-bottom: 10px;
		color: #333;
	}

	.result-item {
		display: flex;
		justify-content: space-between;
		padding: 8px 12px;
		margin: 5px 0;
		border-radius: 5px;
		font-size: 14px;
	}

	.result-item.correct {
		background-color: #d4edda;
		color: #155724;
	}

	.result-item.incorrect {
		background-color: #f8d7da;
		color: #721c24;
	}

	.result-char {
		font-size: 20px;
		font-weight: bold;
	}

	.result-romanji {
		font-size: 14px;
	}
</style>
