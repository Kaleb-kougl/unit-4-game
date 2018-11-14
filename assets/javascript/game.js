let charIsSet = false;
let enemySet = false;
let charhp;
let baseCharAttack;
let currentAttack;
let charName;
let enemyhp;
let enemyAttack;
let enemyName;

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

  $(document).on('click', '#attack', handleAttackBtnClick);

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
}

function handleEnemyClick() {
  if (!enemySet) {
    $(this).appendTo('#defender').addClass('current-enemy');
    enemyhp = $(this).attr('data-hp');
    enemyAttack = $(this).attr('data-cap');
    enemyName = $(this).attr('data-name');
    $('.enemy-available').off("click");
    enemySet = true;
  }
}

function handleAttackBtnClick() {
  if (enemySet && enemyhp >= 0 && charhp >= 0) {
    charhp -= enemyAttack;
    enemyhp -= currentAttack;
    $('#attack-output').html(`<div class="col-12">You attacked ${enemyName} for 
    ${currentAttack} damage.<br>${enemyName} attacked you back for ${enemyAttack} damage.</div>`);
    currentAttack += baseCharAttack;
  } else if (enemyhp <= 0) {
    enemySet = false;
    $('.current-enemy').detach();
  } else if (charhp <= 0) {
    console.log('you suck');
  }
}