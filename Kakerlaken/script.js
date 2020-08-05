var numPlayers = 2;
var playerNames;

var pages = ["title", "num-players", "name-players"]; // List of all window id's

$(refresh);

function refresh() {
  numPlayers = 2;
  lessPlayer();
  
  events();
  open_w(0);
}

function events() {
  $('*').off();
  $('#title div').one('click', function() { open_w(1); });
  $('#less').click(function() { lessPlayer(); });
  $('#more').click(function() { morePlayer(); });
  $('#num-players-btn').click(function() { open_w(2); loadPlayers(); });
}

function open_w(p) {
  for (let page of pages) {
    $('#' + page).animate({opacity: "hide", width: "hide"});
  }
  $('#' + pages[p]).animate({opacity: "show", width: "show"});
}

function lessPlayer() {
  if (numPlayers > 2) {
    numPlayers--;
    $('#less').removeClass("pn-disabled");
    $('#more').removeClass("pn-disabled");
    $('#num-val').html(numPlayers);
  }
  if (numPlayers <= 2) {
    numPlayers = 2;
    $('#less').addClass("pn-disabled");
  }
}

function morePlayer() {
  if (numPlayers < 8) {
    numPlayers++;
    $('#less').removeClass("pn-disabled");
    $('#more').removeClass("pn-disabled");
    $('#num-val').html(numPlayers);
  }
  if (numPlayers >= 8) {
    numPlayers = 8;
    $('#more').addClass("pn-disabled");
  }
}

function loadPlayers() {
  playerNames = [];
  for (let i = 1; i <= numPlayers; i++) {
    playerNames.push("Player " + i);
  }
  loadPlayerHTML();
}

function loadPlayerHTML() {
  page = $('#name-area');
  let phtml = "";
  let pnum = 0;
  for (let name of playerNames) {
    phtml += '<div class="player-name-a ui-btn">' + name + '<div class="player-name-e" data-p="' + pnum + '"><div>edit</div></div></div>';
    pnum++;
  }
  page.html(phtml);
  loadPlayerNameEvents();
}

function loadPlayerNameEvents() {
  $('.player-name-e').each(function() {
    $(this).click(function(e) {
      e.stopPropagation();
      renamePlayer($(this).data("p"));
    });
  });
}

function renamePlayer(pnum) {
  renameHTML  = '<input type="text", placeholder="' + playerNames[pnum] + '" id="rename" maxlength="16" /><br />';
  renameHTML += '<div><div id="save-rename" class="ui-btn">save</div><div id="cancel-pop" class="ui-btn">cancel</div></div>';
  popup(renameHTML);
  setTimeout(() => {
    $('#rename').focus();
    $('#save-rename').one('click', () => { updateName(pnum, $('#rename').val()); });
    $('#cancel-pop').one('click', closePopup);
  }, 0);
}

function updateName(pnum, name) {
  if (name !== "") {
    playerNames[pnum] = name;
    loadPlayerHTML();
    closePopup();
  }
}

function popup(popHTML) {
  $('#pop').html(popHTML);
  $('#pop-bg').show();
}

function closePopup() {
  $('#pop-bg').hide();
  $('#pop').html('');
}