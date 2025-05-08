const gameState = {
            playerName: "Adventurer",
            playerClass: "Unknown",
            inventory: [],
            visitedLocations: []
        };
        
        // DOM Elements
        const startQuestBtn = document.getElementById('start-quest');
        const playerNameInput = document.getElementById('player-name');
        const classOptions = document.querySelectorAll('.class-option');
        const choiceButtons = document.querySelectorAll('.choice-btn');
        const playerNameDisplay = document.getElementById('player-name-display');
        const playerClassDisplay = document.getElementById('player-class-display');
        const inventoryList = document.getElementById('inventory-list');
        const notification = document.getElementById('notification');
        
        // Initialize Game
        function initGame() {
            // Class selection
            classOptions.forEach(option => {
                option.addEventListener('click', function() {
                    classOptions.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    gameState.playerClass = this.getAttribute('data-class');
                });
            });
            
            // Start quest button
            startQuestBtn.addEventListener('click', function() {
                const playerName = playerNameInput.value.trim();
                if (playerName === "") {
                    showNotification("Please enter your name before starting the quest.");
                    return;
                }
                
                if (!gameState.playerClass) {
                    showNotification("Please select your class before starting the quest.");
                    return;
                }
                
                gameState.playerName = playerName;
                playerNameDisplay.textContent = gameState.playerName;
                playerClassDisplay.textContent = gameState.playerClass;
                
                showScreen('map-screen');
                saveGameState();
            });
            
            // Choice buttons
            document.addEventListener('click', function(e) {
                const button = e.target.closest('.choice-btn');
                if (button) {
                    const targetScreen = button.getAttribute('data-target');
                    if (targetScreen) {
                        // Check if this choice gives an item
                        if (targetScreen.includes('crystal') && !gameState.inventory.includes(`${targetScreen.split('-')[0]} Crystal Fragment`)) {
                            addToInventory(`${targetScreen.split('-')[0]} Crystal Fragment`);
                        }
                        
                        showScreen(targetScreen);
                    }
                }
            });
            
            // Map region clicks
            document.querySelectorAll('.map-region').forEach(region => {
                region.addEventListener('click', function() {
                    const regionId = this.getAttribute('data-region');
                    showScreen(`${regionId}-screen`);
                    
                    if (!gameState.visitedLocations.includes(regionId)) {
                        gameState.visitedLocations.push(regionId);
                        saveGameState();
                    }
                });
            });
            
            // Load game state if exists
            loadGameState();
        }
        
        // Show screen
        function showScreen(screenId) {
            document.querySelectorAll('.game-screen').forEach(screen => {
                screen.classList.remove('active');
            });
            
            const targetScreen = document.getElementById(screenId);
            if (targetScreen) {
                targetScreen.classList.add('active');
            }
        }
        
        // Add item to inventory
        function addToInventory(item) {
            if (!gameState.inventory.includes(item)) {
                gameState.inventory.push(item);
                updateInventoryDisplay();
                showNotification(`Item Acquired: ${item}`);
                saveGameState();
            }
        }
        
        // Update inventory display
        function updateInventoryDisplay() {
            inventoryList.innerHTML = '';
            
            if (gameState.inventory.length === 0) {
                const emptyItem = document.createElement('li');
                emptyItem.textContent = 'Empty';
                inventoryList.appendChild(emptyItem);
            } else {
                gameState.inventory.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item;
                    inventoryList.appendChild(listItem);
                });
            }
        }
        
        // Show notification
        function showNotification(message) {
            notification.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
        
        // Save game state
        function saveGameState() {
            localStorage.setItem('fantasyQuestState', JSON.stringify(gameState));
        }
        
        // Load game state
        function loadGameState() {
            const savedState = localStorage.getItem('fantasyQuestState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                gameState.playerName = parsedState.playerName || "Adventurer";
                gameState.playerClass = parsedState.playerClass || "Unknown";
                gameState.inventory = parsedState.inventory || [];
                gameState.visitedLocations = parsedState.visitedLocations || [];
                
                playerNameDisplay.textContent = gameState.playerName;
                playerClassDisplay.textContent = gameState.playerClass;
                updateInventoryDisplay();
            }
        }
        localStorage.removeItem("inventory"); // або
localStorage.clear(); // якщо хочеш очистити все
        // Initialize the game
                document.addEventListener('DOMContentLoaded', function() {
            // Now it's safe to access DOM elements
            const inputElement = document.getElementById('gradientInput');
            
            // Example of using the input (optional)
            if (inputElement) {
                inputElement.addEventListener('input', function() {
                    console.log('Input value:', this.value);
                });
            }
        });
        initGame();
