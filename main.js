//初始化
const players = {
    player: {    
        character: {
            king: { name: '国王', status: 1, rank: 4 },
            general: { name: '将军', status: 1, rank: 3 },
            lord: { name: '领主', status: 2, rank: 2 },
            knight: { name: '骑士', status: 3, rank: 1 },
            assassin: { name: '刺客', status: 3, rank: -99 },
        },
        resource: {
            money: { name: 'money', status: 3 },
            credibility: { name: 'credibility', status: 3 },
            emtpocket: { name: 'emtpocket', status: 1, }
        }
    },
    computer: {
        character: {
            king: { name: '国王', status: 1, rank: 4 },
            general: { name: '将军', status: 1, rank: 3 },
            lord: { name: '领主', status: 2, rank: 2 },
            knight: { name: '骑士', status: 3, rank: 1 },
            assassin: { name: '刺客', status: 3, rank: -99 },
        },
        resource: {
            money: { name: 'money', status: 3 },
            credibility: { name: 'credibility', status: 3 },
            emtpocket: { name: 'emtpocket', status: 1, }
        }
    }
};

let playerSelection = {
    character: null,
    resource: null
};

let computerSelection = {
    character: null,
    resource: null
};

let currentRound = 1;
let gameLog = [];

//按钮点击事件
document.addEventListener("DOMContentLoaded", () => {
    const characterImageContainer = document.getElementById('character-image-container');
    const resourceImageContainer = document.getElementById('resource-image-container');
    const computerCharacterImageContainer = document.getElementById('computer-character-image-container');
    const computerResourceImageContainer = document.getElementById('computer-resource-image-container');

    function createAndDisplayImage(container, src, alt) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.top = '50%';
        img.style.left = '50%';
        img.style.transform = 'translate(-50%, -50%)';
        container.appendChild(img);

        setTimeout(() => {
            img.style.opacity = '1';
        }, 10);
    }

    function addClickListener(buttonId, container, imgSrc, imgAlt, selectionType) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => {
                if (players.player.character[buttonId] && players.player.character[buttonId].status === 0) {
                    alert(`${players.player.character[buttonId].name} 已阵亡，无法选择！`);
                    return;
                }
                if (players.player.resource[buttonId] && players.player.resource[buttonId].status === 0) {
                    alert(`${players.player.resource[buttonId].name} 已耗尽，无法选择！`);
                    return;
                }
                
                createAndDisplayImage(container, imgSrc, imgAlt);
    
                if (buttonId === 'king' || buttonId === 'general' || buttonId === 'lord' || buttonId === 'knight' || buttonId === 'assassin') {
                    playerSelection.character = buttonId;
                } else if (buttonId === 'money' || buttonId === 'credibility' || buttonId === 'emtpocket') {
                    playerSelection.resource = buttonId;
                }
    
                console.log(`playerSelection after clicking ${buttonId}:`, JSON.stringify(playerSelection)); // 使用 JSON.stringify 来显示对象的内容
            });
        } else {
            console.error(`Button with ID ${buttonId} not found`);
        }
    }

    addClickListener('king', characterImageContainer, 'img/king.png', 'King', 'character');
    addClickListener('general', characterImageContainer, 'img/general.png', 'General', 'character');
    addClickListener('lord', characterImageContainer, 'img/lord.png', 'Lord', 'character');
    addClickListener('knight', characterImageContainer, 'img/knight.png', 'Knight', 'character');
    addClickListener('assassin', characterImageContainer, 'img/assassin.png', 'Assassin', 'character');

    addClickListener('money', resourceImageContainer, 'img/money.png', 'Money', 'resource');
    addClickListener('credibility', resourceImageContainer, 'img/credibility.png', 'Credibility', 'resource');
    addClickListener('emtpocket', resourceImageContainer, 'img/emtpocket.png', 'Empty Pocket', 'resource');

    // 电脑操作
    function computerMove() {
        const computerCharacters = ['king', 'general', 'lord', 'knight', 'assassin'].filter(character => players.computer.character[character].status !== 0);
        const computerResources = ['money', 'credibility'].filter(resource => players.computer.resource[resource].status !== 0);
        const randomCharacter = computerCharacters[Math.floor(Math.random() * computerCharacters.length)];
        let randomResource = computerResources[Math.floor(Math.random() * computerResources.length)];
    
        if (randomCharacter === 'assassin') {
            randomResource = 'emtpocket';
        }
    
        computerSelection = {
            character: randomCharacter,
            resource: randomResource
        };
    
        displayComputerSelection(computerSelection);
    }

    function displayComputerSelection(selection) {
        const characterImageMap = {
            king: 'img/king0.png',
            general: 'img/general0.png',
            lord: 'img/lord0.png',
            knight: 'img/knight0.png',
            assassin: 'img/assassin0.png'
        };

        createAndDisplayImage(computerCharacterImageContainer, characterImageMap[selection.character], 'Computer Character');
        createAndDisplayImage(computerResourceImageContainer, `img/${selection.resource}.png`, 'Computer Resource');
    }

    // 确认出牌
    const confirmBtn = document.getElementById('confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            console.log('Confirm button clicked');
            console.log('Current playerSelection:', JSON.stringify(playerSelection)); 
            if (playerSelection.character === 'assassin' && playerSelection.resource !== 'emtpocket') {
                alert('选择刺客后只能选择身无长物！');
                return;
            }
            if (playerSelection.resource === 'emtpocket' && playerSelection.character !== 'assassin') {
                alert('只有选择刺客时才能选择身无长物！');
                return;
            }
            if (playerSelection.character && playerSelection.resource) {
                computerMove();
                resolveRound();
                currentRound++;
                updateGameLog();
            } else {
                alert('Please select both a character and a resource.');
            }
        });
    } else {
        console.error('Confirm button not found');
    }
});

//游戏流程
function resolveRound() {
    const playerChar = players.player.character[playerSelection.character];
    const playerRes = players.player.resource[playerSelection.resource];
    const computerChar = players.computer.character[computerSelection.character];
    const computerRes = players.computer.resource[computerSelection.resource];

    if (!playerChar || !playerRes || !computerChar || !computerRes) {
        console.error('Character or resource selection is missing');
        return;
    }

    if (playerSelection.character === 'assassin' || computerSelection.character === 'assassin') {
        if (playerSelection.character === 'assassin' && computerSelection.character === 'assassin') {
            gameLog.push(`回合 ${currentRound}: 双方都选择了刺客，直接进入下一回合。`);
        } else if (playerSelection.character === 'assassin') {
            playerAssassin(computerChar, computerRes);
        } else {
            computerAssassin(playerChar, playerRes);
        }
    } else {
        handleRegularRound(playerChar, playerRes, computerChar, computerRes);
    }
    clearPlayerSelection();
}

// 刺客判定
function playerAssassin(computerChar, computerRes) {
    const targetCharacterRank = computerChar.rank;
    const targetRanks = ['king', 'general', 'lord', 'knight', 'assassin']
        .filter(character => players.computer.character[character].status !== 0)
        .map(character => players.computer.character[character].rank);
    const highestRankValue = Math.max(...targetRanks);

    if (targetCharacterRank === highestRankValue) {
        computerChar.status -= 1;
        gameLog.push(`回合 ${currentRound}: 刺客成功刺杀 ${computerChar.name}，${computerChar.name}阵亡。`);
        updateStatusDisplay();
    } else {
        if (computerChar.rank % 2 !== 0) {
            if (computerRes.name === 'money') {
                players.player.character.assassin.status -= 1;
                gameLog.push(`回合 ${currentRound}: ${computerChar.name}成功杀死刺客`);
                updateStatusDisplay();
            } else {
                players.player.character.assassin.status -= 1;
                players.computer.character.assassin.status += 1;
                gameLog.push(`回合 ${currentRound}: ${computerChar.name}成功收服刺客，玩家方刺客-1，电脑方刺客+1。`);
                updateStatusDisplay();
            }
        } else {
            if (computerRes.name === 'money') {
                if (Math.random() < 0.5) {
                    players.player.character.assassin.status -= 1;
                    players.player.resource.money.status += 1;
                    players.computer.resource.money.status -= 1;
                    players.computer.character.assassin.status += 1;
                    gameLog.push(`回合 ${currentRound}: ${computerChar.name}收买成功，玩家方金币+1，电脑方金币-1，玩家方刺客-1，电脑方刺客+1。`);
                    updateStatusDisplay();
                } else {
                    players.player.character.assassin.status -= 1;
                    gameLog.push(`回合 ${currentRound}: ${computerChar.name}收买失败，领主杀死刺客，刺客阵亡。`);
                    updateStatusDisplay();
                }
            } else {
                players.player.character.assassin.status -= 1;
                gameLog.push(`回合 ${currentRound}: ${computerChar.name}成功杀死刺客，刺客阵亡。`);
                updateStatusDisplay();
            }  
        }
    }
}

function computerAssassin(playerChar, playerRes) {
    const targetCharacterRank = playerChar.rank;
    const targetRanks = ['king', 'general', 'lord', 'knight', 'assassin']
        .filter(character => players.player.character[character].status !== 0)
        .map(character => players.player.character[character].rank);
    const highestRankValue = Math.max(...targetRanks);

    if (targetCharacterRank === highestRankValue) {
        playerChar.status -= 1;
        gameLog.push(`回合 ${currentRound}: 刺客成功刺杀 ${playerChar.name}，${playerChar.name}阵亡。`);
        updateStatusDisplay();
    } else {
        if (playerChar.rank % 2 !== 0) {
            if (playerRes.name === 'money') {
                players.computer.character.assassin.status -= 1;
                gameLog.push(`回合 ${currentRound}: ${playerChar.name}成功杀死刺客。`);
                updateStatusDisplay();
            } else {
                players.computer.character.assassin.status -= 1;
                players.player.character.assassin.status += 1;
                gameLog.push(`回合 ${currentRound}: ${playerChar.name}成功收服刺客，电脑方刺客-1，玩家方刺客+1。`);
                updateStatusDisplay();
            }
        } else {
            if (playerRes.name === 'money') {
                if (Math.random() < 0.5) {
                    players.computer.character.assassin.status -= 1;
                    players.computer.resource.money.status += 1;
                    players.player.resource.money.status -= 1;
                    players.player.character.assassin.status += 1;
                    gameLog.push(`回合 ${currentRound}: ${playerChar.name}收买成功，电脑方金币+1，玩家方金币-1，电脑方刺客-1，玩家方刺客+1。`);
                    updateStatusDisplay();
                } else {
                    players.computer.character.assassin.status -= 1;
                    gameLog.push(`回合 ${currentRound}: ${playerChar.name}收买失败，领主杀死刺客，刺客阵亡。`);
                    updateStatusDisplay();
                }
            } else {
                players.computer.character.assassin.status -= 1;
                gameLog.push(`回合 ${currentRound}: ${playerChar.name}成功杀死刺客，刺客阵亡。`);
                updateStatusDisplay();
            }
        }
    }
}

// 普通判定
function handleRegularRound(playerChar, playerRes, computerChar, computerRes) {
    if (playerChar.rank > computerChar.rank) {
        if (playerRes.name === 'money' && computerRes.name === 'money') {
            computerChar.status -= 1;
            gameLog.push(`回合 ${currentRound}: ${playerChar.name}成功杀死${computerChar.name}，${computerChar.name}阵亡。`);
        } else if (playerRes.name === 'credibility' && computerRes.name === 'credibility') {
            computerChar.status -= 1;
            gameLog.push(`回合 ${currentRound}: ${playerChar.name}成功杀死${computerChar.name}，${computerChar.name}阵亡。`);
        } else if (playerRes.name === 'money') {
            if (Math.random() < 0.5) {
                players.player.character[computerSelection.character].status += 1;
                computerChar.status -= 1;
                players.player.resource.money.status -= 1;
                players.computer.resource.money.status += 1;
                gameLog.push(`回合 ${currentRound}: ${playerChar.name}收买成功，${computerChar.name}归入${playerChar.name}麾下，电脑方金币+1，玩家方金币-1。`);
            } else {
                computerChar.status -= 1;
                players.player.resource.credibility.status -= 1;
                gameLog.push(`回合 ${currentRound}: ${playerChar.name}收买失败，${playerChar.name}杀死${computerChar.name}，${computerChar.name}阵亡，玩家方公信力-1。`);
            }
        } else {
            if (Math.random() < 0.5) {
                players.player.resource.money.status += 1;
                players.computer.resource.money.status -= 1;
                gameLog.push(`回合 ${currentRound}: ${computerChar.name}贿赂成功，玩家方金币+1，电脑方金币-1。`);
            } else {
                computerChar.status -= 1;
                players.player.resource.credibility.status += 1;
                gameLog.push(`回合 ${currentRound}: ${computerChar.name}贿赂失败，${playerChar.name}杀死${computerChar.name}，${computerChar.name}阵亡，玩家方公信力+1。`);
            }
        }
    } else if (playerChar.rank < computerChar.rank) {
        if (playerRes.name === 'money' && computerRes.name === 'money') {
            playerChar.status -= 1;
            gameLog.push(`回合 ${currentRound}: ${computerChar.name}成功杀死${playerChar.name}，${playerChar.name}阵亡。`);
        } else if (playerRes.name === 'credibility' && computerRes.name === 'credibility') {
            playerChar.status -= 1;
            gameLog.push(`回合 ${currentRound}: ${computerChar.name}成功杀死${playerChar.name}，${playerChar.name}阵亡。`);
        } else if (computerRes.name === 'money') {
            if (Math.random() < 0.5) {
                players.computer.character[playerSelection.character].status += 1;
                playerChar.status -= 1;
                players.computer.resource.money.status -= 1;
                players.player.resource.money.status += 1;
                gameLog.push(`回合 ${currentRound}: ${computerChar.name}收买成功，${playerChar.name}归入${computerChar.name}麾下，玩家方金币+1，电脑方金币-1。`);
            } else {
                playerChar.status -= 1;
                players.computer.resource.credibility.status -= 1;
                gameLog.push(`回合 ${currentRound}: ${computerChar.name}收买失败，${computerChar.name}杀死${playerChar.name}，${playerChar.name}阵亡，电脑方公信力-1。`);
            }
        } else {
            if (Math.random() < 0.5) {
                players.computer.resource.money.status += 1;
                players.player.resource.money.status -= 1;
                gameLog.push(`回合 ${currentRound}: ${playerChar.name}贿赂成功，电脑方金币+1，玩家方金币-1。`);
            } else {
                playerChar.status -= 1;
                players.computer.resource.credibility.status += 1;
                gameLog.push(`回合 ${currentRound}: ${playerChar.name}贿赂失败，${computerChar.name}杀死${playerChar.name}，${playerChar.name}阵亡，电脑方公信力+1。`);
            }
        }
    } else {
        gameLog.push(`回合 ${currentRound}: 双方角色相同，进入下一回合。`);
    }
    updateStatusDisplay();
}

//游戏结束判定
function endtest() {
    const playerCharacters = ['king', 'general', 'lord'];
    const playerResources = ['money', 'credibility'];
    const playerLostAllImportantCharacters = playerCharacters.every(character => players.player.character[character].status === 0);
    if (playerLostAllImportantCharacters) {
        showGameOverScreen('游戏结束！玩家失去了全部领主、将军、国王，玩家失败。', false);
        return true;
    }
    const playerLostAllCredibility = players.player.resource.credibility.status === 0;
    if (playerLostAllCredibility) {
        showGameOverScreen('游戏结束！玩家失去了全部公信力，玩家失败。', false);
        return true;
    }
    const playerLostAllMoney = players.player.resource.money.status === 0;
    if (playerLostAllMoney) {
        showGameOverScreen('游戏结束！玩家失去了全部金钱，玩家失败。', false);
        return true;
    }
    const computerLostAllImportantCharacters = playerCharacters.every(character => players.computer.character[character].status === 0);
    if (computerLostAllImportantCharacters) {
        showGameOverScreen('游戏结束！电脑失去了全部领主、将军、国王，玩家胜利。', true);
        return true;
    }
    const computerLostAllCredibility = players.computer.resource.credibility.status === 0;
    if (computerLostAllCredibility) {
        showGameOverScreen('游戏结束！电脑失去了全部公信力，玩家胜利。', true);
        return true;
    }
    const computerLostAllMoney = players.computer.resource.money.status === 0;
    if (computerLostAllMoney) {
        showGameOverScreen('游戏结束！电脑失去了全部金钱，玩家胜利。', true);
        return true;
    }
    return false;
}

//清空选择
function clearPlayerSelection() {
    playerSelection.character = null;
    playerSelection.resource = null;
}

// 显示游戏结束画面
function showGameOverScreen(message, isWin) {
    const gameOverScreen = document.getElementById('game-over-screen');
    const gameOverMessage = document.getElementById('game-over-message');
    gameOverMessage.innerText = message;
    gameOverScreen.style.display = 'block';
    const winBackground = document.getElementById('win-background');
    const loseBackground = document.getElementById('lose-background');
    if (isWin) {
        winBackground.style.display = 'block';
        loseBackground.style.display = 'none';
    } else {
        winBackground.style.display = 'none';
        loseBackground.style.display = 'block';
    }
    const gameInterface = document.getElementById('game-interface');
    gameInterface.style.transition = "opacity 1s ease-out";
    gameInterface.style.opacity = 0;
    setTimeout(() => {
        gameInterface.style.display = 'none';
    }, 1000); 
    document.querySelectorAll('button').forEach(button => button.disabled = true);
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.disabled = false; 
        restartBtn.addEventListener('click', restartGame);
        restartBtn.classList.add('restart-animation'); 
    } else {
        console.error('Restart button not found');
    }
}

//重新开始游戏
function restartGame() {
    resetGame();
    const gameInterface = document.getElementById('game-interface');
    gameInterface.style.display = 'block';
    gameInterface.style.opacity = 1;
    const gameOverScreen = document.getElementById('game-over-screen');
    gameOverScreen.style.display = 'none';
    document.querySelectorAll('button').forEach(button => button.disabled = false);
}

// 重置游戏
function resetGame() {
    players.player.character.king.status = 1;
    players.player.character.general.status = 1;
    players.player.character.lord.status = 2;
    players.player.character.knight.status = 3;
    players.player.character.assassin.status = 3;
    players.player.resource.money.status = 3;
    players.player.resource.credibility.status = 3;
    players.player.resource.emtpocket.status = 1;

    players.computer.character.king.status = 1;
    players.computer.character.general.status = 1;
    players.computer.character.lord.status = 2;
    players.computer.character.knight.status = 3;
    players.computer.character.assassin.status = 3;
    players.computer.resource.money.status = 3;
    players.computer.resource.credibility.status = 3;
    players.computer.resource.emtpocket.status = 1;

    playerSelection = {
        character: null,
        resource: null
    };

    computerSelection = {
        character: null,
        resource: null
    };

    currentRound = 1;
    gameLog = [];

    updateStatusDisplay();
    updateGameLog();
}

//更新双方状态值
function updateStatusDisplay() {

    document.getElementById('king-status').innerText = players.player.character.king.status;
    document.getElementById('general-status').innerText = players.player.character.general.status;
    document.getElementById('lord-status').innerText = players.player.character.lord.status;
    document.getElementById('knight-status').innerText = players.player.character.knight.status;
    document.getElementById('assassin-status').innerText = players.player.character.assassin.status;
    
    document.getElementById('money-status').innerText = players.player.resource.money.status;
    document.getElementById('credibility-status').innerText = players.player.resource.credibility.status;
    document.getElementById('emtpocket-status').innerText = players.player.resource.emtpocket.status;

    document.getElementById('computer-king-status').innerText = players.computer.character.king.status;
    document.getElementById('computer-general-status').innerText = players.computer.character.general.status;
    document.getElementById('computer-lord-status').innerText = players.computer.character.lord.status;
    document.getElementById('computer-knight-status').innerText = players.computer.character.knight.status;
    document.getElementById('computer-assassin-status').innerText = players.computer.character.assassin.status;

    document.getElementById('computer-money-status').innerText = players.computer.resource.money.status;
    document.getElementById('computer-credibility-status').innerText = players.computer.resource.credibility.status;
    document.getElementById('computer-emtpocket-status').innerText = players.computer.resource.emtpocket.status;

    if (endtest()) {

        document.querySelectorAll('button').forEach(button => button.disabled = true);
    }
}

// 更新游戏日志
function updateGameLog() {
    const logDiv = document.getElementById('game-log');
    logDiv.innerHTML = '';
    gameLog.forEach((log, index) => {
        const logEntry = document.createElement('p');
        logEntry.textContent = log;
        logDiv.appendChild(logEntry);
    });
    setTimeout(() => {
        const gameLog = document.getElementById('game-log');
        gameLog.scrollTop = gameLog.scrollHeight;
    }, 0);
}
