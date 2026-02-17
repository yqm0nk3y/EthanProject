// ============================================================
// BUILD A BOAT FOR TREASURE - 3D Edition (Three.js)
// ============================================================

// ===== BLOCK DEFINITIONS =====
// All blocks from Build a Boat for Treasure
const BLOCK_TYPES = {
    // ---- FREE / STARTER ----
    wood:           { name: "Wood",            color: 0x8B5E3C, hp: 30,   weight: 1,    buoyancy: 1.2,  cost: 0,    unlocked: true,  category: "Basic" },
    plank:          { name: "Wood Plank",      color: 0xC49A6C, hp: 20,   weight: 0.6,  buoyancy: 1.4,  cost: 0,    unlocked: true,  category: "Basic" },
    wood_rod:       { name: "Wood Rod",        color: 0x9B6E4C, hp: 15,   weight: 0.4,  buoyancy: 1.5,  cost: 0,    unlocked: true,  category: "Basic", shape: "rod" },

    // ---- COMMON ----
    brick:          { name: "Brick",           color: 0xB84030, hp: 60,   weight: 2.5,  buoyancy: 0.3,  cost: 20,   unlocked: false, category: "Common" },
    stone:          { name: "Stone",           color: 0x777788, hp: 80,   weight: 3,    buoyancy: 0.3,  cost: 50,   unlocked: false, category: "Common" },
    glass:          { name: "Glass",           color: 0x88DDFF, hp: 10,   weight: 0.8,  buoyancy: 0.5,  cost: 40,   unlocked: false, category: "Common", transparent: true },
    glass_pane:     { name: "Glass Pane",      color: 0xAAEEFF, hp: 5,    weight: 0.3,  buoyancy: 0.4,  cost: 25,   unlocked: false, category: "Common", transparent: true, shape: "pane" },
    ice:            { name: "Ice",             color: 0xCCF0FF, hp: 25,   weight: 1.2,  buoyancy: 0.9,  cost: 35,   unlocked: false, category: "Common", transparent: true },
    rubber:         { name: "Rubber",          color: 0xFF6B6B, hp: 15,   weight: 0.4,  buoyancy: 2.5,  cost: 75,   unlocked: false, category: "Common" },
    sand:           { name: "Sand",            color: 0xE8D68C, hp: 20,   weight: 2,    buoyancy: 0.2,  cost: 15,   unlocked: false, category: "Common" },
    hay:            { name: "Hay Bale",        color: 0xCCB840, hp: 15,   weight: 0.5,  buoyancy: 2.0,  cost: 20,   unlocked: false, category: "Common" },

    // ---- METAL ----
    iron:           { name: "Iron",            color: 0xAABBCC, hp: 120,  weight: 4,    buoyancy: 0.2,  cost: 100,  unlocked: false, category: "Metal", metalness: 0.6 },
    steel:          { name: "Steel",           color: 0x6688AA, hp: 200,  weight: 6,    buoyancy: 0.1,  cost: 300,  unlocked: false, category: "Metal", metalness: 0.7 },
    gold_block:     { name: "Gold Block",      color: 0xFFD700, hp: 60,   weight: 5,    buoyancy: 0.1,  cost: 200,  unlocked: false, category: "Metal", metalness: 0.8 },
    copper:         { name: "Copper",          color: 0xDD8844, hp: 90,   weight: 3.5,  buoyancy: 0.2,  cost: 80,   unlocked: false, category: "Metal", metalness: 0.5 },

    // ---- SPECIAL MATERIALS ----
    obsidian:       { name: "Obsidian",        color: 0x2C1F4A, hp: 500,  weight: 8,    buoyancy: 0.05, cost: 500,  unlocked: false, category: "Rare" },
    diamond:        { name: "Diamond",         color: 0x55FFEE, hp: 800,  weight: 5,    buoyancy: 0.1,  cost: 1000, unlocked: false, category: "Rare", metalness: 0.9, transparent: true },
    plasma:         { name: "Plasma",          color: 0xDD44FF, hp: 1000, weight: 2,    buoyancy: 0.5,  cost: 2000, unlocked: false, category: "Legendary", emissive: true },
    dark_matter:    { name: "Dark Matter",     color: 0x110022, hp: 2000, weight: 10,   buoyancy: 0.02, cost: 5000, unlocked: false, category: "Legendary", emissive: true },
    super_block:    { name: "Super Block",     color: 0xFF2200, hp: 1500, weight: 3,    buoyancy: 1.0,  cost: 3000, unlocked: false, category: "Legendary", emissive: true },
    magma:          { name: "Magma",           color: 0xFF4400, hp: 300,  weight: 5,    buoyancy: 0.15, cost: 400,  unlocked: false, category: "Rare", emissive: true },
    candy:          { name: "Candy",           color: 0xFF88CC, hp: 20,   weight: 0.5,  buoyancy: 1.0,  cost: 60,   unlocked: false, category: "Fun" },
    cotton_candy:   { name: "Cotton Candy",    color: 0xFFAADD, hp: 5,    weight: 0.1,  buoyancy: 3.5,  cost: 80,   unlocked: false, category: "Fun" },
    cake:           { name: "Cake",            color: 0xFFDDBB, hp: 10,   weight: 0.8,  buoyancy: 0.8,  cost: 45,   unlocked: false, category: "Fun" },
    pizza:          { name: "Pizza",           color: 0xEEAA33, hp: 10,   weight: 0.5,  buoyancy: 0.7,  cost: 40,   unlocked: false, category: "Fun", shape: "pane" },

    // ---- FLOATING / LIGHT ----
    balloon:        { name: "Balloon",         color: 0xFF69B4, hp: 5,    weight: 0.1,  buoyancy: 5.0,  cost: 150,  unlocked: false, category: "Float", transparent: true },
    life_preserver: { name: "Life Preserver",  color: 0xFF3300, hp: 15,   weight: 0.3,  buoyancy: 4.0,  cost: 100,  unlocked: false, category: "Float", shape: "torus" },
    barrel:         { name: "Barrel",          color: 0x7A5230, hp: 35,   weight: 0.8,  buoyancy: 2.2,  cost: 30,   unlocked: false, category: "Float", shape: "cylinder" },
    cork:           { name: "Cork",            color: 0xC8A870, hp: 10,   weight: 0.2,  buoyancy: 3.0,  cost: 55,   unlocked: false, category: "Float" },

    // ---- MECHANICAL ----
    spring:         { name: "Spring",          color: 0x44DD44, hp: 25,   weight: 0.8,  buoyancy: 0.5,  cost: 90,   unlocked: false, category: "Mech", metalness: 0.5, shape: "spring" },
    wheel:          { name: "Wheel",           color: 0x333333, hp: 50,   weight: 1.5,  buoyancy: 0.4,  cost: 120,  unlocked: false, category: "Mech", shape: "cylinder" },
    propeller:      { name: "Propeller",       color: 0xCCCCDD, hp: 40,   weight: 1.2,  buoyancy: 0.3,  cost: 200,  unlocked: false, category: "Mech", metalness: 0.7, special: "speed" },
    jet_engine:     { name: "Jet Engine",      color: 0x888899, hp: 80,   weight: 3,    buoyancy: 0.2,  cost: 500,  unlocked: false, category: "Mech", metalness: 0.8, special: "boost" },
    rocket:         { name: "Rocket",          color: 0xEE4422, hp: 30,   weight: 1.5,  buoyancy: 0.3,  cost: 350,  unlocked: false, category: "Mech", special: "boost" },
    steering_wheel: { name: "Steering Wheel",  color: 0x6B4226, hp: 30,   weight: 0.8,  buoyancy: 0.5,  cost: 80,   unlocked: false, category: "Mech", shape: "torus" },
    hinge:          { name: "Hinge",           color: 0x999999, hp: 40,   weight: 0.5,  buoyancy: 0.3,  cost: 60,   unlocked: false, category: "Mech", metalness: 0.6 },
    seat:           { name: "Seat",            color: 0xCC2222, hp: 20,   weight: 0.7,  buoyancy: 0.6,  cost: 50,   unlocked: false, category: "Mech" },

    // ---- EXPLOSIVE / POWER ----
    tnt:            { name: "TNT",             color: 0xDD2200, hp: 10,   weight: 1,    buoyancy: 0.5,  cost: 75,   unlocked: false, category: "Power", special: "explode" },
    dynamite:       { name: "Dynamite",        color: 0xFF3311, hp: 8,    weight: 0.6,  buoyancy: 0.4,  cost: 60,   unlocked: false, category: "Power", shape: "rod", special: "explode" },
    firework:       { name: "Firework",        color: 0xFF44FF, hp: 5,    weight: 0.4,  buoyancy: 0.6,  cost: 50,   unlocked: false, category: "Power", shape: "rod", special: "boost" },

    // ---- DECORATION ----
    flag:           { name: "Flag",            color: 0xFF0000, hp: 5,    weight: 0.1,  buoyancy: 0.2,  cost: 10,   unlocked: false, category: "Decor", shape: "pane" },
    light:          { name: "Light",           color: 0xFFFF88, hp: 8,    weight: 0.3,  buoyancy: 0.3,  cost: 25,   unlocked: false, category: "Decor", emissive: true },
    neon:           { name: "Neon",            color: 0x00FFAA, hp: 12,   weight: 0.4,  buoyancy: 0.3,  cost: 45,   unlocked: false, category: "Decor", emissive: true },
    tiles:          { name: "Tiles",           color: 0xEEEEDD, hp: 30,   weight: 1.5,  buoyancy: 0.3,  cost: 20,   unlocked: false, category: "Decor" },
    carpet:         { name: "Carpet",          color: 0xAA2244, hp: 8,    weight: 0.2,  buoyancy: 0.5,  cost: 15,   unlocked: false, category: "Decor", shape: "pane" },
};

// ===== TEAMS =====
const TEAMS = {
    red:    { name: "Red Raiders",    color: 0xDD3333, accent: 0xFF6666 },
    blue:   { name: "Blue Buccaneers", color: 0x3366CC, accent: 0x6699FF },
    green:  { name: "Green Gators",   color: 0x33AA44, accent: 0x66DD77 },
    yellow: { name: "Yellow Yachts",  color: 0xDDAA00, accent: 0xFFDD44 },
};
let playerTeam = null;
let teamScores = { red: 0, blue: 0, green: 0, yellow: 0 };
let aiBoats = [];

// NPC Bots (walk around build area)
const BOT_NAMES = [
    "xXBuilderXx", "BoatMaster99", "TreasureHuntr", "CoolKid2024", "ProSailor",
    "BlockPlacer", "NoobyMcNoob", "SpeedBoat123", "GoldRush_", "RiverKing",
    "EpicGamer42", "BoatDestroyr", "Xx_Legend_xX", "ObbyPro", "SailAway",
    "TheBrickLord", "WaterBoy_", "Captain_Cool", "DiamondBoat", "FloodMaster",
];
let buildBots = [];

// Chat system
const BOT_CHAT_MESSAGES = {
    idle: [
        "anyone wanna trade blocks?", "this is gonna be the best boat ever",
        "who has diamond blocks?", "im building a mega ship", "first time playing this!",
        "how do i get more gold?", "my boat sank last time lol", "need more wood",
        "check out my boat!!", "does anyone have obsidian?", "brb getting snacks",
        "lol i keep sinking", "gg last round", "whos on my team?",
        "plasma blocks are OP", "i unlocked jet engine!!", "anyone else lagging?",
        "how do u build tall?", "click on the sides of blocks to stack up!",
        "this game is so fun", "i have 9999 gold jk", "rubber blocks float the best",
    ],
    sailing: [
        "LETS GOOO", "dodge dodge dodge!", "my boat is sinking!!", "WATCH OUT",
        "ez treasure", "gg", "nooo my boat!", "speed boost!!", "im in first place!",
        "that was close!", "rocks everywhere", "use A and D to steer",
        "need more buoyancy", "rip my boat", "almost there!", "TREASURE!!",
    ],
    react: [
        "nice boat!", "woah thats cool", "LOL", "oof", "wait what",
        "haha", "wow", "no way", "lets go!!", "bruh",
    ],
};
let chatMessages = [];
let chatBotTimer = 0;
let chatInputFocused = false;
let playerChatName = "You";

// ===== INPUT METHOD =====
let inputMethod = null; // "touchscreen" or "keyboard"

// Touch control state
let touchJoystick = { active: false, startX: 0, startY: 0, dx: 0, dy: 0, touchId: null };
let touchPlace = false;
let touchRemove = false;
let touchJump = false;
let touchAccel = false;
let touchBrake = false;
let touchSteerLeft = false;
let touchSteerRight = false;

function selectInputMethod(method) {
    inputMethod = method;
    document.getElementById("input-select-screen").style.display = "none";
    document.getElementById("title-screen").style.display = "flex";

    if (method === "touchscreen") {
        document.body.classList.add("touch-mode");
        document.getElementById("instructions-keyboard").style.display = "none";
        document.getElementById("instructions-touch").style.display = "inline-block";
    } else {
        document.getElementById("instructions-keyboard").style.display = "inline-block";
        document.getElementById("instructions-touch").style.display = "none";
    }
}

// ===== GAME STATE =====
let gameState = "title"; // title, building, sailing, results
let gold = 50;
let totalGoldEarned = 0;

// Building grid - 3D sparse map, no height limit
const GRID_COLS = 12;  // X width of base platform
const GRID_ROWS = 8;   // Z depth of base platform
const BLOCK_SIZE = 1;
let buildGrid = {};     // sparse map: "x,y,z" -> blockType
let selectedBlock = "wood";
let buildBaseMeshes = []; // the floor platform meshes for raycasting

// Rival team build grids - each team gets their own grid + visual meshes
let rivalGrids = {};        // teamKey -> { grid: {}, meshes: [], platformMeshes: [], offsetX, offsetZ }
const RIVAL_GRID_COLS = 8;
const RIVAL_GRID_ROWS = 6;

// Inventory
let inventory = {};
const STARTING_INVENTORY = { wood: 30, plank: 20, wood_rod: 15 };

// Boat
let boat = {
    x: 0, z: 0,
    vx: 0, vz: 0,
    blocks: [],
    totalHP: 100, maxHP: 100,
    width: 0, height: 0,
    buoyancy: 0, weight: 0,
    angle: 0, bobPhase: 0,
};

// River / world
let obstacles = [];
let treasureItems = [];
let distance = 0;
let maxDistance = 5000;
let currentStage = 1;
let stageDistances = [1000, 2500, 4500, 7000, 10000];
let sailSpeed = 2;
let waveTime = 0;
let unlockedBlocks = {};

// Three.js
let renderer, scene, camera;
let buildScene, buildCamera;
let raycaster, mouse;
let buildGridMeshes = [];
let buildBlockMeshes = [];
let hoverMesh = null;
let boatGroup = null;
let waterMesh = null;
let obstacleGroup = null;
let treasureGroup = null;
let particleGroup = null;
let particles = [];
let envGroup = null; // trees, banks, sky
let launchButtonMesh = null; // 3D launch button in build scene
let launchButtonGroup = null;
let launchButtonHovered = false;
let launchPulseTime = 0;

// Catapult launch state
let launchState = "none"; // "none", "windup", "fling", "airborne", "splash"
let launchTimer = 0;
let launchRampGroup = null;
let catapultArmMesh = null;

// ===== PLAYER =====
let player = {
    x: 6, y: 0.9, z: 4, // position in build scene
    vx: 0, vz: 0,
    speed: 6,
    rotation: 0,       // facing direction (radians)
    grounded: true,
    vy: 0,
    walkCycle: 0,       // animation phase
    isOnBoat: false,
};
let playerGroup = null;       // THREE.Group for the player model
let playerBuildGroup = null;  // clone for build scene
let playerParts = {};         // references to body parts for animation

function createPlayerModel(teamColor) {
    const group = new THREE.Group();
    const parts = {};

    // Colors
    const skinColor = 0xFFCC88;
    const shirtColor = teamColor || 0x2266CC;
    const pantsColor = 0x334455;
    const shoeColor = 0x222222;
    const hairColor = 0x332211;

    const skinMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.6 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.5 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.6 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: shoeColor, roughness: 0.7 });
    const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.8 });

    // Head (Roblox = blocky square head)
    const headGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.6;
    head.castShadow = true;
    group.add(head);
    parts.head = head;

    // Hair (flat on top of head)
    const hairGeo = new THREE.BoxGeometry(0.58, 0.15, 0.58);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.y = 1.95;
    group.add(hair);

    // Eyes (two small black cubes)
    const eyeGeo = new THREE.BoxGeometry(0.08, 0.08, 0.05);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.12, 1.65, 0.28);
    group.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.12, 1.65, 0.28);
    group.add(rightEye);

    // Smile
    const smileGeo = new THREE.BoxGeometry(0.18, 0.04, 0.05);
    const smileMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const smile = new THREE.Mesh(smileGeo, smileMat);
    smile.position.set(0, 1.52, 0.28);
    group.add(smile);

    // Torso
    const torsoGeo = new THREE.BoxGeometry(0.5, 0.6, 0.3);
    const torso = new THREE.Mesh(torsoGeo, shirtMat);
    torso.position.y = 1.05;
    torso.castShadow = true;
    group.add(torso);
    parts.torso = torso;

    // Left Arm
    const armGeo = new THREE.BoxGeometry(0.2, 0.55, 0.25);
    const leftArm = new THREE.Mesh(armGeo, shirtMat.clone());
    leftArm.position.set(-0.35, 1.05, 0);
    leftArm.castShadow = true;
    group.add(leftArm);
    parts.leftArm = leftArm;

    // Right Arm
    const rightArm = new THREE.Mesh(armGeo, shirtMat.clone());
    rightArm.position.set(0.35, 1.05, 0);
    rightArm.castShadow = true;
    group.add(rightArm);
    parts.rightArm = rightArm;

    // Left Leg
    const legGeo = new THREE.BoxGeometry(0.22, 0.5, 0.25);
    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.position.set(-0.13, 0.5, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);
    parts.leftLeg = leftLeg;

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeo, pantsMat.clone());
    rightLeg.position.set(0.13, 0.5, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);
    parts.rightLeg = rightLeg;

    // Shoes (slightly wider than legs)
    const shoeGeo = new THREE.BoxGeometry(0.24, 0.1, 0.32);
    const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoe.position.set(-0.13, 0.22, 0.03);
    group.add(leftShoe);
    parts.leftShoe = leftShoe;
    const rightShoe = new THREE.Mesh(shoeGeo, shoeMat.clone());
    rightShoe.position.set(0.13, 0.22, 0.03);
    group.add(rightShoe);
    parts.rightShoe = rightShoe;

    group.scale.set(0.9, 0.9, 0.9);
    return { group, parts };
}

function animatePlayer(dt, isMoving) {
    if (!playerParts.leftArm) return;

    if (isMoving) {
        player.walkCycle += dt * 10;
        const swing = Math.sin(player.walkCycle) * 0.6;

        // Arms swing opposite to legs
        playerParts.leftArm.rotation.x = swing;
        playerParts.rightArm.rotation.x = -swing;
        playerParts.leftLeg.rotation.x = -swing * 0.8;
        playerParts.rightLeg.rotation.x = swing * 0.8;

        // Shoes follow legs
        playerParts.leftShoe.position.z = 0.03 + Math.sin(-player.walkCycle) * 0.08;
        playerParts.rightShoe.position.z = 0.03 + Math.sin(player.walkCycle) * 0.08;

        // Slight head bob
        playerParts.head.position.y = 1.6 + Math.abs(Math.sin(player.walkCycle * 2)) * 0.03;
    } else {
        // Idle - slowly return to rest, slight breathing
        player.walkCycle = 0;
        playerParts.leftArm.rotation.x *= 0.85;
        playerParts.rightArm.rotation.x *= 0.85;
        playerParts.leftLeg.rotation.x *= 0.85;
        playerParts.rightLeg.rotation.x *= 0.85;
        playerParts.leftShoe.position.z = 0.03;
        playerParts.rightShoe.position.z = 0.03;

        // Idle breathing
        const breath = Math.sin(Date.now() * 0.003) * 0.01;
        playerParts.torso.scale.y = 1 + breath;
        playerParts.head.position.y = 1.6 + breath * 2;
    }
}

// ===== INITIALIZATION =====
function init() {
    loadGame();
    if (Object.keys(inventory).length === 0) {
        inventory = { ...STARTING_INVENTORY };
    }
    for (let key in BLOCK_TYPES) {
        if (BLOCK_TYPES[key].unlocked) unlockedBlocks[key] = true;
    }

    initThreeJS();
    clearBuildGrid();
    renderBlockList();
    setupBuildScene();

    // Create player for build scene
    const teamCol = playerTeam ? TEAMS[playerTeam].color : null;
    const buildPlayer = createPlayerModel(teamCol);
    playerBuildGroup = buildPlayer.group;
    playerParts = buildPlayer.parts;
    playerBuildGroup.position.set(player.x, 0, player.z);
    buildScene.add(playerBuildGroup);

    // Create player for sail scene (rides on boat)
    const sailPlayer = createPlayerModel(teamCol);
    playerGroup = sailPlayer.group;
    // Will be added to boatGroup when sailing starts

    // Events
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", e => { if (!chatInputFocused) keysDown[e.key] = true; });
    document.addEventListener("keyup", e => { keysDown[e.key] = false; });

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    const container = document.getElementById("renderer-container");
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("contextmenu", e => e.preventDefault());

    // Touch events for touchscreen mode
    container.addEventListener("touchstart", onTouchTap, { passive: false });
    container.addEventListener("touchmove", onTouchTapMove, { passive: false });
    container.addEventListener("touchend", onTouchTapEnd, { passive: false });

    initTouchControls();
    initChat();

    requestAnimationFrame(gameLoop);
}

function initThreeJS() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0a0a1a);

    const container = document.getElementById("renderer-container");
    // Set size based on container when it's visible
    renderer.setSize(800, 600);
    container.appendChild(renderer.domElement);

    // === BUILD SCENE ===
    buildScene = new THREE.Scene();
    buildScene.background = new THREE.Color(0x0d1b2a);
    buildScene.fog = new THREE.Fog(0x0d1b2a, 30, 60);

    buildCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    buildCamera.position.set(GRID_COLS * 0.5, 7, GRID_ROWS + 8);
    buildCamera.lookAt(GRID_COLS * 0.5, 1, GRID_ROWS * 0.5);

    // Build scene lighting
    const buildAmbient = new THREE.AmbientLight(0x334466, 0.6);
    buildScene.add(buildAmbient);
    const buildDir = new THREE.DirectionalLight(0xffeedd, 0.8);
    buildDir.position.set(5, 10, 7);
    buildDir.castShadow = true;
    buildScene.add(buildDir);
    const buildPoint = new THREE.PointLight(0x1e90ff, 0.5, 30);
    buildPoint.position.set(GRID_COLS * 0.5, 5, GRID_ROWS * 0.5);
    buildScene.add(buildPoint);

    // Build platform (floor)
    const floorGeo = new THREE.PlaneGeometry(GRID_COLS + 4, GRID_ROWS + 4);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0a1525, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(GRID_COLS * 0.5, -0.01, GRID_ROWS * 0.5);
    floor.receiveShadow = true;
    buildScene.add(floor);

    // Water plane under the grid for build mode
    const waterBuildGeo = new THREE.PlaneGeometry(GRID_COLS + 10, 30);
    const waterBuildMat = new THREE.MeshStandardMaterial({
        color: 0x1a4488, transparent: true, opacity: 0.4, roughness: 0.2, metalness: 0.3
    });
    const waterBuild = new THREE.Mesh(waterBuildGeo, waterBuildMat);
    waterBuild.rotation.x = -Math.PI / 2;
    waterBuild.position.set(GRID_COLS * 0.5, -0.5, GRID_ROWS * 0.5);
    buildScene.add(waterBuild);

    // === SAIL SCENE ===
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    scene.fog = new THREE.FogExp2(0x88bbdd, 0.003);

    camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    camera.position.set(-12, 10, 0);
    camera.lookAt(0, 0, 0);

    // Sail scene lighting
    const ambientLight = new THREE.AmbientLight(0x6688aa, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffcc, 1.0);
    sunLight.position.set(50, 80, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 200;
    sunLight.shadow.camera.left = -50;
    sunLight.shadow.camera.right = 50;
    sunLight.shadow.camera.top = 50;
    sunLight.shadow.camera.bottom = -50;
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0x88bbff, 0x445522, 0.4);
    scene.add(hemiLight);

    // Water
    const waterGeo = new THREE.PlaneGeometry(600, 60, 128, 16);
    const waterMat = new THREE.MeshStandardMaterial({
        color: 0x1a6eaa,
        transparent: true,
        opacity: 0.8,
        roughness: 0.1,
        metalness: 0.4,
        side: THREE.DoubleSide,
    });
    waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, -0.3, 0);
    waterMesh.receiveShadow = true;
    scene.add(waterMesh);

    // River banks
    createRiverBanks();

    // Sky sphere
    const skyGeo = new THREE.SphereGeometry(400, 32, 16);
    const skyMat = new THREE.MeshBasicMaterial({
        color: 0x87CEEB, side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // Sun
    const sunGeo = new THREE.SphereGeometry(5, 16, 16);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xFFFF88 });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(100, 80, -50);
    scene.add(sunMesh);

    // Groups
    boatGroup = new THREE.Group();
    scene.add(boatGroup);
    obstacleGroup = new THREE.Group();
    scene.add(obstacleGroup);
    treasureGroup = new THREE.Group();
    scene.add(treasureGroup);
    particleGroup = new THREE.Group();
    scene.add(particleGroup);
    envGroup = new THREE.Group();
    scene.add(envGroup);

    onResize();
}

function createRiverBanks() {
    const RIVER_HALF = 18;
    const bankLen = 600;

    // Left bank
    const bankGeo = new THREE.BoxGeometry(bankLen, 2, 30);
    const bankMat = new THREE.MeshStandardMaterial({ color: 0x3a7a33, roughness: 0.9 });
    const leftBank = new THREE.Mesh(bankGeo, bankMat);
    leftBank.position.set(0, 0, -(RIVER_HALF + 15));
    leftBank.receiveShadow = true;
    scene.add(leftBank);

    // Right bank
    const rightBank = new THREE.Mesh(bankGeo, bankMat);
    rightBank.position.set(0, 0, RIVER_HALF + 15);
    rightBank.receiveShadow = true;
    scene.add(rightBank);

    // Dirt edges
    const edgeGeo = new THREE.BoxGeometry(bankLen, 1.5, 3);
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x5a4030, roughness: 0.95 });
    const leftEdge = new THREE.Mesh(edgeGeo, edgeMat);
    leftEdge.position.set(0, 0.5, -RIVER_HALF);
    scene.add(leftEdge);
    const rightEdge = new THREE.Mesh(edgeGeo, edgeMat);
    rightEdge.position.set(0, 0.5, RIVER_HALF);
    scene.add(rightEdge);
}

function onResize() {
    const container = document.getElementById("renderer-container");
    if (!container) return;
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 600;
    renderer.setSize(w, h);

    if (gameState === "building") {
        buildCamera.aspect = w / h;
        buildCamera.updateProjectionMatrix();
    } else {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
}

// ===== BUILD MODE 3D =====
function setupBuildScene() {
    // Clear old meshes
    buildGridMeshes.forEach(m => buildScene.remove(m));
    buildGridMeshes = [];
    buildBaseMeshes.forEach(m => buildScene.remove(m));
    buildBaseMeshes = [];
    buildBlockMeshes.forEach(m => buildScene.remove(m));
    buildBlockMeshes = [];

    if (hoverMesh) { buildScene.remove(hoverMesh); hoverMesh = null; }

    // Create base platform grid (floor tiles you can click to place the first layer)
    const cellGeo = new THREE.BoxGeometry(BLOCK_SIZE * 0.95, 0.1, BLOCK_SIZE * 0.95);
    const cellMat = new THREE.MeshStandardMaterial({ color: 0x0f1f33, roughness: 0.7, transparent: true, opacity: 0.8 });

    for (let z = 0; z < GRID_ROWS; z++) {
        for (let x = 0; x < GRID_COLS; x++) {
            const cell = new THREE.Mesh(cellGeo, cellMat.clone());
            cell.position.set(x * BLOCK_SIZE + 0.5, 0, z * BLOCK_SIZE + 0.5);
            cell.receiveShadow = true;
            cell.userData = { isBase: true, gx: x, gy: 0, gz: z };
            buildScene.add(cell);
            buildBaseMeshes.push(cell);
            buildGridMeshes.push(cell); // keep for backward compat
        }
    }

    // Hover indicator
    const hoverGeo = new THREE.BoxGeometry(BLOCK_SIZE * 0.9, BLOCK_SIZE * 0.9, BLOCK_SIZE * 0.9);
    const hoverMat = new THREE.MeshStandardMaterial({ color: 0xffd700, transparent: true, opacity: 0.35, roughness: 0.5 });
    hoverMesh = new THREE.Mesh(hoverGeo, hoverMat);
    hoverMesh.visible = false;
    buildScene.add(hoverMesh);

    // === 3D LAUNCH BUTTON ===
    if (launchButtonGroup) buildScene.remove(launchButtonGroup);
    launchButtonGroup = new THREE.Group();

    // Platform base
    const basGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.4, 24);
    const basMat = new THREE.MeshStandardMaterial({ color: 0x333344, roughness: 0.6, metalness: 0.4 });
    const baseMesh = new THREE.Mesh(basGeo, basMat);
    baseMesh.position.y = 0.2;
    baseMesh.receiveShadow = true;
    launchButtonGroup.add(baseMesh);

    // Button pad (the big red/green button)
    const btnGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.6, 24);
    const btnMat = new THREE.MeshStandardMaterial({
        color: 0x22cc44, roughness: 0.3, metalness: 0.5,
        emissive: 0x22cc44, emissiveIntensity: 0.3,
    });
    launchButtonMesh = new THREE.Mesh(btnGeo, btnMat);
    launchButtonMesh.position.y = 0.7;
    launchButtonMesh.castShadow = true;
    launchButtonMesh.userData = { isLaunchButton: true };
    launchButtonGroup.add(launchButtonMesh);

    // Arrow on top of button (triangle pointing forward)
    const arrowShape = new THREE.Shape();
    arrowShape.moveTo(0, 0.8);
    arrowShape.lineTo(-0.6, -0.4);
    arrowShape.lineTo(0.6, -0.4);
    arrowShape.lineTo(0, 0.8);
    const arrowGeo = new THREE.ExtrudeGeometry(arrowShape, { depth: 0.08, bevelEnabled: false });
    const arrowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, emissive: 0xffffff, emissiveIntensity: 0.5 });
    const arrowMesh = new THREE.Mesh(arrowGeo, arrowMat);
    arrowMesh.rotation.x = -Math.PI / 2;
    arrowMesh.position.set(0, 1.02, 0.15);
    arrowMesh.userData = { isLaunchButton: true };
    launchButtonGroup.add(arrowMesh);

    // "LAUNCH" text ring light
    const ringGeo = new THREE.TorusGeometry(1.9, 0.08, 8, 32);
    const ringMat = new THREE.MeshStandardMaterial({
        color: 0x22cc44, emissive: 0x22cc44, emissiveIntensity: 0.6,
        transparent: true, opacity: 0.7,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.42;
    launchButtonGroup.add(ringMesh);

    // Glow light under button
    const btnLight = new THREE.PointLight(0x22cc44, 1.5, 10);
    btnLight.position.y = 1.5;
    launchButtonGroup.add(btnLight);

    // "LAUNCH" text sprite above button
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = 256;
    labelCanvas.height = 64;
    const lctx = labelCanvas.getContext("2d");
    lctx.fillStyle = "transparent";
    lctx.fillRect(0, 0, 256, 64);
    lctx.font = "bold 42px 'Segoe UI', Arial, sans-serif";
    lctx.textAlign = "center";
    lctx.textBaseline = "middle";
    // Text outline
    lctx.strokeStyle = "#003311";
    lctx.lineWidth = 5;
    lctx.strokeText("LAUNCH", 128, 32);
    // Text fill
    lctx.fillStyle = "#33ff66";
    lctx.fillText("LAUNCH", 128, 32);

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelMat = new THREE.SpriteMaterial({ map: labelTexture, transparent: true });
    const labelSprite = new THREE.Sprite(labelMat);
    labelSprite.scale.set(3.5, 0.9, 1);
    labelSprite.position.y = 2.2;
    launchButtonGroup.add(labelSprite);

    // Position it to the right of the grid
    launchButtonGroup.position.set(GRID_COLS + 3.5, 0, GRID_ROWS * 0.5);
    buildScene.add(launchButtonGroup);

    // Setup rival team build platforms
    setupRivalGrids();
}

// Cached geometries for each shape
const _geoCache = {};
function getBlockGeo(shape) {
    if (_geoCache[shape]) return _geoCache[shape];
    const S = BLOCK_SIZE * 0.92;
    let geo;
    switch (shape) {
        case "rod":      geo = new THREE.CylinderGeometry(S * 0.2, S * 0.2, S, 8); break;
        case "pane":     geo = new THREE.BoxGeometry(S, S, S * 0.15); break;
        case "cylinder": geo = new THREE.CylinderGeometry(S * 0.45, S * 0.45, S, 16); break;
        case "torus":    geo = new THREE.TorusGeometry(S * 0.35, S * 0.12, 8, 16); break;
        case "spring":   geo = new THREE.TorusGeometry(S * 0.3, S * 0.08, 6, 16); break;
        default:         geo = new THREE.BoxGeometry(S, S, S); break;
    }
    _geoCache[shape] = geo;
    return geo;
}

function makeBlockMaterial(bt) {
    const isTransparent = bt.transparent || false;
    const mat = new THREE.MeshStandardMaterial({
        color: bt.color,
        roughness: bt.emissive ? 0.3 : (bt.metalness ? 0.35 : 0.5),
        metalness: bt.metalness || 0.1,
        transparent: isTransparent,
        opacity: isTransparent ? 0.5 : 1,
    });
    if (bt.emissive) {
        mat.emissive = new THREE.Color(bt.color);
        mat.emissiveIntensity = 0.5;
    }
    return mat;
}

function refreshBuildBlocks() {
    // Remove old block meshes
    buildBlockMeshes.forEach(m => buildScene.remove(m));
    buildBlockMeshes = [];

    const blocks = getAllBlocks();
    for (let b of blocks) {
        const bt = BLOCK_TYPES[b.type];
        const geo = getBlockGeo(bt.shape || "box");
        const mat = makeBlockMaterial(bt);
        const mesh = new THREE.Mesh(geo, mat);
        // Y=0 is the base, so block at y=0 sits on the platform, y=1 is one block up, etc.
        mesh.position.set(
            b.x * BLOCK_SIZE + 0.5,
            b.y * BLOCK_SIZE + BLOCK_SIZE * 0.5,
            b.z * BLOCK_SIZE + 0.5
        );
        if (bt.shape === "torus" || bt.shape === "spring") {
            mesh.rotation.x = Math.PI / 2;
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = { isPlacedBlock: true, gx: b.x, gy: b.y, gz: b.z };
        buildScene.add(mesh);
        buildBlockMeshes.push(mesh);
    }
}

// Compute the target grid position from a raycast hit
// Clicking a base tile -> place at (gx, 0, gz)
// Clicking an existing block face -> place adjacent based on face normal
function getPlacePosition(hit) {
    const obj = hit.object;
    const ud = obj.userData;
    if (ud.isBase) {
        // Base tile: place block on top at y=0
        return { x: ud.gx, y: 0, z: ud.gz };
    }
    if (ud.isPlacedBlock) {
        // Existing block: use face normal to find adjacent slot
        const normal = hit.face.normal.clone();
        // Transform normal from object space to world space
        normal.transformDirection(obj.matrixWorld);
        // Round to nearest axis
        const nx = Math.round(normal.x);
        const ny = Math.round(normal.y);
        const nz = Math.round(normal.z);
        return { x: ud.gx + nx, y: ud.gy + ny, z: ud.gz + nz };
    }
    return null;
}

function onMouseMove(e) {
    if (gameState !== "building") return;
    const container = document.getElementById("renderer-container");
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, buildCamera);

    // Check launch button hover
    if (launchButtonGroup) {
        const btnHits = raycaster.intersectObjects(launchButtonGroup.children, true);
        if (btnHits.length > 0) {
            launchButtonHovered = true;
            container.style.cursor = "pointer";
        } else {
            launchButtonHovered = false;
            container.style.cursor = "default";
        }
    }

    // Raycast to base tiles AND placed blocks
    const targets = [...buildBaseMeshes, ...buildBlockMeshes];
    const intersects = raycaster.intersectObjects(targets);

    if (intersects.length > 0) {
        const pos = getPlacePosition(intersects[0]);
        if (pos && !getBlock(pos.x, pos.y, pos.z) && pos.y >= 0) {
            const bt = BLOCK_TYPES[selectedBlock];
            hoverMesh.material.color.setHex(bt.color);
            hoverMesh.position.set(
                pos.x * BLOCK_SIZE + 0.5,
                pos.y * BLOCK_SIZE + BLOCK_SIZE * 0.5,
                pos.z * BLOCK_SIZE + 0.5
            );
            hoverMesh.visible = true;
        } else {
            hoverMesh.visible = false;
        }
    } else {
        hoverMesh.visible = false;
    }
}

function onMouseDown(e) {
    if (gameState !== "building") return;
    const container = document.getElementById("renderer-container");
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, buildCamera);

    // Check if launch button was clicked
    if (e.button === 0 && launchButtonGroup) {
        const btnHits = raycaster.intersectObjects(launchButtonGroup.children, true);
        if (btnHits.length > 0) {
            // Animate button press down then launch
            if (launchButtonMesh) {
                launchButtonMesh.position.y = 0.45;
                launchButtonMesh.material.color.setHex(0x00ff55);
                launchButtonMesh.material.emissiveIntensity = 1.0;
                setTimeout(() => {
                    if (launchButtonMesh) {
                        launchButtonMesh.position.y = 0.7;
                        launchButtonMesh.material.emissiveIntensity = 0.3;
                    }
                    startSailing();
                }, 300);
            }
            return;
        }
    }

    if (e.button === 2) {
        // Right-click: remove a placed block
        const blockIntersects = raycaster.intersectObjects(buildBlockMeshes);
        if (blockIntersects.length > 0) {
            const ud = blockIntersects[0].object.userData;
            if (ud.isPlacedBlock) {
                const blockType = getBlock(ud.gx, ud.gy, ud.gz);
                if (blockType) {
                    setBlock(ud.gx, ud.gy, ud.gz, null);
                    inventory[blockType] = (inventory[blockType] || 0) + 1;
                    refreshBuildBlocks();
                    renderBlockList();
                }
            }
        }
    } else {
        // Left-click: place block on base tiles or on face of existing block
        const targets = [...buildBaseMeshes, ...buildBlockMeshes];
        const intersects = raycaster.intersectObjects(targets);
        if (intersects.length > 0) {
            const pos = getPlacePosition(intersects[0]);
            if (!pos) return;
            if (pos.y < 0) return; // can't place below floor
            if (getBlock(pos.x, pos.y, pos.z)) return; // occupied
            if (!unlockedBlocks[selectedBlock] && !BLOCK_TYPES[selectedBlock].unlocked) return;
            if ((inventory[selectedBlock] || 0) <= 0) {
                showMessage("No " + BLOCK_TYPES[selectedBlock].name + " left!");
                return;
            }
            setBlock(pos.x, pos.y, pos.z, selectedBlock);
            inventory[selectedBlock]--;
            refreshBuildBlocks();
            renderBlockList();
        }
    }
}

// ===== SAVE / LOAD =====
function saveGame() {
    const data = { gold, totalGoldEarned, inventory, unlockedBlocks, currentStage, playerTeam, teamScores };
    localStorage.setItem("boatGame3DSave", JSON.stringify(data));
}

function loadGame() {
    try {
        const data = JSON.parse(localStorage.getItem("boatGame3DSave"));
        if (data) {
            gold = data.gold || 50;
            totalGoldEarned = data.totalGoldEarned || 0;
            inventory = data.inventory || { ...STARTING_INVENTORY };
            unlockedBlocks = data.unlockedBlocks || {};
            currentStage = data.currentStage || 1;
            playerTeam = data.playerTeam || null;
            if (data.teamScores) teamScores = data.teamScores;
        }
    } catch(e) {}
}

function clearBuildGrid() {
    buildGrid = {}; // sparse 3D map: "x,y,z" -> blockType
}

function gridKey(x, y, z) { return x + "," + y + "," + z; }
function getBlock(x, y, z) { return buildGrid[gridKey(x, y, z)] || null; }
function setBlock(x, y, z, type) {
    if (type) buildGrid[gridKey(x, y, z)] = type;
    else delete buildGrid[gridKey(x, y, z)];
}
function getAllBlocks() {
    const blocks = [];
    for (let key in buildGrid) {
        const [x, y, z] = key.split(",").map(Number);
        blocks.push({ x, y, z, type: buildGrid[key] });
    }
    return blocks;
}

// ===== RIVAL TEAM GRIDS =====
function getRivalBlock(teamKey, x, y, z) {
    const rg = rivalGrids[teamKey];
    if (!rg) return null;
    return rg.grid[gridKey(x, y, z)] || null;
}

function setRivalBlock(teamKey, x, y, z, type) {
    const rg = rivalGrids[teamKey];
    if (!rg) return;
    if (type) rg.grid[gridKey(x, y, z)] = type;
    else delete rg.grid[gridKey(x, y, z)];
}

function getRivalAllBlocks(teamKey) {
    const rg = rivalGrids[teamKey];
    if (!rg) return [];
    const blocks = [];
    for (let key in rg.grid) {
        const [x, y, z] = key.split(",").map(Number);
        blocks.push({ x, y, z, type: rg.grid[key] });
    }
    return blocks;
}

function refreshRivalBlocks(teamKey) {
    const rg = rivalGrids[teamKey];
    if (!rg) return;
    // Remove old block meshes
    rg.meshes.forEach(m => buildScene.remove(m));
    rg.meshes = [];

    const blocks = getRivalAllBlocks(teamKey);
    for (let b of blocks) {
        const bt = BLOCK_TYPES[b.type];
        const geo = getBlockGeo(bt.shape || "box");
        const mat = makeBlockMaterial(bt);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            rg.offsetX + b.x * BLOCK_SIZE + 0.5,
            b.y * BLOCK_SIZE + BLOCK_SIZE * 0.5,
            rg.offsetZ + b.z * BLOCK_SIZE + 0.5
        );
        if (bt.shape === "torus" || bt.shape === "spring") {
            mesh.rotation.x = Math.PI / 2;
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        buildScene.add(mesh);
        rg.meshes.push(mesh);
    }
}

function setupRivalGrids() {
    // Clear old rival grids
    for (let tk in rivalGrids) {
        const rg = rivalGrids[tk];
        rg.meshes.forEach(m => buildScene.remove(m));
        rg.platformMeshes.forEach(m => buildScene.remove(m));
    }
    rivalGrids = {};

    if (!playerTeam) return;

    const otherTeams = Object.keys(TEAMS).filter(t => t !== playerTeam);
    // Position rival grids behind the player's grid, spaced out
    const spacing = RIVAL_GRID_COLS + 3;
    const startX = -(spacing * otherTeams.length) / 2 + GRID_COLS * 0.5 - RIVAL_GRID_COLS * 0.5;
    const baseZ = -(RIVAL_GRID_ROWS + 5); // behind player's grid

    for (let i = 0; i < otherTeams.length; i++) {
        const tk = otherTeams[i];
        const team = TEAMS[tk];
        const offX = startX + i * spacing;
        const offZ = baseZ;

        rivalGrids[tk] = {
            grid: {},
            meshes: [],
            platformMeshes: [],
            offsetX: offX,
            offsetZ: offZ,
        };

        // Draw the rival platform
        const cellGeo = new THREE.BoxGeometry(BLOCK_SIZE * 0.95, 0.1, BLOCK_SIZE * 0.95);
        const hexColor = team.color;
        const cellMat = new THREE.MeshStandardMaterial({
            color: hexColor, roughness: 0.7, transparent: true, opacity: 0.25,
        });

        for (let z = 0; z < RIVAL_GRID_ROWS; z++) {
            for (let x = 0; x < RIVAL_GRID_COLS; x++) {
                const cell = new THREE.Mesh(cellGeo, cellMat.clone());
                cell.position.set(
                    offX + x * BLOCK_SIZE + 0.5,
                    0,
                    offZ + z * BLOCK_SIZE + 0.5
                );
                cell.receiveShadow = true;
                buildScene.add(cell);
                rivalGrids[tk].platformMeshes.push(cell);
            }
        }

        // Team label above the platform
        const labelCanvas = document.createElement("canvas");
        labelCanvas.width = 256;
        labelCanvas.height = 48;
        const lctx = labelCanvas.getContext("2d");
        lctx.clearRect(0, 0, 256, 48);
        lctx.font = "bold 28px 'Segoe UI', Arial, sans-serif";
        lctx.textAlign = "center";
        lctx.textBaseline = "middle";
        const hex = "#" + team.color.toString(16).padStart(6, "0");
        lctx.fillStyle = hex;
        lctx.fillText(team.name, 128, 24);

        const labelTex = new THREE.CanvasTexture(labelCanvas);
        const labelMat = new THREE.SpriteMaterial({ map: labelTex, transparent: true });
        const labelSprite = new THREE.Sprite(labelMat);
        labelSprite.scale.set(4, 0.75, 1);
        labelSprite.position.set(
            offX + RIVAL_GRID_COLS * 0.5,
            3,
            offZ + RIVAL_GRID_ROWS * 0.5
        );
        buildScene.add(labelSprite);
        rivalGrids[tk].platformMeshes.push(labelSprite);
    }
}

// ===== UI FUNCTIONS =====
function renderBlockList() {
    const list = document.getElementById("block-list");
    list.innerHTML = "";

    // Group by category
    const categories = {};
    for (let key in BLOCK_TYPES) {
        const bt = BLOCK_TYPES[key];
        const cat = bt.category || "Other";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(key);
    }

    const catColors = {
        Basic: "#aab", Common: "#88aacc", Metal: "#aabbcc", Float: "#66ccff",
        Mech: "#ffaa44", Rare: "#cc66ff", Legendary: "#ff4466", Fun: "#ff88cc",
        Power: "#ff4422", Decor: "#88ddaa",
    };

    for (let cat in categories) {
        // Category header
        const header = document.createElement("div");
        header.style.cssText = `font-size:0.65rem;color:${catColors[cat]||"#888"};text-transform:uppercase;letter-spacing:1px;padding:6px 0 2px;border-top:1px solid #1a2a44;margin-top:4px;`;
        header.textContent = cat;
        list.appendChild(header);

        for (let key of categories[cat]) {
            const bt = BLOCK_TYPES[key];
            const isUnlocked = unlockedBlocks[key] || bt.unlocked;
            const count = inventory[key] || 0;
            const div = document.createElement("div");
            div.className = "block-item" + (key === selectedBlock ? " selected" : "") + (!isUnlocked ? " locked" : "");
            div.onclick = () => {
                if (!isUnlocked) return;
                selectedBlock = key;
                renderBlockList();
            };
            const colorHex = "#" + bt.color.toString(16).padStart(6, "0");
            const swatchStyle = bt.emissive ? `background:${colorHex};box-shadow:0 0 6px ${colorHex}` : `background:${colorHex}`;
            div.innerHTML = `
                <div class="block-swatch" style="${swatchStyle}"></div>
                <div class="block-info">
                    <div class="block-name">${bt.name}</div>
                    <div class="block-count">${isUnlocked ? "x" + count : "Locked"}</div>
                </div>`;
            list.appendChild(div);
        }
    }
}

function updateHUD() {
    document.getElementById("gold-display").textContent = gold;
    document.getElementById("stage-display").textContent =
        gameState === "building" ? "Building" : "Stage " + currentStage;

    const hpPct = Math.max(0, (boat.totalHP / boat.maxHP) * 100);
    document.getElementById("hp-bar").style.width = hpPct + "%";
    document.getElementById("hp-text").textContent = Math.ceil(boat.totalHP);

    if (hpPct > 50) {
        document.getElementById("hp-bar").style.background = "linear-gradient(90deg, #00ff88, #00cc66)";
    } else if (hpPct > 25) {
        document.getElementById("hp-bar").style.background = "linear-gradient(90deg, #ffcc00, #ff8800)";
    } else {
        document.getElementById("hp-bar").style.background = "linear-gradient(90deg, #ff4444, #cc0000)";
    }
}

function showMessage(msg) {
    const el = document.getElementById("game-message");
    el.textContent = msg;
    el.style.animation = "none";
    void el.offsetHeight;
    el.style.animation = "fadeInOut 3s forwards";
}

// ===== SCREEN TRANSITIONS =====
function startGame() {
    document.getElementById("title-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    if (!playerTeam) {
        // Show team selection
        showTeamSelect();
        return;
    }

    enterBuildMode();
}

function showTeamSelect() {
    // Update score displays
    for (let t in TEAMS) {
        const el = document.getElementById("ts-" + t);
        if (el) el.textContent = teamScores[t] || 0;
    }
    document.getElementById("team-select-overlay").style.display = "flex";
}

function selectTeam(teamKey) {
    playerTeam = teamKey;
    document.getElementById("team-select-overlay").style.display = "none";
    saveGame();

    // Rebuild player models with team color
    rebuildPlayersWithTeamColor();
    enterBuildMode();

    addChatMessage(null, "You joined " + TEAMS[teamKey].name + "!", null, true);
    // Bots welcome you
    setTimeout(() => {
        const botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        addChatMessage(botName, "welcome to the team!!", teamKey);
    }, 1500);
}

function rebuildPlayersWithTeamColor() {
    const teamCol = TEAMS[playerTeam].color;

    // Rebuild build-scene player
    if (playerBuildGroup && playerBuildGroup.parent) playerBuildGroup.parent.remove(playerBuildGroup);
    const buildPlayer = createPlayerModel(teamCol);
    playerBuildGroup = buildPlayer.group;
    playerParts = buildPlayer.parts;

    // Rebuild sail-scene player
    if (playerGroup && playerGroup.parent) playerGroup.parent.remove(playerGroup);
    const sailPlayer = createPlayerModel(teamCol);
    playerGroup = sailPlayer.group;
}

function enterBuildMode() {
    gameState = "building";
    onResize();
    renderBlockList();
    updateHUD();
    setupBuildScene();
    refreshBuildBlocks();
    updateTeamLeaderboard();
    document.getElementById("team-leaderboard").style.display = "block";
    showTouchControls("building");

    // Position player near the build grid
    player.x = GRID_COLS * 0.5;
    player.z = GRID_ROWS + 2;
    player.y = 0;
    if (playerBuildGroup) {
        if (playerBuildGroup.parent) playerBuildGroup.parent.remove(playerBuildGroup);
        playerBuildGroup.position.set(player.x, 0, player.z);
        buildScene.add(playerBuildGroup);
    }

    // Spawn NPC bots
    spawnBuildBots();
}

function goToBuild() {
    document.getElementById("results-overlay").style.display = "none";
    document.getElementById("game-screen").classList.remove("sailing");
    document.getElementById("build-panel").style.display = "flex";
    document.getElementById("distance-bar-container").style.display = "none";
    gameState = "building";
    clearBuildGrid();

    // Restore inventory so blocks aren't lost after sailing
    if (savedInventory) {
        inventory = { ...savedInventory };
        savedInventory = null;
    }
    onResize();
    renderBlockList();
    updateHUD();
    setupBuildScene();
    refreshBuildBlocks();
    updateTeamLeaderboard();
    document.getElementById("team-leaderboard").style.display = "block";

    // Reset player to build scene
    player.x = GRID_COLS * 0.5;
    player.z = GRID_ROWS + 2;
    player.y = 0;
    player.vy = 0;
    player.grounded = true;
    player.isOnBoat = false;
    player.rotation = 0;
    if (playerGroup && playerGroup.parent) playerGroup.parent.remove(playerGroup);
    if (playerBuildGroup) {
        if (playerBuildGroup.parent) playerBuildGroup.parent.remove(playerBuildGroup);
        playerBuildGroup.position.set(player.x, 0, player.z);
        buildScene.add(playerBuildGroup);
    }

    // Spawn NPC bots
    spawnBuildBots();
    showTouchControls("building");
}

function goToShop() {
    document.getElementById("results-overlay").style.display = "none";
    document.getElementById("shop-overlay").style.display = "flex";
    document.getElementById("shop-gold").textContent = gold;
    renderShop();
}

function closeShop() {
    document.getElementById("shop-overlay").style.display = "none";
    goToBuild();
}

function renderShop() {
    const container = document.getElementById("shop-items");
    container.innerHTML = "";

    // Group shop by category
    const categories = {};
    for (let key in BLOCK_TYPES) {
        const bt = BLOCK_TYPES[key];
        if (bt.cost === 0) continue;
        const cat = bt.category || "Other";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(key);
    }

    for (let cat in categories) {
        const header = document.createElement("div");
        header.style.cssText = "font-size:0.75rem;color:#ffd700;text-transform:uppercase;letter-spacing:1px;padding:8px 0 4px;border-bottom:1px solid #1a2a44;";
        header.textContent = cat;
        container.appendChild(header);

        for (let key of categories[cat]) {
            const bt = BLOCK_TYPES[key];
            const owned = unlockedBlocks[key];
            const price = owned ? Math.floor(bt.cost * 0.3) : bt.cost;
            const canAfford = gold >= price;
            const colorHex = "#" + bt.color.toString(16).padStart(6, "0");
            const specialTag = bt.special ? `<span style="font-size:0.7rem;color:#ffaa44;"> [${bt.special}]</span>` : "";
            const div = document.createElement("div");
            div.className = "shop-item";
            div.innerHTML = `
                <div class="shop-item-left">
                    <div class="block-swatch" style="background:${colorHex}; width:32px; height:32px;${bt.emissive ? "box-shadow:0 0 8px " + colorHex : ""}"></div>
                    <div>
                        <div style="font-weight:bold;font-size:0.85rem">${bt.name}${specialTag}</div>
                        <div style="font-size:0.7rem; color:#8899aa">HP:${bt.hp} B:${bt.buoyancy} W:${bt.weight}</div>
                    </div>
                </div>
                <button ${!canAfford ? "disabled" : ""} onclick="buyBlock('${key}', ${owned ? "true" : "false"})">${owned ? "x10" : "Unlock"} ${price}g</button>`;
            container.appendChild(div);
        }
    }
}

function buyBlock(key, alreadyOwned) {
    const bt = BLOCK_TYPES[key];
    const price = alreadyOwned ? Math.floor(bt.cost * 0.3) : bt.cost;
    if (gold < price) return;
    gold -= price;
    if (!alreadyOwned) {
        unlockedBlocks[key] = true;
        inventory[key] = (inventory[key] || 0) + 10;
        showMessage("Unlocked " + bt.name + "!");
    } else {
        inventory[key] = (inventory[key] || 0) + 10;
        showMessage("Bought 10x " + bt.name);
    }
    saveGame();
    document.getElementById("shop-gold").textContent = gold;
    renderShop();
    renderBlockList();
}

function clearBoat() {
    // Return all blocks to inventory
    const blocks = getAllBlocks();
    for (let b of blocks) {
        inventory[b.type] = (inventory[b.type] || 0) + 1;
    }
    clearBuildGrid();
    refreshBuildBlocks();
    renderBlockList();
}

// ===== SAILING =====
let savedInventory = null; // saved before sailing so blocks aren't lost

function startSailing() {
    // Save inventory before sailing so blocks can be restored
    savedInventory = { ...inventory };
    // Also add back the blocks currently on the grid
    for (let key in buildGrid) {
        const type = buildGrid[key];
        savedInventory[type] = (savedInventory[type] || 0) + 1;
    }

    // Cleanup build bots
    cleanupBuildBots();

    // Gather all blocks from 3D grid
    const gridBlocks = getAllBlocks();

    if (gridBlocks.length === 0) {
        showMessage("Place some blocks first!");
        return;
    }

    // Find bounds
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;
    gridBlocks.forEach(b => {
        if (b.x < minX) minX = b.x; if (b.x > maxX) maxX = b.x;
        if (b.y < minY) minY = b.y; if (b.y > maxY) maxY = b.y;
        if (b.z < minZ) minZ = b.z; if (b.z > maxZ) maxZ = b.z;
    });

    // Normalize positions so boat is centered
    let blocks = gridBlocks.map(b => {
        const bt = BLOCK_TYPES[b.type];
        return {
            rx: b.x - minX, ry: b.y - minY, rz: b.z - minZ,
            type: b.type,
            hp: bt.hp, maxHp: bt.hp,
            alive: true, mesh: null,
        };
    });

    let totalBuoyancy = 0, totalWeight = 0, totalHP = 0, speedBonus = 0;
    blocks.forEach(b => {
        const bt = BLOCK_TYPES[b.type];
        totalBuoyancy += bt.buoyancy;
        totalWeight += bt.weight;
        totalHP += bt.hp;
        if (bt.special === "speed") speedBonus += 0.3;
        if (bt.special === "boost") speedBonus += 0.6;
    });

    const bw = (maxX - minX + 1);
    const bh = (maxZ - minZ + 1);
    const bHeight = (maxY - minY + 1);

    boat = {
        x: 0, z: 0,
        vx: 0, vz: 0,
        blocks,
        totalHP, maxHP: totalHP,
        width: bw, depth: bh, height: bHeight,
        buoyancy: totalBuoyancy,
        weight: totalWeight,
        angle: 0, bobPhase: 0,
        roll: 0, pitch: 0,
    };

    // Build 3D boat
    buildBoat3D();
    generateLevel3D();

    distance = 0;
    sailSpeed = 1.5 + currentStage * 0.3 + speedBonus;
    boat.vx = sailSpeed * 10; // start at base speed
    waveTime = 0;
    particles = [];

    // Switch to sail scene but start with catapult launch
    gameState = "launching";
    launchState = "windup";
    launchTimer = 0;

    document.getElementById("game-screen").classList.add("sailing");
    document.getElementById("build-panel").style.display = "none";
    document.getElementById("distance-bar-container").style.display = "none";
    onResize();
    updateHUD();

    // Add player to the boat for sailing
    if (playerGroup) {
        // Remove from previous parent if any
        if (playerGroup.parent) playerGroup.parent.remove(playerGroup);
        // Stand on top of the boat
        const topY = (boat.height || 1) * BLOCK_SIZE;
        playerGroup.position.set(0, topY, 0);
        playerGroup.rotation.set(0, 0, 0);
        boatGroup.add(playerGroup);
        player.isOnBoat = true;
    }

    // Spawn AI boats
    spawnAIBoats();

    // Build catapult ramp in sail scene
    buildCatapultRamp();

    // Position boat on the catapult (behind the river, up high)
    boatGroup.position.set(-25, 8, 0);
    boatGroup.rotation.set(0, 0, -0.3); // tilted back on catapult

    // Camera for launch: looking at catapult from the side
    camera.position.set(-35, 14, 15);
    camera.lookAt(-20, 5, 0);

    showMessage("3...");
}

function buildCatapultRamp() {
    // Remove old ramp
    if (launchRampGroup) {
        scene.remove(launchRampGroup);
    }
    launchRampGroup = new THREE.Group();

    // Ramp base - big wooden platform
    const baseGeo = new THREE.BoxGeometry(8, 1, 8);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x6B4226, roughness: 0.8 });
    const base = new THREE.Mesh(baseGeo, woodMat);
    base.position.set(-25, 0.5, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    launchRampGroup.add(base);

    // Ramp slope
    const rampGeo = new THREE.BoxGeometry(14, 0.5, 7);
    const rampMesh = new THREE.Mesh(rampGeo, woodMat);
    rampMesh.position.set(-22, 4, 0);
    rampMesh.rotation.z = 0.35;
    rampMesh.castShadow = true;
    launchRampGroup.add(rampMesh);

    // Support beams
    const beamGeo = new THREE.BoxGeometry(0.6, 6, 0.6);
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x4a3520, roughness: 0.9 });
    for (let i = 0; i < 3; i++) {
        const beam = new THREE.Mesh(beamGeo, beamMat);
        beam.position.set(-28 + i * 3, 3, -3.2);
        beam.castShadow = true;
        launchRampGroup.add(beam);
        const beam2 = beam.clone();
        beam2.position.z = 3.2;
        launchRampGroup.add(beam2);
    }

    // Catapult arm (the part that flings)
    const armGeo = new THREE.BoxGeometry(12, 0.8, 1.5);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x8B5E3C, roughness: 0.6 });
    catapultArmMesh = new THREE.Mesh(armGeo, armMat);
    catapultArmMesh.position.set(-25, 7, 0);
    catapultArmMesh.castShadow = true;
    launchRampGroup.add(catapultArmMesh);

    // Pivot point cylinder
    const pivotGeo = new THREE.CylinderGeometry(0.5, 0.5, 3, 12);
    const pivotMat = new THREE.MeshStandardMaterial({ color: 0x777788, roughness: 0.4, metalness: 0.6 });
    const pivot = new THREE.Mesh(pivotGeo, pivotMat);
    pivot.position.set(-25, 5.5, 0);
    pivot.rotation.x = Math.PI / 2;
    launchRampGroup.add(pivot);

    // Rope/band (stretched elastic)
    const ropeMat = new THREE.MeshStandardMaterial({ color: 0xCC3333, roughness: 0.5 });
    const ropeGeo = new THREE.CylinderGeometry(0.15, 0.15, 8, 8);
    const rope1 = new THREE.Mesh(ropeGeo, ropeMat);
    rope1.position.set(-30, 4, 2);
    rope1.rotation.z = 0.5;
    launchRampGroup.add(rope1);
    const rope2 = rope1.clone();
    rope2.position.z = -2;
    launchRampGroup.add(rope2);

    scene.add(launchRampGroup);
}

function updateLaunch(dt) {
    launchTimer += dt;

    if (launchState === "windup") {
        // Countdown: show 3, 2, 1
        if (launchTimer > 0.8 && launchTimer < 0.85) showMessage("2...");
        if (launchTimer > 1.6 && launchTimer < 1.65) showMessage("1...");

        // Catapult arm pulls back (tension)
        if (catapultArmMesh) {
            const tension = Math.min(1, launchTimer / 2.2);
            catapultArmMesh.rotation.z = -0.3 * tension;
            // Boat sits on the arm, tilts back more
            boatGroup.position.set(-25 - tension * 3, 8 + tension * 1, 0);
            boatGroup.rotation.z = -0.3 - tension * 0.2;
        }

        // Shake the camera slightly for tension
        camera.position.x = -35 + Math.sin(launchTimer * 20) * 0.1 * Math.min(1, launchTimer);
        camera.position.y = 14 + Math.sin(launchTimer * 15) * 0.05 * Math.min(1, launchTimer);
        camera.lookAt(-20, 5, 0);

        if (launchTimer >= 2.4) {
            launchState = "fling";
            launchTimer = 0;
            showMessage("LAUNCH!");
            addChatMessage(null, "Boat launched! Here we go!", null, true);
        }
    }
    else if (launchState === "fling") {
        // Catapult arm swings forward fast
        const flingProgress = Math.min(1, launchTimer / 0.3);
        const eased = 1 - Math.pow(1 - flingProgress, 3); // ease out cubic

        if (catapultArmMesh) {
            catapultArmMesh.rotation.z = -0.3 + eased * 1.2;
        }

        // Boat flies off the catapult in an arc
        const arcX = -28 + eased * 30;
        const arcY = 9 + eased * 8 - eased * eased * 4;
        boatGroup.position.set(arcX, arcY, 0);
        boatGroup.rotation.z = -0.5 + eased * 0.8;
        boatGroup.rotation.x = eased * 0.2;

        // Camera tracks the boat
        camera.position.lerp(new THREE.Vector3(arcX - 15, arcY + 5, 12), dt * 8);
        camera.lookAt(arcX, arcY - 1, 0);

        if (flingProgress >= 1) {
            launchState = "airborne";
            launchTimer = 0;
        }
    }
    else if (launchState === "airborne") {
        // Boat is in the air, arcing down toward the water
        const airProgress = Math.min(1, launchTimer / 0.8);
        const eased = airProgress * airProgress; // ease in (gravity)

        const arcX = 2 + airProgress * 5;
        const arcY = 13 - eased * 13.5; // fall from 13 down to ~0
        boatGroup.position.set(arcX, Math.max(-0.5, arcY), 0);
        boatGroup.rotation.z = 0.3 - eased * 0.5;
        boatGroup.rotation.x = eased * -0.3;

        // Camera swoops behind
        camera.position.lerp(new THREE.Vector3(arcX - 12, Math.max(3, arcY + 3), 8), dt * 6);
        camera.lookAt(arcX + 2, Math.max(0, arcY - 2), 0);

        if (arcY <= 0.2) {
            launchState = "splash";
            launchTimer = 0;

            // Big splash particles
            spawnParticles(arcX, 0.5, 0, 0x4488CC, 30);
            spawnParticles(arcX, 0.5, -1, 0x66AADD, 15);
            spawnParticles(arcX, 0.5, 1, 0x66AADD, 15);
            showMessage("SPLASH!");
        }
    }
    else if (launchState === "splash") {
        // Boat settles into water, camera moves to chase position
        const settleProgress = Math.min(1, launchTimer / 1.2);
        const eased = 1 - Math.pow(1 - settleProgress, 2);

        // Boat bobs down then up
        const splashBob = Math.sin(settleProgress * Math.PI * 3) * (1 - settleProgress) * 2;
        boatGroup.position.set(5 + settleProgress * 2, -0.5 + splashBob * 0.5, 0);
        boatGroup.rotation.z = (1 - eased) * 0.2;
        boatGroup.rotation.x = Math.sin(settleProgress * Math.PI * 2) * 0.1 * (1 - settleProgress);

        // Camera transitions to chase cam
        camera.position.lerp(new THREE.Vector3(-10, 8, 0), dt * 4);
        camera.lookAt(3, 0.5, 0);

        // Update particles during splash
        updateParticles(dt);

        if (settleProgress >= 1) {
            // Remove catapult ramp
            if (launchRampGroup) {
                scene.remove(launchRampGroup);
                launchRampGroup = null;
            }
            catapultArmMesh = null;

            // Transition to actual sailing
            launchState = "none";
            gameState = "sailing";
            boatGroup.position.set(0, 0, 0);
            boatGroup.rotation.set(0, 0, 0);
            boat.x = 0;
            boat.z = 0;
            document.getElementById("distance-bar-container").style.display = "flex";
            showTouchControls("sailing");
            showMessage("Here we go! Stage " + currentStage);
        }
    }

    // Always render during launch
    renderer.render(scene, camera);
}

function buildBoat3D() {
    // Clear old boat
    while (boatGroup.children.length > 0) boatGroup.remove(boatGroup.children[0]);

    const halfW = boat.width * 0.5;
    const halfD = boat.depth * 0.5;

    boat.blocks.forEach(b => {
        if (!b.alive) return;
        const bt = BLOCK_TYPES[b.type];
        const geo = getBlockGeo(bt.shape || "box");
        const mat = makeBlockMaterial(bt);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            b.rx * BLOCK_SIZE - halfW + 0.5,
            b.ry * BLOCK_SIZE + BLOCK_SIZE * 0.5,  // Y is height
            (b.rz || 0) * BLOCK_SIZE - halfD + 0.5  // rz for depth
        );
        if (bt.shape === "torus" || bt.shape === "spring") {
            mesh.rotation.x = Math.PI / 2;
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        b.mesh = mesh;
        boatGroup.add(mesh);

        // Add point light for emissive blocks on the boat
        if (bt.emissive) {
            const glow = new THREE.PointLight(bt.color, 0.6, 4);
            glow.position.copy(mesh.position);
            glow.position.y += 0.5;
            boatGroup.add(glow);
        }
    });

    boatGroup.position.set(0, 0, 0);
}

function generateLevel3D() {
    // Clear old obstacles and treasures
    while (obstacleGroup.children.length > 0) obstacleGroup.remove(obstacleGroup.children[0]);
    while (treasureGroup.children.length > 0) treasureGroup.remove(treasureGroup.children[0]);
    while (envGroup.children.length > 0) envGroup.remove(envGroup.children[0]);

    obstacles = [];
    treasureItems = [];

    const stageMax = stageDistances[Math.min(currentStage - 1, stageDistances.length - 1)];
    maxDistance = stageMax;
    const numObs = 20 + currentStage * 12;
    const numTreasures = 5 + currentStage * 2;
    const RIVER_HALF = 15;

    // Obstacle definitions
    const obsTypes = [
        { color: 0x555566, size: [3, 2.5, 3], damage: 15, shape: "box" },
        { color: 0xCC3333, size: [1.5, 3, 1.5], damage: 30, shape: "cone" },
        { color: 0x3366AA, size: [3, 1, 3], damage: 10, shape: "cylinder" },
        { color: 0xCCEEFF, size: [4, 3.5, 3.5], damage: 25, shape: "box" },
        { color: 0xFF4444, size: [1.8, 1.8, 1.8], damage: 50, shape: "sphere" },
    ];

    for (let i = 0; i < numObs; i++) {
        const ot = obsTypes[Math.floor(Math.random() * obsTypes.length)];
        const ox = 30 + Math.random() * (stageMax * 0.15);
        const oz = (Math.random() - 0.5) * RIVER_HALF * 1.6;
        const dmg = ot.damage + currentStage * 3;

        let geo;
        if (ot.shape === "box") geo = new THREE.BoxGeometry(ot.size[0], ot.size[1], ot.size[2]);
        else if (ot.shape === "cone") geo = new THREE.ConeGeometry(ot.size[0], ot.size[1], 6);
        else if (ot.shape === "cylinder") geo = new THREE.CylinderGeometry(ot.size[0], ot.size[0], ot.size[1], 16);
        else geo = new THREE.SphereGeometry(ot.size[0], 12, 12);

        const mat = new THREE.MeshStandardMaterial({ color: ot.color, roughness: 0.6, metalness: 0.2 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(ox, ot.size[1] * 0.3, oz);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        obstacleGroup.add(mesh);

        obstacles.push({
            x: ox, z: oz,
            radius: Math.max(ot.size[0], ot.size[2]) * 0.6,
            damage: dmg, hit: false, mesh,
        });
    }

    // Treasures
    for (let i = 0; i < numTreasures; i++) {
        const tx = 20 + (stageMax * 0.15 / numTreasures) * i + Math.random() * 20;
        const tz = (Math.random() - 0.5) * RIVER_HALF * 1.4;
        const value = 10 + currentStage * 5 + Math.floor(Math.random() * 20);

        const group = new THREE.Group();

        // Chest base
        const chestGeo = new THREE.BoxGeometry(1.2, 0.8, 0.8);
        const chestMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.6 });
        const chest = new THREE.Mesh(chestGeo, chestMat);
        chest.position.y = 0.4;
        group.add(chest);

        // Gold band
        const bandGeo = new THREE.BoxGeometry(1.3, 0.15, 0.85);
        const bandMat = new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.3, metalness: 0.8 });
        const band = new THREE.Mesh(bandGeo, bandMat);
        band.position.y = 0.5;
        group.add(band);

        // Glow light
        const light = new THREE.PointLight(0xFFD700, 0.8, 8);
        light.position.y = 1;
        group.add(light);

        group.position.set(tx, 0, tz);
        group.castShadow = true;
        treasureGroup.add(group);

        treasureItems.push({ x: tx, z: tz, value, collected: false, mesh: group });
    }

    // Big treasure at end
    {
        const group = new THREE.Group();
        const chestGeo = new THREE.BoxGeometry(2.5, 1.8, 1.8);
        const chestMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.5 });
        const chest = new THREE.Mesh(chestGeo, chestMat);
        chest.position.y = 0.9;
        group.add(chest);

        const bandGeo = new THREE.BoxGeometry(2.6, 0.3, 1.9);
        const bandMat = new THREE.MeshStandardMaterial({ color: 0xFFD700, roughness: 0.2, metalness: 0.9 });
        const band = new THREE.Mesh(bandGeo, bandMat);
        band.position.y = 1.1;
        group.add(band);

        const lockGeo = new THREE.BoxGeometry(0.4, 0.5, 0.2);
        const lock = new THREE.Mesh(lockGeo, bandMat);
        lock.position.set(0, 0.6, 0.95);
        group.add(lock);

        const light = new THREE.PointLight(0xFFD700, 2, 15);
        light.position.y = 2;
        group.add(light);

        const endX = stageMax * 0.15 - 5;
        group.position.set(endX, 0, 0);
        treasureGroup.add(group);
        treasureItems.push({ x: endX, z: 0, value: 100 + currentStage * 50, collected: false, mesh: group, isBig: true });
    }

    // Trees along banks
    for (let i = 0; i < 80; i++) {
        const tx = (Math.random() - 0.3) * stageMax * 0.18;
        const side = Math.random() > 0.5 ? 1 : -1;
        const tz = side * (RIVER_HALF + 3 + Math.random() * 12);
        createTree3D(tx, tz);
    }

    // Position obstacles/treasures group at origin, we'll move them via the world offset
    obstacleGroup.position.set(0, 0, 0);
    treasureGroup.position.set(0, 0, 0);
}

function createTree3D(x, z) {
    const group = new THREE.Group();

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.3, 2 + Math.random() * 2, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3520, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.5;
    trunk.castShadow = true;
    group.add(trunk);

    // Leaves - several spheres
    const leafColor = 0x2d5a27 + Math.floor(Math.random() * 0x102010);
    const leafMat = new THREE.MeshStandardMaterial({ color: leafColor, roughness: 0.8 });

    for (let j = 0; j < 3; j++) {
        const size = 1.2 + Math.random() * 0.8;
        const leafGeo = new THREE.SphereGeometry(size, 8, 6);
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        leaf.position.set(
            (Math.random() - 0.5) * 1,
            2.5 + Math.random() * 1.5,
            (Math.random() - 0.5) * 1
        );
        leaf.castShadow = true;
        group.add(leaf);
    }

    group.position.set(x, 0, z);
    const scale = 0.8 + Math.random() * 0.6;
    group.scale.set(scale, scale, scale);
    envGroup.add(group);
}

// ===== SAILING UPDATE =====
function updateSailing(dt) {
    waveTime += dt;

    // Forward / backward speed control
    const baseSpeed = sailSpeed * 10;
    const maxSpeed = baseSpeed * 2.5;
    const minSpeed = -baseSpeed * 0.5; // can reverse slowly

    const accelInput = keysDown["w"] || keysDown["W"] || keysDown["ArrowUp"] || touchAccel || (touchJoystick.active && touchJoystick.dy < -0.3);
    const brakeInput = keysDown["s"] || keysDown["S"] || keysDown["ArrowDown"] || touchBrake || (touchJoystick.active && touchJoystick.dy > 0.3);

    if (accelInput) {
        boat.vx += 30 * dt; // accelerate forward
    }
    if (brakeInput) {
        boat.vx -= 20 * dt; // brake / reverse
    }

    // Drift toward base speed when no input
    if (!accelInput && !brakeInput) {
        boat.vx += (baseSpeed - boat.vx) * 1.5 * dt; // ease back to base speed
    }

    // Clamp speed
    boat.vx = Math.max(minSpeed, Math.min(maxSpeed, boat.vx));

    const speed = boat.vx;
    const distGain = Math.max(0, speed * dt); // only count forward distance
    distance += distGain;
    boat.x += speed * dt;

    // Buoyancy / sinking
    const floatRatio = boat.weight > 0 ? boat.buoyancy / boat.weight : 1;
    const sinkAmount = (1 - floatRatio) * 2 * dt;

    // Left / right steering
    const steerLeft = keysDown["a"] || keysDown["A"] || keysDown["ArrowLeft"] || (touchJoystick.active && touchJoystick.dx < -0.3);
    const steerRight = keysDown["d"] || keysDown["D"] || keysDown["ArrowRight"] || (touchJoystick.active && touchJoystick.dx > 0.3);
    if (steerLeft) boat.vz -= 15 * dt;
    if (steerRight) boat.vz += 15 * dt;
    boat.vz *= 0.95;
    boat.z += boat.vz * dt;

    // Clamp Z to river
    const RIVER_HALF = 13;
    if (boat.z < -RIVER_HALF) { boat.z = -RIVER_HALF; boat.vz = 0; }
    if (boat.z > RIVER_HALF) { boat.z = RIVER_HALF; boat.vz = 0; }

    // Bobbing
    boat.bobPhase += dt * 2.5;
    const bobY = Math.sin(boat.bobPhase) * 0.3 + sinkAmount * -5;
    boat.roll = Math.sin(waveTime * 1.8) * 0.08 + boat.vz * 0.02; // tilt when steering
    // Pitch based on speed: nose up when fast, nose down when braking
    const speedRatio = (boat.vx - sailSpeed * 10) / (sailSpeed * 15);
    boat.pitch = Math.sin(waveTime * 1.3) * 0.05 + speedRatio * 0.12;

    // Update boat group position
    boatGroup.position.set(0, Math.max(-2, bobY), boat.z);
    boatGroup.rotation.set(boat.pitch, 0, boat.roll);

    // Move world around boat (boat stays near origin on X, world moves)
    const worldX = -boat.x;
    obstacleGroup.position.x = worldX;
    treasureGroup.position.x = worldX;
    envGroup.position.x = worldX;

    // Update water position to follow
    waterMesh.position.x = 0;
    waterMesh.position.z = 0;

    // Animate water vertices
    const waterPositions = waterMesh.geometry.attributes.position;
    for (let i = 0; i < waterPositions.count; i++) {
        const x = waterPositions.getX(i);
        const z = waterPositions.getZ(i);
        const waveY = Math.sin(x * 0.3 + waveTime * 2) * 0.3 +
                      Math.sin(z * 0.5 + waveTime * 1.7) * 0.2 +
                      Math.sin((x + z) * 0.2 + waveTime * 3) * 0.15;
        waterPositions.setZ(i, waveY); // Z because plane is rotated
    }
    waterPositions.needsUpdate = true;
    waterMesh.geometry.computeVertexNormals();

    // Collision detection
    for (let obs of obstacles) {
        if (obs.hit) continue;
        const dx = (obs.x + worldX) - 0; // boat is at x=0 in world
        const dz = obs.z - boat.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        const hitRadius = obs.radius + Math.max(boat.width, boat.depth) * 0.5;

        if (dist < hitRadius) {
            obs.hit = true;
            damageBoat(obs.damage);
            showMessage("-" + obs.damage + " HP!");

            // Flash obstacle red
            if (obs.mesh.material) {
                const origColor = obs.mesh.material.color.getHex();
                obs.mesh.material.color.setHex(0xff0000);
                obs.mesh.material.emissive = new THREE.Color(0xff0000);
                obs.mesh.material.emissiveIntensity = 0.5;
                setTimeout(() => {
                    obs.mesh.material.color.setHex(origColor);
                    obs.mesh.material.emissive = new THREE.Color(0x000000);
                }, 300);
            }

            // Spawn 3D particles
            spawnParticles(obs.x + worldX, 1, obs.z, obs.mesh.material ? obs.mesh.material.color.getHex() : 0xff0000, 12);
        }
    }

    // Treasure collection
    for (let tr of treasureItems) {
        if (tr.collected) continue;
        const dx = (tr.x + worldX) - 0;
        const dz = tr.z - boat.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        const collectRadius = tr.isBig ? 5 : 3;

        if (dist < collectRadius) {
            tr.collected = true;
            gold += tr.value;
            totalGoldEarned += tr.value;
            showMessage("+" + tr.value + " Gold!");

            // Team gold bonus
            if (playerTeam) {
                const teamBonus = Math.floor(tr.value * 0.2);
                teamScores[playerTeam] = (teamScores[playerTeam] || 0) + teamBonus;
                updateTeamLeaderboard();
            }

            // Hide treasure
            tr.mesh.visible = false;

            // Gold particles
            spawnParticles(tr.x + worldX, 1.5, tr.z, 0xFFD700, 20);
        }
    }

    // Bob uncollected treasures
    for (let tr of treasureItems) {
        if (tr.collected) continue;
        tr.mesh.position.y = Math.sin(waveTime * 2 + tr.x * 0.1) * 0.3;
        tr.mesh.rotation.y += dt * 0.5;
    }

    // Update particles
    updateParticles(dt);

    // Animate player on boat (idle stance, bracing against waves)
    if (playerGroup && player.isOnBoat) {
        // Player sways slightly opposite to boat roll for balance
        playerGroup.rotation.z = -boat.roll * 0.5;
        playerGroup.rotation.x = -boat.pitch * 0.3;

        // Idle animation
        const breath = Math.sin(waveTime * 2) * 0.02;
        if (playerGroup.children[3]) { // torso
            playerGroup.children[3].scale.y = 1 + breath;
        }
        // Slight arm bracing
        if (playerGroup.children[5]) { // left arm
            playerGroup.children[5].rotation.x = Math.sin(waveTime * 1.5) * 0.15;
            playerGroup.children[5].rotation.z = -0.15;
        }
        if (playerGroup.children[6]) { // right arm
            playerGroup.children[6].rotation.x = Math.sin(waveTime * 1.5 + 1) * 0.15;
            playerGroup.children[6].rotation.z = 0.15;
        }
    }

    // Update AI boats
    updateAIBoats(dt);

    // Camera - chase cam behind and above the boat
    const camTarget = new THREE.Vector3(0, 2, boat.z);
    camera.position.lerp(new THREE.Vector3(-10, 8 + Math.sin(waveTime * 0.5) * 0.5, boat.z), dt * 3);
    camera.lookAt(3, 0.5, boat.z);

    // Distance bar
    const pct = Math.min(1, distance / maxDistance);
    document.getElementById("distance-bar-fill").style.width = (pct * 100) + "%";
    document.getElementById("distance-text").textContent = Math.floor(distance) + "m / " + maxDistance + "m";

    // Check end conditions
    if (boat.totalHP <= 0) endSailing(false);
    if (distance >= maxDistance) endSailing(true);
}

function damageBoat(amount) {
    boat.totalHP -= amount;
    if (boat.totalHP < 0) boat.totalHP = 0;

    // Damage random block visually
    let aliveBlocks = boat.blocks.filter(b => b.alive);
    if (aliveBlocks.length > 0) {
        let target = aliveBlocks[Math.floor(Math.random() * aliveBlocks.length)];
        target.hp -= amount;
        if (target.hp <= 0) {
            target.alive = false;
            if (target.mesh) {
                const worldPos = new THREE.Vector3();
                target.mesh.getWorldPosition(worldPos);

                const bt = BLOCK_TYPES[target.type];
                // TNT/Dynamite explosion
                if (bt.special === "explode") {
                    spawnParticles(worldPos.x, worldPos.y, worldPos.z, 0xFF4400, 25);
                    spawnParticles(worldPos.x, worldPos.y + 1, worldPos.z, 0xFFCC00, 15);
                    showMessage("BOOM!");
                    // Destroy nearby obstacles in range
                    const worldX = obstacleGroup.position.x;
                    for (let obs of obstacles) {
                        if (obs.hit) continue;
                        const odx = (obs.x + worldX) - worldPos.x;
                        const odz = obs.z - worldPos.z;
                        if (Math.sqrt(odx * odx + odz * odz) < 8) {
                            obs.hit = true;
                            spawnParticles(obs.x + worldX, 1, obs.z, 0xFF6600, 10);
                        }
                    }
                }

                // Detach and animate falling
                boatGroup.remove(target.mesh);
                scene.add(target.mesh);
                target.mesh.position.copy(worldPos);

                const fallMesh = target.mesh;
                const fallStart = Date.now();
                const isExplosion = bt.special === "explode";
                const animateFall = () => {
                    const elapsed = (Date.now() - fallStart) / 1000;
                    if (isExplosion) {
                        // Explode outward
                        fallMesh.scale.multiplyScalar(1.05);
                        fallMesh.material.opacity = Math.max(0, 1 - elapsed * 2);
                        fallMesh.material.transparent = true;
                    } else {
                        fallMesh.position.y -= elapsed * 3 * 0.016;
                        fallMesh.rotation.x += 0.05;
                        fallMesh.rotation.z += 0.03;
                    }
                    if (elapsed < 2) requestAnimationFrame(animateFall);
                    else scene.remove(fallMesh);
                };
                animateFall();
            }
            recalcBoatStats();
        } else if (target.mesh) {
            // Flash damage
            const origColor = target.mesh.material.color.getHex();
            target.mesh.material.emissive = new THREE.Color(0xff0000);
            target.mesh.material.emissiveIntensity = 0.8;
            setTimeout(() => {
                if (target.mesh && target.mesh.material) {
                    target.mesh.material.emissive = new THREE.Color(0x000000);
                }
            }, 200);
        }
    }

    // Knockback
    boat.vz += (Math.random() - 0.5) * 5;
}

function recalcBoatStats() {
    let totalBuoyancy = 0, totalWeight = 0;
    boat.blocks.forEach(b => {
        if (b.alive) {
            const bt = BLOCK_TYPES[b.type];
            totalBuoyancy += bt.buoyancy;
            totalWeight += bt.weight;
        }
    });
    boat.buoyancy = totalBuoyancy;
    boat.weight = totalWeight;
}

// ===== 3D PARTICLES =====
function spawnParticles(x, y, z, color, count) {
    const geo = new THREE.SphereGeometry(0.15, 4, 4);
    for (let i = 0; i < count; i++) {
        const mat = new THREE.MeshBasicMaterial({ color });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        particleGroup.add(mesh);
        particles.push({
            mesh,
            vx: (Math.random() - 0.5) * 8,
            vy: 2 + Math.random() * 5,
            vz: (Math.random() - 0.5) * 8,
            life: 1 + Math.random(),
        });
    }
}

function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.mesh.position.x += p.vx * dt;
        p.mesh.position.y += p.vy * dt;
        p.mesh.position.z += p.vz * dt;
        p.vy -= 10 * dt; // gravity
        p.life -= dt;
        p.mesh.material.opacity = Math.max(0, p.life);
        p.mesh.material.transparent = true;

        const scale = Math.max(0.1, p.life);
        p.mesh.scale.set(scale, scale, scale);

        if (p.life <= 0) {
            particleGroup.remove(p.mesh);
            particles.splice(i, 1);
        }
    }
}

// ===== WATER SPLASH SPAWNER =====
let splashTimer = 0;
function spawnWaterSplash(dt) {
    splashTimer += dt;
    if (splashTimer > 0.1 && gameState === "sailing") {
        splashTimer = 0;
        const bx = boatGroup.position.x + boat.width * 0.5 + 0.5;
        const bz = boat.z + (Math.random() - 0.5) * boat.depth;
        spawnParticles(bx, 0.3, bz, 0x4488CC, 2);
    }
}

// ===== BUILD AREA BOTS =====
function createBuildBot(forceTeamKey) {
    const teamKeys = Object.keys(TEAMS);
    const teamKey = forceTeamKey || teamKeys[Math.floor(Math.random() * teamKeys.length)];
    const team = TEAMS[teamKey];
    const botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];

    // Create player model with team color
    const model = createPlayerModel(team.color);
    const group = model.group;

    // Name tag above head
    const tagCanvas = document.createElement("canvas");
    tagCanvas.width = 256;
    tagCanvas.height = 48;
    const tctx = tagCanvas.getContext("2d");
    tctx.clearRect(0, 0, 256, 48);

    // Background pill
    tctx.fillStyle = "rgba(0,0,0,0.5)";
    tctx.beginPath();
    if (tctx.roundRect) {
        tctx.roundRect(10, 6, 236, 36, 10);
    } else {
        tctx.rect(10, 6, 236, 36);
    }
    tctx.fill();

    // Team color dot
    const hex = "#" + team.color.toString(16).padStart(6, "0");
    tctx.fillStyle = hex;
    tctx.beginPath();
    tctx.arc(30, 24, 8, 0, Math.PI * 2);
    tctx.fill();

    // Name text
    tctx.font = "bold 20px 'Segoe UI', Arial, sans-serif";
    tctx.textAlign = "left";
    tctx.textBaseline = "middle";
    tctx.fillStyle = "#ffffff";
    tctx.fillText(botName, 44, 25);

    const tagTex = new THREE.CanvasTexture(tagCanvas);
    const tagMat = new THREE.SpriteMaterial({ map: tagTex, transparent: true, depthTest: false });
    const tagSprite = new THREE.Sprite(tagMat);
    tagSprite.scale.set(3, 0.55, 1);
    tagSprite.position.set(0, 2.4, 0);
    group.add(tagSprite);

    // Random starting position around the build area
    const startX = -3 + Math.random() * (GRID_COLS + 10);
    const startZ = -3 + Math.random() * (GRID_ROWS + 6);

    group.position.set(startX, 0, startZ);

    // Pick which block types this bot likes to place
    const botBlockTypes = ["wood", "plank", "wood_rod", "brick", "stone", "rubber", "hay", "barrel", "cork"];
    const favBlock = botBlockTypes[Math.floor(Math.random() * botBlockTypes.length)];

    const bot = {
        group: group,
        parts: model.parts,
        name: botName,
        teamKey: teamKey,
        x: startX,
        z: startZ,
        y: 0,
        rotation: Math.random() * Math.PI * 2,
        speed: 1.5 + Math.random() * 2,
        walkCycle: Math.random() * 10,
        // Wandering AI
        targetX: startX,
        targetZ: startZ,
        waitTimer: 0,
        state: "idle",  // "idle", "walking", "building", "looking"
        stateTimer: 0,
        // Jump occasionally
        vy: 0,
        grounded: true,
        // Building AI
        favBlock: favBlock,
        buildTargetX: -1,
        buildTargetY: 0,
        buildTargetZ: -1,
        buildCooldown: 1.5 + Math.random() * 3, // seconds before first build attempt
        blocksPlaced: 0,
        maxBlocks: 3 + Math.floor(Math.random() * 5), // each bot places 3-7 blocks
    };

    pickNewBotTarget(bot);
    return bot;
}

function pickNewBotTarget(bot) {
    const isTeammate = playerTeam && bot.teamKey === playerTeam;
    if (isTeammate || !rivalGrids[bot.teamKey]) {
        // Teammate or no rival grid: wander near player's build area
        bot.targetX = -2 + Math.random() * (GRID_COLS + 8);
        bot.targetZ = -2 + Math.random() * (GRID_ROWS + 5);
    } else {
        // Rival: wander near their own platform
        const rg = rivalGrids[bot.teamKey];
        bot.targetX = rg.offsetX - 2 + Math.random() * (RIVAL_GRID_COLS + 4);
        bot.targetZ = rg.offsetZ - 2 + Math.random() * (RIVAL_GRID_ROWS + 4);
    }
}

function pickBotBuildSpot(bot) {
    const isTeammate = playerTeam && bot.teamKey === playerTeam;
    const cols = isTeammate ? GRID_COLS : RIVAL_GRID_COLS;
    const rows = isTeammate ? GRID_ROWS : RIVAL_GRID_ROWS;
    const getBlockFn = isTeammate ? getBlock : (x, y, z) => getRivalBlock(bot.teamKey, x, y, z);
    const existingBlocks = isTeammate ? getAllBlocks() : getRivalAllBlocks(bot.teamKey);

    if (existingBlocks.length > 0 && Math.random() < 0.6) {
        // Try to build adjacent to an existing block (expand the boat)
        const shuffled = existingBlocks.sort(() => Math.random() - 0.5);
        for (let b of shuffled) {
            const offsets = [
                { dx: 1, dy: 0, dz: 0 }, { dx: -1, dy: 0, dz: 0 },
                { dx: 0, dy: 0, dz: 1 }, { dx: 0, dy: 0, dz: -1 },
                { dx: 0, dy: 1, dz: 0 },
            ];
            for (let off of offsets.sort(() => Math.random() - 0.5)) {
                const nx = b.x + off.dx;
                const ny = b.y + off.dy;
                const nz = b.z + off.dz;
                if (nx >= 0 && nx < cols && nz >= 0 && nz < rows && ny >= 0 && ny < 6) {
                    if (!getBlockFn(nx, ny, nz)) {
                        return { x: nx, y: ny, z: nz };
                    }
                }
            }
        }
    }

    // Place on the base layer at a random empty spot
    for (let attempt = 0; attempt < 20; attempt++) {
        const rx = Math.floor(Math.random() * cols);
        const rz = Math.floor(Math.random() * rows);
        if (!getBlockFn(rx, 0, rz)) {
            return { x: rx, y: 0, z: rz };
        }
    }
    return null; // grid is full
}

function spawnBuildBots() {
    cleanupBuildBots();
    if (!playerTeam) {
        // No team yet, just spawn random wanderers
        for (let i = 0; i < 6; i++) {
            const bot = createBuildBot();
            buildScene.add(bot.group);
            buildBots.push(bot);
        }
        return;
    }

    // Spawn 2-3 teammates
    const teammateCount = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < teammateCount; i++) {
        const bot = createBuildBot(playerTeam);
        buildScene.add(bot.group);
        buildBots.push(bot);
    }

    // Spawn 2 bots for each rival team so they build their boats
    const otherTeams = Object.keys(TEAMS).filter(t => t !== playerTeam);
    for (let tk of otherTeams) {
        const count = 2;
        for (let i = 0; i < count; i++) {
            const bot = createBuildBot(tk);
            buildScene.add(bot.group);
            buildBots.push(bot);
        }
    }
}

function cleanupBuildBots() {
    for (let bot of buildBots) {
        if (bot.group.parent) bot.group.parent.remove(bot.group);
    }
    buildBots = [];
}

function updateBuildBots(dt) {
    for (let bot of buildBots) {
        bot.stateTimer -= dt;
        bot.buildCooldown -= dt;

        if (bot.state === "idle") {
            // Standing still, maybe looking around
            bot.walkCycle = 0;
            // Idle animation
            if (bot.parts.leftArm) {
                bot.parts.leftArm.rotation.x *= 0.85;
                bot.parts.rightArm.rotation.x *= 0.85;
                bot.parts.leftLeg.rotation.x *= 0.85;
                bot.parts.rightLeg.rotation.x *= 0.85;
            }
            // Breathing
            if (bot.parts.torso) {
                const breath = Math.sin(Date.now() * 0.003 + bot.x) * 0.01;
                bot.parts.torso.scale.y = 1 + breath;
                if (bot.parts.head) bot.parts.head.position.y = 1.6 + breath * 2;
            }

            if (bot.stateTimer <= 0) {
                // Decide: go build or just wander?
                const isTeammate = playerTeam && bot.teamKey === playerTeam;
                const canBuild = isTeammate || rivalGrids[bot.teamKey];
                if (canBuild && bot.buildCooldown <= 0 && bot.blocksPlaced < bot.maxBlocks && Math.random() < 0.55) {
                    // Try to find a build spot on the bot's team grid
                    const spot = pickBotBuildSpot(bot);
                    if (spot) {
                        bot.buildTargetX = spot.x;
                        bot.buildTargetY = spot.y;
                        bot.buildTargetZ = spot.z;
                        // Walk toward the grid spot (world position)
                        if (isTeammate) {
                            bot.targetX = spot.x * BLOCK_SIZE + 0.5;
                            bot.targetZ = spot.z * BLOCK_SIZE + 0.5 + 1.5;
                        } else {
                            const rg = rivalGrids[bot.teamKey];
                            bot.targetX = rg.offsetX + spot.x * BLOCK_SIZE + 0.5;
                            bot.targetZ = rg.offsetZ + spot.z * BLOCK_SIZE + 0.5 + 1.5;
                        }
                        bot.state = "building";
                        bot.stateTimer = 6;
                        continue;
                    }
                }
                // Just wander
                pickNewBotTarget(bot);
                bot.state = "walking";
                bot.stateTimer = 3 + Math.random() * 5;
            }
        }
        else if (bot.state === "building") {
            const isTeammate = playerTeam && bot.teamKey === playerTeam;
            // Walk toward the build grid spot
            const dx = bot.targetX - bot.x;
            const dz = bot.targetZ - bot.z;
            const dist = Math.sqrt(dx * dx + dz * dz);

            if (dist < 1.2) {
                // Close enough - face the block spot and place it
                let lookWorldX, lookWorldZ;
                if (isTeammate) {
                    lookWorldX = bot.buildTargetX * BLOCK_SIZE + 0.5;
                    lookWorldZ = bot.buildTargetZ * BLOCK_SIZE + 0.5;
                } else {
                    const rg = rivalGrids[bot.teamKey];
                    lookWorldX = rg.offsetX + bot.buildTargetX * BLOCK_SIZE + 0.5;
                    lookWorldZ = rg.offsetZ + bot.buildTargetZ * BLOCK_SIZE + 0.5;
                }
                bot.rotation = Math.atan2(lookWorldX - bot.x, lookWorldZ - bot.z);

                // Arm swing animation (placing block)
                if (bot.parts.rightArm) {
                    bot.parts.rightArm.rotation.x = -1.2;
                }

                // Actually place the block after a short pause
                if (bot.stateTimer <= 5.2) {
                    if (isTeammate) {
                        // Teammate: place on player's grid
                        if (!getBlock(bot.buildTargetX, bot.buildTargetY, bot.buildTargetZ)) {
                            setBlock(bot.buildTargetX, bot.buildTargetY, bot.buildTargetZ, bot.favBlock);
                            refreshBuildBlocks();
                            bot.blocksPlaced++;
                        }
                    } else {
                        // Rival: place on their own team grid
                        if (!getRivalBlock(bot.teamKey, bot.buildTargetX, bot.buildTargetY, bot.buildTargetZ)) {
                            setRivalBlock(bot.teamKey, bot.buildTargetX, bot.buildTargetY, bot.buildTargetZ, bot.favBlock);
                            refreshRivalBlocks(bot.teamKey);
                            bot.blocksPlaced++;
                        }
                    }

                    // Chat about it sometimes
                    if (bot.blocksPlaced > 0 && Math.random() < 0.35) {
                        const teamName = TEAMS[bot.teamKey] ? TEAMS[bot.teamKey].name : "our team";
                        const msgs = [
                            "placed a " + BLOCK_TYPES[bot.favBlock].name + " for " + teamName + "!",
                            "there we go! " + teamName + " ftw!",
                            "helping the team!",
                            "this boat is gonna be epic",
                            "i got u guys!",
                            "adding more blocks for us!",
                            teamName + " teamwork!!",
                            "we need more blocks here",
                            "let me help the team!",
                            "go " + teamName + "!",
                        ];
                        addChatMessage(bot.name, msgs[Math.floor(Math.random() * msgs.length)], bot.teamKey);
                    }

                    // Reset arm and go idle
                    if (bot.parts.rightArm) bot.parts.rightArm.rotation.x = 0;
                    bot.state = "idle";
                    bot.stateTimer = 1.5 + Math.random() * 3;
                    bot.buildCooldown = 3 + Math.random() * 5; // wait before building again
                }
            } else if (bot.stateTimer <= 0) {
                // Couldn't reach in time, give up
                bot.state = "idle";
                bot.stateTimer = 1 + Math.random() * 2;
            } else {
                // Walk toward target
                const nx = dx / dist;
                const nz = dz / dist;
                bot.x += nx * bot.speed * dt;
                bot.z += nz * bot.speed * dt;
                bot.rotation = Math.atan2(nx, nz);

                // Walk animation
                bot.walkCycle += dt * 8;
                if (bot.parts.leftArm) {
                    const swing = Math.sin(bot.walkCycle) * 0.5;
                    bot.parts.leftArm.rotation.x = swing;
                    bot.parts.rightArm.rotation.x = -swing;
                    bot.parts.leftLeg.rotation.x = -swing * 0.8;
                    bot.parts.rightLeg.rotation.x = swing * 0.8;
                }
            }
        }
        else if (bot.state === "walking") {
            const dx = bot.targetX - bot.x;
            const dz = bot.targetZ - bot.z;
            const dist = Math.sqrt(dx * dx + dz * dz);

            if (dist < 0.5 || bot.stateTimer <= 0) {
                // Arrived or timed out
                bot.state = "idle";
                bot.stateTimer = 1 + Math.random() * 3;
            } else {
                // Move toward target
                const nx = dx / dist;
                const nz = dz / dist;
                bot.x += nx * bot.speed * dt;
                bot.z += nz * bot.speed * dt;
                bot.rotation = Math.atan2(nx, nz);

                // Walk animation
                bot.walkCycle += dt * 8;
                if (bot.parts.leftArm) {
                    const swing = Math.sin(bot.walkCycle) * 0.5;
                    bot.parts.leftArm.rotation.x = swing;
                    bot.parts.rightArm.rotation.x = -swing;
                    bot.parts.leftLeg.rotation.x = -swing * 0.8;
                    bot.parts.rightLeg.rotation.x = swing * 0.8;
                    if (bot.parts.head) {
                        bot.parts.head.position.y = 1.6 + Math.abs(Math.sin(bot.walkCycle * 2)) * 0.02;
                    }
                }

                // Random jump
                if (bot.grounded && Math.random() < 0.003) {
                    bot.vy = 4;
                    bot.grounded = false;
                }
            }
        }

        // Gravity / jump
        bot.vy -= 15 * dt;
        bot.y += bot.vy * dt;
        if (bot.y <= 0) {
            bot.y = 0;
            bot.vy = 0;
            bot.grounded = true;
        }

        // Clamp to extended build area (includes rival platforms behind)
        bot.x = Math.max(-20, Math.min(GRID_COLS + 20, bot.x));
        bot.z = Math.max(-20, Math.min(GRID_ROWS + 5, bot.z));

        // Update visual
        bot.group.position.set(bot.x, bot.y, bot.z);
        bot.group.rotation.y = bot.rotation;
    }
}

// ===== AI BOATS =====
function createAIBoat(teamKey, isTeammate) {
    const team = TEAMS[teamKey];
    const boatGrp = new THREE.Group();

    // Try to use blocks the rival team actually built
    const rivalBlocks = getRivalAllBlocks(teamKey);
    const useBuiltBlocks = !isTeammate && rivalBlocks.length > 0;

    if (useBuiltBlocks) {
        // Build the AI boat from the blocks the rival team placed
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;
        rivalBlocks.forEach(b => {
            if (b.x < minX) minX = b.x; if (b.x > maxX) maxX = b.x;
            if (b.y < minY) minY = b.y; if (b.y > maxY) maxY = b.y;
            if (b.z < minZ) minZ = b.z; if (b.z > maxZ) maxZ = b.z;
        });
        const cX = (minX + maxX) / 2;
        const cZ = (minZ + maxZ) / 2;

        for (let b of rivalBlocks) {
            const bt = BLOCK_TYPES[b.type];
            const geo = getBlockGeo(bt.shape || "box");
            const mat = makeBlockMaterial(bt);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(
                (b.x - cX) * BLOCK_SIZE,
                b.y * BLOCK_SIZE + BLOCK_SIZE * 0.5,
                (b.z - cZ) * BLOCK_SIZE
            );
            if (bt.shape === "torus" || bt.shape === "spring") mesh.rotation.x = Math.PI / 2;
            mesh.castShadow = true;
            boatGrp.add(mesh);
        }
    } else {
        // Fallback: simple randomized boat
        const numBlocks = 3 + Math.floor(Math.random() * 6);
        const boatWidth = 2 + Math.floor(Math.random() * 3);
        const boatMat = new THREE.MeshStandardMaterial({ color: 0x8B5E3C, roughness: 0.7 });
        const deckMat = new THREE.MeshStandardMaterial({ color: 0xC49A6C, roughness: 0.6 });

        for (let i = 0; i < boatWidth; i++) {
            const geo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
            const m = new THREE.Mesh(geo, i === 0 || i === boatWidth - 1 ? boatMat : deckMat);
            m.position.set(i - boatWidth * 0.5 + 0.5, 0.45, 0);
            m.castShadow = true;
            boatGrp.add(m);
        }
        const extraBlocks = Math.min(numBlocks - boatWidth, 4);
        for (let i = 0; i < extraBlocks; i++) {
            const geo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
            const matChoice = Math.random() > 0.5 ? boatMat : deckMat;
            const m = new THREE.Mesh(geo, matChoice);
            m.position.set(
                Math.floor(Math.random() * boatWidth) - boatWidth * 0.5 + 0.5,
                1.35,
                (Math.random() - 0.5) * 0.5
            );
            m.castShadow = true;
            boatGrp.add(m);
        }
    }

    // Add a small player model on top
    const miniPlayer = createPlayerModel(team.color);
    miniPlayer.group.scale.set(0.5, 0.5, 0.5);
    const topY = useBuiltBlocks ? (rivalBlocks.reduce((max, b) => Math.max(max, b.y), 0) + 1) * BLOCK_SIZE : 1.2;
    miniPlayer.group.position.set(0, topY, 0);
    boatGrp.add(miniPlayer.group);

    // Floating team-colored name tag
    const tagCanvas = document.createElement("canvas");
    tagCanvas.width = 128;
    tagCanvas.height = 32;
    const tctx = tagCanvas.getContext("2d");
    tctx.fillStyle = "transparent";
    tctx.fillRect(0, 0, 128, 32);
    tctx.font = "bold 18px 'Segoe UI', Arial, sans-serif";
    tctx.textAlign = "center";
    tctx.textBaseline = "middle";
    const hex = "#" + team.color.toString(16).padStart(6, "0");
    tctx.fillStyle = hex;
    tctx.fillText(team.name, 64, 16);
    const tagTex = new THREE.CanvasTexture(tagCanvas);
    const tagMat = new THREE.SpriteMaterial({ map: tagTex, transparent: true });
    const tagSprite = new THREE.Sprite(tagMat);
    tagSprite.scale.set(2.5, 0.6, 1);
    tagSprite.position.set(0, 2.5, 0);
    boatGrp.add(tagSprite);

    // Scale down a bit
    boatGrp.scale.set(0.8, 0.8, 0.8);

    // HP based on what they actually built
    let boatHP = 50 + Math.random() * 50;
    if (useBuiltBlocks) {
        boatHP = 0;
        rivalBlocks.forEach(b => { boatHP += (BLOCK_TYPES[b.type] ? BLOCK_TYPES[b.type].hp : 20); });
    }

    return {
        group: boatGrp,
        teamKey: teamKey,
        isTeammate: isTeammate,
        x: 0, z: 0,
        vx: 0, vz: 0,
        speed: (1.0 + Math.random() * 0.6) * sailSpeed * 10,
        bobPhase: Math.random() * Math.PI * 2,
        alive: true,
        hp: boatHP,
        avoidTimer: 0,
        steerDir: 0,
    };
}

function spawnAIBoats() {
    aiBoats = [];
    if (!playerTeam) return;

    const otherTeams = Object.keys(TEAMS).filter(t => t !== playerTeam);

    // 2 teammates
    for (let i = 0; i < 2; i++) {
        const ai = createAIBoat(playerTeam, true);
        ai.x = -5 - Math.random() * 15;
        ai.z = (i === 0 ? -4 : 4) + (Math.random() - 0.5) * 3;
        ai.group.position.set(ai.x, 0, ai.z);
        scene.add(ai.group);
        aiBoats.push(ai);
    }

    // 3 rivals (from other teams)
    for (let i = 0; i < 3; i++) {
        const rivalTeam = otherTeams[i % otherTeams.length];
        const ai = createAIBoat(rivalTeam, false);
        ai.x = (Math.random() - 0.5) * 20;
        ai.z = (Math.random() - 0.5) * 20;
        ai.speed *= (0.9 + Math.random() * 0.3);
        ai.group.position.set(ai.x, 0, ai.z);
        scene.add(ai.group);
        aiBoats.push(ai);
    }
}

function updateAIBoats(dt) {
    const RIVER_HALF = 13;
    const worldX = -boat.x;

    for (let ai of aiBoats) {
        if (!ai.alive) continue;

        // Move forward
        ai.x += ai.speed * dt;

        // Basic obstacle avoidance
        ai.avoidTimer -= dt;
        let nearestDist = Infinity;
        let nearestObs = null;
        for (let obs of obstacles) {
            if (obs.hit) continue;
            const dx = obs.x - ai.x;
            const dz = obs.z - ai.z;
            const d = Math.sqrt(dx * dx + dz * dz);
            if (d < nearestDist && dx > 0 && dx < 30) {
                nearestDist = d;
                nearestObs = obs;
            }
        }

        if (nearestObs && nearestDist < 8) {
            // Steer away
            const dz = nearestObs.z - ai.z;
            ai.steerDir = dz > 0 ? -1 : 1;
            ai.avoidTimer = 0.5;
        }

        if (ai.avoidTimer > 0) {
            ai.vz += ai.steerDir * 20 * dt;
        } else {
            // Drift back toward center / player lane for teammates
            if (ai.isTeammate) {
                ai.vz += (boat.z - ai.z) * 0.5 * dt;
            } else {
                ai.vz += (0 - ai.z) * 0.3 * dt;
            }
        }

        ai.vz *= 0.95;
        ai.z += ai.vz * dt;

        // Clamp Z
        if (ai.z < -RIVER_HALF) { ai.z = -RIVER_HALF; ai.vz = 0; }
        if (ai.z > RIVER_HALF)  { ai.z = RIVER_HALF;  ai.vz = 0; }

        // Bobbing
        ai.bobPhase += dt * 2.5;
        const bobY = Math.sin(ai.bobPhase) * 0.3;

        // Check collision with obstacles
        for (let obs of obstacles) {
            if (obs.hit) continue;
            const dx = obs.x - ai.x;
            const dz = obs.z - ai.z;
            const d = Math.sqrt(dx * dx + dz * dz);
            if (d < obs.radius + 1.5) {
                obs.hit = true;
                ai.hp -= obs.damage;
                spawnParticles(obs.x + worldX, 1, obs.z, 0xff8800, 6);
                if (ai.hp <= 0) {
                    ai.alive = false;
                    // Sink animation
                    const grp = ai.group;
                    const sinkStart = Date.now();
                    const sinkAnim = () => {
                        const elapsed = (Date.now() - sinkStart) / 1000;
                        grp.position.y -= elapsed * 0.5 * 0.016;
                        grp.rotation.z += 0.02;
                        if (elapsed < 3) requestAnimationFrame(sinkAnim);
                        else scene.remove(grp);
                    };
                    sinkAnim();
                }
                break;
            }
        }

        // Update visual position (relative to world scroll)
        if (ai.alive) {
            ai.group.position.set(ai.x + worldX, bobY, ai.z);
            ai.group.rotation.z = Math.sin(ai.bobPhase * 1.8) * 0.06;
        }

        // AI contributes small amounts to team score over distance
        if (ai.alive && Math.random() < 0.002) {
            teamScores[ai.teamKey] = (teamScores[ai.teamKey] || 0) + 1;
        }
    }
}

function cleanupAIBoats() {
    for (let ai of aiBoats) {
        if (ai.group.parent) ai.group.parent.remove(ai.group);
    }
    aiBoats = [];
}

// ===== TEAM LEADERBOARD =====
function updateTeamLeaderboard() {
    const sorted = Object.keys(TEAMS)
        .map(k => ({ key: k, team: TEAMS[k], score: teamScores[k] || 0 }))
        .sort((a, b) => b.score - a.score);

    const maxScore = Math.max(1, sorted[0].score);

    // HUD leaderboard
    const lbEl = document.getElementById("lb-entries");
    if (lbEl) {
        lbEl.innerHTML = sorted.map(t => {
            const hex = "#" + t.team.color.toString(16).padStart(6, "0");
            const isMe = t.key === playerTeam;
            const pct = Math.max(5, (t.score / maxScore) * 100);
            return `<div class="lb-entry">
                <div class="lb-color" style="background:${hex}"></div>
                <span class="lb-name${isMe ? " my-team" : ""}">${t.team.name.split(" ")[0]}</span>
                <span class="lb-score">${t.score}</span>
            </div>`;
        }).join("");
    }

    // Results leaderboard
    const rLbEl = document.getElementById("results-lb-entries");
    if (rLbEl) {
        rLbEl.innerHTML = sorted.map(t => {
            const hex = "#" + t.team.color.toString(16).padStart(6, "0");
            const isMe = t.key === playerTeam;
            return `<div class="lb-entry">
                <div class="lb-color" style="background:${hex}"></div>
                <span class="lb-name${isMe ? " my-team" : ""}">${t.team.name}</span>
                <span class="lb-score">${t.score}</span>
            </div>`;
        }).join("");
    }
}

// ===== END SAILING =====
function endSailing(won) {
    gameState = "results";
    showTouchControls("none");

    const distBonus = Math.floor(distance / 50);
    const stageBonus = won ? 50 * currentStage : 0;
    const goldEarned = distBonus + stageBonus;

    gold += goldEarned;
    totalGoldEarned += goldEarned;

    // Team scoring
    let teamContribution = 0;
    if (playerTeam) {
        teamContribution = Math.floor(goldEarned * 0.2) + Math.floor(distance / 100);
        teamScores[playerTeam] = (teamScores[playerTeam] || 0) + teamContribution;
    }

    if (won) {
        currentStage++;
        inventory.wood = (inventory.wood || 0) + 10;
        inventory.plank = (inventory.plank || 0) + 5;
    }

    // Cleanup AI boats
    cleanupAIBoats();

    saveGame();

    // Results display
    const titleEl = document.getElementById("results-title");
    titleEl.textContent = won ? "Treasure Found!" : "Boat Destroyed!";
    if (playerTeam) {
        const teamHex = "#" + TEAMS[playerTeam].color.toString(16).padStart(6, "0");
        titleEl.style.color = won ? teamHex : "#ff4444";
    } else {
        titleEl.style.color = won ? "#ffd700" : "#ff4444";
    }
    document.getElementById("results-distance").textContent = "Distance: " + Math.floor(distance) + "m";
    document.getElementById("results-gold").textContent = "Distance Bonus: +" + distBonus + " gold";
    document.getElementById("results-bonus").textContent = won ? "Stage Clear Bonus: +" + stageBonus + " gold" : "Try building a stronger boat!";

    // Team contribution display
    const tcEl = document.getElementById("results-team-contribution");
    const tsEl = document.getElementById("results-team-standings");
    if (playerTeam && tcEl && tsEl) {
        tcEl.style.display = "block";
        tcEl.textContent = "Team contribution: +" + teamContribution + " points for " + TEAMS[playerTeam].name;
        tsEl.style.display = "block";
        updateTeamLeaderboard();
    } else if (tcEl && tsEl) {
        tcEl.style.display = "none";
        tsEl.style.display = "none";
    }

    document.getElementById("results-overlay").style.display = "flex";
    document.getElementById("distance-bar-container").style.display = "none";
}

// ===== CHAT SYSTEM =====
function addChatMessage(name, text, teamKey, isSystem) {
    const container = document.getElementById("chat-messages");
    if (!container) return;

    const div = document.createElement("div");
    div.className = "chat-msg" + (isSystem ? " system" : "");

    if (isSystem) {
        div.textContent = text;
    } else {
        const nameSpan = document.createElement("span");
        nameSpan.className = "chat-name";
        if (teamKey && TEAMS[teamKey]) {
            nameSpan.style.color = "#" + TEAMS[teamKey].color.toString(16).padStart(6, "0");
        } else {
            nameSpan.style.color = "#aab";
        }
        nameSpan.textContent = name + ":";
        div.appendChild(nameSpan);
        div.appendChild(document.createTextNode(" " + text));
    }

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;

    // Track for fading
    chatMessages.push({ el: div, time: Date.now() });

    // Limit to 50 messages in DOM
    while (container.children.length > 50) {
        container.removeChild(container.children[0]);
    }
}

function updateChat(dt) {
    // Fade old messages
    const now = Date.now();
    for (let msg of chatMessages) {
        if (now - msg.time > 12000 && !msg.faded) {
            msg.el.classList.add("fading");
            msg.faded = true;
        }
    }

    // Bot chat messages
    chatBotTimer -= dt;
    if (chatBotTimer <= 0) {
        chatBotTimer = 3 + Math.random() * 8;
        sendBotChat();
    }
}

function sendBotChat() {
    // Pick a random bot or a random name
    let botName, botTeam;
    if (buildBots.length > 0 && gameState === "building") {
        const bot = buildBots[Math.floor(Math.random() * buildBots.length)];
        botName = bot.name;
        botTeam = bot.teamKey;
    } else {
        botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        const teamKeys = Object.keys(TEAMS);
        botTeam = teamKeys[Math.floor(Math.random() * teamKeys.length)];
    }

    let pool;
    if (gameState === "sailing" || gameState === "launching") {
        pool = BOT_CHAT_MESSAGES.sailing;
    } else if (Math.random() < 0.2) {
        pool = BOT_CHAT_MESSAGES.react;
    } else {
        pool = BOT_CHAT_MESSAGES.idle;
    }

    const msg = pool[Math.floor(Math.random() * pool.length)];
    addChatMessage(botName, msg, botTeam);
}

function sendPlayerChat() {
    const input = document.getElementById("chat-input");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    addChatMessage(playerChatName, text, playerTeam);
    input.value = "";
    input.blur();
    chatInputFocused = false;

    // Chance for a bot to react
    if (Math.random() < 0.5) {
        setTimeout(() => {
            let botName, botTeam;
            if (buildBots.length > 0) {
                const bot = buildBots[Math.floor(Math.random() * buildBots.length)];
                botName = bot.name;
                botTeam = bot.teamKey;
            } else {
                botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
                const teamKeys = Object.keys(TEAMS);
                botTeam = teamKeys[Math.floor(Math.random() * teamKeys.length)];
            }
            const react = BOT_CHAT_MESSAGES.react[Math.floor(Math.random() * BOT_CHAT_MESSAGES.react.length)];
            addChatMessage(botName, react, botTeam);
        }, 800 + Math.random() * 2000);
    }
}

function initChat() {
    const input = document.getElementById("chat-input");
    if (!input) return;

    input.addEventListener("focus", () => {
        chatInputFocused = true;
    });
    input.addEventListener("blur", () => {
        chatInputFocused = false;
    });
    input.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key === "Enter") {
            sendPlayerChat();
        }
        if (e.key === "Escape") {
            input.blur();
            chatInputFocused = false;
        }
    });

    // "/" key to focus chat (only when not already in input)
    document.addEventListener("keydown", (e) => {
        if (e.key === "/" && !chatInputFocused && document.activeElement !== input) {
            e.preventDefault();
            input.focus();
        }
    });
}

// ===== TOUCH CONTROLS =====
function initTouchControls() {
    // Virtual Joystick
    const joystickZone = document.getElementById("joystick-zone");
    if (!joystickZone) return;

    joystickZone.addEventListener("touchstart", (e) => {
        e.preventDefault();
        const touch = e.changedTouches[0];
        const rect = document.getElementById("joystick-base").getBoundingClientRect();
        touchJoystick.active = true;
        touchJoystick.touchId = touch.identifier;
        touchJoystick.startX = rect.left + rect.width / 2;
        touchJoystick.startY = rect.top + rect.height / 2;
        touchJoystick.dx = 0;
        touchJoystick.dy = 0;
    }, { passive: false });

    joystickZone.addEventListener("touchmove", (e) => {
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            if (touch.identifier === touchJoystick.touchId) {
                const maxRadius = 45;
                let dx = touch.clientX - touchJoystick.startX;
                let dy = touch.clientY - touchJoystick.startY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > maxRadius) {
                    dx = (dx / dist) * maxRadius;
                    dy = (dy / dist) * maxRadius;
                }
                touchJoystick.dx = dx / maxRadius; // -1 to 1
                touchJoystick.dy = dy / maxRadius;

                // Move thumb visually
                const thumb = document.getElementById("joystick-thumb");
                thumb.style.transform = `translate(${dx}px, ${dy}px)`;
            }
        }
    }, { passive: false });

    const resetJoystick = (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === touchJoystick.touchId) {
                touchJoystick.active = false;
                touchJoystick.dx = 0;
                touchJoystick.dy = 0;
                touchJoystick.touchId = null;
                const thumb = document.getElementById("joystick-thumb");
                thumb.style.transform = "translate(0px, 0px)";
            }
        }
    };

    joystickZone.addEventListener("touchend", resetJoystick, { passive: false });
    joystickZone.addEventListener("touchcancel", resetJoystick, { passive: false });

    // Action Buttons - using touchstart/touchend for held buttons
    setupTouchButton("touch-jump-btn", (down) => { touchJump = down; });
    setupTouchButton("touch-remove-btn", (down) => {
        touchRemove = down;
        const btn = document.getElementById("touch-remove-btn");
        if (btn) {
            if (down) {
                btn.style.background = "rgba(231, 76, 60, 0.7)";
                btn.style.boxShadow = "0 0 20px rgba(231, 76, 60, 0.5)";
                btn.textContent = "REMOVING...";
            } else {
                btn.style.background = "";
                btn.style.boxShadow = "";
                btn.textContent = "REMOVE";
            }
        }
    });
    setupTouchButton("touch-accel-btn", (down) => { touchAccel = down; });
    setupTouchButton("touch-brake-btn", (down) => { touchBrake = down; });

    // Sail button is a single tap
    const sailBtn = document.getElementById("touch-sail-btn");
    if (sailBtn) {
        sailBtn.addEventListener("touchstart", (e) => {
            e.preventDefault();
            startSailing();
        }, { passive: false });
    }
}

function setupTouchButton(id, callback) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        callback(true);
    }, { passive: false });
    btn.addEventListener("touchend", (e) => {
        e.preventDefault();
        callback(false);
    }, { passive: false });
    btn.addEventListener("touchcancel", (e) => {
        callback(false);
    }, { passive: false });
}

// Touch tap on renderer - for placing/removing blocks via tap
let lastTouchPos = null;
let touchMoved = false;

function onTouchTap(e) {
    if (inputMethod !== "touchscreen") return;
    if (gameState !== "building") return;
    e.preventDefault();

    const touch = e.changedTouches[0];
    lastTouchPos = { x: touch.clientX, y: touch.clientY };
    touchMoved = false;
}

function onTouchTapMove(e) {
    if (inputMethod !== "touchscreen") return;
    if (gameState !== "building") return;
    e.preventDefault();

    if (lastTouchPos) {
        const touch = e.changedTouches[0];
        const dx = touch.clientX - lastTouchPos.x;
        const dy = touch.clientY - lastTouchPos.y;
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
            touchMoved = true;
        }
    }
}

function onTouchTapEnd(e) {
    if (inputMethod !== "touchscreen") return;
    if (gameState !== "building") return;
    e.preventDefault();

    if (!touchMoved && lastTouchPos) {
        const touch = e.changedTouches[0];
        // Simulate a click for block placement
        const container = document.getElementById("renderer-container");
        const rect = container.getBoundingClientRect();
        mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, buildCamera);

        if (touchRemove) {
            // Remove mode
            const blockIntersects = raycaster.intersectObjects(buildBlockMeshes);
            if (blockIntersects.length > 0) {
                const ud = blockIntersects[0].object.userData;
                if (ud.isPlacedBlock) {
                    const blockType = getBlock(ud.gx, ud.gy, ud.gz);
                    if (blockType) {
                        setBlock(ud.gx, ud.gy, ud.gz, null);
                        inventory[blockType] = (inventory[blockType] || 0) + 1;
                        refreshBuildBlocks();
                        renderBlockList();
                    }
                }
            }
        } else {
            // Check launch button
            if (launchButtonGroup) {
                const btnHits = raycaster.intersectObjects(launchButtonGroup.children, true);
                if (btnHits.length > 0) {
                    startSailing();
                    lastTouchPos = null;
                    return;
                }
            }
            // Place mode
            const targets = [...buildBaseMeshes, ...buildBlockMeshes];
            const intersects = raycaster.intersectObjects(targets);
            if (intersects.length > 0) {
                const pos = getPlacePosition(intersects[0]);
                if (!pos) { lastTouchPos = null; return; }
                if (pos.y < 0) { lastTouchPos = null; return; }
                if (getBlock(pos.x, pos.y, pos.z)) { lastTouchPos = null; return; }
                if (!unlockedBlocks[selectedBlock] && !BLOCK_TYPES[selectedBlock].unlocked) { lastTouchPos = null; return; }
                if ((inventory[selectedBlock] || 0) <= 0) {
                    showMessage("No " + BLOCK_TYPES[selectedBlock].name + " left!");
                    lastTouchPos = null;
                    return;
                }
                setBlock(pos.x, pos.y, pos.z, selectedBlock);
                inventory[selectedBlock]--;
                refreshBuildBlocks();
                renderBlockList();
            }
        }
    }
    lastTouchPos = null;
    touchMoved = false;
}

function showTouchControls(mode) {
    if (inputMethod !== "touchscreen") return;
    const controls = document.getElementById("touch-controls");
    const buildActions = document.getElementById("touch-build-actions");
    const sailControls = document.getElementById("touch-sail-controls");
    const jumpBtn = document.getElementById("touch-jump-btn");

    if (mode === "building") {
        controls.style.display = "block";
        buildActions.style.display = "flex";
        sailControls.style.display = "none";
        jumpBtn.style.display = "flex";
    } else if (mode === "sailing") {
        controls.style.display = "block";
        buildActions.style.display = "none";
        sailControls.style.display = "flex";
        jumpBtn.style.display = "none";
    } else {
        controls.style.display = "none";
    }
}

// ===== GAME LOOP =====
let lastTime = 0;
let keysDown = {};

function gameLoop(timestamp) {
    const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;

    if (gameState === "building") {
        // === PLAYER MOVEMENT IN BUILD MODE ===
        let moveX = 0, moveZ = 0;
        if (keysDown["w"] || keysDown["W"] || keysDown["ArrowUp"]) moveZ = -1;
        if (keysDown["s"] || keysDown["S"] || keysDown["ArrowDown"]) moveZ = 1;
        if (keysDown["a"] || keysDown["A"] || keysDown["ArrowLeft"]) moveX = -1;
        if (keysDown["d"] || keysDown["D"] || keysDown["ArrowRight"]) moveX = 1;

        // Touch joystick input
        if (touchJoystick.active) {
            moveX = touchJoystick.dx;
            moveZ = touchJoystick.dy;
        }

        const isMoving = Math.abs(moveX) > 0.1 || Math.abs(moveZ) > 0.1;
        if (isMoving) {
            // Normalize diagonal but preserve analog magnitude from joystick
            const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
            const magnitude = Math.min(len, 1); // clamp to 1
            moveX /= len;
            moveZ /= len;

            player.x += moveX * player.speed * magnitude * dt;
            player.z += moveZ * player.speed * magnitude * dt;

            // Face movement direction
            player.rotation = Math.atan2(moveX, moveZ);

            // Clamp to build area (with some extra room for launch button)
            player.x = Math.max(-2, Math.min(GRID_COLS + 7, player.x));
            player.z = Math.max(-2, Math.min(GRID_ROWS + 3, player.z));
        }

        // Jump
        if ((keysDown[" "] || keysDown["Space"] || touchJump) && player.grounded) {
            player.vy = 5;
            player.grounded = false;
        }
        player.vy -= 15 * dt; // gravity
        player.y += player.vy * dt;
        if (player.y <= 0.0) {
            player.y = 0.0;
            player.vy = 0;
            player.grounded = true;
        }

        // Update player model position
        if (playerBuildGroup) {
            playerBuildGroup.position.set(player.x, player.y, player.z);
            playerBuildGroup.rotation.y = player.rotation;
        }

        // Animate walk/idle
        animatePlayer(dt, isMoving);

        // Update NPC bots
        updateBuildBots(dt);

        // Camera follows player (third-person over-shoulder)
        const camOffX = -Math.sin(player.rotation) * 6;
        const camOffZ = -Math.cos(player.rotation) * 6;
        const targetCamPos = new THREE.Vector3(
            player.x + camOffX,
            player.y + 5,
            player.z + camOffZ
        );
        buildCamera.position.lerp(targetCamPos, dt * 5);
        const lookTarget = new THREE.Vector3(player.x, player.y + 1.2, player.z);
        buildCamera.lookAt(lookTarget);

        // Animate launch button pulse
        launchPulseTime += dt;
        if (launchButtonMesh) {
            const pulse = Math.sin(launchPulseTime * 3) * 0.5 + 0.5;
            const baseIntensity = launchButtonHovered ? 0.8 : 0.3;
            const pulseAmount = launchButtonHovered ? 0.5 : 0.25;
            launchButtonMesh.material.emissiveIntensity = baseIntensity + pulse * pulseAmount;

            const hoverScale = launchButtonHovered ? 1.08 + Math.sin(launchPulseTime * 6) * 0.04 : 1;
            launchButtonMesh.scale.set(hoverScale, 1, hoverScale);

            if (launchButtonHovered) {
                launchButtonMesh.material.color.setHex(0x33ff66);
                launchButtonMesh.material.emissive.setHex(0x33ff66);
            } else {
                launchButtonMesh.material.color.setHex(0x22cc44);
                launchButtonMesh.material.emissive.setHex(0x22cc44);
            }
        }

        if (launchButtonGroup) {
            launchButtonGroup.position.y = Math.sin(launchPulseTime * 1.5) * 0.1;
        }

        renderer.render(buildScene, buildCamera);
    } else if (gameState === "launching") {
        updateLaunch(dt);
    } else if (gameState === "sailing") {
        updateSailing(dt);
        spawnWaterSplash(dt);
        renderer.render(scene, camera);
    } else if (gameState === "results") {
        // Keep rendering the last scene
        if (scene && camera) renderer.render(scene, camera);
    }

    updateHUD();
    if (gameState !== "title") updateChat(dt);
    requestAnimationFrame(gameLoop);
}

// ===== TITLE SCREEN BG (simple animated canvas) =====
function initTitleBG() {
    const c = document.getElementById("title-bg-canvas");
    if (!c) return;
    const ctx = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * c.width,
            y: Math.random() * c.height,
            r: 1 + Math.random() * 2,
            vx: (Math.random() - 0.5) * 0.5,
            vy: -0.3 - Math.random() * 0.5,
            alpha: 0.2 + Math.random() * 0.5,
        });
    }

    function drawTitleBG() {
        if (gameState !== "title") return;
        ctx.clearRect(0, 0, c.width, c.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(30, 144, 255, ${p.alpha})`;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.y < -5) { p.y = c.height + 5; p.x = Math.random() * c.width; }
        });
        requestAnimationFrame(drawTitleBG);
    }
    drawTitleBG();
}

// ===== START =====
window.addEventListener("load", () => {
    initTitleBG();
    init();
});
