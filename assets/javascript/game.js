let charIsSet = false;
let enemySet = false;
let charhp;
let baseCharAttack;
let currentAttack;
let charName;
let enemyhp;
let enemyAttack;
let enemyName;
let enemyDefeatedCount = 0;

$(document).ready(function() {

  $('.char').click(function() {
    if (!charIsSet) {
      // console.log(charIsSet);
      setCharacter.call(this);
      charIsSet = true;
      // $('.enemy-available').click( handleEnemyClick );
    } else {
      console.log("something not working");
    }
  });

  $(document).on('click', '.enemy-available', handleEnemyClick);

  $(document).on('click', '#restart', handleRestartClick);

});


// moves choice to yourChar row, moves others to enemy row, removes .char from all
function setCharacter() {
  $(this).appendTo('#your-character-row').addClass('character');
  charhp = $(this).attr('data-hp');
  charName = $(this).attr('data-name');
  baseCharAttack = parseInt($(this).attr('data-ap'));
  currentAttack = baseCharAttack;
    
  let characters = $(`.char:not(#${this.id})`).detach();
  for (let i = 0; i < characters.length; i++) {
    $('#enemy-row').append(characters[i]);
  }
  $('#enemy-row .char').addClass('enemy-available');
  $('.char').off("click");
  $('.char').removeClass('char');
  $('.image-row').removeClass('image-row');
}

function handleEnemyClick() {
  if (!enemySet) {
    $(this).appendTo('#defender').addClass('current-enemy');
    enemyhp = $(this).attr('data-hp');
    enemyAttack = $(this).attr('data-cap');
    enemyName = $(this).attr('data-name');
    $('.enemy-available').off("click");
    enemySet = true;
    $(document).on('click', '#attack', handleAttackBtnClick);
    // console.log(enemyhp);
  }
}

function handleAttackBtnClick() {
  if (enemySet && enemyhp >= 0 && charhp >= 0) {
    charhp -= enemyAttack;
    enemyhp -= currentAttack;
    $(`#${charName}`).text(charhp);
    $(`#${enemyName}`).text(enemyhp);
    currentAttack += baseCharAttack;
    $('#attack-output').html(`<div class="col-4">You attacked ${enemyName} for 
      ${currentAttack} damage.<br>${enemyName} attacked you back for ${enemyAttack} damage.</div>`);
  }
  console.log(1);
  if (charhp <= 0) {
    $('#attack-output').html(`<div class="col-4">You've been defeated... GAME OVER!!!</div><div class="col-8"></div>
      <div class="col-4"><button id="restart">Restart</button></div>`);
    $(document).off('click', '#attack', handleAttackBtnClick);
    $(`#${charName}`).text(0);
  } else if (enemyhp <= 0) {
    enemySet = false;
    $('.current-enemy').detach();
    $('#attack-output').html(`<div class="col-4">You have defeated ${enemyName}. You can choose another enemy to fight.</div>`);
    enemyDefeatedCount++;
    console.log(enemyDefeatedCount);
    $(document).off('click', '#attack', handleAttackBtnClick);
  }
  if (enemyDefeatedCount === 3) {
    $('#attack-output').html(`<div class="col-4">You Won!!! GAME OVER!!!</div><div class="col-8"></div>
      <div class="col-4"><button id="restart">Restart</button></div>`);
    $(document).off('click', '#attack', handleAttackBtnClick);
  }
  
}

function handleRestartClick() {
  location.reload(true);
}