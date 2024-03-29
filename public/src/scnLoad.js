export default class ScnLoad extends Phaser.Scene {

    constructor() {
        super("ScnLoad");
        this.loadTxt = null;
    }

    preload(){
        this.cameras.main.setBackgroundColor(0x000000);
        this.cameras.main.setScroll(-this.game.config.width * 0.5, -this.game.config.height * 0.5);

        this.load.setBaseURL("./assets/");

        //dialogues
        this.load.json("diaMisterTutorial00", "jsons/story/diaMisterTutorial00.json");
        this.load.json("diaDreamBeggar01", "jsons/story/diaDreamBeggar01.json");
        this.load.json("diaDreamBarbara00", "jsons/story/diaDreamBarbara00.json");
        this.load.json("diaDreamBarbara01", "jsons/story/diaDreamBarbara01.json");
        this.load.json("diaHangarMechanic00", "jsons/story/diaHangarMechanic00.json");
        this.load.json("diaInfogrunts00", "jsons/story/diaInfogrunts00.json");

        //models
        this.load.json("modDebugTile", "jsons/models/debugTile.json");
        this.load.json("modDebugWallTest", "jsons/models/debugWallTest.json");

        this.load.json("modSchiffchen", "jsons/models/modSchiffchen.json");
        this.load.json("modGraswater", "jsons/models/modGraswater.json");
        this.load.json("modTower", "jsons/models/modTower.json");
        //HANGAR
        this.load.json("modElevatorBase", "jsons/models/elevatorBase.json");
        this.load.json("modElevatorButton", "jsons/models/elevatorButton.json");
        this.load.json("modElevatorDoor", "jsons/models/elevatorDoor.json");
        this.load.json("modHangarHallway", "jsons/models/hangarHallway.json");
        this.load.json("modHangarComputer", "jsons/models/hangarComputer.json");
        this.load.json("modHangarMain", "jsons/models/hangarMain.json");
        //METRO
        this.load.json("modMetroHallwayT", "jsons/models/dream/metroHallwayT.json");
        this.load.json("modMetroPlatform", "jsons/models/dream/metroPlatform.json");
        this.load.json("modMetroPlatformToHallway", "jsons/models/dream/metroPlatformToHallway.json");
        this.load.json("modMetroPlatform01", "jsons/models/dream/metroPlatform01.json");
        this.load.json("modMetroTunnel", "jsons/models/dream/metroTunnel.json");
        this.load.json("modMetroTunnelEntry", "jsons/models/dream/metroTunnelEntry.json");
        this.load.json("modMetroCarriage", "jsons/models/dream/metroCarriage.json");
        this.load.json("modMetroCarriageOutside", "jsons/models/dream/metroCarriageOutside.json");
        this.load.json("modMetroCarriageEnd", "jsons/models/dream/metroCarriageEnd.json");
        this.load.json("modMetroCarriageControls", "jsons/models/dream/metroCarriageControls.json");
        this.load.json("modMetroStairCarriageTransition", "jsons/models/dream/metroStairCarriageTransition.json");
        //MARKETSQUARE
        this.load.json("modElevatorRoom", "jsons/models/marketsquare/elevatorRoom.json");
        this.load.json("modMarketStaircase", "jsons/models/marketsquare/marketStaircase.json");
        this.load.json("modMarketsquareApartements", "jsons/models/marketsquare/marketsquareApartements.json");
        this.load.json("modPlayerApartement", "jsons/models/marketsquare/playerApartement.json");
        this.load.json("modLounge", "jsons/models/marketsquare/lounge.json");
        //OFFICE
        this.load.json("modOfficeRoom","jsons/models/office/officeRoom.json");
        //SHIPS
        this.load.json("modShipHamptonAegis", "jsons/models/ships/shipHamptonAegis.json");
        this.load.json("modShipArashiDart", "jsons/models/ships/shipArashiDart.json");
        this.load.json("modShipFormulaE", "jsons/models/ships/shipFormulaE.json");
        this.load.json("modShipFormulaOne", "jsons/models/ships/shipFormulaOne.json");
        //MISC
        this.load.json("modDreamBloodLine", "jsons/models/dreamBloodLine.json");
        this.load.json("modSmoke", "jsons/models/smoke.json");
        this.load.json("modDreamDoor", "jsons/models/dreamDoor.json");
        this.load.json("modDreamDoorFrame", "jsons/models/dreamDoorFrame.json");
        this.load.json("modDreamRoom", "jsons/models/dreamRoom.json");
        this.load.json("modTriggerWall1x1", "jsons/models/triggerWall1x1.json");
        this.load.json("modTrigger1x1", "jsons/models/trigger1x1.json");
        this.load.json("modTrigger64x64", "jsons/models/trigger64x64.json");
        this.load.json("modPowerGeneratorTurbine", "jsons/models/powerGeneratorTurbine.json");
        this.load.json("modChefsessel", "jsons/models/objChefsessel.json");
        this.load.json("modTschechowGun", "jsons/models/objTschechowGun.json");
        this.load.json("modTree00", "jsons/models/tree00.json");
        //CHARACTERS
        this.load.json("modCharacterEngineer", "jsons/models/characterEngineer.json");
        this.load.json("modCharacterBeggar", "jsons/models/characterBeggar.json");
        this.load.json("modCharacterStBarbara", "jsons/models/characterStBarbara.json");
        this.load.json("modCharacterRoomba", "jsons/models/characterRoomba.json");
        this.load.json("modCharacterPaul", "jsons/models/characterPaulTest.json");
        this.load.json("modCharacterTurnaroundTest", "jsons/models/characterTurnaroundTest.json");
        this.load.json("modCharacterTurnaroundLara", "jsons/models/characterTurnaroundLara.json");
        this.load.json("modCharacterTurnaroundMoritz", "jsons/models/characterTurnaroundMoritz.json");
        

        //3dtex
        this.load.image("texElevatorWall00", "sprites/3dTextures/texElevatorWall00.png");
        this.load.image("texElevatorWall01", "sprites/3dTextures/texElevatorWall01.png");
        this.load.image("texElevatorWall02", "sprites/3dTextures/texElevatorWall02.png");
        this.load.image("texElevatorDoor00", "sprites/3dTextures/texElevatorDoor00.png");
        this.load.image("texElevatorDoor01", "sprites/3dTextures/texElevatorDoor01.png");
        this.load.image("texElevatorButtonPanel00", "sprites/3dTextures/texElevatorButtonPanel00.png");
        this.load.image("texMetalDark00", "sprites/3dTextures/texMetalDark00.png");
        this.load.image("texMetalDark01", "sprites/3dTextures/texMetalDark01.png");
        this.load.image("texMetalDark02", "sprites/3dTextures/texMetalDark02.png");
        this.load.image("texMetalDark03", "sprites/3dTextures/texMetalDark03.png");
        this.load.image("texMetalDark04", "sprites/3dTextures/texMetalDark04.png");
        this.load.image("texElevatorLight00", "sprites/3dTextures/texElevatorLight00.png");
        this.load.image("texElevatorLight01", "sprites/3dTextures/texElevatorLight01.png");
        this.load.image("texAirVentRotor00", "sprites/3dTextures/texAirVentRotor00.png");
        this.load.image("texTrasseYellow00", "sprites/3dTextures/texTrasseYellow00.png");
        this.load.image("texTrasseYellow01", "sprites/3dTextures/texTrasseYellow01.png");

        this.load.image("texMetalHangar00", "sprites/3dTextures/texMetalHangar00.png");
        this.load.image("texMetalHangar01", "sprites/3dTextures/texMetalHangar01.png");
        this.load.image("texMetalHangar02", "sprites/3dTextures/texMetalHangar02.png");
        this.load.image("texMetalHangar03", "sprites/3dTextures/texMetalHangar03.png");
        this.load.image("texMetalHangar04", "sprites/3dTextures/texMetalHangar04.png");
        this.load.image("texMetalHangar05", "sprites/3dTextures/texMetalHangar05.png");
        this.load.image("texMetalHangar06", "sprites/3dTextures/texMetalHangar06.png");
        this.load.image("texMetalHangar07", "sprites/3dTextures/texMetalHangar07.png");
        this.load.image("texMetalHangar08", "sprites/3dTextures/texMetalHangar08.png");
        this.load.image("texMetalHangar09", "sprites/3dTextures/texMetalHangar09.png");
        this.load.image("texMetalHangar10", "sprites/3dTextures/texMetalHangar10.png");
        this.load.image("texMetalHangarLineEnd", "sprites/3dTextures/texMetalHangarLineEnd.png");
        this.load.image("texMetalHangarLineStraight", "sprites/3dTextures/texMetalHangarLineStraight.png");
        this.load.image("texMetalHangarLineCurve", "sprites/3dTextures/texMetalHangarLineCurve.png");
        this.load.image("texMetalHangarLineT", "sprites/3dTextures/texMetalHangarLineT.png");

        this.load.image("texPlatingYellow00", "sprites/3dTextures/texPlatingYellow00.png");
        this.load.image("texPlatingYellow01", "sprites/3dTextures/texPlatingYellow01.png");

        this.load.image("texPlatingRed00", "sprites/3dTextures/texPlatingRed00.png");
        this.load.image("texPlatingRed01", "sprites/3dTextures/texPlatingRed01.png");
        this.load.image("texPlatingRed02", "sprites/3dTextures/texPlatingRed02.png");
        this.load.image("texPlatingRed03", "sprites/3dTextures/texPlatingRed03.png");
        this.load.image("texPlatingRed04", "sprites/3dTextures/texPlatingRed04.png");
        this.load.image("texPlatingRed05", "sprites/3dTextures/texPlatingRed05.png");
        this.load.image("texPlatingRed06", "sprites/3dTextures/texPlatingRed06.png");
        this.load.image("texPlatingRed07", "sprites/3dTextures/texPlatingRed07.png");
        this.load.image("texPlatingRed08", "sprites/3dTextures/texPlatingRed08.png");
        this.load.image("texPlatingRed09", "sprites/3dTextures/texPlatingRed09.png");

        this.load.image("texGlass00", "sprites/3dTextures/texGlass00.png");
        this.load.image("texGlass01", "sprites/3dTextures/texGlass01.png");
        this.load.image("texGlass02", "sprites/3dTextures/texGlass02.png");
        this.load.image("texGrating00", "sprites/3dTextures/texGrating00.png");
        this.load.image("texGrating01", "sprites/3dTextures/texGrating01.png");
        this.load.image("texGrating02", "sprites/3dTextures/texGrating02.png");
        this.load.image("texPadding00", "sprites/3dTextures/texPadding00.png");
        this.load.image("texPadding01", "sprites/3dTextures/texPadding01.png");
        this.load.image("texPadding02", "sprites/3dTextures/texPadding02.png");
        this.load.image("texDoorBars00", "sprites/3dTextures/texDoorBars00.png");
        this.load.image("texKitchenTile00", "sprites/3dTextures/texKitchenTile00.png");
        this.load.image("texKitchenTile01", "sprites/3dTextures/texKitchenTile01.png");
        this.load.image("texKitchenTile02", "sprites/3dTextures/texKitchenTile02.png");

        this.load.image("texPainting16x16Dart", "sprites/3dTextures/texPainting16x16Dart00.png");
        this.load.image("texSegStartTunnel00", "sprites/segmentsSingles/sprSegStartTunnel00.png");
        this.load.image("texSegStartTunnel02", "sprites/segmentsSingles/sprSegStartTunnel02.png");
        this.load.image("texSmokeWhite", "sprites/3dTextures/texSmokeWhite.png");
        this.load.image("texGlowSquareWhite", "sprites/3dTextures/texGlowSquareWhite00.png");
        this.load.image("texDoor00", "sprites/3dTextures/texDoor00.png");
        this.load.image("texPCKeyboard00", "sprites/3dTextures/texPCKeyboard00.png");
        this.load.image("texPCMonitor00", "sprites/3dTextures/texPCMonitor00.png");
        this.load.image("texPCMonitor01", "sprites/3dTextures/texPCMonitor01.png");
        this.load.image("texPCMonitorSide00", "sprites/3dTextures/texPCMonitorSide00.png");
        this.load.image("texPCMonitorSide01", "sprites/3dTextures/texPCMonitorSide01.png");
        this.load.image("texBlackout", "sprites/3dTextures/texBlackout.png");

        this.load.image("texBloodLineEnd", "sprites/3dTextures/texBloodLineEnd.png");
        this.load.image("texBloodLineStraight00", "sprites/3dTextures/texBloodLineStraight00.png");
        this.load.image("texBloodLineStraight01", "sprites/3dTextures/texBloodLineStraight01.png");
        this.load.image("texBloodLineCurve00", "sprites/3dTextures/texBloodLineCurve00.png");
        this.load.image("texBloodLineCurve01", "sprites/3dTextures/texBloodLineCurve01.png");
        this.load.image("texBloodLineCross00", "sprites/3dTextures/texBloodLineCross00.png");

        this.load.image("texSky00", "sprites/3dTextures/texSky00.png");  
        this.load.image("texGrass00", "sprites/3dTextures/texGrass00.png");
        this.load.image("texGrass01", "sprites/3dTextures/texGrass01.png");
        this.load.image("texBush00", "sprites/3dTextures/texBush00.png");
        this.load.image("texTree00", "sprites/3dTextures/texTree00_00.png");
        this.load.image("texTree01", "sprites/3dTextures/texTree00_01.png");
        this.load.image("texTree02", "sprites/3dTextures/texTree01_00.png");
        this.load.image("texTree03", "sprites/3dTextures/texTree01_01.png");
        this.load.image("texDesert00", "sprites/3dTextures/texDesert00.png");
        this.load.image("texDesert01", "sprites/3dTextures/texDesert01.png");

        this.load.image("texMetroCarriageWallDoor00", "sprites/3dTextures/texMetroCarriageWallDoor00.png");
        this.load.image("texMetroCarriageWallWindow00", "sprites/3dTextures/texMetroCarriageWallWindow00.png");
        this.load.image("texMetroCarriageWall00", "sprites/3dTextures/texMetroCarriageWall00.png");
        this.load.image("texMetroCarriageFloor00", "sprites/3dTextures/texMetroCarriageFloor00.png");

        this.load.image("texMetroPlatformWall00", "sprites/3dTextures/texMetroPlatformWall00.png");
        this.load.image("texMetroPlatformWall01", "sprites/3dTextures/texMetroPlatformWall01.png");
        this.load.image("texMetroPlatformWall02", "sprites/3dTextures/texMetroPlatformWall02.png");
        this.load.image("texMetroPlatformWall03", "sprites/3dTextures/texMetroPlatformWall03.png");
        this.load.image("texMetroPlatformWall04", "sprites/3dTextures/texMetroPlatformWall04.png");
        this.load.image("texMetroPlatformWall05", "sprites/3dTextures/texMetroPlatformWall05.png");
        this.load.image("texMetroPlatformWallName00", "sprites/3dTextures/texMetroPlatformWallName00.png");
        this.load.image("texMetroPlatformWallName01", "sprites/3dTextures/texMetroPlatformWallName01.png");
        this.load.image("texMetroPlatformWallName02", "sprites/3dTextures/texMetroPlatformWallName02.png");
        this.load.image("texMetroPlatformFloor00", "sprites/3dTextures/texMetroPlatformFloor00.png");
        this.load.image("texMetroPlatformFloor01", "sprites/3dTextures/texMetroPlatformFloor01.png");
        this.load.image("texMetroPlatformSteel00", "sprites/3dTextures/texMetroPlatformSteel00.png");
        this.load.image("texMetroPlatformSteel01", "sprites/3dTextures/texMetroPlatformSteel01.png");
        this.load.image("texMetroPlatformGarbageTop00", "sprites/3dTextures/texMetroPlatformGarbageTop00.png"); 

        this.load.image("texMetroTunnelRails00", "sprites/3dTextures/texMetroTunnelRails00.png");
        this.load.image("texMetroTunnelRails01", "sprites/3dTextures/texMetroTunnelRails01.png");
        this.load.image("texMetroTunnelRails02", "sprites/3dTextures/texMetroTunnelRails02.png");

        this.load.image("texBuildingWall00", "sprites/3dTextures/texBuildingWall00.png");
        this.load.image("texBuildingWall01", "sprites/3dTextures/texBuildingWall01.png");
        this.load.image("texBuildingWall02", "sprites/3dTextures/texBuildingWall02.png");
        this.load.image("texBuildingWall03", "sprites/3dTextures/texBuildingWall03.png");
        this.load.image("texBuildingWall04", "sprites/3dTextures/texBuildingWall04.png");
        this.load.image("texWallGrind01", "sprites/3dTextures/texWallGrind01.png");
        this.load.image("texWallGrind02", "sprites/3dTextures/texWallGrind02.png");
        this.load.image("texWallGrind03", "sprites/3dTextures/texWallGrind03.png");
        this.load.image("texWallGrind04", "sprites/3dTextures/texWallGrind04.png");
        this.load.image("texWallGrind05", "sprites/3dTextures/texWallGrind05.png");
        this.load.image("texWallGrind06", "sprites/3dTextures/texWallGrind06.png");
        this.load.image("texContainerBlueDoor00", "sprites/3dTextures/texContainerBlueDoor00.png");
        this.load.image("texContainerBrownDoor00", "sprites/3dTextures/texContainerBrownDoor00.png");

        this.load.image("texAdvertNutricubes00", "sprites/clutter/sprAdvertNutricubes00.png");

        //characters
        this.load.image("PaulM_smallBrown", "raw/SebiM_lores00.png");
        this.load.image("PaulM_smallDog", "raw/PaulM_lores01.png");
        this.load.image("PaulM_smallGreenn", "raw/PaulM_smallGreenn01.png");
        this.load.image("mechanic", "sprites/characters/wheelchairMechanic.png");
        this.load.image("texCharBeggar", "sprites/characters/beggar.png");
        this.load.image("texCharBarbara", "sprites/characters/hlBarabara.png");
        this.load.image("texCharRoomba","sprites/characters/roomba.png");
        this.load.image("texCharPaulTest","sprites/characters/paulTest00.png");
        this.load.spritesheet("turnaroundHumansheet00", "sprites/characters/turnaroundHumansheet00.png", { frameWidth: 46, frameHeight: 128 });
        this.load.spritesheet("turnaroundPaulsheet00", "sprites/characters/turnaroundPaulsheet00.png", { frameWidth: 101, frameHeight: 128 });
        this.load.spritesheet("turnaroundLarasheet00", "sprites/characters/turnaroundLarasheet00.png", { frameWidth: 57, frameHeight: 120 });
        this.load.spritesheet("turnaroundMoritzsheet00", "sprites/characters/turnaroundMoritzsheet00.png", { frameWidth: 46, frameHeight: 128 });

        this.load.image("portraitMoritz00", "sprites/characters/portraitMoritz00.png");
        this.load.image("portraitLara00", "sprites/characters/portraitLara00.png");
        

        this.load.image("texObjChefsessel","sprites/objects/chefsessel00.png");
        this.load.image("texObjTschechowGun","sprites/objects/tschechowGun00.png");
        

        //this.load.image('image0', '0.png');
        //this.load.json("story1", "storyjson/story1.json");
        //this.load.text("locDE", "languageData/deutsch.txt");
        //this.load.audio('decisionLeft', 'audio/decision.wav');
        //this.load.atlas("tilesGrass", "sprites/tiles/grassDirt.png", "sprites/tiles/tilesGround_atlas.json");

        this.load.image("sprBtn00", "sprites/sprBtn00.png");
        this.load.image("sprBtnSlider00", "sprites/sprBtnSlider00.png");
        this.load.image("sprSliderLeft00", "sprites/sprSliderLeft00.png");
        this.load.image("sprSliderRight00", "sprites/sprSliderRight00.png");
        this.load.image("sprSliderHighlight00", "sprites/sprSliderHighlight00.png");
        
        this.load.image("sprUiCrosshairUse", "sprites/sprUiCrosshairUse.png");
        this.load.image("sprUiCrosshairDot", "sprites/sprUiCrosshairDot.png");
        this.load.image("sprUiMenuBg", "sprites/sprUiMenuBg.png");
        this.load.image("sprUiBit", "sprites/sprUiBit.png");
        this.load.image("sprUiCircle", "sprites/sprUiCircle.png");
        this.load.image("sprUiRoll", "sprites/sprUiRoll.png");
        this.load.image("sprUiSpawnerRoll", "sprites/sprUiSpawnerRoll.png");
        this.load.image("sprUiShortWrap", "sprites/sprUiShortWrap.png");
        this.load.image("sprUiTextWrap", "sprites/sprUiTextWrap.png");
        this.load.image("sprUiTrackLine", "sprites/sprUiTrackLine.png");
        this.load.image("sprUiTrackLinePlayer", "sprites/sprUiTrackLinePlayer.png");
        this.load.image("sprUiTrackLineBike", "sprites/sprUiTrackLineBike.png");
        this.load.image("sprUiFullscreen", "sprites/sprUiFullscreen.png");
        this.load.image("sprUiMenu", "sprites/sprUiMenu.png");
        this.load.image("sprUiScore", "sprites/sprUiScore.png");
        this.load.image("sprUiTunnelTarget03Hor", "sprites/sprUiTunnelTarget03Hor.png");
        this.load.image("sprUiTunnelTarget03Ver", "sprites/sprUiTunnelTarget03Ver.png");

        this.load.image("sprStoryPolitics00", "sprites/story/storyPolitics00.png");
        this.load.image("sprStoryLoop00", "sprites/story/storyLoop00.png");
        this.load.image("sprStoryRacing01", "sprites/story/storyRacing01.png");

        
        
        //SEGMENTS
        this.load.spritesheet("sprSegMetalRoad00", "sprites/segments/sprSegMetalRoad00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetalRoad01", "sprites/segments/sprSegMetalRoad01.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetalRoad02", "sprites/segments/sprSegMetalRoad02.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetalRoad03", "sprites/segments/sprSegMetalRoad03.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetalRoad04", "sprites/segments/sprSegMetalRoad04.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetalRoad05", "sprites/segments/sprSegMetalRoad05.png", { frameWidth: 128, frameHeight: 128 });
        
        
        this.load.spritesheet("sprSegMetroPlatform00", "sprites/segments/sprSegMetroPlatform00.png", { frameWidth: 200, frameHeight: 128 });
        this.load.spritesheet("sprSegMetroPlatform01", "sprites/segments/sprSegMetroPlatform01.png", { frameWidth: 200, frameHeight: 128 });
        this.load.spritesheet("sprSegMetroLine00", "sprites/segments/sprSegMetroLine00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetroLine01", "sprites/segments/sprSegMetroLine01.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegMetroPlatformEnd00", "sprites/segments/sprSegMetroPlatformEnd00.png", { frameWidth: 200, frameHeight: 128 });
        this.load.spritesheet("sprSegMetroPlatformEnd01", "sprites/segments/sprSegMetroPlatformEnd01.png", { frameWidth: 200, frameHeight: 128 });
        
        this.load.spritesheet("sprSegAirVent00", "sprites/segments/sprSegAirVent00.png", { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet("sprSegConstructionRoad00", "sprites/segments/sprSegConstructionRoad00.png", { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet("sprSegSaltmineRoad00", "sprites/segments/sprSegSaltmineRoad00.png", { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet("sprSegCanalRoad00", "sprites/segments/sprSegCanalRoad00.png", { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet("sprSegIceRoad00", "sprites/segments/sprSegIceRoad00.png", { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet("sprSegNuclearRoad00", "sprites/segments/sprSegNuclearRoad00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegNuclearRoad01", "sprites/segments/sprSegNuclearRoad01.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegNuclearRoom00", "sprites/segments/sprSegNuclearRoom00.png", { frameWidth: 200, frameHeight: 128 });
        this.load.spritesheet("sprSegNuclearRoomEnd00", "sprites/segments/sprSegNuclearRoomEnd00.png", { frameWidth: 200, frameHeight: 128 });
        
        this.load.spritesheet("sprSegLabRoad00", "sprites/segments/sprSegLabRoad00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegTreeRoad00", "sprites/segments/sprSegTreeRoad00.png", { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet("sprSegCircusRoad00", "sprites/segments/sprSegCircusRoad00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegCircusRoad00", "sprites/segments/sprSegCircusRoad00.png", { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet("sprSegShaft00", "sprites/segments/sprSegShaft00.png", { frameWidth: 128, frameHeight: 256 });
        this.load.spritesheet("sprSegShaft01", "sprites/segments/sprSegShaft01.png", { frameWidth: 128, frameHeight: 256 });
        
        this.load.spritesheet("sprSegStartTunnel00", "sprites/segments/sprSegStartTunnel00.png", {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet("sprSegFinishLine00", "sprites/segments/sprSegFinishLine00.png", { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet("sprSegNothing00", "sprites/segments/sprSegNothing00.png", { frameWidth: 16, frameHeight: 16 });

        //OBSTCLES
        this.load.image("sprObsBlade00_0", "sprites/obstacles/sprObsBlade00_0.png");
        this.load.image("sprObsBlade00_1", "sprites/obstacles/sprObsBlade00_1.png");
        this.load.image("sprObsBlade00_2", "sprites/obstacles/sprObsBlade00_2.png");
        this.load.image("sprObsBlade00_3", "sprites/obstacles/sprObsBlade00_3.png");

        this.load.image("sprObsBlade01_0", "sprites/obstacles/sprObsBlade01_0.png");

        this.load.image("sprObsDoor00_0", "sprites/obstacles/sprObsDoor00_0.png");
        this.load.image("sprObsDoor00_1", "sprites/obstacles/sprObsDoor00_1.png");
        this.load.image("sprObsDoor00_2", "sprites/obstacles/sprObsDoor00_2.png");
        this.load.image("sprObsDoor00_3", "sprites/obstacles/sprObsDoor00_3.png");
        this.load.image("sprObsDoor00_4", "sprites/obstacles/sprObsDoor00_4.png");
        this.load.image("sprObsDoor00_5", "sprites/obstacles/sprObsDoor00_5.png");

        this.load.image("sprObsVentBlade00_0", "sprites/obstacles/sprObsVentBlade00_0.png");

        this.load.image("sprObsVentDoor00_0", "sprites/obstacles/sprObsVentDoor00_0.png");
        this.load.image("sprObsVentDoor01_0", "sprites/obstacles/sprObsVentDoor01_0.png");

        this.load.image("sprObsSmoke00_0", "sprites/obstacles/sprObsSmoke00_0.png");
        this.load.image("sprObsSmoke00_1", "sprites/obstacles/sprObsSmoke00_1.png");
        this.load.image("sprObsSmoke00_2", "sprites/obstacles/sprObsSmoke00_2.png");
        this.load.image("sprObsSmoke00_3", "sprites/obstacles/sprObsSmoke00_3.png");
        this.load.image("sprObsSmoke00_4", "sprites/obstacles/sprObsSmoke00_4.png");
        this.load.image("sprObsSmoke00_5", "sprites/obstacles/sprObsSmoke00_5.png");

        this.load.image("sprObsTrigger_0", "sprites/obstacles/sprTrigger_0.png");

        //CLUTTER
        this.load.image("sprClownFace00_0", "sprites/clutter/sprClownFace00.png");

        this.load.image("sprRadioactive00_0", "sprites/logos/radioactive04.png");

        this.load.image("sprNeonArrow00_0", "sprites/logos/sprNeonArrow00.png");
        this.load.image("sprNeonArrow01_0", "sprites/logos/sprNeonArrow01.png");
        this.load.image("sprNeonArrow02_0", "sprites/logos/sprNeonArrow02.png");
        this.load.image("sprNeonArrow03_0", "sprites/logos/sprNeonArrow03.png");

        this.load.image("sprAdvertTeamArashi", "sprites/clutter/sprAdvertTeamArashi.png");
        this.load.image("sprAdvertTeamDaito", "sprites/clutter/sprAdvertTeamDaito.png");
        this.load.image("sprAdvertTeamHapton", "sprites/clutter/sprAdvertTeamHapton.png");
        this.load.image("sprAdvertTeamTinnemann", "sprites/clutter/sprAdvertTeamTinnemann.png");

        this.load.image("sprLogoArashi", "sprites/logos/sprLogoArashi.png");
        this.load.image("sprLogoDaito", "sprites/logos/sprLogoDaito.png");
        this.load.image("sprLogoHapton", "sprites/logos/sprLogoHapton.png");
        this.load.image("sprLogoTinnemann", "sprites/logos/sprLogoTinnemann.png");

        this.load.image("sprBike00_0", "sprites/ships/sprBike00_0.png");
        this.load.image("sprBike00_1", "sprites/ships/sprBike00_1.png");
        this.load.image("sprBike00_2", "sprites/ships/sprBike00_2.png");
        this.load.image("sprBike00_3", "sprites/ships/sprBike00_3.png");
        this.load.image("sprBike01_0", "sprites/ships/sprBike01_0.png");
        this.load.image("sprBike01_1", "sprites/ships/sprBike01_1.png");
        this.load.image("sprBike01_2", "sprites/ships/sprBike01_2.png");
        this.load.image("sprBike01_3", "sprites/ships/sprBike01_3.png");
        this.load.image("sprBike02_0", "sprites/ships/sprBike02_0.png");
        this.load.image("sprBike02_1", "sprites/ships/sprBike02_1.png");
        this.load.image("sprBike02_2", "sprites/ships/sprBike02_2.png");
        this.load.image("sprBike02_3", "sprites/ships/sprBike02_3.png");
        this.load.image("sprBike03_0", "sprites/ships/sprBike03_0.png");
        this.load.image("sprBike03_1", "sprites/ships/sprBike03_1.png");
        this.load.image("sprBike03_2", "sprites/ships/sprBike03_2.png");
        this.load.image("sprBike03_3", "sprites/ships/sprBike03_3.png");

        this.load.image("sprDebugTexture", "sprites/sprDebugTexture.png");
        this.load.image("sprDebugTarget00", "sprites/sprDebugTarget00.png");
        this.load.image("sprObsDebugTrigger_0", "sprites/sprDebugTrigger00.png");
        this.load.image("sprDebugArrow00", "sprites/sprDebugArrow00.png");
        this.load.image("sprDebugQuadPoint0", "sprites/sprDebugQuadPoint0.png");
        this.load.image("sprDebugQuadPoint1", "sprites/sprDebugQuadPoint1.png");
        this.load.image("sprDebugQuadPoint2", "sprites/sprDebugQuadPoint2.png");
        this.load.image("sprDebugQuadPoint3", "sprites/sprDebugQuadPoint3.png");
        this.load.image("sprDebugQuadPoint4", "sprites/sprDebugQuadPoint4.png");
        this.load.image("sprDebugQuadPointCenter", "sprites/sprDebugQuadPointCenter.png");

        //audio
        this.load.audio("sndEngine00", "sounds/jetengine.mp3");
        this.load.audio("sndWhoo00", "sounds/whoo00.mp3");
        this.load.audio("sndPew00", "sounds/finalmoan.mp3");
        this.load.audio("sndSwoosh00", "sounds/Swoosh1.mp3");
        this.load.audio("sndSwoosh01", "sounds/Swoosh3.mp3");

        this.load.audio("sndNewRecord", "sounds/af_newrecord.mp3");
        this.load.audio("sndFinalLap", "sounds/af_finallap.mp3");
        this.load.audio("sndCountdownGo", "sounds/af_countdown_go.mp3");
        this.load.audio("sndCountdownOne", "sounds/af_countdown_one.mp3");
        this.load.audio("sndCountdownTwo", "sounds/af_countdown_two.mp3");
        this.load.audio("sndCountdownThree", "sounds/af_countdown_three.mp3");

        this.load.audio("musTrack0", "sounds/music/dejavu-Anima160kb.mp3");
        this.load.audio("musTrack1", "sounds/music/dejavu-Charger160kb.mp3");
        this.load.audio("musTrack2", "sounds/music/dejavu-stardust160kb.mp3");
        /*this.load.audio("musTrack3", "sounds/music/Lantriperc-AmazingSelector.mp3");
        this.load.audio("musTrack4", "sounds/music/Lantriperc-PeopleMachine.mp3");
        this.load.audio("musTrack5", "sounds/music/Lantriperc-TechniqueMecha.mp3");
        this.load.audio("musTrack6", "sounds/music/ModifiedMotion&Faction-MagicMan.mp3");*/



        greenscalePipeline = this.game.renderer.addPipeline('Custom', new GreenscalePipeline(this.game));
        greenscalePipeline.setFloat2('resolution', this.game.config.width, this.game.config.height);
        greenscalePipeline.setFloat2('mouse', 0.0, 0.0);


        this.warnTxt = this.add.bitmapText(0, (this.game.config.height * -0.5) + 32, "pixelmix", "Loading for the first time can take a while.\nPlease be patient.", 8, 1).setOrigin(0.5);

        this.loadTxt = this.add.bitmapText(0, (this.game.config.height * 0.5) - 32, "pixelmix", "LOADING: 0%", 8, 1).setOrigin(0.5);
        this.ancient = this.add.sprite(0, 0, "sprPixelMan").setScale(2);
        this.pixel = this.add.sprite(0, -48, "sprPixelTurn").setScale(2);

        let turnAnim = this.anims.create({
            key: "turning",
            frames: this.anims.generateFrameNumbers("sprPixelTurn"),
            frameRate: 32,
            repeat: -1
        });
        this.pixel.play("turning");
        this.logoDidRepeat = 0;
        this.pixel.on('animationrepeat', function () {
            this.logoDidRepeat += 1;
        }, this);

        this.load.on('progress', this.updateProgressDisplay, this);
    }

    create(){
        this.load.off("progress", this.updateProgressDisplay, this);
        this.cache.bitmapFont.get("pixelmix").data.lineHeight = 40;  
    }

    update(){
        if (this.logoDidRepeat >= 2) {
            this.scene.start("ScnLogin");
        }
    }

    updateProgressDisplay(_pct) {
        let txt = "LOADING: " + String(Math.floor(_pct * 100)) + "%\n";
        if(_pct === 1){
            txt += "decoding audio";
        }
        this.loadTxt.setText(txt);
    }
}
