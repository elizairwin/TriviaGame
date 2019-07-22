//below are my global variables
var panel = $('#quiz-area');
var counterStart = 30;
//below are my clicks
$(document).on('click', '#start-over', function(e) {
	game.reset();
});
$(document).on('click', '.answer-button', function(e) {
	game.clicked(e);
});
$(document).on('click', '#start', function(e) {
	$('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
	game.loadQuestion();
});
//below are my questions, answers, and images
var questions = [{
	question: "What is a popular pizza topping in Brazil?",
	answers: ["Mushrooms", "Green Peas", "Pineapples", "Cauliflower"],
	correctAnswer: "Green Peas",
	image: "assets/images/pizzame.png"
}, {
	question: "Cucumbers are made of what percent water?",
	answers: ["70%", "86%", "92%%", "96%"],
	correctAnswer: "96%",
	image: "assets/images/cucumber.png"
}, {
	question: "McDonald's sells how many hamburgers each second?",
	answers: ["75", "160", "88", "64"],
	correctAnswer: "75",
	image: "assets/images/burgerbun.png"
}, {
	question: "Ranch dressing shares an ingredient with with household item?",
	answers: ["Laundry Detergent", "Toothpaste", "Sunscreen", "Windex"],
	correctAnswer: "Sunscreen",
	image: "assets/images/ranch.png"
}, {
	question: "Eating bananas can help fight what?",
	answers: ["Depression", "Diabetes", "Anxiety", "Cancer"],
	correctAnswer: "Depression",
	image: "assets/images/banana.png"
}, {
	question: "What is the state vegetable of Oklahoma?",
	answers: ["Asparagus", "Cantaloupe", "Sweet Potato", "Watermelon"],
	correctAnswer: "Watermelon",
	image: "assets/images/watermelon.png"
}, {
	question: "Humans are born craving what?",
	answers: ["Sugar", "Protein", "Fat", "Dairy"],
	correctAnswer: "Sugar",
	image: "assets/images/sugar.png"
}, {
	question: "Three plates of food at a Chinese restaurant will net you how many calories?",
	answers: ["5,000", "3,000", "1,500", "2,000"],
	correctAnswer: "3,000",
	image: "assets/images/chinesefood.png"
}, {
	question: "What word refers to the fear of peanut butter sticking to the roof of your mouth?",
	answers: ["Paralatyrophobia", "Bufortyrophobia", "Arachibutyrophobia", "Diagontyrophobia"],
	correctAnswer: "Arachibutyrophobia",
	image: "assets/images/peanutbutter.png"
}, {
	question: "What is SPAM short for?",
	answers: ["Seasoned Ham", "Spiced Ham", "Savory Ham", "Salted Ham"],
	correctAnswer: "Spiced Ham",
	image: "assets/images/spam.png"
}];
//below are my functions
var game = {
	questions: questions,
	currentQuestion: 0,
	counter: counterStart,
	correct: 0,
	incorrect: 0,
	countdown: function() {
		game.counter--;
		$('#counter-number').html(game.counter);
		if (game.counter === 0) {
			console.log('TIME UP');
			game.timeUp();
		}
	},
	loadQuestion: function() {
		timer = setInterval(game.countdown, 1000);
		panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
		for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
			panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
		}
	},
	nextQuestion: function() {
		game.counter = counterStart;
		$('#counter-number').html(game.counter);
		game.currentQuestion++;
		game.loadQuestion();
	},
	timeUp: function() {
		clearInterval(timer);
		$('#counter-number').html(game.counter);
		panel.html('<h2>Out of Time!</h2>');
		panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
		panel.append('<img src="' + questions[this.currentQuestion].image + '" />');
		if (game.currentQuestion === questions.length - 1) {
			setTimeout(game.results, 3 * 1000);
		} else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},
	results: function() {
		clearInterval(timer);
		panel.html('<h2>Quiz Complete, heres how you did!</h2>');
		$('#counter-number').html(game.counter);
		panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
		panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
		panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
		panel.append('<br><button id="start-over">Start Over?</button>');
	},
	clicked: function(e) {
		clearInterval(timer);
		if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
			this.answeredCorrectly();
		} else {
			this.answeredIncorrectly();
		}
	},
	answeredIncorrectly: function() {
		game.incorrect++;
		clearInterval(timer);
		panel.html('<h2>Incorrect! Not mint to be.</h2>');
		panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
		panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
		if (game.currentQuestion === questions.length - 1) {
			setTimeout(game.results, 3 * 1000);
		} else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},
	answeredCorrectly: function() {
		clearInterval(timer);
		game.correct++;
		panel.html('<h2>You Got It! A-maize-ing!</h2>');
		panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
		if (game.currentQuestion === questions.length - 1) {
			setTimeout(game.results, 3 * 1000);
		} else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},
	reset: function() {
		this.currentQuestion = 0;
		this.counter = counterStart;
		this.correct = 0;
		this.incorrect = 0;
		this.loadQuestion();
	}
};