// Sample data for the mock draft
const mockDraftData = [
    { pick: 1, team: 'San Antonio Spurs', player: 'Victor Webanyama', position: 'Center' },
    { pick: 2, team: 'Charlotte Hornets', player: 'Brandon Miller', position: 'Forward' },
    { pick: 3, team: 'Portland Trailblazers', player: 'Scoot Henderson', position: 'Guard' },
    { pick: 4, team: 'Houston Rockets', player: 'Avery Thompson', position: 'Guard' },
    { pick: 5, team: 'Detroit Pistons', player: 'Jarace Walker', position: 'Forward' },
    { pick: 6, team: 'Orlando Magic', player: 'Ausar Thompson', position: 'Guard' },
    { pick: 7, team: 'Indiana Pacers', player: 'Cam Whitmore', position: 'Forward' },
    { pick: 8, team: 'Washington Wizards', player: 'Anthony Black', position: 'Guard' },
    { pick: 9, team: 'Utah Jazz', player: 'Cason Wallace', position: 'Guard' },
    { pick: 10, team: 'Dallas Mavericks', player: 'Taylor Hendricks', position: 'Forward' },
    // Add more mock draft data as needed
  ];
  
  const draftPicksContainer = document.getElementById('draft-picks');
  const startSimulationBtn = document.getElementById('start-simulation');
  const stopSimulationBtn = document.getElementById('stop-simulation');
  let simulationInterval;
  let pickIndex = 0;
  const selectedPlayers = []; // Track selected players
  
  // Function to generate draft picks
  function generateDraftPicks() {
    let { pick, team, position } = mockDraftData[pickIndex];
    let player = mockDraftData[pickIndex].player;
  
    // Check if player has already been selected
    while (selectedPlayers.includes(player)) {
      // Filter remaining players excluding the selected ones
      const remainingPlayers = mockDraftData.slice(pickIndex).filter((data) => !selectedPlayers.includes(data.player));
  
      if (remainingPlayers.length > 0) {
        // Randomly select a player from the remaining pool
        const randomIndex = Math.floor(Math.random() * remainingPlayers.length);
        player = remainingPlayers[randomIndex].player;
      } else {
        // If all players have been selected, exit the loop
        break;
      }
    }
  
    selectedPlayers.push(player); // Add player to selected players array
  
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pick}</td>
      <td>${team}</td>
      <td>${player}</td>
      <td>${position}</td>
    `;
    draftPicksContainer.appendChild(row);
  
    pickIndex++;
    if (pickIndex >= mockDraftData.length) {
      stopSimulation();
    }
  }
  
  // Function to start the simulation
  function startSimulation() {
    // Shuffle the remaining players from pick 4 onwards
    const remainingPlayers = mockDraftData.slice(3); // Exclude picks 1-3
    for (let i = remainingPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingPlayers[i], remainingPlayers[j]] = [remainingPlayers[j], remainingPlayers[i]];
    }
  
    // Modify the mockDraftData with shuffled players
    const shuffledDraftData = [
      ...mockDraftData.slice(0, 3), // Picks 1-3 remain the same
      ...remainingPlayers,
    ];
  
    pickIndex = 0;
    selectedPlayers.length = 0; // Clear the selected players array
  
    // Update the mockDraftData with shuffled data
    mockDraftData.splice(0, mockDraftData.length, ...shuffledDraftData);
  
    generateDraftPicks();
    simulationInterval = setInterval(generateDraftPicks, 1000); // Generate new picks every 1 second
    startSimulationBtn.disabled = true;
  }
  
  // Function to stop the simulation
  function stopSimulation() {
    clearInterval(simulationInterval);
    startSimulationBtn.disabled = false;
  }
  
  // Event listeners for simulation controls
  startSimulationBtn.addEventListener('click', startSimulation);
  stopSimulationBtn.addEventListener('click', stopSimulation);
  