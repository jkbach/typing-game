(function () {
window.onload = game();

function game() {
	var wordCount; //number of words completed
	var startTime; //Time the game began (in milliseconds)
	var mistakeCount; //number of mistakes the player has made
	var timerFun;  //The timer
	var GAME_DURATION = 30; //How long the game should last
	var gameOver = false;

	//sets up the initial game state
	$('#stats').hide();
	$('#gameBorder').show();
	$('#gameBorder').css('visibility', 'hidden');
	$('#currWord').css('visibility', 'visible');
	$('#info').css('visibility', 'visible');
	displayWord("start", null, true);

	//Loads a new game
	function startGame() {
		var words = ["act", "again", "agree", "also", "answer", "arrive", "able", "against", "always",
						 "area", "atom", "about", "afraid", "anger", "appear", "above", "after", "allow", 
						 "among", "animal", "baby", "back", "bad", "ball", "band", "bank", "bar", "base", 
						 "basic", "bat", "be", "bear", "beat", "beauty", "bed", "been", "before", "began",
						 "begin", "behind", "believe", "bell", "best", "better", "between", "big", "bird",
						 "bit", "black", "block", "blood", "blow", "blue", "board", "boat", "body", "bone",
						 "book", "born", "both", "bottom", "bought", "box", "boy", "branch", "bread",
						 "break", "bright", "bring", "broad", "broke", "brother", "brought", "brown", 
						 "build", "burn", "busy", "but", "buy", "by", "call", "came", "camp", "can", 
						 "capital", "captain", "car", "card", "care", "carry", "case", "cat", "catch", 
						 "caught", "cause", "cell", "cent", "center", "centre", "century", "certain", 
						 "chair", "chance", "change", "character", "charge", "chart", "check", "chick", 
						 "chief", "child", "children", "choose", "chord", "circle", "city", "claim", 
						 "class", "clean", "clear", "climb", "clock", "close", "clothe", "cloud", "coast", 
						 "coat", "cold", "collect", "colony", "color", "column", "come", "common", 
						 "company", "compare", "complete", "condition", "connect", "consider", "consonant", 
						 "contain", "continent", "continue", "control", "cook", "cool", "copy", "corn", 
						 "corner", "correct", "cost", "cotton", "could", "count", "country", "course", 
						 "cover", "cow", "crease", "create", "crop", "cross", "crowd", "cry", "current", 
						 "cut", "dad", "dance", "danger", "dark", "day", "dead", "deal", "dear", "death", 
						 "decide", "decimal", "deep", "degree", "depend", "describe", "desert", "design", 
						 "determine", "develop", "dictionary", "did", "die", "differ", "difficult", "direct", 
						 "discuss", "distant", "divide", "division", "do", "doctor", "does", "dog", "dollar", 
						 "done", "door", "double", "down", "draw", "dream", "dress", "drink", 
						 "drive", "drop", "dry", "duck", "during", "each", "ear", "early", "earth", "ease", 
						 "east", "eat", "edge", "effect", "egg", "eight", "either", "electric", "element", 
						 "else", "end", "enemy", "energy", "engine", "enough", "enter", "equal", "equate", 
						 "especially", "even", "evening", "event", "ever", "every", "exact", "example", 
						 "except", "excite", "exercise", "expect", "experience", "experiment", "eye", 
						 "face", "fact", "fair", "fall", "family", "famous", "far", "farm", "fast", "fat",
						 "father", "favor", "fear", "feed", "feel", "feet", "fell", "felt", "few", "field",
						 "fig", "fight", "figure", "fill", "final", "find", "fine", "finger", "finish", "fire",
						 "first", "fish", "fit", "five", "flat", "floor", "flow", "flower", "fly", "follow",
						 "food", "foot", "for", "force", "forest", "form", "forward", "found", "four", "fraction",
						 "free", "fresh", "friend", "from", "front", "fruit", "full", "fun", 
						 "game", "garden", "gas", "gather", "gave", "general", "gentle", "get", "girl", "give",
						 "glad", "glass", "go", "gold", "gone", "good", "got", "govern", "grand", "grass",
						 "gray", "great", "green", "grew", "ground", "group", "grow", "guess", "guide", "gun", 
						 "had", "hair", "half", "hand", "happen", "happy", "hard", "has", "hat", "have", "he",
						 "head", "hear", "heard", "heart", "heat", "heavy", "held", "help", "her", "here",
						 "high", "hill", "him", "his", "history", "hit", "hold", "hole", "home", "hope", "horse",
						 "hot", "hour", "house", "how", "huge", "human", "hundred", "hunt", "hurry", 
						 "ice", "idea", "if", "imagine", "in", "inch", "include", "indicate", "industry",
						"insect", "instant", "instrument", "interest", "invent", "iron", "is", "island", "it", 
						"job", "join", "joy", "jump", "just", "keep", "kept", "key", "kill", "kind", "king", "kings", "knew", "know", 
						"lady", "lake", "land", "language", "large", "last", "late", "laugh", "law", "lay",
						"lead", "learn", "least", "leave", "led", "left", "leg", "length", "less", "let",
						"letter", "level", "lie", "life", "lift", "light", "like", "line", "liquid", "list",
						"listen", "little", "live", "locate", "log", "lone", "long", "look", "lost", "lot", 
						"loud", "love", "low", 
						"machine", "made", "magnet", "main", "major", "make", "man", "many", "map", "mark",
						"market", "mass", "master", "match", "material", "matter", "may", "me", "mean", "meant",
						"measure", "meat", "meet", "melody", "men", "metal", "method", "middle", "might",
						"mile", "milk", "million", "mind", "mine", "minute", "miss", "mix", "modern", "molecule",
						"moment", "money", "month", "moon", "more", "morning", "most", "mother", "motion",
						"mount", "mountain", "mouth", "move", "much", "multiply", "music", "must", "my", 
						"name", "nation", "natural", "nature", "near", "necessary", "neck", "need", "neighbor",
						"never", "new", "next", "night", "nine", "no", "noise", "noon", "nor", "north", "nose",
						"note", "nothing", "notice", "noun", "now", "number", "numeral", 
						"object", "observe", "occur", "ocean", "of", "off", "offer", "office", "often", "oh",
						"oil", "old", "on", "once", "one", "only", "open", "operate", "opposite", "or", "order",
						"organ", "original", "other", "our", "out", "over", "own", "oxygen", 
						"page", "paint", "pair", "paper", "paragraph", "parent", "part", "particular", "party",
						"pass", "past", "path", "pattern", "pay", "people", "perhaps", "period", "person",
						"phrase", "pick", "picture", "piece", "pitch", "place", "plain", "plan", "plane",
						"planet", "plant", "play", "please", "plural", "poem", "point", "poor", "populate",
						"port", "pose", "position", "possible", "post", "pound", "power", "practice", "prepare",
						"present", "press", "pretty", "print", "probable", "problem", "process", "produce",
						"product", "proper", "property", "protect", "prove", "provide", "pull", "push", "put", 
						"quart", "question", "quick", "quiet", "quite", "quotient", 
						"race", "radio", "rail", "rain", "raise", "ran", "range", "rather", "reach", "read",
						"ready", "real", "reason", "receive", "record", "red", "region", "remember", "repeat",
						"reply", "represent", "require", "rest", "result", "rich", "ride", "right", "ring",
						"rise", "river", "road", "rock", "roll", "room", "root", "rope", "rose", "round",
						"row", "rub", "rule", "run", 
						"safe", "sail", "same", "sat", "saw", "scale", "science", "sea", "season", "second",
						"see", "seem", "select", "sell", "sense", "sentence", "serve", "settle", "several",
						"shape", "sharp", "sheet", "shine", "shoe", "shore", "should", "shout", "side", "sign",
						"silver", "simple", "sing", "sister", "six", "skill", "sky", "sleep", "slow", "smell",
						"snow", "soft", "soldier", "solve", "son", "soon", "south", "speak", "speech", "spell",
						"spoke", "spread", "square", "star", "state", "stay", "steam", "step", "still", "stood",
						"store", "straight", "stream", "stretch", "strong", "study", "substance", "success",
						"sudden", "sugar", "suit", "sun", "support", "surface", "swim", "symbol", 
						"table", "tail", "take", "talk", "tall", "teach", "team", "teeth", "tell", "temperature",
						"ten", "term", "test", "than", "thank", "that", "the", "their", "them", "then", "there",
						"these", "they", "thick", "thin", "thing", "think", "third", "this", "those", "though",
						"thought", "thousand", "three", "through", "throw", "thus", "tie", "time", "tiny",
						"tire", "to", "together", "told", "tone", "too", "took", "tool", "top", "touch",
						"toward", "town", "track", "trade", "train", "travel", "tree", "triangle", "trip",
						"trouble", "truck", "true", "try", "tube", "turn", "twenty", "two", "type", 
						"under", "unit", "until", "up", "us", "use", "usual", 
						"valley", "value", "vary", "verb", "very", "view", "village", "visit", "voice", "vowel", 
						"wait", "walk", "wall", "want", "war", "warm", "was", "wash", "watch", "water", "wave",
						"way", "we", "wear", "weather", "week", "weight", "well", "went", "were", "west",
						"what", "wheel", "when", "where", "whether", "which", "while", "white", "who", "whole",
						"whose", "why", "wide", "wife", "wild", "will", "win", "wind", "window", "wing",
						"winter", "wire", "wish", "with", "woman", "women", "wonder", "wood", "word",
						"yard", "year", "yellow", "yes", "yet", "you", "young", "your", "zoo", "zipper"];
		wordCount = 0;
		mistakeCount = 0;
		timerFun = setInterval(function() {timer()}, 1000);
		startTime = (new Date()).getTime();
		document.getElementById("timer").innerHTML = "Time remaining: " + GAME_DURATION;
		document.getElementById("misses").innerHTML = "";
		$('#info').hide();
		$('#gameBorder').css('visibility', 'visible');
		var rando = words[Math.floor(Math.random() * words.length)];
		displayWord(rando, words, false);
	}

	//Displays a word to be typed and highlights it as the user types, keeping track
	//of the game staticstics
	function displayWord(word, words, firstRound) {
		console.log("currWord: " + word);
		document.getElementById("currWord").innerHTML = word;
		var currChar = 0;

		var wordLength = word.length;

		$('#currWord').on('click', function() {
			if (firstRound) {
				$('#typeDummy').toggleClass('highlight');
			}
		})

		//when the user types a key
		document.onkeypress = function(evt) {
			if (!gameOver) {
				if (evt.keyCode == 8) {
				 	evt.preventDefault();
				}		
			   evt = evt || window.event;
			   var charCode = evt.which || evt.keyCode;
			   var charTyped = String.fromCharCode(charCode);

			   if ((charCode == 39) || (charCode <= 122 && charCode >= 97)) {
				   if (charCode == word.charCodeAt(currChar)) {
				   	currChar++;
				   	document.getElementById("currWord").innerHTML = "<span class='typed'>"
				   																	 + word.substring(0,currChar) + "</span>"
				   																	 + word.substring(currChar, wordLength);
				   } else {
				   	mistakeCount++;
				   	if (mistakeCount < 8) {
					   	$("#misses").html( $("#misses").html() + "X" );
				   	} else {
				   		$("#misses").html(mistakeCount);
				   	}
				   }
		   	}

		   	//once the user has fully typed the word
			   if (currChar == wordLength) {
			   	if (firstRound) {
			   		startGame();
			   	} else {
			   		wordCount++;
			   		rando = words[Math.floor(Math.random() * words.length)];
			   		displayWord(rando, words, false);
			   	}
			   }
		   }
		};
	}

	//Changes the game state to display statistics when the timer has run out.
	function endGame() {
		gameOver = true;
		$('#gameBorder').hide();
		$('#stats').show();
		window.clearInterval(timerFun);
		var finishTime = (GAME_DURATION * 1000) / 60000;
		console.log(finishTime);
   	var wpm = Math.round(wordCount / finishTime);
   	$('#totalWords').html("Total Words: " + wordCount);
   	$('#wpm').html("WPM: " + wpm);
   	$('#mistakes').html("Total Errors: " + mistakeCount);
   	$('#playAgain').on('click', function() {
   		game();	
   	});
   	return;
	}

	//Tracks how much time the user has left to type, responsible for ending the game
	function timer() {
		var d = new Date();
		var time = Math.round(GAME_DURATION - (d.getTime() - startTime) / 1000);
		document.getElementById("timer").innerHTML = "Time remaining: " + time;
		if (time <= 0) {
			endGame();
		}
	}
}
}());

