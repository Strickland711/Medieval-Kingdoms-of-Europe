document.addEventListener("DOMContentLoaded", function() {
    const menu = document.getElementById("menu");
    const gameInterface = document.getElementById("game-interface");
    const rulesInterface = document.getElementById("rules-interface");
    const backgroundMusic = document.getElementById("background-music");
    const startGameButton = document.getElementById("start-game");
    const showRulesButton = document.getElementById("show-rules");
    const backToMenuGameButton = document.getElementById("back-to-menu-game");
    const backToMenuRulesButton = document.getElementById("back-to-menu-rules");

    const musicFiles = [
        'music/music1.mp3',
        'music/music2.mp3',
        'music/music3.mp3',
        'music/music4.mp3',
        'music/music5.mp3'
    ];

    const randomMusic = musicFiles[Math.floor(Math.random() * musicFiles.length)];
    backgroundMusic.src = randomMusic;

    backgroundMusic.play().catch(error => {
        console.log('自动播放被阻止:', error);
        document.body.addEventListener('click', () => {
            backgroundMusic.play();
        }, { once: true });
    });

    startGameButton.addEventListener("click", function() {
        menu.style.transition = "opacity 1s ease-out";
        menu.style.opacity = 0;
        setTimeout(() => {
            menu.style.display = "none";
            gameInterface.style.display = "block";
            gameInterface.style.opacity = 1;
        }, 1000);
    });

    showRulesButton.addEventListener("click", function() {
        menu.style.transition = "opacity 1s ease-out";
        menu.style.opacity = 0;
        setTimeout(() => {
            menu.style.display = "none";
            rulesInterface.style.display = "block";
            rulesInterface.style.opacity = 1;
        }, 1000);
    });

    backToMenuGameButton.addEventListener("click", function() {
        gameInterface.style.transition = "opacity 1s ease-out";
        gameInterface.style.opacity = 0;
        setTimeout(() => {
            gameInterface.style.display = "none";
            menu.style.display = "block";
            menu.style.opacity = 1;
        }, 1000);
    });

    backToMenuRulesButton.addEventListener("click", function() {
        rulesInterface.style.transition = "opacity 1s ease-out";
        rulesInterface.style.opacity = 0;
        setTimeout(() => {
            rulesInterface.style.display = "none";
            menu.style.display = "block";
            menu.style.opacity = 1;
        }, 1000);
    });

function loadGameRules() {
    const rulesContent = document.getElementById("rules-content");
    if (!rulesContent) {
        console.error('无法找到 rules-content 元素');
        return;
    }

    fetch('path/to/rules.txt') 
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应失败');
            }
            return response.text();
        })
        .then(data => {
            rulesContent.innerHTML = `<h1>游戏规则</h1><p>${data.replace(/\n/g, '</p><p>')}</p>`;
        })
        .catch(error => {
            console.error('无法加载游戏规则:', error);
            rulesContent.textContent = '抱歉，无法加载游戏规则。';
        });
}

    const initialState = {
        king: 1,
        general: 1,
        lord: 2,
        knight: 3,
        assassin: 3,
        money: 3,
        credibility: 3,
        emtpocket: 1,
        computerKing: 1,
        computerGeneral: 1,
        computerLord: 2,
        computerKnight: 3,
        computerAssassin: 3,
        computerMoney: 3,
        computerCredibility: 3,
        computerEmtpocket: 1
    };

    document.getElementById("king-status").textContent = initialState.king;
    document.getElementById("general-status").textContent = initialState.general;
    document.getElementById("lord-status").textContent = initialState.lord;
    document.getElementById("knight-status").textContent = initialState.knight;
    document.getElementById("assassin-status").textContent = initialState.assassin;
    document.getElementById("money-status").textContent = initialState.money;
    document.getElementById("credibility-status").textContent = initialState.credibility;
    document.getElementById("emtpocket-status").textContent = initialState.emtpocket;
    
    document.getElementById("computer-king-status").textContent = initialState.computerKing;
    document.getElementById("computer-general-status").textContent = initialState.computerGeneral;
    document.getElementById("computer-lord-status").textContent = initialState.computerLord;
    document.getElementById("computer-knight-status").textContent = initialState.computerKnight;
    document.getElementById("computer-assassin-status").textContent = initialState.computerAssassin;
    document.getElementById("computer-money-status").textContent = initialState.computerMoney;
    document.getElementById("computer-credibility-status").textContent = initialState.computerCredibility;
    document.getElementById("computer-emtpocket-status").textContent = initialState.computerEmtpocket;
});

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            restartBtn.classList.add('restart-animation');
            setTimeout(() => {
                restartBtn.classList.remove('restart-animation');
            }, 1000); 
        });
    } else {
        console.error('Restart button not found');
    }
});