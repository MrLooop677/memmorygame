let blocksContainer = document.querySelector(".memmory-game-block");
let blocks = Array.from(blocksContainer.children);
let ti = document.getElementById("time");
let time = 0;
let timer = 0;
let newgame = document.getElementById("new-game");
let bt = document.querySelector("button");
let retry = document.querySelector(".retry");
let winner = document.getElementById("winn");
let dur = 30;
// Select The Start Game Button
document.querySelector(".conrol-button span").onclick = function() {
    // Prompt Window To Ask For Name
    let yourName = prompt("Whats Your Name?");

    // If Name Is Empty
    if (yourName == null || yourName == "") {
        // Set Name To Unknown
        document.querySelector(".name span").innerHTML = "Unknown";

        // Name Is Not Empty
    } else {
        // Set Name To Your Name
        document.querySelector(".name span").innerHTML = yourName;
    }

    // Remove Splash Screen
    document.querySelector(".conrol-button ").style.display = "none";
    //   document.querySelector(".conrol-button ").remove();  //thats remove this from Tree Dom

    blocks.forEach(function(block) {
        setTimeout(function() {
            block.classList.add("is-fliped");
        }, 3000);

        setTimeout(function() {
            block.classList.remove("is-fliped");
        }, 6000);
    });

    let x = setInterval(() => {
        ti.innerHTML = time;
        if (time < dur) {
            time++;
        } else {
            clearInterval(x);
            blocksContainer.classList.add("stop");
            newgame.classList.add("new-game");
            newgame.style.opacity = 1;
            bt.style.opacity = 1;
        }
    }, 1000);
    timetwinn();
};

bt.onclick = () => {
    location.reload();
};

retry.onclick = () => {
    let coll = blocks.filter((block) => block.classList.contains("is-fliped"));
    for (let i of coll) {
        i.classList.remove("is-fliped");
    }
    blocksContainer.classList.remove("stop");
    time = 0;
    let v = setInterval(() => {
        ti.innerHTML = time;
        if (time < dur) {
            time++;
            newgame.style.display = "none";
        } else {
            clearInterval(v);
            blocksContainer.classList.add("stop");
            newgame.classList.add("new-game");
            newgame.style.opacity = 1;
            bt.style.opacity = 1;
            newgame.style.display = "block";
        }
    }, 1000);
    timetwinn();
};

function timetwinn() {
    timer = 0;
    let v = setInterval(() => {
        if (timer < dur) {
            timer++;
        } else {
            clearInterval(v);

            let colll = blocks.filter((block) =>
                block.classList.contains("has-match")
            );
            if (colll.length == 20) {
                winner.innerHTML = "Winner";
                winner.classList.add("winn");
                retry.remove();
            } else {
                winner.innerHTML = "Loooooose";
                winner.classList.add("winne");
            }
        }
    }, 1000);

    // Effect Duration
    let duration = 1000;

    // Select Blocks Container

    // Create Array From Game Blocks

    // Create Range Of Keys
    // let orderRange = [...Array(blocks.length).keys()];
    // or
    let orderRange = Array.from(Array(blocks.length).keys());
    // شرح
    /*
let arr=[Array(10).keys()]     =>undefined

arr =>[Array Iterator]0: Array Iterator {}__proto__: Array Iteratorlength: 1__proto__: Array(0)

arr=[...Array(10)] =>(10) [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

arr=[...Array(10).keys()] =>(10) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] 

*/

    console.log("olde arr: " + orderRange);
    console.log("New arr: " + shuffle(orderRange));

    blocks.forEach((block, index) => {
        // Add CSS Order Property
        block.style.order = orderRange[index];

        // Add Click Event
        block.addEventListener("click", function() {
            // Trigger The Flip Block Function
            flipBlock(block);
        });
    });

    // Shuffle Function
    function shuffle(array) {
        // Settings Vars
        let current = array.length,
            temp,
            random;

        while (current > 0) {
            // Get Random Number
            random = Math.floor(Math.random() * current);

            // Decrease Length By One
            current--;

            // [1] Save Current Element in Stash
            temp = array[current];

            // [2] Current Element = Random Element
            array[current] = array[random];

            // [3] Random Element = Get Element From Stash
            array[random] = temp;
        }
        return array;
    }

    function flipBlock(selectedBlock) {
        // Add Class is-flipped
        selectedBlock.classList.add("is-fliped");

        let mem = blocks.filter((em) => em.classList.contains("is-fliped"));
        if (mem.length == 2) {
            stopclick();

            checkmath(mem[0], mem[1]);
        }
    }

    function stopclick() {
        blocksContainer.classList.add("stopclick");
        setTimeout(() => {
            blocksContainer.classList.remove("stopclick");
        }, duration);
    }

    function checkmath(block1, block2) {
        let tries = document.querySelector(".tries span");

        if (block1.dataset.game == block2.dataset.game) {
            block1.classList.remove("is-fliped");
            block2.classList.remove("is-fliped");
            block1.classList.add("has-match");
            block2.classList.add("has-match");
        } else {
            tries.innerHTML = parseInt(tries.innerHTML) + 1;
            setTimeout(() => {
                block1.classList.remove("is-fliped");
                block2.classList.remove("is-fliped");
            }, duration);
        }
    }
}

// code anotherway

// // Select The Start Game Button
// document.querySelector(".control-buttons span").onclick = function () {

//   // Prompt Window To Ask For Name
//   let yourName = prompt("Whats Your Name?");

//   // If Name Is Empty
//   if (yourName == null || yourName == "") {

//     // Set Name To Unknown
//     document.querySelector(".name span").innerHTML = 'Unknown';

//   // Name Is Not Empty
//   } else {

//     // Set Name To Your Name
//     document.querySelector(".name span").innerHTML = yourName;

//   }

//   // Remove Splash Screen
//   document.querySelector(".control-buttons").remove();};

//   // Effect Duration
//   let duration = 1000;

//   // Select Blocks Container
//   let blocksContainer = document.querySelector(".memory-game-blocks");

//   // Create Array From Game Blocks
//   let blocks = Array.from(blocksContainer.children);

//   // Create Range Of Keys
//   // let orderRange = [...Array(blocks.length).keys()];

//   let orderRange = Array.from(Array(blocks.length).keys());

//   // console.log(orderRange);
//   shuffle(orderRange);
//   // console.log(orderRange);

//   // Add Order Css Property To Game Blocks
//   blocks.forEach((block, index) => { // Add CSS Order Property
//     block.style.order = orderRange[index];

//     // Add Click Event
//     block.addEventListener('click', function () {

//       // Trigger The Flip Block Function
//       flipBlock(block);

//     });

//   });

//   // Flip Block Function
//   function flipBlock(selectedBlock) {

//     // Add Class is-flipped
//     selectedBlock.classList.add('is-flipped');

//     // Collect All Flipped Cards
//     let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
//    // If Theres Two Selected Blocks
//    if (allFlippedBlocks.length === 2) {

//     // console.log('Two Flipped Blocks Selected');

//     // Stop Clicking Function
//     stopClicking();

//     // Check Matched Block Function
//     checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

//   }

// }

// // Stop Clicking Function
// function stopClicking() {

//   // Add Class No Clicking on Main Container
//   blocksContainer.classList.add('no-clicking');

//   // Wait Duration setTimeout(() => {

//     // Remove Class No Clicking After The Duration
//     blocksContainer.classList.remove('no-clicking');

//   }, duration);

// }

// // Check Matched Block
// function checkMatchedBlocks(firstBlock, secondBlock) {

//   let triesElement = document.querySelector('.tries span');

//   if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

//     firstBlock.classList.remove('is-flipped');
//     secondBlock.classList.remove('is-flipped');

//     firstBlock.classList.add('has-match');
//     secondBlock.classList.add('has-match');
//     document.getElementById('success').play();

//   } else {

//     triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

//     setTimeout(() => {

//       firstBlock.classList.remove('is-flipped');
//       secondBlock.classList.remove('is-flipped');

//     }, duration);

//     document.getElementById('fail').play();

//   }

// }

// // Shuffle Function
// function shuffle(array) {

//   // Settings Vars let current = array.length,
//       temp,
//       random;

//   while (current > 0) {

//     // Get Random Number
//     random = Math.floor(Math.random() * current);

//     // Decrease Length By One
//     current--;

//     // [1] Save Current Element in Stash
//     temp = array[current];

//     // [2] Current Element = Random Element
//     array[current] = array[random];

//     // [3] Random Element = Get Element From Stash
//     array[random] = temp;

//   }

//   return array;}

//   // Current Array [9, 2, 10, 4, 5, 6, 7, 3, 1, 8]
//   /*
//     [1] Save Current Element in Stash
//     [2] Current Element = Random Element
//     [3] Random Element = Get Element From Stash
//   */