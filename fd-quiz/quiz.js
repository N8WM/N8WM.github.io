$(init);

function init() {
  
  lives = 3;
  qnum = 0;
  selected = 0;
  selected_correct = 0;
  numclick = false;
  resize();
  $(window).resize(resize);
  nextQ();
  updateL();
}

function resize() {
  
  let frame = $('#frame');
  let q = $('#question');
  let n = $('#number');
  let doc = $(document);
  
  let size = min(doc.width(), doc.height());
  frame.width(size-10).height(size-10);
  q.width(size-n.outerWidth()-50);
  q.css("padding-top", 10);
  q.css("padding-top", (n.outerHeight() + 20) / 2 - q.outerHeight() / 2 + 10);
  
  setTimeout(() => {
    if (size !== min(doc.width(), doc.height()))
      resize();
  }, 100);
}

function setQ(question) {
  $('#question').html(question);
  resize();
}

function setN(number) {
  $('#num').html((number===12)?"?":number);
}

function updateL() {
  $('#num-lives').html(lives);
}

function setO(o_arr, a) {
  $('#number').off("click");
  let o = $('#options');
  o.html("");
  let str = "";
  for (i = 0; i < 4; i++) {
    o.html(o.html() + "<div class='option' id='o" + (i + 1) + "'>" + o_arr[i] + "</div>");
  }
  for (i = 0; i < 4; i++) {
    if (i + 1 === a) {
      $('#o' + (i + 1)).click(function() {
        correct();
      });
    } else if (a !== "beano") {
      $('#o' + (i + 1)).click(function() {
        incorrect($(this).attr("id"));
      });
    }
    if (a === "num" && !numclick) {
      $('#number').click(() => {
        correct();
      });
      numclick = true;
      $('#number').addClass("clickable");
    } else if (a === "beano") {
      if (i + 1 === 1 || i + 1 === 4) {
        $('#o' + (i + 1)).click(function() {
          if (!$(this).hasClass("sel")) {
            selected++;
            selected_correct++;
          } else {
            selected--;
            selected_correct--;
          }
          $(this).toggleClass("sel");
          if (selected === 2) {
            if (selected_correct === 2) {
              correct();
            } else {
              incorrect($(this).attr("id"));
            }
            selected = 0;
            selected_correct = 0;
          }
        });
      } else {
        $('#o' + (i + 1)).click(function() {
          if (!$(this).hasClass("sel")) {
            selected++;
          } else {
            selected--;
          }
          $(this).toggleClass("sel");
          if (selected === 2) {
            if (selected_correct === 2) {
              correct();
            } else {
              incorrect($(this).attr("id"));
            }
            selected = 0;
            selected_correct = 0;
          }
        });
      }
    }
  }
}

function correct() {
  numclick = false;
  selected = 0;
  selected_correct = 0;
  $('.sel').removeClass("sel");
  $('.clickable').removeClass("clickable");
  nextQ();
}

function incorrect(el) {
  numclick = false;
  selected = 0;
  selected_correct = 0;
  lives -= 1;
  updateL();
  $('.sel').removeClass("sel");
  $('.clickable').removeClass("clickable");
  console.log($("#"+el));
  $("#"+el).css({"color": "#f34", "border-color": "#f34", "background-color": "#fdd"});
  setTimeout(() => {
    $("#"+el).css({"color": "", "border-color": "", "background-color": ""});
    setTimeout(() => {
      $("#"+el).css({"color": "#f34", "border-color": "#f34", "background-color": "#fdd"});
      setTimeout(() => {
        $("#"+el).css({"color": "", "border-color": "", "background-color": ""});
      }, 40);
    }, 40);
  }, 40);
  if (lives <= 0) {
    setTimeout( () => {
      alert("You ran out of lives!");
      location.reload();
    }, 100);
  }
}

function nextQ() {
  if (qnum < 15) {
    qnum++;
    setN(qnum);
    setQ(questions[qnum-1][0]);
    setO(questions[qnum-1].slice(1, 5), questions[qnum-1][5]);
  } else {
    alert("Congratulations, you have passed the impossible test! Here is your Father's Day card...");
    showCard();
  }
}

function showCard() {
  $("#frame").html(`
  <div id="letter">
    Dear Daddy,
    <br /><br />
    <div id="contents">Thank you so much for putting up with me for all nineteen and a
    half years I have been in your life. I don't know what my life would be like without you,
    the way you have always shown me the next step forward. I appreciate that you have been
    letting me make decisions for myself more recently, it is the best way for me to learn how
    to excel in life. I will miss you this coming school year!</div>
    <br />
    Love,
    Nathan
  </div>
  `);
}

function max(f, s) {
  return f>s?f:s;
}

function min(f, s) {
  return f<s?f:s;
}

var lives = 3;
var qnum = 0;
var selected = 0;
var selected_correct = 0;
var numclick = false;
var questions = [
  
  [
    "How many holes are in your name?",
    "2",
    "3",
    "6",
    "9",
    2
  ],
  
  [
    ".SDRAWKCAB NOITSEUQ SIHT REWSNA",
    "YAKO",
    "What?",
    "I don't understand",
    "Tennis Elbow",
    1
  ],
  
  [
    "&#8730;Onion",
    "28",
    "carrot",
    "shallots",
    "&pi;",
    3
  ],
  
  [
    "The answer is really big",
    "<b style='font-size: 35px;'>Answer</b>",
    "Really Big",
    "&infin;",
    "An elephant",
    4
  ],
  
  [
    "What was the answer to question 2?",
    "this one",
    "this one",
    "this one",
    "this one",
    1
  ],
  
  [
    "Choose food:",
    "Glove",
    "Teeth",
    "Dippin' Dots",
    "Wooden chair",
    2
  ],
  
  [
    "What can you put in a bucket to make it lighter?",
    "Gypsies",
    "Torch",
    "A hole",
    "Canned laughter",
    2
  ],
  
  [
    "What is the seventh letter of the alphabet?",
    "G",
    "H",
    "I",
    "J",
    2
  ],
  
  [
    "22 - 13 = ?",
    "11",
    "6.9491",
    "Walrus",
    "2",
    "num" // <----- This needs to be addressed
  ],
  
  [
    "The choice is yours...",
    "+1 life",
    "-1 life",
    "run!!",
    "skip",
    4
  ],
  
  [
    "Which of these place names doesn't exist?",
    "Germansweek",
    "Bitchfield",
    "Arsefacey",
    "Blubberhouses",
    3
  ],
  
  [
    "I hope you've been paying attention to the question numbers!",
    "Go on to question 15",
    "Go on to question 14",
    "Go on to question 12",
    "Go on to question 13",
    4
  ],
  
  [
    "What do you call a wingless fly?",
    "A flap",
    "A walk",
    "Jason",
    "A plumb",
    2
  ],
  
  [
    "Mary Rose sat on a pin.",
    "Mary Rose",
    "O rly?",
    "Ouch",
    "Ahahahaaha!",
    1
  ],
  
  [
    "In Boy Scouts, which two pictures go together to represent the eleventh essential (recently appended due to complaints about Tom McCutchen)?",
    "<img src='img_bean.jpg' alt='Bean' width='100' height='100'>",
    "<img src='img_tent.jpg' alt='Tent' width='100' height='100'>",
    "<img src='img_fish.jpg' alt='Fish' width='100' height='100'>",
    "<img src='img_cheerio.png' alt='Cheerio' width='100' height='100'>",
    "beano" // <----- This needs to be addressed
  ]
  
];