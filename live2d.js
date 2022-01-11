/*
TN
*/
const cubism4Model =
  "pmc_lilpa/pmc_lilpa.model3.json"; // 모델 설정

const live2d = PIXI.live2d; 

(async function main() {
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    resizeTo: window,
    backgroundColor: 0xFFFFFF
  });

  const models = await Promise.all([
    live2d.Live2DModel.from(cubism4Model)
  ]);
  models.forEach((model) => {
    app.stage.addChild(model);
  
    const scaleX = innerWidth / model.width; // 크기 조정
    const scaleY = innerHeight / model.height; // 0.7이 최대값. 줄이면 작아짐

    // fit the window 위치 조정
    model.scale.set(Math.min(scaleX, scaleY));
    model.y = 0;
    model.x = 0;
  });
  const model4 = models[0];

  // handle tapping
  model4.on("hit", (hitAreas) => {
    if (hitAreas.includes("Click")) {
      model4.motion("Click");
    }
  });
})();
